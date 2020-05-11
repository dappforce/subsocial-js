// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Enum, Option, Struct, Vec } from '@polkadot/types/codec';
import { Text, bool, i32, u16, u32, u64, Null } from '@polkadot/types/primitive';
import { AccountId, BlockNumber, Moment } from '@subsocial/types/substrate/interfaces/runtime';

/** @name Blog */
export interface Blog extends Struct {
  readonly id: BlogId;
  readonly created: WhoAndWhen;
  readonly updated: Option<WhoAndWhen>;
  readonly hidden: bool;
  readonly writers: Vec<AccountId>;
  readonly handle: Option<Text>;
  readonly ipfs_hash: IpfsHash;
  readonly posts_count: u16;
  readonly followers_count: u32;
  readonly edit_history: Vec<BlogHistoryRecord>;
  readonly score: i32;
}

/** @name BlogHistoryRecord */
export interface BlogHistoryRecord extends Struct {
  readonly edited: WhoAndWhen;
  readonly old_data: BlogUpdate;
}

/** @name BlogId */
export interface BlogId extends u64 {}

/** @name BlogUpdate */
export interface BlogUpdate extends Struct {
  readonly writers: Option<Vec<AccountId>>;
  readonly handle: Option<Option<Text>>;
  readonly ipfs_hash: Option<IpfsHash>;
}

/** @name Change */
export interface Change extends Struct {
  readonly created: WhoAndWhen;
  readonly id: ChangeId;
  readonly space_id: SpaceId;
  readonly add_owners: Vec<AccountId>;
  readonly remove_owners: Vec<AccountId>;
  readonly new_threshold: Option<u16>;
  readonly notes: Text;
  readonly confirmed_by: Vec<AccountId>;
  readonly expires_at: BlockNumber;
}

/** @name ChangeId */
export interface ChangeId extends u64 {}

/** @name CommentExt */
export interface CommentExt extends Struct {
  readonly parent_id: Option<PostId>;
  readonly root_post_id: PostId;
}

/** @name IpfsHash */
export interface IpfsHash extends Text {}

/** @name OptionVecAccountId */
export interface OptionVecAccountId extends Option<Vec<AccountId>> {}

/** @name Post */
export interface Post extends Struct {
  readonly id: PostId;
  readonly created: WhoAndWhen;
  readonly updated: Option<WhoAndWhen>;
  readonly hidden: bool;
  readonly blog_id: Option<BlogId>;
  readonly extension: PostExtension;
  readonly ipfs_hash: IpfsHash;
  readonly edit_history: Vec<PostHistoryRecord>;
  readonly direct_replies_count: u16;
  readonly total_replies_count: u32;
  readonly shares_count: u16;
  readonly upvotes_count: u16;
  readonly downvotes_count: u16;
  readonly score: i32;
}

/** @name PostExtension */
export interface PostExtension extends Enum {
  readonly RegularPost: Null;
  readonly Comment: CommentExt;
  readonly SharedPost: PostId;
}

/** @name PostHistoryRecord */
export interface PostHistoryRecord extends Struct {
  readonly edited: WhoAndWhen;
  readonly old_data: PostUpdate;
}

/** @name PostId */
export interface PostId extends u64 {}

/** @name PostUpdate */
export interface PostUpdate extends Struct {
  readonly blog_id: Option<BlogId>;
  readonly ipfs_hash: Option<IpfsHash>;
  readonly hidden: Option<bool>;
}

/** @name Profile */
export interface Profile extends Struct {
  readonly created: WhoAndWhen;
  readonly updated: Option<WhoAndWhen>;
  readonly username: Text;
  readonly ipfs_hash: IpfsHash;
  readonly edit_history: Vec<ProfileHistoryRecord>;
}

/** @name ProfileHistoryRecord */
export interface ProfileHistoryRecord extends Struct {
  readonly edited: WhoAndWhen;
  readonly old_data: ProfileUpdate;
}

/** @name ProfileUpdate */
export interface ProfileUpdate extends Struct {
  readonly username: Option<Text>;
  readonly ipfs_hash: Option<IpfsHash>;
}

/** @name Reaction */
export interface Reaction extends Struct {
  readonly id: ReactionId;
  readonly created: WhoAndWhen;
  readonly updated: Option<WhoAndWhen>;
  readonly kind: ReactionKind;
}

/** @name ReactionId */
export interface ReactionId extends u64 {}

/** @name ReactionKind */
export interface ReactionKind extends Enum {
  readonly isUpvote: boolean;
  readonly isDownvote: boolean;
}

/** @name ScoringAction */
export interface ScoringAction extends Enum {
  readonly isUpvotePost: boolean;
  readonly isDownvotePost: boolean;
  readonly isSharePost: boolean;
  readonly isCreateComment: boolean;
  readonly isUpvoteComment: boolean;
  readonly isDownvoteComment: boolean;
  readonly isShareComment: boolean;
  readonly isFollowBlog: boolean;
  readonly isFollowAccount: boolean;
}

/** @name SocialAccount */
export interface SocialAccount extends Struct {
  readonly followers_count: u32;
  readonly following_accounts_count: u16;
  readonly following_blogs_count: u16;
  readonly reputation: u32;
  readonly profile: Option<Profile>;
}

/** @name SpaceId */
export interface SpaceId extends u64 {}

/** @name SpaceOwners */
export interface SpaceOwners extends Struct {
  readonly created: WhoAndWhen;
  readonly space_id: SpaceId;
  readonly owners: Vec<AccountId>;
  readonly threshold: u16;
  readonly changes_count: u64;
}

/** @name WhoAndWhen */
export interface WhoAndWhen extends Struct {
  readonly account: AccountId;
  readonly block: BlockNumber;
  readonly time: Moment;
}

export type PHANTOM_SUBSOCIAL = 'subsocial';
