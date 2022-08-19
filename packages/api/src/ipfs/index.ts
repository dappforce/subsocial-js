import { Content, IpfsCid as RuntimeIpfsCid } from '@subsocial/definitions/interfaces';
import { IpfsCommonContent, IpfsSpaceContent, IpfsPostContent, IpfsCommentContent, IpfsCid } from '../types/ipfs';
import { newLogger, pluralize, isEmptyArray, nonEmptyStr } from '@subsocial/utils';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getUniqueIds, isIpfs, asIpfsCid } from '../utils/common';
import { SubsocialContext, ContentResult, UseServerProps } from '../types';
import { CID, create, IPFSHTTPClient } from 'ipfs-http-client';

type HasContentField = {
  content: Content
}

type HasIpfsCidSomewhere = HasContentField

/** Try to resolve a corresponding IPFS CID of a given struct. */
export function getIpfsCidOfStruct<S extends HasIpfsCidSomewhere> (struct: S): string | undefined {
  if (isIpfs((struct as HasContentField).content)) {
    return (struct as HasContentField).content.asIpfs.toHuman()
  }

  return undefined
}

/** Extract ids of an array of structs. */
export function getCidsOfStructs (structs: HasIpfsCidSomewhere[]): string[] {
  return structs
    .map(getIpfsCidOfStruct)
    .filter(cid => typeof cid !== 'undefined') as string[]
}

type IpfsUrl = string

export type SubsocialIpfsProps = SubsocialContext & {
  ipfsNodeUrl: IpfsUrl,
  offchainUrl?: string
}

/** Aggregated API to work with IPFS: get the content of the spaces of posts and profiles. */
export class SubsocialIpfsApi {

  /** IPFS node readonly gateway */
  private _client!: IPFSHTTPClient

  /** Offchain gateway */
  private offchainUrl!: string
  private useServer?: UseServerProps

  /** Sets values for ptivate fields from props and trying to make a test connection */
  constructor (props: SubsocialIpfsProps) {
    const { ipfsNodeUrl, offchainUrl, useServer } = props;

    this._client = create({ url: `${ipfsNodeUrl}/api/v0` })

    if (offchainUrl) {
      this.offchainUrl = `${offchainUrl}/v1`
      this.useServer = useServer
    }

    this.testConnection()
  }

  /** Trying to make a test connection  */
  private async testConnection () {
    if (this.useServer) return

    try {
      // Test IPFS Node connection by requesting its version
      const res = await this._client.version()
      log.info('Connected to IPFS Node with version ', JSON.stringify(res))
    } catch (err: any) {
      log.error('Failed to connect to IPFS node:', err.stack)
    }
  }

  get client () {
    return this._client
  }

  // ---------------------------------------------------------------------
  // Find multiple

  /** Return unique cids from cids array */
  getUniqueCids (cids: IpfsCid[], contentName?: string) {
    contentName = nonEmptyStr(contentName) ? `${contentName  } content` : 'content'
    const ipfsCids = getUniqueIds(cids.map(asIpfsCid))

    if (isEmptyArray(ipfsCids)) {
      log.debug(`No ${contentName} to load from IPFS: no cids provided`)
      return []
    }

    return ipfsCids
  }

  /** Return object with contents from IPFS by cids array */
  async getContentArrayFromIpfs<T extends IpfsCommonContent> (cids: IpfsCid[], contentName = 'content'): Promise<ContentResult<T>> {
    try {
      const ipfsCids = this.getUniqueCids(cids, contentName)

      const content: ContentResult<T> = {}

      const getFormatedContent = async (cid: CID) => {
        const res = await this._client.dag.get(cid)
        const cidStr = cid.toString()
        content[cidStr] = res.value
      }

      const loadContentFns = ipfsCids.map(getFormatedContent);
      await Promise.all(loadContentFns);
      log.debug(`Loaded ${pluralize({ count: cids.length, singularText: contentName })}`)
      return content
    } catch (err) {
      console.error(`Failed to load ${contentName}(s) by ${cids.length} cid(s):`, err)
      return {};
    }
  }

  /** Return object with contents from IPFS through offchain by cids array */
  async getContentArrayFromOffchain<T extends IpfsCommonContent> (cids: IpfsCid[], contentName = 'content'): Promise<ContentResult<T>> {
    try {

      const res = this.useServer?.httpRequestMethod === 'get'
        ? await axios.get(`${this.offchainUrl}/ipfs/get?cids=${cids.join('&cids=')}`)
        : await axios.post(`${this.offchainUrl}/ipfs/get`, { cids })

      if (res.status !== 200) {
        log.error(`${this.getContentArrayFromIpfs.name}: Offchain server responded with status code ${res.status} and message: ${res.statusText}`)
        return {}
      }

      const contents = res.data;
      log.debug(`Loaded ${cids.length} ${contentName}`)
      return contents;
    } catch (error) {
      log.error('Failed to get content from IPFS via Offchain API:', error)
      return {};
    }
  }

  async getContentArray<T extends IpfsCommonContent> (cids: IpfsCid[], contentName = 'content'): Promise<ContentResult<T>> {
    return this.useServer
      ? this.getContentArrayFromOffchain(cids, contentName)
      : this.getContentArrayFromIpfs(cids, contentName)
  }

  /**
   * Find and load an array of off-chain information about spaces from IPFS by a given array of `cids`.
   *
   * Space information only exists if there is a corresponding JSON file that represents the spaces' content on IPFS.
   *
   * @param cids - An array of IPFS content ids of desired spaces.
   *
   * @returns An array of data about desired spaces from IPFS. If no corresponding spaces to given array of `cids`, an
   * empty array is returned.
   */
  async findSpaces (cids: IpfsCid[]): Promise<ContentResult<IpfsSpaceContent>> {
    return this.getContentArray(cids, 'space')
  }

