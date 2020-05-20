import { IpfsCid, SubstrateId, AnyAccountId, CommonStruct, PostData } from '@subsocial/types';
import { newLogger, isEmptyArray, nonEmptyStr } from '@subsocial/utils';
import { PostId, AccountId, ReactionId, SocialAccount, Reaction } from '@subsocial/types/substrate/interfaces';
import registry from '@subsocial/types/substrate/registry';
import { GenericAccountId } from '@polkadot/types'

const log = newLogger('Subsocial Api Utils');

export type SupportedSubstrateId = SubstrateId | AnyAccountId | ReactionId

export type SupportedSubstrateResult = CommonStruct | SocialAccount | Reaction

type AnyId = SupportedSubstrateId | IpfsCid

export const getUniqueIds = <ID extends AnyId> (ids: (ID | undefined)[]): ID[] => {
  if (isEmptyArray(ids)) return []

  const knownIds = new Set<string>()
  const uniqueIds: ID[] = []

  ids.forEach(id => {
    if (typeof id?.toString === 'function') {
      const idStr = id.toString()
      if (!knownIds.has(idStr)) {
        knownIds.add(idStr)
        uniqueIds.push(id)
      }
    }
  })

  return uniqueIds
}

export function asAccountId (id: AnyAccountId): AccountId | undefined {
  if (id instanceof GenericAccountId) {
    return id
  } else if (nonEmptyStr(id) && id.length === 48) {
    return new GenericAccountId(registry, id)
  } else {
    return undefined
  }
}

export const getSharedPostId = (postData: any): PostId | undefined => {
  if (!postData) return undefined;

  const ext = postData?.struct?.extension
  const sharedPostId = ext?.isSharedPost ? ext.asSharedPost : undefined
  sharedPostId && log.debug('Shared post id:', sharedPostId.toString())

  return sharedPostId
}

/**

1 // root post <-- has BLOG

2 // sharING post <-- has BLOG
--1 // original / sharED post

3 // comment
  --1 // original: root post <-- has BLOG

4 // comment
--2 // root post: sharING post <-- has BLOG
  --1 // original: root post

// >>> MOST COMPLEXT CASE:
5 // sharING post <-- has BLOG
--3 // original post: sharED comment
  --2 // root post: sharING post <-- has BLOG 2 <<< MAX DEPTH = 3
    --1 // original: root post

6 // comment
  5 // root post: sharING comment <-- has BLOG 3
  --3 // sharED comment
    --2 // root post: sharING post <-- has BLOG 2
      --1 // original: root post <-- has BLOG 1
*/

/** Return original post id from shared post or root post id if this post is a comment. */
export const getPostIdFromExtension = (postData?: PostData): PostId | undefined => {
  if (!postData) return undefined;

  const ext = postData?.struct?.extension

  if (ext) {
    const { isComment, isSharedPost } = ext

    if (isComment) {
       return ext.asComment.root_post_id
    }

    if (isSharedPost) {
      return ext.asSharedPost
    }
  }

  return undefined
}
