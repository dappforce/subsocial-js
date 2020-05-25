import { AnyBlogId, AnyAccountId } from '@subsocial/types/substrate/interfaces/utils';
import { PostData, PostWithSomeDetails, ProfileData, BlogData, AnyPostId } from "@subsocial/types"
import { PostId, AccountId, BlogId } from "@subsocial/types/substrate/interfaces"
import { getPostIdFromExtension, getUniqueIds } from "./utils"
import { nonEmptyStr, notDefined, isDefined } from "@subsocial/utils"

export type FindStructsFns = {
  findPosts: (ids: AnyPostId[]) => Promise<PostData[]>,
  findBlogs: (ids: AnyBlogId[]) => Promise<BlogData[]>
  findProfiles: (ids: AnyAccountId[]) => Promise<ProfileData[]>
}

export type PostDetailsOpts = {
  withOwner?: boolean
  withBlog?: boolean
}

async function loadRelatedStructs (posts: PostData[], finders: FindStructsFns, opts?: PostDetailsOpts) {
  const { withBlog, withOwner } = opts || {}
  const { findBlogs, findPosts, findProfiles } = finders

  const ownerByIdMap = new Map<string, ProfileData>()
  const blogByIdMap = new Map<string, BlogData>()
  const postByIdMap = new Map<string, PostData>()
  posts.forEach(x => postByIdMap.set(x.struct.id.toString(), x))

  const postStructs: PostWithSomeDetails[] = []
  const extPostStructs: PostWithSomeDetails[] = []

  const rootPosts: PostData[] = []
  const extPosts: PostData[] = []

  const extIds: PostId[] = []
  const rootIds: PostId[] = []
  const ownerIds: AccountId[] = []
  const blogIds: BlogId[] = []

  // Key - serialized id of a shared original post.
  // Value - indices of the posts that share this original post in `postStructs` array.
  const resultIndicesByExtIdMap = new Map<string, number[]>()
  // Key - serialized id of a post owner.
  // Value - indices of the posts that have the same owner (as key) in `posts` array.
  const postIndicesByOwnerIdMap = new Map<string, number[]>()
  // Key - serialized id of a blog.
  // Value - indices of the posts that have the same blog (as key) in `posts` array.
  const postIndicesByBlogIdMap = new Map<string, number[]>()
  // Key - serialized id of a shared original post.
  // Value - indices of the posts that share this original post in `postStructs` array.
  const resultIndicesByRootIdMap = new Map<string, number[]>()

  
  const fillPostId = (post: PostData, index: number, resultIndicesByPostIdMap: Map<string, number[]>, posts: PostData[], postIds: PostId[]) => {
    const extId = getPostIdFromExtension(post)
    const idStr = extId?.toString()
    if (extId && nonEmptyStr(idStr)) {
      let postIdxs = resultIndicesByPostIdMap.get(idStr)
      if (notDefined(postIdxs)) {
        postIdxs = []
        resultIndicesByPostIdMap.set(idStr, postIdxs)
        const currentPost = postByIdMap.get(idStr)
        if (currentPost) {
          posts.push(currentPost)
        } else {
          postIds.push(extId)
        }
      }
      postIdxs.push(index)
    }
  }

  function fillRelatedId<T extends BlogId | AccountId> (relatedId: T, index: number, postIndicesByRelatedIdMap: Map<string, number[]>, relatedIds: T[]) {
    if (isDefined(relatedId)) {
      const idStr = relatedId.toString()
      let postIdxs = postIndicesByRelatedIdMap.get(idStr)
      if (notDefined(postIdxs)) {
        postIdxs = []
        postIndicesByOwnerIdMap.set(idStr, postIdxs)
        relatedIds.push(relatedId)
      }
      postIdxs.push(index)
    }
  }

  function setExtOnPost (postStruct: PostWithSomeDetails, resultIndicesByPostIdMap: Map<string, number[]>, postStructs: PostWithSomeDetails[]) {
    const postId = postStruct.post.struct.id.toString()
    postByIdMap.set(postId, postStruct.post)
    const idxs = resultIndicesByPostIdMap.get(postId) || []
    idxs.forEach(idx => {
      postStructs[idx].ext = postStruct
    })
  }

  posts.forEach((post, i) => {
    postStructs.push({ post })

    fillPostId(post, i, resultIndicesByExtIdMap, extPosts, extIds)

    if (withOwner) {
      const ownerId = post.struct.created.account
      fillRelatedId(ownerId, i, postIndicesByOwnerIdMap, ownerIds)
    }

    if (withBlog) {
      const blogId = post.struct.blog_id.unwrapOr(undefined)
      blogId && fillRelatedId(blogId, i, postIndicesByBlogIdMap, blogIds)
    }

  })

  const loadedExtPosts = await findPosts(getUniqueIds(extIds))
  extPosts.push(...loadedExtPosts)

  extPosts.forEach((post, i) => {
    extPostStructs.push({ post })
    setExtOnPost(extPostStructs[i], resultIndicesByExtIdMap, postStructs)

    if (withOwner) {
      const ownerId = post.struct.created.account
      if (isDefined(ownerId)) {
        ownerIds.push(ownerId)
      }
    }

    if (withBlog) {
      const blogId = post.struct.blog_id.unwrapOr(undefined)
      if (isDefined(blogId)) {
        blogIds.push(blogId)
      } else {
        fillPostId(post, i, resultIndicesByRootIdMap, rootPosts, rootIds) 
      }
    }

  })

  const loadedRootPosts = await findPosts(getUniqueIds(rootIds))
  rootPosts.push(...loadedRootPosts)

  rootPosts.forEach((post, i) => {
    setExtOnPost({ post }, resultIndicesByRootIdMap, extPostStructs)

    if (withBlog) {
      const blogId = post.struct.blog_id.unwrapOr(undefined)
      blogId && fillRelatedId(blogId, i, postIndicesByBlogIdMap, blogIds)
    }

  })

  // Load owners
  if (withOwner) {
    const postOwners = await findProfiles(ownerIds)

    postOwners.forEach(owner => {
      const ownerId = owner.profile?.created.account.toString()
      ownerId && ownerByIdMap.set(ownerId, owner)
    })
  }

  // Load blogs
  if (withBlog) {
    const postBlogs = await findBlogs(blogIds)

    postBlogs.forEach(blog => {
      const blogId = blog.struct.id.toString()
      blogId && blogByIdMap.set(blogId, blog)
    })
  }

  return {
    postStructs,
    blogByIdMap,
    ownerByIdMap
  }
}

