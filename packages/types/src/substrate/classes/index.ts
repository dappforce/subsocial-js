/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { u64, Null, Enum, Option, Struct, Text, bool } from '@polkadot/types';
import { SpaceId, PostId, PostExtension as IPostExtension, Comment as IComment, Content as IContent } from '@subsocial/types/substrate/interfaces';
import { nonEmptyStr } from '@subsocial/utils/string'
import registry from '../registry';
import { SubstrateId, IpfsCid } from '@subsocial/types';

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

export class OptionIpfsCid extends OptionText {}

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

export class None extends Null {}
export class Raw extends Text {}
export class IPFS extends Text {}
export class Hyper extends Text {}

export type ContentEnum =
  None |
  Raw |
  IPFS |
  Hyper

type ContentEnumValue =
  { None: None } |
  { Raw: Raw } |
  { IPFS: IPFS } |
  { Hyper: Hyper};

export class Content extends Enum implements IContent {
  constructor (value?: ContentEnumValue) {
    super(
      registry,
      {
        None,
        Raw,
        IPFS,
        Hyper
      }, value);
  }

  get isNone (): boolean {
    return this.type === 'None'
  }

  get isRaw (): boolean {
    return this.type === 'Raw'
  }

  get isIpfs (): boolean {
    return this.type === 'IPFS'
  }

  get isHyper (): boolean {
    return this.type === 'Hyper'
  }

  get asHyper (): Hyper {
    return this.value as Hyper;
  }

  get asRaw (): Raw {
    return this.value as Raw;
  }

  get asIpfs (): IPFS {
    return this.value as IPFS
  }
}

const createIpfsContent = (value: IpfsCid) => ({ IPFS: new Text(registry, value) })
const createNoneContent = () => ({ None: new Null(registry) })
const createContent = (value?: IpfsContentValue) => nonEmptyStr(value)
  ? createIpfsContent(value)
  : createNoneContent()

type IpfsContentValue = IpfsCid | null

export class OptionContent extends Option<Content> {
  constructor (value: ContentEnumValue) {
    super(registry, 'Option<Content>', value)
  }
}

export class OptionIpfsContent extends OptionContent {
  constructor (value?: IpfsContentValue) {
    super(createContent(value))
  }
}
export class IpfsContent extends Content {
  constructor (value?: IpfsContentValue) {
    super(createContent(value))
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

export type SpaceUpdateType = {
  handle: OptionOptionText;
  content: OptionContent;
  hidden: Option<bool>
};

export class SpaceUpdate extends Struct {
  constructor (value?: SpaceUpdateType) {
    super(
      registry,
      {
        handle: 'Option<Option<Text>>' as any,
        content: 'Option<Content>',
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

  get content (): OptionContent {
    return this.get('content') as OptionContent;
  }

  set content (value: OptionContent) {
    this.set('content', value);
  }

  set handle (value: OptionOptionText) {
    this.set('handle', value);
  }
}

export type PostUpdateType = {
  space_id: Option<SpaceId>;
  content: OptionContent;
  hidden: Option<bool>
};

export class PostUpdate extends Struct {
  constructor (value?: PostUpdateType) {
    super(
      registry,
      {
        space_id: 'Option<u64>',
        content: 'Option<Content>',
        hidden: 'Option<bool>'
      },
      value
    );
  }

  get content (): OptionContent {
    return this.get('content') as OptionContent;
  }

  set content (value: OptionContent) {
    this.set('content', value);
  }
}

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
  handle: OptionText;
  content: OptionContent;
};

export class ProfileUpdate extends Struct {
  constructor (value?: ProfileUpdateType) {
    super(
      registry,
      {
        handle: 'Option<Text>',
        content: 'Option<Content>'
      },
      value
    );
  }

  get content (): OptionContent {
    return this.get('content') as OptionContent;
  }

  get handle (): OptionText {
    return this.get('handle') as OptionText;
  }

  set content (value: OptionContent) {
    this.set('content', value);
  }

  set handle (value: OptionText) {
    this.set('handle', value);
  }
}
