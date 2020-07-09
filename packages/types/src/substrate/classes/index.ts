/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { u64, Null, Enum, Option, Struct, Text, bool } from '@polkadot/types';
import { IpfsHash, SpaceId, PostId, PostExtension as IPostExtension, CommentExt as ICommentExt } from '@subsocial/types/substrate/interfaces';
import { nonEmptyStr } from '@subsocial/utils/string'
import registry from '../registry';
import { SubstrateId } from '@subsocial/types';

export class OptionId<T extends SubstrateId> extends Option<u64> {
  constructor (value?: T) {
    const textOrNull = value || new Null(registry)
    super(registry, 'u64', textOrNull)
  }
}

export class OptionBool<T extends boolean> extends Option<bool> {
  constructor (value?: T) {
    const boolOrNull = typeof value === 'boolean' ? value : new Null(registry)
    super(registry, 'bool', boolOrNull)
  }
}

type OptionTextType = string | Text | null;

export class OptionText extends Option<Text> {
  constructor (value?: OptionTextType) {
    const textOrNull = nonEmptyStr(value) ? value : new Null(registry)
    super(registry, 'Text', textOrNull)
  }
}

export class OptionOptionText extends Option<Option<Text>> {
  constructor (value?: OptionTextType) {
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
  ICommentExt |
  SharedPost;

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
        Comment: CommentExt as any,
        SharedPost
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

export type SpaceUpdateType = {
  handle: OptionOptionText;
  ipfs_hash: OptionIpfsHash;
  hidden: Option<bool>
};

export class SpaceUpdate extends Struct {
  constructor (value?: SpaceUpdateType) {
    super(
      registry,
      {
        handle: 'Option<Option<Text>>' as any,
        ipfs_hash: 'Option<Text>',
        hidden: 'Option<bool>'
      },
      value
    );
  }

  get hidden (): bool {
    return this.get('hidden') as bool;
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
  space_id: Option<SpaceId>;
  ipfs_hash: Option<IpfsHash>;
  hidden: Option<bool>
};

export class PostUpdate extends Struct {
  constructor (value?: PostUpdateType) {
    super(
      registry,
      {
        space_id: 'Option<u64>',
        ipfs_hash: 'Option<Text>',
        hidden: 'Option<bool>'
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
