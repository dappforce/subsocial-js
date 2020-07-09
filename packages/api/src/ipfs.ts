import { IpfsHash, SocialAccount } from '@subsocial/types/substrate/interfaces';
import { CommonContent, SpaceContent, PostContent, CommentContent, IpfsCid, CID, ProfileContent } from '@subsocial/types/offchain';
import { newLogger, getFirstOrUndefined, pluralize, isEmptyArray, nonEmptyStr } from '@subsocial/utils';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getUniqueIds } from './utils';

const IPFS_HASH_BINARY_LEN = 47

const asIpfsCid = (cid: IpfsCid): CID => {
  if (cid instanceof CID) {
    return cid
  } else if (typeof cid === 'string') {
    return new CID(cid)
  } else if (typeof cid.toU8a === 'function' && cid.toU8a().length === IPFS_HASH_BINARY_LEN) {
    return new CID(cid.toString())
  } else {
    throw new Error('Wrong type of IPFS CID. Valid types are: string | CID | IpfsHash')
  }
}

export function getIpfsHashOfSocialAccount (struct: SocialAccount): string | undefined {
  const profile = struct?.profile
  if (profile && profile.isSome) {
    return getIpfsHashOfStruct(profile.unwrap())
  }
  return undefined
}

type HasIpfsHashDirectly = {
  ipfs_hash: IpfsHash
}

type HasIpfsHashSomewhere = HasIpfsHashDirectly | SocialAccount

export function getIpfsHashOfStruct<S extends HasIpfsHashSomewhere> (struct: S): string | undefined {
  if ((struct as HasIpfsHashDirectly).ipfs_hash) {
    return (struct as HasIpfsHashDirectly).ipfs_hash.toString()
  } else if ((struct as SocialAccount).profile) {
    return getIpfsHashOfSocialAccount(struct as SocialAccount)
  }
  return undefined
}

export function getCidOfStruct (struct: HasIpfsHashSomewhere): CID | undefined {
  const hash = getIpfsHashOfStruct(struct)
  return hash ? new CID(hash) : undefined
}

export function getCidsOfStructs (structs: HasIpfsHashSomewhere[]): CID[] {
  return structs
    .map(getCidOfStruct)
    .filter(cid => typeof cid !== 'undefined') as CID[]
}

type IpfsUrl = string
type IpfsNodeEndpoint = 'cat' | 'version'

export type SubsocialIpfsProps = {
  ipfsNodeUrl: IpfsUrl,
  offchainUrl: string
}

export class SubsocialIpfsApi {

  private ipfsNodeUrl!: IpfsUrl // IPFS Node ReadOnly Gateway

  private offchainUrl!: string

  constructor (props: SubsocialIpfsProps) {
    const { ipfsNodeUrl, offchainUrl } = props;

    this.ipfsNodeUrl = `${ipfsNodeUrl}/api/v0`
    this.offchainUrl = `${offchainUrl}/v1`

    this.testConnection()
  }

  private async testConnection () {
    try {
      // Test IPFS Node connection by requesting its version
      const res = await this.ipfsNodeRequest('version')
      log.info('Connected to IPFS Node with version ', res.data.version)
    } catch (err) {
      log.error('Failed to connect to IPFS node: %o', err)
    }
  }

  // ---------------------------------------------------------------------
  // IPFS Request wrapper

  private async ipfsNodeRequest (endpoint: IpfsNodeEndpoint, cid?: CID): Promise<AxiosResponse<any>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${this.ipfsNodeUrl}/${endpoint}`
    };

    if (typeof cid !== undefined) {
      config.url += `?arg=${cid}`
    }

    return axios(config)
  }

  // ---------------------------------------------------------------------
  // Find multiple

  async getContentArray<T extends CommonContent> (cids: IpfsCid[], contentName?: string): Promise<T[]> {
    try {
      contentName = nonEmptyStr(contentName) ? contentName + ' content' : 'content'
      const ipfsCids = getUniqueIds(cids.map(asIpfsCid))

      if (isEmptyArray(ipfsCids)) {
        log.debug(`No ${contentName} to load from IPFS: no cids provided`)
        return []
      }

      const loadContentFns = ipfsCids.map((cid) => this.ipfsNodeRequest('cat', cid));
      const jsonContents = await Promise.all(loadContentFns);
      const contents = jsonContents.map((x) => x.data) as T[];
      log.debug(`Loaded ${pluralize(contents.length, contentName)}`)
      return contents
    } catch (err) {
      console.error(`Failed to load ${contentName}(s) by ${cids.length} cid(s):`, err)
      return [];
    }
  }

  async findSpaces (cids: IpfsCid[]): Promise<SpaceContent[]> {
    return this.getContentArray(cids, 'space')
  }

  async findPosts (cids: IpfsCid[]): Promise<PostContent[]> {
    return this.getContentArray(cids, 'post')
  }

  async findComments (cids: IpfsCid[]): Promise<CommentContent[]> {
    return this.getContentArray(cids, 'comment')
  }

  async findProfiles (cids: IpfsCid[]): Promise<ProfileContent[]> {
    return this.getContentArray(cids, 'account')
  }

  // ---------------------------------------------------------------------
  // Find single

  async getContent<T extends CommonContent> (cid: IpfsCid, contentName?: string): Promise<T | undefined> {
    return getFirstOrUndefined(await this.getContentArray<T>([ cid ], contentName))
  }

  async findSpace (cid: IpfsCid): Promise<SpaceContent | undefined> {
    return this.getContent<SpaceContent>(cid, 'space')
  }

  async findPost (cid: IpfsCid): Promise<PostContent | undefined> {
    return this.getContent<PostContent>(cid, 'post')
  }

  async findComment (cid: IpfsCid): Promise<CommentContent | undefined> {
    return this.getContent<CommentContent>(cid, 'comment')
  }

  async findProfile (cid: IpfsCid): Promise<ProfileContent | undefined> {
    return this.getContent<ProfileContent>(cid, 'account')
  }

  // ---------------------------------------------------------------------
  // Remove

  async removeContent (cid: IpfsCid) {
    try {
      const res = await axios.delete(`${this.offchainUrl}/ipfs/pins/${cid}`);

      if (res.status !== 200) {
        log.error(`${this.removeContent.name}: offchain server responded with status code ${res.status} and message: ${res.statusText}`)
        return
      }

      log.info(`Unpinned content with hash: ${cid}`);
    } catch (error) {
      log.error('Failed to unpin content in IPFS from client side via offchain: %o', error)
    }
  }

  async saveContent (content: CommonContent): Promise<IpfsHash | undefined> {
    try {
      const res = await axios.post(`${this.offchainUrl}/ipfs/add`, content);

      if (res.status !== 200) {
        log.error(`${this.saveContent.name}: Offchain server responded with status code ${res.status} and message: ${res.statusText}`)
        return undefined
      }

      return res.data;
    } catch (error) {
      log.error('Failed to add content to IPFS from client side via offchain: %o', error)
      return undefined;
    }
  }

  async saveSpace (content: SpaceContent): Promise<IpfsHash | undefined> {
    const hash = await this.saveContent(content)
    log.debug(`Saved space with hash: ${hash}`)
    return hash;
  }

  async savePost (content: PostContent): Promise<IpfsHash | undefined> {
    const hash = await this.saveContent(content)
    log.debug(`Saved post with hash: ${hash}`)
    return hash;
  }

  async saveComment (content: CommentContent): Promise<IpfsHash | undefined> {
    const hash = await this.saveContent(content)
    log.debug(`Saved comment with hash: ${hash}`)
    return hash;
  }
}

const log = newLogger(SubsocialIpfsApi.name);
