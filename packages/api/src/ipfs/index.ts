import {
  Content,
  IpfsCid as RuntimeIpfsCid
} from '@subsocial/definitions/interfaces'
import { ImportCandidate, IpfsCid, IpfsCommonContent } from '../types'
import { isEmptyArray, newLogger } from '@subsocial/utils'
import axios from 'axios'
import { asIpfsCid, getUniqueIds, isIpfs } from '../utils'
import { CommonContent, ContentResult, SubsocialContext } from '../types'
import { create, IPFSHTTPClient } from 'ipfs-http-client'
import { u8aToHex } from '@polkadot/util'
import { AnyJson } from '@polkadot/types-codec/types'
import jsonStringify from 'json-stable-stringify'
const getIpfsUrl = (url: string) => url + '/api/v0'

type HasContentField = {
  content: Content
}

type HasIpfsCidSomewhere = HasContentField

enum CID_KIND {
  CBOR = 113,
  UNIXFS = 112
}

type CrustAuthProps = {
  publicAddress: string
  signedAddress: Uint8Array
}

/** Try to resolve a corresponding IPFS CID of a given struct. */
export function getIpfsCidOfStruct<S extends HasIpfsCidSomewhere>(
  struct: S
): string | undefined {
  if (isIpfs((struct as HasContentField).content)) {
    return (struct as HasContentField).content.asIpfs.toHuman()
  }

  return undefined
}

/** Extract ids of an array of structs. */
export function getCidsOfStructs(structs: HasIpfsCidSomewhere[]): string[] {
  return structs
    .map(getIpfsCidOfStruct)
    .filter(cid => typeof cid !== 'undefined') as string[]
}

/** Return unique cids from cids array */
const getUniqueCids = (cids: IpfsCid[]) => {
  const ipfsCids = getUniqueIds(cids.map(asIpfsCid))

  if (isEmptyArray(ipfsCids)) {
    log.debug(`No content to load from IPFS: no cids provided`)
    return []
  }

  return ipfsCids
}

type IpfsUrl = string

type Headers = Record<string, any>

export type SubsocialIpfsProps = SubsocialContext & {
  ipfsNodeUrl: IpfsUrl
  ipfsAdminNodeUrl?: IpfsUrl
  ipfsClusterUrl?: IpfsUrl
  offchainUrl?: string
  headers?: Headers
}

/** Aggregated API to work with IPFS: get the content of the spaces of posts and profiles. */
export class SubsocialIpfsApi {
  /** IPFS node readonly gateway */
  private _client!: IPFSHTTPClient
  private _adminClient!: IPFSHTTPClient

  private readonly _ipfsNodeUrl: string
  private readonly _ipfsAdminNodeUrl: string | undefined
  private readonly _ipfsClusterUrl: string | undefined

  /** Offchain gateway */
  private readonly offchainUrl!: string
  private writeHeaders: Headers | undefined
  private pinHeaders: Headers | undefined

  private createIpfsClient(headers?: Headers) {
    this._client = create({
      url: getIpfsUrl(this._ipfsNodeUrl),
      headers
    })

    this._adminClient = this._ipfsAdminNodeUrl
      ? create({
          url: getIpfsUrl(this._ipfsAdminNodeUrl),
          headers
        })
      : this._client

    this.writeHeaders = headers
  }

  constructor({
    ipfsNodeUrl,
    ipfsAdminNodeUrl,
    ipfsClusterUrl,
    offchainUrl,
    headers
  }: SubsocialIpfsProps) {
    this._ipfsClusterUrl = ipfsClusterUrl
    this._ipfsAdminNodeUrl = ipfsAdminNodeUrl
    this._ipfsNodeUrl = ipfsNodeUrl

    this.createIpfsClient(headers)
    this.pinHeaders = headers

    if (offchainUrl) {
      this.offchainUrl = `${offchainUrl}/v1`
    }
  }

  static generateCrustAuthToken(auth: CrustAuthProps) {
    const sig = u8aToHex(auth.signedAddress)

    const authHeaderRaw = `sub-${auth.publicAddress}:${sig}`
    return Buffer.from(authHeaderRaw).toString('base64')
  }

  get client() {
    return this._client
  }

  get adminClient() {
    return this._adminClient
  }

  // ---------------------------------------------------------------------
  // Main interfaces

  setWriteHeaders(headers: Headers) {
    this.createIpfsClient(headers)
  }

  setPinHeaders(headers: Headers) {
    this.pinHeaders = headers
  }

  async getContentArray<T extends IpfsCommonContent>(
    cids: IpfsCid[],
    timeout?: number
  ): Promise<ContentResult<T>> {
    return this.getContentArrayFromIpfs(cids, timeout)
  }

  async getContent<T extends IpfsCommonContent>(
    cid: IpfsCid,
    timeout?: number
  ): Promise<T | undefined> {
    const content = await this.getContentArray<T>([cid], timeout)
    return content[cid.toString()]
  }

