import { Comment } from '../substrate/wrappers';
import { SubstrateId, AnyAccountId, CommonStruct } from '../subsocial/types';
import { newLogger, isEmptyArray, nonEmptyStr, isDef } from '@subsocial/utils';
import { PostId, ReactionId, Reaction, Post, Content } from '@subsocial/definitions/interfaces';
import { GenericAccountId } from '@polkadot/types';
import { SubmittableResult } from '@polkadot/api';
import BN from 'bn.js';
import registry from './registry';
import { IpfsCid } from '../types';
import { CID } from 'ipfs-http-client';

const log = newLogger('Subsocial Api Utils');

export type SupportedSubstrateId = SubstrateId | AnyAccountId | ReactionId

export type SupportedSubstrateResult = CommonStruct | Reaction

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
  try {
    if (id instanceof GenericAccountId) {
      return id
    } else if (nonEmptyStr(id)) {
      return new GenericAccountId(registry, id)
    }
    return undefined
  } catch {
    return undefined
  }
}

export function isAccountId (id:AnyAccountId): boolean {
  return !!asAccountId(id)
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
      return ext.asComment.rootPostId
    } else if (isSharedPost) {
      return ext.asSharedPost
    }
  }

  return undefined
}

export const isIpfs = (content?: Content) => content && (content.isIpfs || (content as any).IPFS)

export const asIpfsCid = (cid: IpfsCid): CID | undefined => {
  if (!cid) return undefined

  if (cid instanceof CID) {
    return cid
  } else if (typeof cid === 'string') {
    return CID.parse(cid)
  } else if (typeof cid?.toU8a === 'function') {
    return CID.parse(cid.toString())
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

export const resolveCidOfContent = (content?: Content) =>
  (isDef(content) && content.isIpfs)
    ? content.asIpfs.toHuman()
    : undefined


export type ResultEventType = 'Created' | 'Updated';

export function getNewIdsFromEvent (txResult: SubmittableResult, eventType: ResultEventType = 'Created'): BN[] {
  const newIds: BN[] = []

  txResult.events.find(event => {
    const { event: { data, method } } = event
    if (method.indexOf(eventType) >= 0) {
      const [ /* owner */, ...ids ] = data.toArray()
      newIds.push(...ids as unknown as BN[])
      return true
    }
    return false
  })

  return newIds
}