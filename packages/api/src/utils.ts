import { PostData, IpfsCid } from '@subsocial/types';
import { newLogger, isEmptyArray } from '@subsocial/utils';
import { PostId, SubstrateId, AccountId, ReactionId, CommonStruct, SocialAccount, Reaction } from '@subsocial/types/substrate/interfaces';

const log = newLogger('Subsocial Api Utils');

export const getSharedPostId = (postData?: PostData): PostId | undefined => {
  if (!postData) return undefined;

  const ext = postData?.struct?.extension
  const sharedPostId = ext?.isSharedPost ? ext.asSharedPost : undefined
  sharedPostId && log.debug('Shared post id:', sharedPostId.toString())

  return sharedPostId
}

export type SupportedSubstrateId = SubstrateId | AccountId | ReactionId

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
