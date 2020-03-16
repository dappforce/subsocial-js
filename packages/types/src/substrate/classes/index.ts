/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { u64, Null, Enum, Option, Struct, Text } from '@polkadot/types';
import { registry as typeRegistry } from '@polkadot/react-api';
import { IpfsHash, BlogId, OptionVecAccountId } from '@subsocial/types/substrate/interfaces/subsocial';
import { Registry } from '@polkadot/types/types';

const registry = typeRegistry as unknown as Registry; // Hack

export class OptionText extends Option<Text> {
  constructor (value: string) {
    super(registry, 'Text', value)
  }
}

export class OptionIpfsHash extends OptionText {}

export class RegularPost extends Null {}
export class SharedPost extends u64 {}
export class SharedComment extends u64 {}

export type PostExtensionEnum =
  RegularPost |
  SharedPost |
  SharedComment;

type PostExtensionEnumValue =
  { RegularPost: RegularPost } |
  { SharedPost: SharedPost } |
  { SharedComment: SharedComment };

export class PostExtension extends Enum {
  constructor (value?: PostExtensionEnumValue, index?: number) {
    super(
      registry,
      {
        RegularPost,
        SharedPost,
        SharedComment
      }, value, index);
  }
}

export type BlogUpdateType = {
  writers: OptionVecAccountId;
  slug: OptionText;
  ipfs_hash: OptionIpfsHash;
};

export class BlogUpdate extends Struct {
  constructor (value?: BlogUpdateType) {
    super(
      registry,
      {
        writers: 'Option<BitVec>',
        slug: 'Option<Text>',
        ipfs_hash: 'Option<Text>'
      },
      value
    );
  }

  get writers (): OptionVecAccountId {
    return this.get('writers') as OptionVecAccountId;
  }

  get slug (): OptionText {
    return this.get('slug') as OptionIpfsHash;
  }

  get ipfs_hash (): OptionIpfsHash {
    return this.get('ipfs_hash') as OptionIpfsHash;
  }

  set ipfs_hash (value: OptionIpfsHash) {
    this.set('ipfs_hash', value);
  }

  set slug (value: OptionText) {
    this.set('slug', value);
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

  set slug (value: OptionText) {
    this.set('slug', value);
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

  get username (): OptionIpfsHash {
    return this.get('username') as OptionIpfsHash;
  }

  set ipfs_hash (value: OptionIpfsHash) {
    this.set('ipfs_hash', value);
  }

  set username (value: OptionText) {
    this.set('username', value);
  }
}
