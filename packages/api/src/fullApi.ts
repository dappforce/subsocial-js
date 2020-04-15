import { Blog, Post, Comment, CommonStruct, SubstrateId } from '@subsocial/types/substrate/interfaces'
import { BlogContent, PostContent, CommentContent, CommonContent, IpfsApi, IpfsCid } from '@subsocial/types/offchain'
import { SubsocialSubstrateApi } from './substrate'
import { SubsocialIpfsApi, getCidsOfStructs } from './ipfs'
import { getFirstOrUndefinded } from '@subsocial/utils';
import { ApiPromise as SubstrateApi } from '@polkadot/api'
import { CommonData, BlogData, PostData, CommentData, ExtendedPostData } from '@subsocial/types'
import { getSharedPostId } from './utils';
import BN from 'bn.js'

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
    findContents: (cids: IpfsCid[]) => Promise<C[]>
  ): Promise<D[]> {

    const structs = await findStructs(ids)
    const cids = getCidsOfStructs(structs)
    const contents = await findContents(cids)

    if (structs.length !== contents.length) {
      console.error(`Lengths mismatch: ${structs.length} structs and ${contents.length} contents`)
      return []
    }
    // eslint-disable-next-line new-cap
    return structs.map((struct, i) => ({ struct, content: contents[i] } as D))
  }

  // ---------------------------------------------------------------------
  // Multiple

  async findBlogs (ids: SubstrateId[]): Promise<BlogData[]> {
    const findStructs = this.substrate.findBlogs.bind(this.substrate);
    const findCids = this.ipfs.findBlogs.bind(this.ipfs);
    return this.findDataArray<Blog, BlogContent, BlogData>(
      ids, findStructs, findCids
    )
  }

  async findPosts (ids: SubstrateId[]): Promise<PostData[]> {
    const findStructs = this.substrate.findPosts.bind(this.substrate)
    const findCids = this.ipfs.findPosts.bind(this.ipfs)
    return this.findDataArray<Post, PostContent, PostData>(
      ids, findStructs, findCids
    )
  }

  async findComments (ids: SubstrateId[]): Promise<CommentData[]> {
    const findStructs = this.substrate.findComments.bind(this.substrate)
    const findCids = this.ipfs.findComments.bind(this.ipfs)
    return this.findDataArray<Comment, CommentContent, CommentData>(
      ids, findStructs, findCids
    )
  }

  async findPostsWithExt (ids: SubstrateId[]): Promise<ExtendedPostData[]> {
    const postData = await this.findPosts(ids)

    const ExtIdToIndexMap = new Map<string, number>()
    const resultArr: ExtendedPostData[] = []

    postData.forEach((x, i) => {
      const extId = getSharedPostId(x)
      if (typeof extId !== 'undefined') {
        ExtIdToIndexMap.set(extId.toString(), i)
        resultArr.push({ post: x })
      }
    })
    const extIdAsString = new Set([ ...ExtIdToIndexMap.keys() ])
    const extIds = [ ...extIdAsString.values() ].map(x => new BN(x))
    const extPostData = await this.findPosts(extIds)

    extPostData.forEach(x => {
      const extId = x.struct.id.toString()
      const index = ExtIdToIndexMap.get(extId)
      if (index) {
        resultArr[index] = { post: postData[index], ext: x }
      }
    })

    return resultArr;
  }

  // ---------------------------------------------------------------------
  // Single

  async findBlog (id: SubstrateId): Promise<BlogData | undefined> {
    return getFirstOrUndefinded(await this.findBlogs([ id ]))
  }

  async findPost (id: SubstrateId): Promise<PostData | undefined> {
    return getFirstOrUndefinded(await this.findPosts([ id ]))
  }

  async findPostWithExt (id: SubstrateId): Promise<ExtendedPostData | undefined> {
    return getFirstOrUndefinded(await this.findPostsWithExt([ id ]))
  }

  async findComment (id: SubstrateId): Promise<CommentData | undefined> {
    return getFirstOrUndefinded(await this.findComments([ id ]))
  }
}
