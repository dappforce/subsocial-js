
import { AccountId } from '@polkadot/types/interfaces';
import BN from 'bn.js';
import { SpaceId, PostId, Space, Post, ReactionId } from '@subsocial/definitions/interfaces';

export type SubstrateId = SpaceId | PostId | BN;
export type CommonStruct = Space | Post;
export type AnyAccountId = AccountId | string;
export type AnySpaceId = SpaceId | BN;
export type AnyPostId = PostId | BN;
export type AnyReactionId = ReactionId | BN;
