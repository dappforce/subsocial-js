// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { BTreeSet, Enum, Option, Struct, Vec } from '@polkadot/types/codec';
import { Text, bool, i32, u16, u32, u64 } from '@polkadot/types/primitive';
import { AccountId, BlockNumber, Moment } from '@subsocial/types/substrate/interfaces/runtime';

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
  readonly space_id: Option<SpaceId>;
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
  readonly isRegularPost: boolean;
  readonly isComment: boolean;
  readonly asComment: CommentExt;
  readonly isSharedPost: boolean;
  readonly asSharedPost: PostId;
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
  readonly space_id: Option<SpaceId>;
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

/** @name Role */
export interface Role extends Struct {
  readonly created: WhoAndWhen;
  readonly updated: Option<WhoAndWhen>;
  readonly id: RoleId;
  readonly space_id: SpaceId;
  readonly disabled: bool;
  readonly expires_at: Option<BlockNumber>;
  readonly ipfs_hash: Option<IpfsHash>;
  readonly permissions: SpacePermissionSet;
}

/** @name RoleId */
export interface RoleId extends u64 {}

/** @name RoleUpdate */
export interface RoleUpdate extends Struct {
  readonly disabled: Option<bool>;
  readonly ipfs_hash: Option<Option<IpfsHash>>;
  readonly permissions: Option<SpacePermissionSet>;
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
  readonly isFollowSpace: boolean;
  readonly isFollowAccount: boolean;
}

/** @name SocialAccount */
export interface SocialAccount extends Struct {
  readonly followers_count: u32;
  readonly following_accounts_count: u16;
  readonly following_spaces_count: u16;
  readonly reputation: u32;
  readonly profile: Option<Profile>;
}

/** @name Space */
export interface Space extends Struct {
  readonly id: SpaceId;
  readonly created: WhoAndWhen;
  readonly updated: Option<WhoAndWhen>;
  readonly hidden: bool;
  readonly owner: AccountId;
  readonly handle: Option<Text>;
  readonly ipfs_hash: IpfsHash;
  readonly posts_count: u16;
  readonly followers_count: u32;
  readonly edit_history: Vec<SpaceHistoryRecord>;
  readonly score: i32;
  readonly permissions: Option<SpacePermissions>;
}

/** @name SpaceForRoles */
export interface SpaceForRoles extends Struct {
  readonly owner: AccountId;
  readonly permissions: Option<SpacePermissions>;
}

/** @name SpaceHistoryRecord */
export interface SpaceHistoryRecord extends Struct {
  readonly edited: WhoAndWhen;
  readonly old_data: SpaceUpdate;
}

/** @name SpaceId */
export interface SpaceId extends u64 {}

/** @name SpacePermission */
export interface SpacePermission extends Enum {
  readonly isManageRoles: boolean;
  readonly isRepresentSpaceInternally: boolean;
  readonly isRepresentSpaceExternally: boolean;
  readonly isUpdateSpace: boolean;
  readonly isBlockUsers: boolean;
  readonly isCreateSubspaces: boolean;
  readonly isUpdateOwnSubspaces: boolean;
  readonly isUpdateAnySubspaces: boolean;
  readonly isDeleteOwnSubspaces: boolean;
  readonly isBlockSubspaces: boolean;
  readonly isCreatePosts: boolean;
  readonly isUpdateOwnPosts: boolean;
  readonly isUpdateAnyPosts: boolean;
  readonly isDeleteOwnPosts: boolean;
  readonly isBlockPosts: boolean;
  readonly isCreateComments: boolean;
  readonly isUpdateOwnComments: boolean;
  readonly isDeleteOwnComments: boolean;
  readonly isBlockComments: boolean;
  readonly isUpvote: boolean;
  readonly isDownvote: boolean;
  readonly isShare: boolean;
  readonly isOverridePostPermissions: boolean;
}

/** @name SpacePermissions */
export interface SpacePermissions extends Struct {
  readonly none: Option<SpacePermissionSet>;
  readonly everyone: Option<SpacePermissionSet>;
  readonly follower: Option<SpacePermissionSet>;
  readonly space_owner: Option<SpacePermissionSet>;
}

/** @name SpacePermissionsContext */
export interface SpacePermissionsContext extends Struct {
  readonly space_id: SpaceId;
  readonly is_space_owner: bool;
  readonly is_space_follower: bool;
  readonly space_perms: Option<SpacePermissionSet>;
}

/** @name SpacePermissionSet */
export interface SpacePermissionSet extends BTreeSet<SpacePermission> {}

/** @name SpaceUpdate */
export interface SpaceUpdate extends Struct {
  readonly handle: Option<Option<Text>>;
  readonly ipfs_hash: Option<IpfsHash>;
  readonly hidden: Option<bool>;
}

/** @name User */
export interface User extends Enum {
  readonly isAccount: boolean;
  readonly asAccount: AccountId;
  readonly isSpace: boolean;
  readonly asSpace: SpaceId;
}

/** @name WhoAndWhen */
export interface WhoAndWhen extends Struct {
  readonly account: AccountId;
  readonly block: BlockNumber;
  readonly time: Moment;
}

export type PHANTOM_SUBSOCIAL = 'subsocial';