/** Load post structs and related structs like owner profile, blog, root post if required. */
export async function loadAndSetPostRelatedStructs (posts: PostData[], finders: FindStructsFns, opts?: PostDetailsOpts): Promise<PostWithSomeDetails[]> {
  const { withBlog, withOwner } = opts || {}
  const {
    blogByIdMap,
    ownerByIdMap,
    postStructs
  } = await loadRelatedStructs(posts, finders, opts)

  const setOwnerOnPost = (postStruct: PostWithSomeDetails) => {
    if (withOwner) {
      const { post, ext } = postStruct
      const ownerId = post.struct.created.account.toString()
      const owner = ownerByIdMap.get(ownerId)
      postStruct.owner = owner

      if (ext) {
        const extOwnerId = ext.post.struct.created.account.toString()
        ext.owner = extOwnerId === ownerId
          ? owner
          : ownerByIdMap.get(extOwnerId)
      }
    }
  }

  const setBlogOnPost = (post: PostWithSomeDetails, blogId?: BlogId, ext?: PostWithSomeDetails) => {
    if (withBlog && blogId) {
      const blog = blogByIdMap.get(blogId.toString())
      if (ext) {
        if (!post.blog) {
          post.blog = blog
        }
        ext.blog = blog
      } else {
        post.blog = blog
      }
    }
  }

  postStructs.forEach(post => {
    const { post: { struct: { blog_id } }, ext } = post
    setOwnerOnPost(post)

    setBlogOnPost(post, blog_id.unwrapOr(undefined))
    
    const blogId = ext?.post.struct.blog_id.unwrapOr(undefined)
    setBlogOnPost(post, blogId, post.ext)
    
    if (!blogId) {
      const blogId = ext?.ext?.post.struct.blog_id.unwrapOr(undefined)
      setBlogOnPost(post, blogId, post.ext)
    }
  })

  return postStructs
}