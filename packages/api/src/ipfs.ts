/* eslint-disable @typescript-eslint/no-var-requires */
import { IpfsHash, SocialAccount } from '@subsocial/types/substrate/interfaces';
import { CommonContent, BlogContent, PostContent, CommentContent, IpfsCid, CID, ProfileContent } from '@subsocial/types/offchain';
import { newLogger, getFirstOrUndefined, pluralize, isEmptyArray, nonEmptyStr } from '@subsocial/utils';
import axios from 'axios';
import { getUniqueIds } from './utils';
import request from 'request'
import CircularJSON from 'circular-json';
import { promisify } from 'util'

const asyncRequest = promisify(request)

const IPFS_HASH_BINARY_LEN = 47

const asIpfsCid = (cid: IpfsCid): CID => {
  if (cid instanceof CID) {
    return cid
  } else if (typeof cid === 'string') {
    return new CID(cid)
  } else if (typeof cid.toU8a === 'function' && cid.toU8a().length === IPFS_HASH_BINARY_LEN) {
    return new CID(cid.toString())
  } else {
    throw new Error('Wrong type of IPFS CID. Valid types are: string | IpfsHash | CID')
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
type IpfsClusterEndpoint = 'add' | 'version' | 'pin' | 'unpin'
type IpfsNodeEndpoint = 'cat' | 'version'

export type SubsocialIpfsProps = {
  ipfsNodeUrl: IpfsUrl,
  ipfsClusterUrl: IpfsUrl,
  offchainUrl: string
}

export class SubsocialIpfsApi {

  private ipfsNodeUrl!: IpfsUrl // IPFS Node ReadOnly Gateway
  private ipfsClusterUrl!: IpfsUrl // IPFS Cluster HTTP API

  private offchainUrl!: string

  constructor (props: SubsocialIpfsProps) {
    const { ipfsNodeUrl, ipfsClusterUrl, offchainUrl } = props;

    this.ipfsNodeUrl = `${ipfsNodeUrl}/api/v0`
    this.ipfsClusterUrl = `${ipfsClusterUrl}`
    this.offchainUrl = `${offchainUrl}/v1`

    this.tryConnection()
  }

  private async tryConnection () {
    try {
      // Test IPFS Node connection by requesting its version
      const nodeResponse = await this.ipfsNodeRequest('version')
      logger.info('Connected to IPFS Node with version ', nodeResponse.body.version)

      if (typeof window === undefined) {
        const clusterResponse = await this.ipfsClusterRequest('version')
        logger.info('Connected to IPFS Cluster with version ', clusterResponse.body.version)
      }
    } catch (err) {
      logger.error('Failed to connect to IPFS node: %o', err)
    }
  }

  // ---------------------------------------------------------------------
  // IPFS Request wrapper

  private async ipfsNodeRequest( endpoint: IpfsNodeEndpoint, cid?: CID): Promise<request.Response> {
    let options: request.UrlOptions & request.CoreOptions = {
      method: 'GET',
      url: `${this.ipfsNodeUrl}/${endpoint}`
    };

    if (typeof cid !== undefined) {
      options.url += `?arg=${cid}`
    }

    return asyncRequest(options)
  }

  private async ipfsClusterRequest(
    endpoint: IpfsClusterEndpoint,
    data?: CommonContent | IpfsHash
  ): Promise<request.Response> {
    let options: request.UrlOptions & request.CoreOptions = {
      url: `${this.ipfsClusterUrl}/${endpoint}`
    };

    switch (endpoint) {
      case 'add': {
        options = {
          ...options,
          method: 'POST',
          formData: {
            '' : CircularJSON.stringify(data)
          }
        }
        break
      }
      case 'pin':
      case 'unpin': {
        options.method = endpoint === 'pin' ? 'POST' : 'DELETE'
        options.url = `${this.ipfsClusterUrl}/pins/${data}`
        break
      }
      case 'version': {
        options.method = 'GET';
        break
      }
      default: {
        throw Error(`Unsupported endpoint recieved: ${endpoint}`)
      }
    }

    return asyncRequest(options)
  }

  // ---------------------------------------------------------------------
  // Find multiple

  async getContentArray<T extends CommonContent> (cids: IpfsCid[], contentName?: string): Promise<T[]> {
    try {
      contentName = nonEmptyStr(contentName) ? contentName + ' content' : 'content'
      const ipfsCids = getUniqueIds(cids.map(asIpfsCid))

      if (isEmptyArray(ipfsCids)) {
        logger.debug(`No ${contentName} to load from IPFS: no cids provided`)
        return []
      }

      const loadContentFns = ipfsCids.map((cid) => this.ipfsNodeRequest('cat', cid));
      const jsonContents = await Promise.all(loadContentFns);
      const contents = jsonContents.map((x) => JSON.parse(x.body)) as T[];
      logger.debug(`Loaded ${pluralize(contents.length, contentName)}`)
      return contents
    } catch (err) {
      console.error(`Failed to load ${contentName}(s) by ${cids.length} cid(s):`, err)
      return [];
    }
  }

  async findBlogs (cids: IpfsCid[]): Promise<BlogContent[]> {
    return this.getContentArray(cids, 'blog')
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

  async findBlog (cid: IpfsCid): Promise<BlogContent | undefined> {
    return this.getContent<BlogContent>(cid, 'blog')
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

  async removeContent (hash: IpfsHash) {
    const { statusCode } = await this.ipfsClusterRequest('unpin', hash);
    if (statusCode !== 200) {
      throw Error(`Failed to unpin content with hash '${hash}'; Error ${statusCode}`)
    } else {
      logger.info(`Unpinned content with hash: ${hash}`);
    }
  }

  // ---------------------------------------------------------------------
  // Save

  async saveContent (content: CommonContent): Promise<IpfsHash | undefined> {
    // return typeof window === 'undefined'
    //   ? this.saveContentOnServer(content)
    //   : this.saveContentOnClient(content)
    return this.saveContentOnServer(content)
  }

  async saveContentOnClient (content: CommonContent): Promise<IpfsHash | undefined> {
    try {
      const res = await axios.post(`${this.offchainUrl}/ipfs/add`, content);

      if (res.status !== 200) {
        throw new Error(`Offchain server responded with status code ${res.status} and message: ${res.statusText}`)
      }

      return res.data;
    } catch (error) {
      logger.error('Failed to add content to IPFS from client side:', error)
      return undefined;
    }
  }

  async saveContentOnServer (content: CommonContent): Promise<IpfsHash | undefined> {
    try {
      const res = await this.ipfsClusterRequest('add', content)
      if (res.statusCode !== 200) {
        throw Error(`Failed to add content to IPFS. Status message: ${res.statusMessage}`)
      }

      const body = JSON.parse(res.body)
      const cid = body.cid['/'] as IpfsHash
      logger.debug('Content added under CID: %s', cid)

      return cid

    } catch (error) {
      logger.error('Failed to add content to IPFS from server side: %o', error)
      return undefined;
    }
  }

  async saveBlog (content: BlogContent): Promise<IpfsHash | undefined> {
    const hash = await this.saveContent(content)
    logger.debug(`Saved blog with hash: ${hash}`)
    return hash;
  }

  async savePost (content: PostContent): Promise<IpfsHash | undefined> {
    const hash = await this.saveContent(content)
    logger.debug(`Saved post with hash: ${hash}`)
    return hash;
  }

  async saveComment (content: CommentContent): Promise<IpfsHash | undefined> {
    const hash = await this.saveContent(content)
    logger.debug(`Saved comment with hash: ${hash}`)
    return hash;
  }
}

const logger = newLogger(SubsocialIpfsApi.name);
