import BN from 'bn.js';
import { BlogId, PostId, Blog, Post, AccountId, ReactionId } from '.';
import { SocialAccount } from './subsocial';

export type SubstrateId = BlogId | PostId | BN;
export type CommonStruct = Blog | Post | SocialAccount;
export type AnyAccountId = AccountId | string;
export type AnyBlogId = BlogId | BN;
export type AnyPostId = PostId | BN;
export type AnyReactionId = ReactionId | BN;
