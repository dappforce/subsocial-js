/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { u64, Null, Enum, Option, Struct, Text } from '@polkadot/types';
import { IpfsHash, BlogId, OptionVecAccountId, PostId, PostExtension as IPostExtension, CommentExt as ICommentExt } from '@subsocial/types/substrate/interfaces/subsocial';
import { nonEmptyStr } from '@subsocial/utils/string'
import registry from '../registry';

export class OptionText extends Option<Text> {
  constructor (value?: string | null) {
    const textOrNull = nonEmptyStr(value) ? value : new Null(registry)
    super(registry, 'Text', textOrNull)
  }
}

export class OptionOptionText extends Option<Option<Text>> {
  constructor (value?: string | null) {
    super(registry, 'Option<Text>', new OptionText(value))
  }
}

export class OptionIpfsHash extends OptionText {}

export class RegularPost extends Null {}
export class SharedPost extends u64 {}

type CommentExtType = {
  parent_id: Option<PostId>,
  root_post_id: PostId
}

export class CommentExt extends Struct implements ICommentExt {
  constructor (value?: CommentExtType) {
    super(
      registry,
      {
        parent_id: 'Option<PostId>',
        root_post_id: 'PostId'
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
  SharedPost |
  ICommentExt;

type PostExtensionEnumValue =
  { RegularPost: RegularPost } |
  { SharedPost: SharedPost } |
  { Comment: ICommentExt };

export class PostExtension extends Enum implements IPostExtension {
  constructor (value?: PostExtensionEnumValue) {
    super(
      registry,
      {
        RegularPost,
        SharedPost,
        Comment: CommentExt as any
      }, value);
  }

  get isComment (): boolean {
    return this.type === 'CommentExt'
  }

  get asComment (): CommentExt {
    return this.value as CommentExt;
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

export type BlogUpdateType = {
  writers: OptionVecAccountId;
  handle: OptionOptionText;
  ipfs_hash: OptionIpfsHash;
};

export class BlogUpdate extends Struct {
  constructor (value?: BlogUpdateType) {
    super(
      registry,
      {
        writers: 'Option<BitVec>',
        handle: 'Option<Option<Text>>' as any,
        ipfs_hash: 'Option<Text>'
      },
      value
    );
  }

  get writers (): OptionVecAccountId {
    return this.get('writers') as OptionVecAccountId;
  }

  get handle (): OptionOptionText {
    return this.get('handle') as OptionOptionText;
  }

  get ipfs_hash (): OptionIpfsHash {
    return this.get('ipfs_hash') as OptionIpfsHash;
  }

  set ipfs_hash (value: OptionIpfsHash) {
    this.set('ipfs_hash', value);
  }

  set handle (value: OptionOptionText) {
    this.set('handle', value);
  }
}

export type PostUpdateType = {
  blog_id: Option<BlogId>;
  ipfs_hash: Option<IpfsHash>;
};

export class PostUpdate extends Struct {
  constructor (value?: PostUpdateType) {
    super(
      registry,
      {
        blog_id: 'Option<u64>',
        ipfs_hash: 'Option<Text>'
      },
      value
    );
  }

  get ipfs_hash (): OptionIpfsHash {
    return this.get('ipfs_hash') as OptionIpfsHash;
  }

  set ipfs_hash (value: OptionIpfsHash) {
    this.set('ipfs_hash', value);
  }
}

export type CommentUpdateType = {
  ipfs_hash: IpfsHash;
};

export class CommentUpdate extends Struct {
  constructor (value?: CommentUpdateType) {
    super(
      registry,
      {
        ipfs_hash: 'Text'
      },
      value
    );
  }

  get ipfs_hash (): IpfsHash {
    return this.get('ipfs_hash') as IpfsHash;
  }
}

// export class OptionComment extends Option.with(Comment) {}

export const ReactionKinds: { [key: string]: string } = {
  Upvote: 'Upvote',
  Downvote: 'Downvote'
};

export class ReactionKind extends Enum {
  constructor (value?: any) {
    super(registry, [ 'Upvote', 'Downvote' ], value);
  }
}

export type ProfileUpdateType = {
  username: OptionText;
  ipfs_hash: OptionIpfsHash;
};

export class ProfileUpdate extends Struct {
  constructor (value?: ProfileUpdateType) {
    super(
      registry,
      {
        username: 'Option<Text>',
        ipfs_hash: 'Option<Text>'
      },
      value
    );
  }

  get ipfs_hash (): OptionIpfsHash {
    return this.get('ipfs_hash') as OptionIpfsHash;
  }

  get username (): OptionText {
    return this.get('username') as OptionText;
  }

  set ipfs_hash (value: OptionIpfsHash) {
    this.set('ipfs_hash', value);
  }

  set username (value: OptionText) {
    this.set('username', value);
  }
}
