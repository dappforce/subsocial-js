// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable @typescript-eslint/no-empty-interface */

import { Enum, Option, Struct, Vec } from '@polkadot/types/codec';
import { Text, i32, u16, u32, u64 } from '@polkadot/types/primitive';
import { AccountId, BlockNumber, Moment } from '@subsocial/types/interfaces/runtime';

/** @name Blog */
export interface Blog extends Struct {
  readonly id: BlogId;
  readonly created: Change;
  readonly updated: Option<Change>;
  readonly writers: VecAccountId;
  readonly slug: Text;
  readonly ipfs_hash: IpfsHash;
  readonly posts_count: u16;
  readonly followers_count: u32;
  readonly edit_history: Vec<BlogHistoryRecord>;
  readonly score: Score;
}

/** @name BlogHistoryRecord */
export interface BlogHistoryRecord extends Struct {
  readonly edited: Change;
  readonly old_data: BlogUpdate;
}

/** @name BlogId */
export interface BlogId extends u64 {}

/** @name BlogUpdate */
export interface BlogUpdate extends Struct {
  readonly writers: OptionVecAccountId;
  readonly slug: OptionText;
  readonly ipfs_hash: OptionIpfsHash;
}

/** @name Change */
export interface Change extends Struct {
  readonly account: AccountId;
  readonly block: BlockNumber;
  readonly time: Moment;
}

/** @name Comment */
export interface Comment extends Struct {
  readonly id: CommentId;
  readonly parent_id: OptionCommentId;
  readonly post_id: PostId;
  readonly created: Change;
  readonly updated: OptionChange;
  readonly ipfs_hash: IpfsHash;
  readonly upvotes_count: u16;
  readonly downvotes_count: u16;
  readonly shares_count: u16;
  readonly direct_replies_count: u16;
  readonly edit_history: VecCommentHistoryRecord;
  readonly score: Score;
}

/** @name CommentHistoryRecord */
export interface CommentHistoryRecord extends Struct {
  readonly edited: Change;
  readonly old_data: CommentUpdate;
}

/** @name CommentId */
export interface CommentId extends u64 {}

/** @name CommentUpdate */
export interface CommentUpdate extends Struct {
  readonly ipfs_hash: IpfsHash;
}

/** @name IpfsHash */
export interface IpfsHash extends Text {}

/** @name OptionBlogId */
export interface OptionBlogId extends Option<BlogId> {}

/** @name OptionChange */
export interface OptionChange extends Option<Change> {}

/** @name OptionCommentId */
export interface OptionCommentId extends Option<CommentId> {}

/** @name OptionIpfsHash */
export interface OptionIpfsHash extends Option<IpfsHash> {}

/** @name OptionProfile */
export interface OptionProfile extends Option<Profile> {}

/** @name OptionText */
export interface OptionText extends Option<Text> {}

/** @name OptionVecAccountId */
export interface OptionVecAccountId extends Option<VecAccountId> {}

/** @name Post */
export interface Post extends Struct {
  readonly id: PostId;
  readonly blog_id: BlogId;
  readonly created: Change;
  readonly updated: OptionChange;
  readonly extension: PostExtension;
  readonly ipfs_hash: IpfsHash;
  readonly comments_count: u16;
  readonly upvotes_count: u16;
  readonly downvotes_count: u16;
  readonly shares_count: u16;
  readonly edit_history: Vec<PostHistoryRecord>;
  readonly score: Score;
}

/** @name PostExtension */
export interface PostExtension extends Enum {
  readonly isRegularPost: boolean;
  readonly isSharedPost: boolean;
  readonly asSharedPost: PostId;
  readonly isSharedComment: boolean;
  readonly asSharedComment: CommentId;
}

/** @name PostHistoryRecord */
export interface PostHistoryRecord extends Struct {
  readonly edited: Change;
  readonly old_data: PostUpdate;
}

/** @name PostId */
export interface PostId extends u64 {}

/** @name PostUpdate */
export interface PostUpdate extends Struct {
  readonly blog_id: OptionBlogId;
  readonly ipfs_hash: OptionIpfsHash;
}

/** @name Profile */
export interface Profile extends Struct {
  readonly created: Change;
  readonly updated: OptionChange;
  readonly username: Text;
  readonly ipfs_hash: IpfsHash;
  readonly edit_history: Vec<ProfileHistoryRecord>;
}

/** @name ProfileHistoryRecord */
export interface ProfileHistoryRecord extends Struct {
  readonly edited: Change;
  readonly old_data: ProfileUpdate;
}

/** @name ProfileUpdate */
export interface ProfileUpdate extends Struct {
  readonly username: OptionText;
  readonly ipfs_hash: OptionIpfsHash;
}

/** @name Reaction */
export interface Reaction extends Struct {
  readonly id: ReactionId;
  readonly created: Change;
  readonly updated: OptionChange;
  readonly kind: ReactionKind;
}

/** @name ReactionId */
export interface ReactionId extends u64 {}

/** @name ReactionKind */
export interface ReactionKind extends Enum {
  readonly isUpvote: boolean;
  readonly isDownvote: boolean;
}

/** @name Score */
export interface Score extends i32 {}

/** @name ScoringAction */
export interface ScoringAction extends Enum {
  readonly isUpvotePost: boolean;
  readonly isDownvotePost: boolean;
  readonly isSharePost: boolean;
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
  readonly profile: OptionProfile;
}

/** @name VecAccountId */
export interface VecAccountId extends Vec<AccountId> {}

/** @name VecCommentHistoryRecord */
export interface VecCommentHistoryRecord extends Vec<CommentHistoryRecord> {}

/** @name VecProfileHistoryRecord */
export interface VecProfileHistoryRecord extends Vec<ProfileHistoryRecord> {}
