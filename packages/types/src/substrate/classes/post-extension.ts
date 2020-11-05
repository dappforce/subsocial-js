/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { u64, Null, Enum, Option, Struct } from '@polkadot/types';
import { PostId, PostExtension as IPostExtension, Comment as IComment } from '../interfaces';
import registry from '../registry';

export class RegularPost extends Null {}
export class SharedPost extends u64 {}

type CommentType = {
  parent_id: Option<PostId>,
  root_post_id: PostId
}

export class Comment extends Struct implements IComment {
  constructor (value?: CommentType) {
    super(
      registry,
      {
        parent_id: 'Option<u64>',
        root_post_id: 'u64'
      },
      value
    );
  }

  get parent_id (): Option<PostId> {
    return this.get('parent_id') as Option<PostId>;
  }

  get root_post_id (): PostId {
    return this.get('root_post_id') as PostId;
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

  get asComment (): Comment {
    return this.value as Comment;
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
