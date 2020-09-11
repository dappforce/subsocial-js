import { Comment } from '@subsocial/types/substrate/classes';
import { IpfsCid, SubstrateId, AnyAccountId, CommonStruct, CID } from '@subsocial/types';
import { newLogger, isEmptyArray, nonEmptyStr } from '@subsocial/utils';
import { PostId, ReactionId, SocialAccount, Reaction, Post, Content } from '@subsocial/types/substrate/interfaces';
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

export function asAccountId (id: AnyAccountId): GenericAccountId | undefined {
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

type HasPostStruct = {
  struct: Post
}

/** Return original post id from shared post or root post id if this post is a comment. */
export const getPostIdFromExtension = (postData?: HasPostStruct): PostId | undefined => {
  if (!postData) return undefined;

  const ext = postData.struct.extension

  if (ext) {
    const { isSharedPost, isComment } = ext

    if (isComment || ext.value instanceof Comment) {
      return ext.asComment.root_post_id
    } else if (isSharedPost) {
      return ext.asSharedPost
    }
  }

  return undefined
}

export const isIpfs = (content?: Content) => content && (content.isIpfs || (content as any).IPFS)

export const asIpfsCid = (cid: IpfsCid): CID => {
  if (cid instanceof CID) {
    return cid
  } else if (typeof cid === 'string') {
    return new CID(cid)
  } else if (typeof cid.toU8a === 'function') {
    return new CID(cid.toString())
  } else {
    throw new Error('Wrong type of IPFS CID. Valid types are: string | CID | IpfsCid')
  }
}

export const isValidIpfsCid = (cid: IpfsCid) => {
  try {
    return !!asIpfsCid(cid)
  } catch {
    return false
  }
}
