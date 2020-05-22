import { AnyBlogId, AnyAccountId } from '@subsocial/types/substrate/interfaces/utils';
import { PostData, PostWithSomeDetails, ProfileData, BlogData, AnyPostId } from "@subsocial/types"
import { PostId, AccountId, BlogId } from "@subsocial/types/substrate/interfaces"
import { getPostIdFromExtension, getUniqueIds } from "./utils"
import { nonEmptyStr, notDefined, isDefined } from "@subsocial/utils"

export type FindMethods = {
  findPosts: (ids: AnyPostId[]) => Promise<PostData[]>,
  findBlogs: (ids: AnyBlogId[]) => Promise<BlogData[]>
  findProfiles: (ids: AnyAccountId[]) => Promise<ProfileData[]>
}

export type PostDetailsOpts = {
  withOwner?: boolean
  withBlog?: boolean
}

async function loadRequireData (posts: PostData[], methods: FindMethods, opts?: PostDetailsOpts) {
  const { findBlogs, findPosts, findProfiles } = methods

  const results: PostWithSomeDetails[] = []
  const resultsExt: PostWithSomeDetails[] = []
  const rootPosts: PostData[] = []
  const extIds: PostId[] = []

  const postByIdMap = new Map<string, PostData>()
  posts.forEach(x => postByIdMap.set(x.struct.id.toString(), x))

  // Key - serialized id of a shared original post.
  // Value - indices of the posts that share this original post in `results` array.
  const resultIndicesByExtIdMap = new Map<string, number[]>()

  const ownerIds: AccountId[] = []

  // Key - serialized id of a post owner.
  // Value - indices of the posts that have the same owner (as key) in `posts` array.
  const postIndicesByOwnerIdMap = new Map<string, number[]>()

  const blogIds: BlogId[] = []

  // Key - serialized id of a blog.
  // Value - indices of the posts that have the same blog (as key) in `posts` array.
  const postIndicesByBlogIdMap = new Map<string, number[]>()
  posts.forEach((post, i) => {
    results.push({ post })

    const extId = getPostIdFromExtension(post)
    const idStr = extId?.toString()
    if (extId && nonEmptyStr(idStr)) {
      let postIdxs = resultIndicesByExtIdMap.get(idStr)
      if (notDefined(postIdxs)) {
        postIdxs = []
        resultIndicesByExtIdMap.set(idStr, postIdxs)
        const extPost = postByIdMap.get(idStr)
        if (extPost) {
          resultsExt.push({ post: extPost })
        } else {
          extIds.push(extId)
        }
          
          
      }
      postIdxs.push(i)
    }

    const ownerId = post.struct.created.account
    if (isDefined(ownerId)) {
      const idStr = ownerId.toString()
      let postIdxs = postIndicesByOwnerIdMap.get(idStr)
      if (notDefined(postIdxs)) {
        postIdxs = []
        postIndicesByOwnerIdMap.set(idStr, postIdxs)
        ownerIds.push(ownerId)
      }
      postIdxs.push(i)
    }

    const blogId = post.struct.blog_id.unwrapOr(undefined)
    if (isDefined(blogId)) {
      const idStr = blogId.toString()
      let postIdxs = postIndicesByBlogIdMap.get(idStr)
      if (notDefined(postIdxs)) {
        postIdxs = []
        postIndicesByBlogIdMap.set(idStr, postIdxs)
        blogIds.push(blogId)
      }
      postIdxs.push(i)
    }
  })

  const rootIds: PostId[] = []

  // Key - serialized id of a shared original post.
  // Value - indices of the posts that share this original post in `results` array.
  const resultIndicesByRootIdMap = new Map<string, number[]>()

  const extPosts = await findPosts(getUniqueIds(extIds))

  resultsExt.push(...extPosts.map(post => ({ post })))


  resultsExt.forEach(({ post }, i) => {
    const extId = post.struct.id.toString()
    postByIdMap.set(extId, post)
    const idxs = resultIndicesByExtIdMap.get(extId) || []

    idxs.forEach(idx => {
      results[idx].ext = resultsExt[i]
    })

    const ownerId = post.struct.created.account
    if (isDefined(ownerId)) {
      ownerIds.push(ownerId)
    }

    const blogId = post.struct.blog_id.unwrapOr(undefined)
    if (isDefined(blogId)) {
      blogIds.push(blogId)
    } else {
      const rootId = getPostIdFromExtension(post)
      const idStr = rootId && rootId.toString()
      if (rootId && nonEmptyStr(idStr)) {
        let resultIdxs = resultIndicesByRootIdMap.get(idStr)
        if (notDefined(resultIdxs)) {
          resultIdxs = []
          resultIndicesByRootIdMap.set(idStr, resultIdxs)
    
          const rootPost = postByIdMap.get(idStr)
          if (rootPost) {
            rootPosts.push(rootPost)
          } else {
            rootIds.push(rootId)
          }
        }
        resultIdxs.push(i)
      }
    }

  })

  const loadedRootPosts = await findPosts(getUniqueIds(rootIds))
  rootPosts.push(...loadedRootPosts)

  rootPosts.forEach((post, i) => {
    const rootId = post.struct.id.toString()
    postByIdMap.set(rootId, post)
    const idxs = resultIndicesByRootIdMap.get(rootId) || []
    idxs.forEach(idx => {
      resultsExt[idx].ext = { post }
    })

    const blogId = post.struct.blog_id.unwrapOr(undefined)
    if (isDefined(blogId)) {
      const idStr = blogId.toString()
      let postIdxs = postIndicesByBlogIdMap.get(idStr)
      if (notDefined(postIdxs)) {
        postIdxs = []
        postIndicesByBlogIdMap.set(idStr, postIdxs)
        blogIds.push(blogId)
      }
      postIdxs.push(i)
    }
  })

  // Load owners
  const uniqueOwnerIds = getUniqueIds(ownerIds)
  const postOwners = await findProfiles(uniqueOwnerIds)

  const ownerIndicesByOwnerIdMap = new Map<string, ProfileData>()

  postOwners.forEach(owner => {
    const ownerId = owner.profile?.created.account.toString()
    ownerId && ownerIndicesByOwnerIdMap.set(ownerId, owner)
  })

  // Load blogs

  const uniqueBlogIds = getUniqueIds(blogIds)
  const postBlogs = await findBlogs(uniqueBlogIds)
  
  const blogIndicesByBlogIdMap = new Map<string, BlogData>()

  return {
    uniqueOwnerIds,
    postBlogs,
    blogIndicesByBlogIdMap,
    postIndicesByOwnerIdMap,
    ownerIndicesByOwnerIdMap,
    results
  }
}

