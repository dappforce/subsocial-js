import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { BlogData, CommonData, ExtendedPostData, PostData, ProfileData, PostWithSomeDetails } from '@subsocial/types';
import { BlogContent, CommonContent, IpfsCid, PostContent, ProfileContent } from '@subsocial/types/offchain';
import { AnyAccountId, AnyBlogId, AnyPostId, CommonStruct } from '@subsocial/types/substrate';
import { AccountId, Blog, Post, PostId, SocialAccount, BlogId } from '@subsocial/types/substrate/interfaces';
import { getFirstOrUndefined, nonEmptyStr } from '@subsocial/utils';
import { getCidsOfStructs, getIpfsHashOfStruct, SubsocialIpfsApi } from './ipfs';
import { SubsocialSubstrateApi } from './substrate';
import { getSharedPostId, getUniqueIds, SupportedSubstrateId } from './utils';

export type SubsocialApiProps = {
  substrateApi: SubstrateApi,
  ipfsNodeUrl: string,
  offchainUrl: string
}

export type PostDetailsOpts = {
  withOwner?: boolean
  withBlog?: boolean
}

export class SubsocialApi {

  private _substrate: SubsocialSubstrateApi

  private _ipfs: SubsocialIpfsApi

  constructor (props: SubsocialApiProps) {
    const { substrateApi, ipfsNodeUrl, offchainUrl } = props
    this._substrate = new SubsocialSubstrateApi(substrateApi)
    this._ipfs = new SubsocialIpfsApi({ ipfsNodeUrl, offchainUrl })
  }

  public get substrate (): SubsocialSubstrateApi {
    return this._substrate
  }

  public get ipfs (): SubsocialIpfsApi {
    return this._ipfs
  }

  private async findDataArray <
    Id extends SupportedSubstrateId,
    Struct extends CommonStruct,
    Content extends CommonContent
  > (
    ids: Id[],
    findStructs: (ids: Id[]) => Promise<Struct[]>,
    findContents: (cids: IpfsCid[]) => Promise<Content[]>
  ): Promise<CommonData<Struct, Content>[]> {

    const structs = await findStructs(ids)
    const cids = getUniqueIds(getCidsOfStructs(structs))
    const contents = await findContents(cids)
    const contentByHashMap = new Map<string, Content>()
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
    return this.findDataArray<AnyBlogId, Blog, BlogContent>(
      ids, findStructs, findContents
    )
  }

  async findPosts (ids: AnyPostId[]): Promise<PostData[]> {
    const findStructs = this.substrate.findPosts.bind(this.substrate)
    const findContents = this.ipfs.findPosts.bind(this.ipfs)
    return this.findDataArray<AnyPostId, Post, PostContent>(
      ids, findStructs, findContents
    )
  }

  /** Find posts and load shared posts if for all posts that share. */
  private async findPostsWithExt (ids: AnyPostId[]): Promise<PostWithSomeDetails[]> {
    const posts = await this.findPosts(ids)
    return this.loadSharedPost(posts)
  }

  /** Find and load posts with their extension and owner's profile (if defined). */
  async findPostsWithSomeDetails (ids: AnyPostId[], opts?: PostDetailsOpts): Promise<PostWithSomeDetails[]> {
    const { withOwner = false, withBlog = false } = opts || {}
    const posts = await this.findPostsWithExt(ids)

    const loadres = []


    if (withOwner) {
      loadres.push(this.loadPostOwners(posts));
    }

    if (withBlog) {
      loadres.push(this.loadPostBlogs(posts));
    }
    
    await Promise.all(loadres)
  
    return posts
  }

  async findPostsWithAllDetails (ids: AnyPostId[]): Promise<ExtendedPostData[]> {
    return this.findPostsWithSomeDetails(ids, { withOwner: true, withBlog: true }) as Promise<ExtendedPostData[]>
  }

