import { CommonStruct, AnyPostId, AnyAccountId, AnyBlogId, AnyCommentId } from '@subsocial/types/substrate'
import { BlogContent, PostContent, CommentContent, CommonContent, IpfsApi, IpfsCid, ProfileContent } from '@subsocial/types/offchain'
import { SubsocialSubstrateApi } from './substrate'
import { SubsocialIpfsApi, getCidsOfStructs, getIpfsHashOfStruct } from './ipfs'
import { getFirstOrUndefined } from '@subsocial/utils';
import { ApiPromise as SubstrateApi } from '@polkadot/api'
import { CommonData, BlogData, PostData, CommentData, ExtendedPostData, ProfileData } from '@subsocial/types'
import { getSharedPostId, getUniqueIds, SupportedSubstrateId } from './utils';
import { Blog, Post, AccountId, SocialAccount, Comment } from '@subsocial/types/substrate/interfaces';

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

  private async findDataArray<S extends CommonStruct, C extends CommonContent> (
    ids: SupportedSubstrateId[],
    findStructs: (ids: any[]) => Promise<S[]>,
    findContents: (cids: IpfsCid[]) => Promise<C[]>
  ): Promise<CommonData<S, C>[]> {

    const structs = await findStructs(ids)
    const cids = getUniqueIds(getCidsOfStructs(structs))
    const contents = await findContents(cids)
    const contentByHashMap = new Map<string, C>()
    cids.forEach((cid, i) => contentByHashMap.set(cid.toString(), contents[i]))

    return structs.map(struct => {
      const hash = getIpfsHashOfStruct(struct)
      const content = hash ? contentByHashMap.get(hash) : undefined
      return { struct, content }
    })
  }

  // ---------------------------------------------------------------------
  // Multiple

  async findBlogs (ids: AnyBlogId[]): Promise<BlogData[]> {
    const findStructs = this.substrate.findBlogs.bind(this.substrate);
    const findContents = this.ipfs.findBlogs.bind(this.ipfs);
    return this.findDataArray<Blog, BlogContent>(
      ids, findStructs, findContents
    )
  }

  async findPosts (ids: AnyPostId[]): Promise<PostData[]> {
    const findStructs = this.substrate.findPosts.bind(this.substrate)
    const findContents = this.ipfs.findPosts.bind(this.ipfs)
    return this.findDataArray<Post, PostContent>(
      ids, findStructs, findContents
    )
  }

  async findComments (ids: AnyCommentId[]): Promise<CommentData[]> {
    const findStructs = this.substrate.findComments.bind(this.substrate)
    const findContents = this.ipfs.findComments.bind(this.ipfs)
    return this.findDataArray<Comment, CommentContent>(
      ids, findStructs, findContents
    )
  }

  async findPostsWithExt (ids: AnyPostId[]): Promise<ExtendedPostData[]> {
    const posts = await this.findPosts(ids)

    const results: ExtendedPostData[] = []
    const extIds: AnyPostId[] = []

    // Key - serialized id of a shared original post.
    // Value - indices of the posts that share this original post in `results` array.
    const resultIndicesByExtIdMap = new Map<string, number[]>()

    posts.forEach((post, i) => {
      results.push({ post })
      const extId = getSharedPostId(post)
      if (typeof extId !== 'undefined') {
        const idStr = extId.toString()
        let idxs = resultIndicesByExtIdMap.get(idStr)
        if (typeof idxs === 'undefined') {
          idxs = []
          resultIndicesByExtIdMap.set(idStr, idxs)
          extIds.push(extId)
        }
        idxs.push(i)
      }
    })

    const extPosts = await this.findPosts(extIds)
    extPosts.forEach(extPost => {
      const extId = extPost.struct.id.toString()
      const idxs = resultIndicesByExtIdMap.get(extId) || []
      idxs.forEach(idx => {
        results[idx].ext = extPost
      })
    })

    return results
  }

  async findPostsWithDetails (ids: AnyPostId[]): Promise<ExtendedPostData[]> {
    const posts = await this.findPostsWithExt(ids);

    const ownerIds: AccountId[] = []

    const resultIndicesByAuthorIdMap = new Map<string, number[]>()

    posts.forEach((post, i) => {
      const ownerId = post.post.struct.created.account
      if (typeof ownerId !== 'undefined') {
        const idStr = ownerId.toString()
        let idxs = resultIndicesByAuthorIdMap.get(idStr)
        if (typeof idxs === 'undefined') {
          idxs = []
          resultIndicesByAuthorIdMap.set(idStr, idxs)
          ownerIds.push(ownerId)
        }
        idxs.push(i)
      }
    })

    const postOwners = await this.findProfiles(ownerIds)
    postOwners.forEach(postOwner => {
      const id = postOwner.profile?.created.account.toString()
      const idxs = resultIndicesByAuthorIdMap.get(id || '') || []
      idxs.forEach(idx => {
        posts[idx].owner = postOwner
      })
    })

    return posts;
  }

  async findProfiles (ids: AnyAccountId[]): Promise<ProfileData[]> {
    const findStructs = this.substrate.findSocialAccounts.bind(this.substrate)
    const findContents = this.ipfs.findProfiles.bind(this.ipfs)
    const commonProfileData = await this.findDataArray<SocialAccount, ProfileContent>(
      ids, findStructs, findContents
    ) as ProfileData[]
    return commonProfileData.map(x => {
      const { struct, content } = x;
      if (content) {
        return { struct, content, profile: struct.profile.unwrap() }
      }
      return x;
    })
  }

  // ---------------------------------------------------------------------
  // Single

  async findBlog (id: AnyBlogId): Promise<BlogData | undefined> {
    return getFirstOrUndefined(await this.findBlogs([ id ]))
  }

  async findPost (id: AnyPostId): Promise<PostData | undefined> {
    return getFirstOrUndefined(await this.findPosts([ id ]))
  }

  async findPostWithExt (id: AnyPostId): Promise<ExtendedPostData | undefined> {
    return getFirstOrUndefined(await this.findPostsWithExt([ id ]))
  }

  async findComment (id: AnyCommentId): Promise<CommentData | undefined> {
    return getFirstOrUndefined(await this.findComments([ id ]))
  }

  async findProfile (id: AnyAccountId): Promise<ProfileData | undefined> {
    return getFirstOrUndefined(await this.findProfiles([ id ]))
  }
}