/** Load shared posts if for all posts that share. */
export async function loadPostsStruct (posts: PostData[], methods: FindMethods, opts?: PostDetailsOpts): Promise<PostWithSomeDetails[]> {
  
  const {
    uniqueOwnerIds,
    postBlogs,
    blogIndicesByBlogIdMap,
    postIndicesByOwnerIdMap,
    ownerIndicesByOwnerIdMap,
    results
  } = await loadRequireData(posts, methods, opts)

  uniqueOwnerIds.forEach(ownerId => {
    const ownerIdStr = ownerId.toString()
    const idxs = postIndicesByOwnerIdMap.get(ownerIdStr) || []
    const owner = ownerIndicesByOwnerIdMap.get(ownerIdStr)
    idxs.forEach(idx => {
      results[idx].owner = owner
      const ext = results[idx].ext
      if (ext) {
        const extOwnerIdStr = ext.post.struct.created.account.toString()

        if (extOwnerIdStr) {
          const extOwner = extOwnerIdStr === ownerIdStr ? owner : ownerIndicesByOwnerIdMap.get(extOwnerIdStr)
          results[idx].ext!.owner = extOwner
        }
      }
    })
  })

  postBlogs.forEach(blog => {
    const blogId = blog.struct.id.toString()
    blogId && blogIndicesByBlogIdMap.set(blogId, blog)
  })

  results.forEach(post => {
    const { post: { struct: { blog_id } }, ext } = post
    let blogId = blog_id.unwrapOr(undefined)
    if (blogId) {
      const blog = blogIndicesByBlogIdMap.get(blogId.toString())
      post.blog = blog
    }

    blogId = ext?.post.struct.blog_id.unwrapOr(undefined)
    if (blogId) {
      const blog = blogIndicesByBlogIdMap.get(blogId.toString())
      if (!post.blog) {
        post.blog = blog
      }
      post.ext!.blog = blog
    } else {
      blogId = ext?.ext?.post.struct.blog_id.unwrapOr(undefined)
      if (blogId) {
        const blog = blogIndicesByBlogIdMap.get(blogId.toString())
        if (!post.blog) {
          post.blog = blog
        }
        post.ext!.blog = blog
      }
    }
  })
  return results
}