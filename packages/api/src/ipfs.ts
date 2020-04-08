/* eslint-disable @typescript-eslint/no-var-requires */
import { IpfsHash, CommonStruct } from '@subsocial/types/substrate/interfaces';
import { CommonContent, BlogContent, PostContent, CommentContent, IpfsCid, CID, IpfsApi } from '@subsocial/types/offchain';
import { newLogger, getFirstOrUndefinded } from '@subsocial/utils';

const IPFS_HASH_LEN = 47;

const ipfsClient = require('ipfs-http-client')

const asIpfsCid = (cid: IpfsCid) => {
  if (cid instanceof CID) {
    return cid
  } else if (typeof cid === 'string') {
    return new CID(cid)
  } else if (typeof cid.toU8a === 'function' && cid.toU8a().length === IPFS_HASH_LEN) {
    return new CID(cid.toString())
  } else {
    throw new Error('Wrong type of CID. Valid types are: string | IpfsHash | CID')
  }
}

export function getCidOfStruct (struct: CommonStruct): IpfsCid {
  return new CID(struct.ipfs_hash.toString());
}

export function getCidsOfStructs (structs: CommonStruct[]): IpfsCid[] {
  return structs.map((x) => getCidOfStruct(x))
}

export class SubsocialIpfsApi {

  private api!: IpfsApi; // IPFS Api (connected)

  constructor (connect: IpfsApi | string) {
    this.connect(connect)
  }

  private async connect (connection: IpfsApi | string) {
    try {
      this.api = typeof connection === 'string' ? ipfsClient(connection) : connection;
      await this.api.pin.ls() // Test IPFS connection.
      logger.info('Connected to IPFS node')
    } catch (err) {
      logger.error('Failed to connected to IPFS node:', err)
    }
  }

  // ---------------------------------------------------------------------
  // Multiple

  get isConnected () {
    return typeof this.api !== 'undefined';
  }

  async getContentArray<T extends CommonContent> (cids: IpfsCid[]): Promise<T[]> {

    try {
      const ipfsCids = cids.map((cid) => asIpfsCid(cid));
      const loadContentFns = ipfsCids.map((cid) => this.api.cat(cid));
      const jsonContentArray = await Promise.all(loadContentFns);
      return jsonContentArray.map((x) => JSON.parse(x.toString())) as T[];
    } catch (error) {
      logger.error('Failed to load content by cids. Error:', error);
      return [];
    }
  }

  async findBlogs (cids: IpfsCid[]): Promise<BlogContent[]> {
    const count = cids.length

    if (!count) {
      logger.debug('Find blogs: no cids provided')
      return [];
    }
    logger.debug(`Find ${count === 1 ? 'blog by cid: ' + cids[0] : count + ' blogs'}`)
    return this.getContentArray(cids)
  }

  async findPosts (cids: IpfsCid[]): Promise<PostContent[]> {
    const count = cids.length

    if (!count) {
      logger.debug('Find posts: no cids provided')
      return [];
    }
    logger.debug(`Find ${count === 1 ? 'post by cid: ' + cids[0] : count + ' posts'} from IPFS`)

    return this.getContentArray(cids)
  }

  async findComments (cids: IpfsCid[]): Promise<CommentContent[]> {
    const count = cids.length

    if (!count) {
      logger.debug('Find comments: no cids provided')
      return [];
    }
    logger.debug(`Find ${count === 1 ? 'comment by cid: ' + cids[0] : count + ' comments'} from IPFS`)

    return this.getContentArray(cids)
  }

  // ---------------------------------------------------------------------
  // Single

  async getContent<T extends CommonContent> (cid: IpfsCid): Promise<T | undefined> {
    return getFirstOrUndefinded(await this.getContentArray<T>([ cid ]))
  }

  async findBlog (cid: IpfsCid): Promise<BlogContent | undefined> {
    return this.getContent<BlogContent>(cid)
  }

  async findPost (cid: IpfsCid): Promise<PostContent | undefined> {
    return this.getContent<PostContent>(cid)
  }

  async findComment (cid: IpfsCid): Promise<CommentContent | undefined> {
    return this.getContent<CommentContent>(cid)
  }

  // ---------------------------------------------------------------------
  // Single

  async removeContent (hash: string) {
    await this.api.pin.rm(hash);
    logger.info(`Unpinned content with hash ${hash}`);
  }

  async saveContent (content: CommonContent): Promise<IpfsHash | undefined> {
    try {
      const json = Buffer.from(JSON.stringify(content));
      const results = await this.api.add(json);
      return results[results.length - 1].hash as any as IpfsHash;
    } catch (error) {
      logger.error('Failed to add content to IPFS. Error:', error)
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
