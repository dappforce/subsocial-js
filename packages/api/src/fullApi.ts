import { Blog, Post, Comment, CommonStruct, SubstrateId } from '@subsocial/types/substrate/interfaces'
import { BlogContent, PostContent, CommentContent, CommonContent, IpfsApi, IpfsCid } from '@subsocial/types/offchain'
import { SubsocialSubstrateApi } from './substrate'
import { SubsocialIpfsApi, getCidsOfStructs } from './ipfs'
import { getFirstOrUndefinded } from '@subsocial/utils';
import { ApiPromise as SubstrateApi } from '@polkadot/api'
import { CommonData, BlogData, PostData, CommentData } from '@subsocial/types'

export type SubsocialApiProps = {
  substrateApi: SubstrateApi,
  ipfsApi: IpfsApi | string,
  offchainUrl: string
}

export class SubsocialApi {

  private _substrate: SubsocialSubstrateApi

  private _ipfs: SubsocialIpfsApi

  constructor (props: SubsocialApiProps) {
    const { substrateApi, ipfsApi, offchainUrl } = props
    this._substrate = new SubsocialSubstrateApi(substrateApi)
    this._ipfs = new SubsocialIpfsApi({ connect: ipfsApi, offchainUrl })
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