  /** Load shared posts if for all posts that share. */
  private async loadSharedPost (posts: PostData[]): Promise<PostWithSomeDetails[]> {
    const results: PostWithSomeDetails[] = []
    const extIds: PostId[] = []

    // Key - serialized id of a shared original post.
    // Value - indices of the posts that share this original post in `results` array.
    const resultIndicesByExtIdMap = new Map<string, number[]>()

    posts.forEach((post, i) => {
      results.push({ post })
      const extId = getSharedPostId(post)
      if (typeof extId !== 'undefined') {
        const idStr = extId.toString()
        let resultIdxs = resultIndicesByExtIdMap.get(idStr)
        if (typeof resultIdxs === 'undefined') {
          resultIdxs = []
          resultIndicesByExtIdMap.set(idStr, resultIdxs)
          extIds.push(extId)
        }
        resultIdxs.push(i)
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

  /** Load posts' owners and set them on posts array. */
  private async loadPostOwners (posts: PostWithSomeDetails[]): Promise<PostWithSomeDetails[]> {
    const ownerIds: AccountId[] = []

    // Key - serialized id of a post owner.
    // Value - indices of the posts that have the same owner (as key) in `posts` array.
    const postIndicesByOwnerIdMap = new Map<string, number[]>()

    posts.forEach(({ post }, i) => {
      const ownerId = post.struct.created.account
      if (typeof ownerId !== 'undefined') {
        const idStr = ownerId.toString()
        let postIdxs = postIndicesByOwnerIdMap.get(idStr)
        if (typeof postIdxs === 'undefined') {
          postIdxs = []
          postIndicesByOwnerIdMap.set(idStr, postIdxs)
          ownerIds.push(ownerId)
        }
        postIdxs.push(i)
      }
    })

    const postOwners = await this.findProfiles(ownerIds)
    postOwners.forEach(postOwner => {
      const ownerId = postOwner.profile?.created.account.toString()
      if (nonEmptyStr(ownerId)) {
        const idxs = postIndicesByOwnerIdMap.get(ownerId) || []
        idxs.forEach(idx => {
          posts[idx].owner = postOwner
        })
      }
    })

    return posts
  }

  /** Load posts' blogs and set them on posts array. */
  private async loadPostBlogs (posts: PostWithSomeDetails[]): Promise<PostWithSomeDetails[]> {
    const blogIds: BlogId[] = []

    // Key - serialized id of a blog.
    // Value - indices of the posts that have the same blog (as key) in `posts` array.
    const postIndicesByBlogIdMap = new Map<string, number[]>()

    posts.forEach(({ post }, i) => {
      const blogId = post.struct.blog_id.unwrapOr(undefined)
      if (typeof blogId !== 'undefined') {
        const idStr = blogId.toString()
        let postIdxs = postIndicesByBlogIdMap.get(idStr)
        if (typeof postIdxs === 'undefined') {
          postIdxs = []
          postIndicesByBlogIdMap.set(idStr, postIdxs)
          blogIds.push(blogId)
        }
        postIdxs.push(i)
      }
    })

    // NOTE: we can get only blog structs without their content - this should be enough
    const blogs = await this.findBlogs(blogIds)
    blogs.forEach(blog => {
      const blogId = blog.struct.id.toString()
      if (nonEmptyStr(blogId)) {
        const idxs = postIndicesByBlogIdMap.get(blogId) || []
        idxs.forEach(idx => {
          posts[idx].blog = blog
        })
      }
    })

    return posts
  }

  async findProfiles (ids: AnyAccountId[]): Promise<ProfileData[]> {
    const findStructs = this.substrate.findSocialAccounts.bind(this.substrate)
    const findContents = this.ipfs.findProfiles.bind(this.ipfs)

    const profiles = await this.findDataArray<AnyAccountId, SocialAccount, ProfileContent>(
      ids, findStructs, findContents
    ) as ProfileData[]

    return profiles.map(x => {
      const profile = x.struct.profile.unwrapOr(undefined)
      return { ...x, profile }
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

  async findPostWithSomeDetails (id: AnyPostId, opts?: PostDetailsOpts): Promise<PostWithSomeDetails | undefined> {
    return getFirstOrUndefined(await this.findPostsWithSomeDetails([ id ], opts))
  }

  async findPostWithAllDetails (id: AnyPostId): Promise<ExtendedPostData | undefined> {
    return getFirstOrUndefined(await this.findPostsWithAllDetails([ id ]))
  }

  async findProfile (id: AnyAccountId): Promise<ProfileData | undefined> {
    return getFirstOrUndefined(await this.findProfiles([ id ]))
  }
}
