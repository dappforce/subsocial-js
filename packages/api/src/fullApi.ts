import { Blog, Post, Comment } from '@subsocial/types/substrate/interfaces/subsocial'
import { BlogContent, PostContent, CommentContent, CommonContent } from '@subsocial/types/offchain'
import { SubsocialSubstrateApi, CommonStruct, SubstrateId } from './substrate'
import { SubsocialIpfsApi, getCidsOfStructs, IpfsApi, IpfsCid } from './ipfs'
import { getFirstOrUndefinded } from './utils'
import { ApiPromise as SubstrateApi } from '@polkadot/api'

abstract class CommonData<S extends CommonStruct, C extends CommonContent> {

  private _struct?: S

  private _content?: C

  constructor (struct?: S, content?: C) {
    this._struct = struct
    this._content = content
  }

  public get struct () {
    return this._struct
  }

  public get content () {
    return this._content
  }
}

class BlogData extends CommonData<Blog, BlogContent> {}
class PostData extends CommonData<Post, PostContent> {}
class CommentData extends CommonData<Comment, CommentContent> {}

export class SubsocialApi {

  private _substrate: SubsocialSubstrateApi

  private _ipfs: SubsocialIpfsApi

  constructor (substrateApi: SubstrateApi, ipfsApi: IpfsApi) {
    this._substrate = new SubsocialSubstrateApi(substrateApi)
    this._ipfs = new SubsocialIpfsApi(ipfsApi)
  }

  public get substrate (): SubsocialSubstrateApi {
    return this._substrate
  }

  public get ipfs (): SubsocialIpfsApi {
    return this._ipfs
  }

  private async findDataArray<S extends CommonStruct, C extends CommonContent, D extends CommonData<S, C>> (
    ids: SubstrateId[],
    findStructs: (ids: SubstrateId[]) => Promise<S[]>,
    findContents: (cids: IpfsCid[]) => Promise<C[]>,
    constructFn: new (struct?: S, content?: C) => D
  ): Promise<D[]> {

    const structs = await findStructs(ids)
    const cids = getCidsOfStructs(structs)
    const contents = await findContents(cids)

    if (structs.length !== contents.length) {
      console.error(`Lengths mismatch: ${structs.length} structs and ${contents.length} contents`)
      return []
    }

    // eslint-disable-next-line new-cap
    return structs.map((struct, i) => new constructFn(struct, contents[i]))
  }

  // ---------------------------------------------------------------------
  // Multiple

  async findBlogs (ids: SubstrateId[]): Promise<BlogData[]> {
    const findStructs = this.substrate.findBlogs.bind(this.substrate);
    const findCids = this.ipfs.findBlogs.bind(this.ipfs);
    return this.findDataArray<Blog, BlogContent, BlogData>(
      ids, findStructs, findCids, BlogData
    )
  }

  async findPosts (ids: SubstrateId[]): Promise<PostData[]> {
    const findStructs = this.substrate.findPosts.bind(this.substrate)
    const findCids = this.ipfs.findPosts.bind(this.ipfs)
    return this.findDataArray<Post, PostContent, PostData>(
      ids, findStructs, findCids, PostData
    )
  }

  async findComments (ids: SubstrateId[]): Promise<CommentData[]> {
    const findStructs = this.substrate.findComments.bind(this.substrate)
    const findCids = this.ipfs.findComments.bind(this.ipfs)
    return this.findDataArray<Comment, CommentContent, CommentData>(
      ids, findStructs, findCids, CommentData
    )
  }

  // ---------------------------------------------------------------------
  // Single

  async findBlog (id: SubstrateId): Promise<BlogData | undefined> {
    return getFirstOrUndefinded(await this.findBlogs([ id ]))
  }

  async findPost (id: SubstrateId): Promise<PostData | undefined> {
    return getFirstOrUndefinded(await this.findPosts([ id ]))
  }

  async findComment (id: SubstrateId): Promise<CommentData | undefined> {
    return getFirstOrUndefinded(await this.findComments([ id ]))
  }
}
