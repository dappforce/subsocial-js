import { AnyBlogId, AnyAccountId } from '@subsocial/types/substrate/interfaces/utils';
import { PostData, PostWithSomeDetails, ProfileData, BlogData, AnyPostId } from '@subsocial/types'
import { PostId, AccountId, BlogId } from '@subsocial/types/substrate/interfaces'
import { getPostIdFromExtension } from './utils'
import { nonEmptyStr, notDefined, isDefined } from '@subsocial/utils'

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

  const rootIds: PostId[] = []
  const extIds: PostId[] = []
  const ownerIds: AccountId[] = []
  const blogIds: BlogId[] = []

  // Key - serialized id of a shared original post.
  // Value - indices of the posts that share this original post in `postStructs` array.
  const resultIndicesByRootIdMap = new Map<string, number[]>()
  // Key - serialized id of a shared original post.
  // Value - indices of the posts that share this original post in `postStructs` array.
  const resultIndicesByExtIdMap = new Map<string, number[]>()
  // Key - serialized id of a post owner.
  // Value - indices of the posts that have the same owner (as key) in `posts` array.
  const postIndicesByOwnerIdMap = new Map<string, number[]>()
  // Key - serialized id of a blog.
  // Value - indices of the posts that have the same blog (as key) in `posts` array.
  const postIndicesByBlogIdMap = new Map<string, number[]>()

  // Post id can be either extension or root post
  const rememberPostIdAndMapToPostIndices = (post: PostData, postIndex: number, resultIndicesByPostIdMap: Map<string, number[]>, posts: PostData[], postIds: PostId[]) => {
    const extId = getPostIdFromExtension(post)
    const extIdStr = extId?.toString()
    if (extId && nonEmptyStr(extIdStr)) {
      let postIdxs = resultIndicesByPostIdMap.get(extIdStr)
      if (notDefined(postIdxs)) {
        postIdxs = []
        resultIndicesByPostIdMap.set(extIdStr, postIdxs)
        const currentPost = postByIdMap.get(extIdStr)
        if (currentPost) {
          posts.push(currentPost)
        } else {
          postIds.push(extId)
        }
      }
      postIdxs.push(postIndex)
    }
  }

  // Related id can be either blog id or owner id
  function rememberRelatedIdAndMapToPostIndices<T extends BlogId | AccountId> (relatedId: T, postIndex: number, postIndicesByRelatedIdMap: Map<string, number[]>, relatedIds: T[]) {
    if (isDefined(relatedId)) {
      const idStr = relatedId.toString()
      let postIdxs = postIndicesByRelatedIdMap.get(idStr)
      if (notDefined(postIdxs)) {
        postIdxs = []
        postIndicesByOwnerIdMap.set(idStr, postIdxs)
        relatedIds.push(relatedId)
      }
      postIdxs.push(postIndex)
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

    rememberPostIdAndMapToPostIndices(post, i, resultIndicesByExtIdMap, extPosts, extIds)

    if (withOwner) {
      const ownerId = post.struct.created.account
      rememberRelatedIdAndMapToPostIndices(ownerId, i, postIndicesByOwnerIdMap, ownerIds)
    }

    if (withBlog) {
      const blogId = post.struct.blog_id.unwrapOr(undefined)
      blogId && rememberRelatedIdAndMapToPostIndices(blogId, i, postIndicesByBlogIdMap, blogIds)
    }
  })

  const loadedExtPosts = await findPosts(extIds)
  extPosts.push(...loadedExtPosts)

  extPosts.forEach((post, i) => {
    extPostStructs.push({ post })
    setExtOnPost(extPostStructs[i], resultIndicesByExtIdMap, postStructs)

    if (withOwner) {
      const ownerId = post.struct.created.account
      ownerIds.push(ownerId)
    }

    if (withBlog) {
      const blogId = post.struct.blog_id.unwrapOr(undefined)
      if (isDefined(blogId)) {
        blogIds.push(blogId)
      } else {
        rememberPostIdAndMapToPostIndices(post, i, resultIndicesByRootIdMap, rootPosts, rootIds)
      }
    }
  })

  const loadedRootPosts = await findPosts(rootIds)
  rootPosts.push(...loadedRootPosts)

  rootPosts.forEach((post, i) => {
    setExtOnPost({ post }, resultIndicesByRootIdMap, extPostStructs)

    if (withBlog) {
      const blogId = post.struct.blog_id.unwrapOr(undefined)
      blogId && rememberRelatedIdAndMapToPostIndices(blogId, i, postIndicesByBlogIdMap, blogIds)
    }
  })

  // Load related owners
  if (withOwner) {
    const owners = await findProfiles(ownerIds)

    owners.forEach(owner => {
      const ownerId = owner.profile?.created.account.toString()
      ownerId && ownerByIdMap.set(ownerId, owner)
    })
  }

  // Load related blogs
  if (withBlog) {
    const blogs = await findBlogs(blogIds)

    blogs.forEach(blog => {
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
    if (!withOwner) return

    const { post, ext } = postStruct
    const ownerId = post.struct.created.account.toString()
    const owner = ownerByIdMap.get(ownerId)
    postStruct.owner = owner

    if (!ext) return

    const extOwnerId = ext.post.struct.created.account.toString()
    ext.owner = extOwnerId === ownerId
      ? owner
      : ownerByIdMap.get(extOwnerId)
  }

  const setBlogOnPost = (post: PostWithSomeDetails, blogId?: BlogId, ext?: PostWithSomeDetails) => {
    if (!withBlog || !blogId) return

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

  postStructs.forEach(post => {
    const { post: { struct: { blog_id } }, ext } = post
    setOwnerOnPost(post)

    // Set a blog if the post has blog id:
    setBlogOnPost(post, blog_id.unwrapOr(undefined))

    // Set a blog (from extension) on post and its extension if extension has blog id:
    const blogId = ext?.post.struct.blog_id.unwrapOr(undefined)
    setBlogOnPost(post, blogId, ext)

    if (!blogId) {
      // Set a blog (from root post) on post and its extension if extension does NOT have blog id:
      const blogId = ext?.ext?.post.struct.blog_id.unwrapOr(undefined)
      setBlogOnPost(post, blogId, ext)
    }
  })

  return postStructs
}
