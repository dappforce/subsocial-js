import { RawPostData, RawPostWithSomeDetails, RawSpaceData, AnyPostId, AnySpaceId, AnyAccountId } from '../types'
import { PostId, SpaceId } from '@subsocial/definitions/interfaces'
import { getPostIdFromExtension } from './common'
import { nonEmptyStr, notDefined, isDefined } from '@subsocial/utils'
import { AccountId } from '@polkadot/types/interfaces'
import { isVisible, PostDetailsOpts } from '../filters';
import {  } from '../types'

export type FindStructsFns = {
  findPosts: (ids: AnyPostId[]) => Promise<RawPostData[]>,
  findSpaces: (ids: AnySpaceId[]) => Promise<RawSpaceData[]>
  findProfileSpaces: (ids: AnyAccountId[]) => Promise<RawSpaceData[]>
}

async function loadRelatedStructs (posts: RawPostData[], finders: FindStructsFns, opts?: PostDetailsOpts) {
  const { withSpace, withOwner } = opts || {}
  const { findSpaces, findPosts, findProfileSpaces } = finders

  const ownerByIdMap = new Map<string, RawSpaceData>()
  const spaceByIdMap = new Map<string, RawSpaceData>()
  const postByIdMap = new Map<string, RawPostData>()
  posts.forEach(x => postByIdMap.set(x.struct.id.toString(), x))

  const postStructs: RawPostWithSomeDetails[] = []
  const extPostStructs: RawPostWithSomeDetails[] = []

  const rootPosts: RawPostData[] = []
  const extPosts: RawPostData[] = []

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
  const rememberPostIdAndMapToPostIndices = (post: RawPostData, postIndex: number, resultIndicesByPostIdMap: Map<string, number[]>, posts: RawPostData[], postIds: PostId[]) => {
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

  function setExtOnPost (ext: RawPostWithSomeDetails, resultIndicesByPostIdMap: Map<string, number[]>, postStructs: RawPostWithSomeDetails[]) {
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
      const spaceId = post.struct.spaceId.unwrapOr(undefined)
      spaceId && rememberRelatedIdAndMapToPostIndices(spaceId, i, postIndicesBySpaceIdMap, spaceIds)
    }
  })

  const loadedExtPosts = await findPosts(extIds)
  extPosts.push(...loadedExtPosts)

  extPosts.forEach((post, i) => {
    extPostStructs.push({ post })
    setExtOnPost(extPostStructs[i], postIndicesByExtIdMap, postStructs)

    if (withOwner) {
      const ownerId = post.struct.created.account
      ownerIds.push(ownerId)
    }

    if (withSpace) {
      const spaceId = post.struct.spaceId.unwrapOr(undefined)
      if (isDefined(spaceId)) {
        spaceIds.push(spaceId)
      } else {
        rememberPostIdAndMapToPostIndices(post, i, postIndicesByRootIdMap, rootPosts, rootIds)
      }
    }
  })

  const loadedRootPosts = await findPosts(rootIds)
  rootPosts.push(...loadedRootPosts)

  rootPosts.forEach((post, i) => {
    setExtOnPost({ post }, postIndicesByRootIdMap, extPostStructs)

    if (withSpace) {
      const spaceId = post.struct.spaceId.unwrapOr(undefined)
      spaceId && rememberRelatedIdAndMapToPostIndices(spaceId, i, postIndicesBySpaceIdMap, spaceIds)
    }
  })

  // TODO: resolve profile space
  // Load related owners
  if (withOwner) {
    const owners = await findProfileSpaces(ownerIds)

    owners.forEach(owner => {
      const ownerId = owner.struct.owner.toString()
      ownerId && ownerByIdMap.set(ownerId, owner)
    })
  }

  // Load related spaces
  if (withSpace) {
    const spaces = await findSpaces(spaceIds)

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

/** @deprecated Load post structs and related structs like owner profile, space, root post if required. */
export async function loadAndSetPostRelatedStructs (posts: RawPostData[], finders: FindStructsFns, opts?: PostDetailsOpts): Promise<RawPostWithSomeDetails[]> {
  const { withSpace, withOwner, visibility } = opts || {}
  const {
    spaceByIdMap,
    ownerByIdMap,
    postStructs
  } = await loadRelatedStructs(posts, finders, opts)

  const setOwnerOnPost = (postStruct: RawPostWithSomeDetails) => {
    if (!withOwner) return

    const { post, ext } = postStruct
    const ownerId = post.struct.created.account.toHuman()
    const owner = ownerByIdMap.get(ownerId)
    postStruct.owner = owner

    if (!ext) return

    const extOwnerId = ext.post.struct.created.account.toHuman()
    ext.owner = extOwnerId === ownerId
      ? owner
      : ownerByIdMap.get(extOwnerId)
  }

  const setSpaceOnPost = (post: RawPostWithSomeDetails, spaceId?: SpaceId, ext?: RawPostWithSomeDetails) => {
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
    const { post: { struct: { spaceId: spaceIdOpt } }, ext } = post
    setOwnerOnPost(post)

    // Set a space if the post has space id:
    setSpaceOnPost(post, spaceIdOpt.unwrapOr(undefined))

    // Set a space (from extension) on post and its extension if extension has space id:
    const spaceId = ext?.post.struct.spaceId.unwrapOr(undefined)
    setSpaceOnPost(post, spaceId, ext)

    if (!spaceId) {
      // Set a space (from root post) on post and its extension if extension does NOT have space id:
      const spaceId = ext?.ext?.post.struct.spaceId.unwrapOr(undefined)
      setSpaceOnPost(post, spaceId, ext)
    }
  })

  return withSpace && visibility === 'onlyVisible' ? postStructs.filter(({ space }) => isVisible(space?.struct)) : postStructs
}
