import { AnyAccountId } from '@subsocial/types/substrate/interfaces/utils';
import { PostData, PostWithSomeDetails, ProfileData, SpaceData } from '@subsocial/types'
import { PostId, AccountId, SpaceId } from '@subsocial/types/substrate/interfaces'
import { getPostIdFromExtension } from './utils'
import { nonEmptyStr, notDefined, isDefined } from '@subsocial/utils'
import { PostDetailsOpts, FindPostsQuery, FindSpacesQuery } from './types';

export type FindStructsFns = {
  findPosts: (filter: FindPostsQuery) => Promise<PostData[]>,
  findSpaces: (filter: FindSpacesQuery) => Promise<SpaceData[]>
  findProfiles: (ids: AnyAccountId[]) => Promise<ProfileData[]>
}

async function loadRelatedStructs (posts: PostData[], finders: FindStructsFns, opts?: PostDetailsOpts) {
  const { withSpace, withOwner } = opts || {}
  const { findSpaces, findPosts, findProfiles } = finders

  const ownerByIdMap = new Map<string, ProfileData>()
  const spaceByIdMap = new Map<string, SpaceData>()
  const postByIdMap = new Map<string, PostData>()
  posts.forEach(x => postByIdMap.set(x.struct.id.toString(), x))

  const postStructs: PostWithSomeDetails[] = []
  const extPostStructs: PostWithSomeDetails[] = []

  const rootPosts: PostData[] = []
  const extPosts: PostData[] = []

  const rootIds: PostId[] = []
  const extIds: PostId[] = []
  const ownerIds: AccountId[] = []
  const spaceIds: SpaceId[] = []

  // Key - serialized id of root post of comment.
  // Value - indices of the posts that have this root post in `extPostStructs` array.
  const postIndicesByRootIdMap = new Map<string, number[]>()
  // Key - serialized id of a shared original post or root post of a comment.
  // Value - indices of the posts that share this original post or comments that are replies to root post in postStructs array.
  const postIndicesByExtIdMap = new Map<string, number[]>()
  // Key - serialized id of a post owner.
  // Value - indices of the posts that have the same owner (as key) in `posts` array.
  const postIndicesByOwnerIdMap = new Map<string, number[]>()
  // Key - serialized id of a space.
  // Value - indices of the posts that have the same space (as key) in `posts` array.
  const postIndicesBySpaceIdMap = new Map<string, number[]>()

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

  // Related id can be either space id or owner id
  function rememberRelatedIdAndMapToPostIndices<T extends SpaceId | AccountId> (relatedId: T, postIndex: number, postIndicesByRelatedIdMap: Map<string, number[]>, relatedIds: T[]) {
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

  function setExtOnPost (ext: PostWithSomeDetails, resultIndicesByPostIdMap: Map<string, number[]>, postStructs: PostWithSomeDetails[]) {
    const extId = ext.post.struct.id.toString()
    postByIdMap.set(extId, ext.post)
    const idxs = resultIndicesByPostIdMap.get(extId) || []
    idxs.forEach(idx => {
      postStructs[idx].ext = ext
    })
  }

  posts.forEach((post, i) => {
    postStructs.push({ post })

    rememberPostIdAndMapToPostIndices(post, i, postIndicesByExtIdMap, extPosts, extIds)

    if (withOwner) {
      const ownerId = post.struct.created.account
      rememberRelatedIdAndMapToPostIndices(ownerId, i, postIndicesByOwnerIdMap, ownerIds)
    }

    if (withSpace) {
      const spaceId = post.struct.space_id.unwrapOr(undefined)
      spaceId && rememberRelatedIdAndMapToPostIndices(spaceId, i, postIndicesBySpaceIdMap, spaceIds)
    }
  })

  const loadedExtPosts = await findPosts({ ids: extIds })
  extPosts.push(...loadedExtPosts)

  extPosts.forEach((post, i) => {
    extPostStructs.push({ post })
    setExtOnPost(extPostStructs[i], postIndicesByExtIdMap, postStructs)

    if (withOwner) {
      const ownerId = post.struct.created.account
      ownerIds.push(ownerId)
    }

    if (withSpace) {
      const spaceId = post.struct.space_id.unwrapOr(undefined)
      if (isDefined(spaceId)) {
        spaceIds.push(spaceId)
      } else {
        rememberPostIdAndMapToPostIndices(post, i, postIndicesByRootIdMap, rootPosts, rootIds)
      }
    }
  })

  const loadedRootPosts = await findPosts({ ids: rootIds })
  rootPosts.push(...loadedRootPosts)

  rootPosts.forEach((post, i) => {
    setExtOnPost({ post }, postIndicesByRootIdMap, extPostStructs)

    if (withSpace) {
      const spaceId = post.struct.space_id.unwrapOr(undefined)
      spaceId && rememberRelatedIdAndMapToPostIndices(spaceId, i, postIndicesBySpaceIdMap, spaceIds)
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

  // Load related spaces
  if (withSpace) {
    const spaces = await findSpaces({ ids: spaceIds })

    spaces.forEach(space => {
      const spaceId = space.struct.id.toString()
      spaceId && spaceByIdMap.set(spaceId, space)
    })
  }

  return {
    postStructs,
    spaceByIdMap,
    ownerByIdMap
  }
}

/** Load post structs and related structs like owner profile, space, root post if required. */
export async function loadAndSetPostRelatedStructs (posts: PostData[], finders: FindStructsFns, opts?: PostDetailsOpts): Promise<PostWithSomeDetails[]> {
  const { withSpace, withOwner } = opts || {}
  const {
    spaceByIdMap,
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

  const setSpaceOnPost = (post: PostWithSomeDetails, spaceId?: SpaceId, ext?: PostWithSomeDetails) => {
    if (!withSpace || !spaceId) return

    const space = spaceByIdMap.get(spaceId.toString())
    if (!post.space) {
      post.space = space
    }

    if (ext) {
      ext.space = space
    }
  }

  postStructs.forEach(post => {
    const { post: { struct: { space_id } }, ext } = post
    setOwnerOnPost(post)

    // Set a space if the post has space id:
    setSpaceOnPost(post, space_id.unwrapOr(undefined))

    // Set a space (from extension) on post and its extension if extension has space id:
    const spaceId = ext?.post.struct.space_id.unwrapOr(undefined)
    setSpaceOnPost(post, spaceId, ext)

    if (!spaceId) {
      // Set a space (from root post) on post and its extension if extension does NOT have space id:
      const spaceId = ext?.ext?.post.struct.space_id.unwrapOr(undefined)
      setSpaceOnPost(post, spaceId, ext)
    }
  })

  return postStructs
}
