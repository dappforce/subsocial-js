/* eslint-disable @typescript-eslint/no-var-requires */
import { IpfsHash, CommonStruct } from '@subsocial/types/substrate/interfaces';
import { CommonContent, BlogContent, PostContent, CommentContent, IpfsCid, CID, IpfsApi } from '@subsocial/types/offchain';
import { getFirstOrUndefinded } from './utils';
import all from 'it-all';
const ipfsClient = require('ipfs-http-client')

const asIpfsCid = (cid: IpfsCid) => (typeof cid === 'string' || cid instanceof String) ? new CID(cid as string) : cid;

export function getCidOfStruct (struct: CommonStruct): IpfsCid {
  return new CID(struct.ipfs_hash.toString());
}

export function getCidsOfStructs (structs: CommonStruct[]): IpfsCid[] {
  return structs.map(x => getCidOfStruct(x))
}

export class SubsocialIpfsApi {

  private api: IpfsApi // IPFS Api (connected)

  constructor (connect: IpfsApi | string) {
    this.api = typeof connect === 'string' ? ipfsClient(connect) : connect;
    console.log('Created SubsocialIpfsApi instance');
  }

  // ---------------------------------------------------------------------
  // Multiple

  get isConnected () {
    return typeof this.api !== 'undefined';
  }

  async getContentArray<T extends CommonContent> (cids: IpfsCid[]): Promise<T[]> {

    try {
      const ipfsCids = cids.map(cid => asIpfsCid(cid));
      const jsonContentArray: Buffer[] = await all(this.api.cat(ipfsCids[0]) as any)
      return jsonContentArray.map(x => JSON.parse(x.toString())) as T[];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findBlogs (cids: IpfsCid[]): Promise<BlogContent[]> {
    return this.getContentArray(cids)
  }

  async findPosts (cids: IpfsCid[]): Promise<PostContent[]> {
    return this.getContentArray(cids)
  }

  async findComments (cids: IpfsCid[]): Promise<CommentContent[]> {
    return this.getContentArray(cids)
  }

  // ---------------------------------------------------------------------
  // Single

  async findBlog (cid: IpfsCid): Promise<BlogContent | undefined> {
    return getFirstOrUndefinded(await this.findBlogs([ cid ]))
  }

  async findPost (cid: IpfsCid): Promise<PostContent | undefined> {
    return getFirstOrUndefinded(await this.findPosts([ cid ]))
  }

  async findComment (cid: IpfsCid): Promise<CommentContent | undefined> {
    return getFirstOrUndefinded(await this.findComments([ cid ]))
  }

  // ---------------------------------------------------------------------
  // Single

  async removeContent (hash: string) {
    await this.api.pin.rm(hash);
    console.log(`Unpinned content with hash ${hash}`);
  }

  async saveContent (content: CommonContent): Promise<IpfsHash | undefined> {
    try {
      const json = Buffer.from(JSON.stringify(content));
      const [ { cid } ] = await all(this.api.add(json) as any);
      return cid.toString() as IpfsHash;
    } catch (error) {
      console.error('Failed to add content to IPFS. Error:', error)
      return undefined;
    }
  }

  async saveBlog (content: BlogContent): Promise<IpfsHash | undefined> {
    return this.saveContent(content)
  }

  async savePost (content: PostContent): Promise<IpfsHash | undefined> {
    return this.saveContent(content)
  }

  async saveComment (content: CommentContent): Promise<IpfsHash | undefined> {
    return this.saveContent(content)
  }
}
