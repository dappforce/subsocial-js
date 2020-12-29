import BN from 'bn.js';
import { SpaceId, PostId, Space, Post, ReactionId } from '.';
import AccountId from '@polkadot/types/generic/AccountId';
import { SocialAccountWithId } from '../../dto';

export type SubstrateId = SpaceId | PostId | BN;
export type CommonStruct = Space | Post | SocialAccountWithId;
export type AnyAccountId = AccountId | string;
export type AnySpaceId = SpaceId | BN;
export type AnyPostId = PostId | BN;
export type AnyReactionId = ReactionId | BN;
