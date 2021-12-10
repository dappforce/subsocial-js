/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { u64, Null, Enum, Option, Struct } from '@polkadot/types';
import { PostId, PostExtension as IPostExtension, Comment as IComment } from '@subsocial/definitions/interfaces';
import registry from '../registry';

export class RegularPost extends Null {}
export class SharedPost extends u64 {}

type CommentType = {
  parentId: Option<PostId>,
  rootPostId: PostId
}

export class Comment extends Struct implements IComment {
  constructor (value?: CommentType) {
    super(
      registry,
      {
        parentId: 'Option<u64>',
        rootPostId: 'u64'
      },
      value
    );
  }

  get parentId (): Option<PostId> {
    return this.get('parentId') as Option<PostId>;
  }

  get rootPostId (): PostId {
    return this.get('rootPostId') as PostId;
  }
}

export type PostExtensionEnum =
  RegularPost |
  IComment |
  SharedPost;

type PostExtensionEnumValue =
  { RegularPost: RegularPost } |
  { SharedPost: SharedPost } |
  { Comment: IComment };

export class PostExtension extends Enum implements IPostExtension {
  constructor (value?: PostExtensionEnumValue) {
    super(
      registry,
      {
        RegularPost,
        Comment: Comment as any,
        SharedPost
      }, value);
  }

  get isComment (): boolean {
    return this.type === 'Comment'
  }

  get asComment (): IComment {
    return this.value as IComment;
  }

  get isRegularPost (): boolean {
    return this.type === 'RegularPost'
  }

  get isSharedPost (): boolean {
    return this.type === 'SharedPost'
  }

  get isSharedComment (): boolean {
    return this.type === 'SharedComment'
  }

  get asSharedPost (): PostId {
    return this.value as PostId;
  }
}