  /**
   * Find and load an array of off-chain information about posts from IPFS by a given array of `cids`.
   *
   * Post information only exists if there is a corresponding JSON file that represents the posts' content on IPFS.
   *
   * @param cids - An array of IPFS content ids of desired posts.
   *
   * @returns An array of data about desired posts from IPFS. If no corresponding posts to given array of `cids`, an
   * empty array is returned.
   */
  async findPosts (cids: IpfsCid[]): Promise<ContentResult<IpfsPostContent>> {
    return this.getContentArray(cids, 'post')
  }

  /**
   * Find and load an array of off-chain information about comments from IPFS by a given array of `cids`.
   *
   * Comment information only exists if there is a corresponding JSON file that represents the comments' content on
   * IPFS.
   *
   * @param cids - An array of IPFS content ids of desired comments.
   *
   * @returns An array of data about desired comments from IPFS. If no corresponding comments to given array of `cids`,
   * an empty array is returned.
   */
  async findComments (cids: IpfsCid[]): Promise<ContentResult<IpfsCommentContent>> {
    return this.getContentArray(cids, 'comment')
  }

  // ---------------------------------------------------------------------
  // Find single

  async getContent<T extends IpfsCommonContent> (cid: IpfsCid, contentName?: string): Promise<T | undefined> {
    const content = await this.getContentArray<T>([ cid ], contentName)
    return content[cid.toString()]
  }

  /**
   * Find and load off-chain information about a space from IPFS by a given `cid`.
   *
   * Space information only exists if there is a corresponding JSON file that represents the space's content on IPFS.
   *
   * @param cid - IPFS content id of a desired space.
   *
   * @returns Data about a desired space from IPFS. If no corresponding space to given `id`, `undefined` is returned.
   */
  async findSpace (cid: IpfsCid): Promise<IpfsSpaceContent | undefined> {
    return this.getContent<IpfsSpaceContent>(cid, 'space')
  }

  /**
   * Find and load off-chain information about a post from IPFS by a given `cid`.
   *
   * Post information only exists if there is a corresponding JSON file that represents the post's content on IPFS.
   *
   * @param cid - IPFS content id of a desired post.
   *
   * @returns Data about a desired post from IPFS. If no corresponding post to given `id`, `undefined` is returned.
   */
  async findPost (cid: IpfsCid): Promise<IpfsPostContent | undefined> {
    return this.getContent<IpfsPostContent>(cid, 'post')
  }

  /**
   * Find and load off-chain information about a comment from IPFS by a given `cid`.
   *
   * Comment information only exists if there is a corresponding JSON file that represents the comment's content on
   * IPFS.
   *
   * @param cid - IPFS content id of a desired comment.
   *
   * @returns Data about a desired comment from IPFS. If no corresponding comments to given `id`, `undefined` is
   * returned.
   */
  async findComment (cid: IpfsCid): Promise<IpfsCommentContent | undefined> {
    return this.getContent<IpfsCommentContent>(cid, 'comment')
  }

  // ---------------------------------------------------------------------
  // Remove
  /** Unpin content in IPFS */
  async removeContent (cid: IpfsCid) {
    try {
      const res = await axios.delete(`${this.offchainUrl}/ipfs/pins/${cid}`);

      if (res.status !== 200) {
        log.error(`${this.removeContent.name}: offchain server responded with status code ${res.status} and message: ${res.statusText}`)
        return
      }

      log.info(`Unpinned content with hash: ${cid}`);
    } catch (error) {
      log.error('Failed to unpin content in IPFS from client side via offchain: ', error)
    }
  }

  /** Add and pin content in IPFS */
  async saveContent (content: IpfsCommonContent): Promise<RuntimeIpfsCid | undefined> {
    try {
      const res = await axios.post(`${this.offchainUrl}/ipfs/add`, content);

      if (res.status !== 200) {
        log.error(`${this.saveContent.name}: Offchain server responded with status code ${res.status} and message: ${res.statusText}`)
        return undefined
      }

      return res.data;
    } catch (error) {
      log.error('Failed to add content to IPFS from client side via offchain: ', error)
      return undefined;
    }
  }

  /** Add and pit file in IPFS */
  async saveFile (file: File | Blob) {
    if (typeof window === 'undefined') {
      throw new Error('This function works only in a browser')
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(`${this.offchainUrl}/ipfs/addFile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.status !== 200) {
        log.error(`${this.saveFile.name}: Offchain server responded with status code ${res.status} and message: ${res.statusText}`)
        return undefined
      }

      return res.data;
    } catch (error) {
      log.error('Failed to add file to IPFS from client side via offchain: ', error)
      return undefined;
    }
  }

  /** Add and pin space content in IPFS */
  async saveSpace (content: IpfsSpaceContent): Promise<RuntimeIpfsCid | undefined> {
    const hash = await this.saveContent(content)
    log.debug(`Saved space with hash: ${hash}`)
    return hash;
  }

  /** Add and pin post content in IPFS */
  async savePost (content: IpfsPostContent): Promise<RuntimeIpfsCid | undefined> {
    const hash = await this.saveContent(content)
    log.debug(`Saved post with hash: ${hash}`)
    return hash;
  }

  /** Add and pin comment content in IPFS */
  async saveComment (content: IpfsCommentContent): Promise<RuntimeIpfsCid | undefined> {
    const hash = await this.saveContent(content)
    log.debug(`Saved comment with hash: ${hash}`)
    return hash;
  }
}

const log = newLogger(SubsocialIpfsApi.name);
