/* eslint-disable @typescript-eslint/no-var-requires */
import * as IPFS from 'typestub-ipfs';
import { Profile, Blog, Post, Comment, IpfsHash, CommonContent, BlogContent, PostContent, CommentContent } from '@subsocial/types/interfaces';
import { getFirstOrUndefinded } from './utils';
import CID from 'cids';
const ipfsClient = require('ipfs-http-client')

export type CommonStruct = Blog | Post | Comment | Profile;

export type IpfsCid = string | CID;

type IpfsConnectConfig = {
  host: string,
  port: string,
  protocol: string
};

export type IpfsApi = IPFS.FilesAPI & {
  pin: {
    rm: (hash?: string) => any,
    ls: (hash?: string) => any
  },
  repo: IPFS.RepoAPI
};

const asIpfsCid = (cid: IpfsCid) => (typeof cid === 'string' || cid instanceof String) ? new CID(cid as string) : cid;

export function getCidOfStruct (struct: CommonStruct): IpfsCid {
  return new CID(struct.ipfs_hash.toString());
}

export function getCidsOfStructs (structs: CommonStruct[]): IpfsCid[] {
  return structs.map(x => getCidOfStruct(x))
}

export class SubsocialIpfsApi {

  private api: IpfsApi // IPFS Api (connected)

  constructor (connect: IpfsApi | IpfsConnectConfig) {
    this.api = connect && (connect).repo ? connect : ipfsClient(connect);
    console.log('Created SubsocialIpfsApi instance')
  }

  // ---------------------------------------------------------------------
  // Multiple

  async getContentArray<T extends CommonContent> (cids: IpfsCid[]): Promise<T[]> {
    const ipfsCids = cids.map(cid => asIpfsCid(cid));
    const loadContent = ipfsCids.map(cid => this.api.cat(cid))
    const jsonContentArray = await Promise.all(loadContent);
    return jsonContentArray.map(x => JSON.parse(x.toString())) as T[];
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
    console.log(`${hash} unpined`);
  }

  async saveContent (content: CommonContent): Promise<IpfsHash | undefined> {
    const json = Buffer.from(JSON.stringify(content));
    console.log('Data', json);
    const results = await this.api.add(json);
    return results[results.length - 1].hash as unknown as IpfsHash;
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
