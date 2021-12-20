/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { u64, Null, Enum, Option, Struct } from '@polkadot/types';
import { PostId, PostExtension as IPostExtension, Comment as IComment } from '@subsocial/definitions/interfaces';
import { OptionEntity } from '.';
import registry from '../registry';

export type RegularPost = null
export type SharedPost = PostId | string

type CommentType = {
  parentId?: PostId | string,
  rootPostId: PostId | string
}

export function Comment ({ parentId, rootPostId }: CommentType) {
  return {
    parentId: OptionEntity(parentId),
    rootPostId
  }
}

export type PostExtensionEnum =
  RegularPost |
  CommentType |
  SharedPost;

type PostExtensionEnumValue =
  { RegularPost: RegularPost } |
  { SharedPost: SharedPost } |
  { Comment: CommentType };

export function PostExtension (value?: PostExtensionEnumValue) {
  return value
}
