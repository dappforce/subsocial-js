import BN from 'bn.js';
import { BlogId, PostId, CommentId, Blog, Post, Comment } from '.';

export type SubstrateId = BlogId | PostId | CommentId | BN;
export type CommonStruct = Blog | Post | Comment;
