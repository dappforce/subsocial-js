import { AccountId } from '@polkadot/types/interfaces';
import BN from 'bn.js';
import { SpaceId, PostId, Space, Post, ReactionId } from '@subsocial/definitions/interfaces';
import { ApiPromise as SubstrateApi } from '@polkadot/api';

export type HttpRequestMethod = 'post' | 'get'

export type UseServerProps = {
  httpRequestMethod: HttpRequestMethod
}

export type SubsocialContext = {
  useServer?: UseServerProps
}

export type SubsocialApiProps = SubsocialContext & {
  substrateApi: SubstrateApi,
  ipfsNodeUrl: string,
  offchainUrl: string
}

export type CreateSubsocialApiProps = Omit<SubsocialApiProps, 'substrateApi'> & {
  substrateNodeUrl: string,
}

export type SubstrateId = SpaceId | PostId | BN | string;
export type CommonStruct = Space | Post;
export type AnyAccountId = AccountId | string;
export type AnySpaceId = SpaceId | BN | string;
export type AnyPostId = PostId | BN | string;
export type AnyReactionId = ReactionId | BN | string;

type CidAsStr = string

export type ContentResult<T> = Record<CidAsStr, T>

export type PalletName = 
  | 'domains'
  | 'permissions'
  | 'posts'
  | 'accountFollows'
  | 'profiles'
  | 'reactions'
  | 'roles'
  | 'scores'
  | 'spaceFollows'
  | 'spaceOwnership'
  | 'spaces'
  | 'utils'

export type EventsName =
  'AccountFollowed' |
  'SpaceFollowed' |
  'SpaceCreated' |
  'CommentCreated' |
  'CommentReplyCreated' |
  'PostCreated' |
  'PostShared' |
  'CommentShared' |
  'PostReactionCreated' |
  'CommentReactionCreated'