  // --------------------------------------------------------------------
  // IPFS functionality

  /** Return object with contents from IPFS by cids array */
  async getContentArrayFromIpfs<T extends IpfsCommonContent>(
    cids: IpfsCid[],
    timeout?: number
  ): Promise<ContentResult<T>> {
    try {
      const ipfsCids = getUniqueCids(cids)

      const content: ContentResult<T> = {}

      const loadContentFns = ipfsCids.map(async cid => {
        try {
          const cidStr = cid.toString()

          const isCbor = cid.code === CID_KIND.CBOR

          if (isCbor) {
            const res = await this.client.dag.get(cid, {
              timeout
            })
            content[cidStr] = res.value
          } else {
            const res = await axios.get(
              `${this._ipfsNodeUrl}/ipfs/${cid.toV1()}?timeout=${timeout}`
            )
            const data = res.data

            if (typeof data === 'object') {
              content[cidStr] = data
            }
          }
        } catch (err) {
          log.error(`Failed to load cid ${cid.toString()}:`, err)
        }
      })

      await Promise.allSettled(loadContentFns)
      log.debug(`Loaded ${cids.length} cid(s)`)
      return content
    } catch (err) {
      log.error(`Failed to load ${cids.length} cid(s):`, err)
      return {}
    }
  }

  /** Pin content in IPFS */
  async pinContent(cid: IpfsCid, props?: Record<'asLink' | string, any>) {
    const url = props?.asLink
      ? `${this._ipfsClusterUrl}/pins/${cid.toString()}`
      : `${this._ipfsClusterUrl}/pins/`

    const data = {
      cid: cid.toString(),
      ...props
    }

    const res = await axios.post(url, data, {
      headers: this.pinHeaders
    })

    if (res.status === 200) {
      log.debug(`CID ${cid.toString()} was pinned to ${this._ipfsClusterUrl}`)
    }

    return res
  }

  /** Unpin content in IPFS */
  async unpinContent(cid: IpfsCid) {
    const res = await axios.delete(
      this._ipfsClusterUrl + '/pins/' + cid.toString(),
      {
        headers: this.pinHeaders
      }
    )

    if (res.status === 200) {
      log.debug(
        `CID ${cid.toString()} was unpinned from ${this._ipfsClusterUrl}`
      )
    }

    return res
  }

  /** Add content in IPFS using Crob format*/
  async saveContent(content: AnyJson | CommonContent) {
    const data = await this.adminClient.dag.put(content, {
      headers: this.writeHeaders
    })
    return data.toV1().toString()
  }

  /** Add file in IPFS using unixFs */
  async saveFile(file: ImportCandidate) {
    const data = await this.adminClient.add(file, {
      headers: this.writeHeaders
    })
    return data.cid.toV1().toString()
  }

  /** Add JSON in IPFS using unixFs */
  async saveJson(json: Record<any, any>) {
    const data = await this.adminClient.add(jsonStringify(json), {
      headers: this.writeHeaders
    })
    return data.cid.toV1().toString()
  }

  // ---------------------------------------------------------------------
  // Offchain functionality

  /** @deprecated Unpin content in IPFS via Offchain */
  async removeContent(cid: IpfsCid) {
    try {
      const res = await axios.delete(`${this.offchainUrl}/ipfs/pins/${cid}`)

      if (res.status !== 200) {
        log.error(
          `${this.removeContent.name}: offchain server responded with status code ${res.status} and message: ${res.statusText}`
        )
        return
      }

      log.info(`Unpinned content with hash: ${cid}`)
    } catch (error) {
      log.error(
        'Failed to unpin content in IPFS from client side via offchain: ',
        error
      )
    }
  }

  /** Add and pin content in IPFS via Offchain */
  async saveContentToOffchain(
    content: IpfsCommonContent
  ): Promise<RuntimeIpfsCid | undefined> {
    try {
      const res = await axios.post(`${this.offchainUrl}/ipfs/add`, content)

      if (res.status !== 200) {
        log.error(
          `${this.saveContentToOffchain.name}: Offchain server responded with status code ${res.status} and message: ${res.statusText}`
        )
        return undefined
      }

      return res.data
    } catch (error) {
      log.error(
        'Failed to add content to IPFS from client side via offchain: ',
        error
      )
      return undefined
    }
  }

  /** Add and pit file in IPFS via Offchain */
  async saveFileToOffchain(file: File | Blob) {
    if (typeof window === 'undefined') {
      throw new Error('This function works only in a browser')
    }

    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post(
        `${this.offchainUrl}/ipfs/addFile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (res.status !== 200) {
        log.error(
          `${this.saveFileToOffchain.name}: Offchain server responded with status code ${res.status} and message: ${res.statusText}`
        )
        return undefined
      }

      return res.data
    } catch (error) {
      log.error(
        'Failed to add file to IPFS from client side via offchain: ',
        error
      )
      return undefined
    }
  }
}

const log = newLogger(SubsocialIpfsApi.name)
