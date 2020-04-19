import BN from 'bn.js';
import { BlogId, PostId, CommentId, Blog, Post, Comment, AccountId, ReactionId } from '.';
import { SocialAccount } from './subsocial';

export type SubstrateId = BlogId | PostId | CommentId | AnyAccountId | BN;
export type CommonStruct = Blog | Post | Comment | SocialAccount;
export type AnyAccountId = AccountId | string;
export type AnyBlogId = BlogId | BN;
export type AnyPostId = PostId | BN;
export type AnyCommentId = CommentId | BN;
export type AnyReactionId = ReactionId | BN;
