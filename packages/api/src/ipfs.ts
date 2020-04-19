/* eslint-disable @typescript-eslint/no-var-requires */
import { IpfsHash, CommonStruct, SocialAccount, Profile } from '@subsocial/types/substrate/interfaces';
import { CommonContent, BlogContent, PostContent, CommentContent, IpfsCid, CID, IpfsApi } from '@subsocial/types/offchain';
import { newLogger, getFirstOrUndefinded, pluralize, isEmptyArray, nonEmptyStr } from '@subsocial/utils';
import axios from 'axios';
import { getUniqueIds } from './utils';

const ipfsClient = require('ipfs-http-client')

const IPFS_HASH_BINARY_LEN = 47

const asIpfsCid = (cid: IpfsCid) => {
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

type HasIpfsHash = {
  ipfs_hash: IpfsHash
}

export function getIpfsHashOfStruct<S extends HasIpfsHash | SocialAccount> (struct: S): string | undefined {
  if ((struct as HasIpfsHash).ipfs_hash) {
    return (struct as HasIpfsHash).ipfs_hash.toString()
  } else if ((struct as SocialAccount).profile) {
    return getIpfsHashOfSocialAccount(struct as SocialAccount)
  }
  return undefined
}

export function getCidOfStruct (struct: CommonStruct | Profile): CID | undefined {
  const hash = getIpfsHashOfStruct(struct)
  return hash ? new CID(hash) : undefined
}

export function getCidsOfStructs (structs: (CommonStruct | Profile)[]): CID[] {
  return structs
    .map(getCidOfStruct)
    .filter(cid => typeof cid !== 'undefined') as CID[]
}

export type SubsocialIpfsProps = {
  connect: IpfsApi | string,
  offchainUrl: string
}

export class SubsocialIpfsApi {

  private api!: IpfsApi; // IPFS API (connected)
  private offchainUrl!: string

  constructor (props: SubsocialIpfsProps) {
    this.connect(props.connect)
    this.offchainUrl = `${props.offchainUrl}/v1`
  }

  private async connect (connection: IpfsApi | string) {
    try {
      this.api = typeof connection === 'string' ? ipfsClient(connection) : connection;
      // Test IPFS connection by requesting its readme file.
      await this.api.cat('/ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme')
      logger.info('Connected to IPFS node')
    } catch (err) {
      logger.error('Failed to connect to IPFS node:', err)
    }
  }

  get isConnected () {
    return typeof this.api !== 'undefined';
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

      const loadContentFns = ipfsCids.map((cid) => this.api.cat(cid));
      const jsonContents = await Promise.all(loadContentFns);
      const contents = jsonContents.map((x) => JSON.parse(x.toString())) as T[];
      logger.debug(`Loaded ${pluralize(contents.length, contentName)}`)
      return contents
    } catch (err) {
      logger.error(`Failed to load ${contentName}(s) by ${cids.length} cid(s):`, err)
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

  // ---------------------------------------------------------------------
  // Find single

  async getContent<T extends CommonContent> (cid: IpfsCid, contentName?: string): Promise<T | undefined> {
    return getFirstOrUndefinded(await this.getContentArray<T>([ cid ], contentName))
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

  // ---------------------------------------------------------------------
  // Remove

  async removeContent (hash: string) {
    await this.api.pin.rm(hash);
    logger.info(`Unpinned content with hash: ${hash}`);
  }

  // ---------------------------------------------------------------------
  // Save

  async saveContent (content: CommonContent): Promise<IpfsHash | undefined> {
    return typeof window === 'undefined'
      ? this.saveContentOnServer(content)
      : this.saveContentOnClient(content)
  }

  async saveContentOnClient (content: CommonContent): Promise<IpfsHash | undefined> {
    try {
      const res = await axios.post(`${this.offchainUrl}/ipfs/add`, content);

      if (res.status !== 200) {
        throw new Error(`Offchain responded with status code ${res.status} and message: ${res.statusText}`)
      }

      return res.data;
    } catch (error) {
      logger.error('Failed to add content to IPFS on client:', error)
      return undefined;
    }
  }

  async saveContentOnServer (content: CommonContent): Promise<IpfsHash | undefined> {
    try {
      const json = Buffer.from(JSON.stringify(content));
      const results = await this.api.add(json);
      return results[results.length - 1].hash as any as IpfsHash;
    } catch (error) {
      logger.error('Failed to add content to IPFS on server:', error)
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
