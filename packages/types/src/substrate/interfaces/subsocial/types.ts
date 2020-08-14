// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { BTreeSet, Enum, Option, Struct } from '@polkadot/types/codec';
import { Text, bool, i32, u16, u32, u64 } from '@polkadot/types/primitive';
import { AccountId, Moment } from '@polkadot/types/interfaces/runtime';

/** @name Address */
export interface Address extends AccountId {}

/** @name BlockNumber */
export interface BlockNumber extends u32 {}

/** @name Comment */
export interface Comment extends Struct {
  readonly parent_id: Option<PostId>;
  readonly root_post_id: PostId;
}

/** @name Content */
export interface Content extends Enum {
  readonly isNone: boolean;
  readonly isRaw: boolean;
  readonly asRaw: Text;
  readonly isIpfs: boolean;
  readonly asIpfs: IpfsCid;
  readonly isHyper: boolean;
  readonly asHyper: Text;
}

/** @name IpfsCid */
export interface IpfsCid extends Text {}

/** @name LookupSource */
export interface LookupSource extends AccountId {}

/** @name Post */
export interface Post extends Struct {
  readonly id: PostId;
  readonly created: WhoAndWhen;
  readonly updated: Option<WhoAndWhen>;
  readonly owner: AccountId;
  readonly extension: PostExtension;
  readonly space_id: Option<SpaceId>;
  readonly content: Content;
  readonly hidden: bool;
  readonly replies_count: u16;
  readonly hidden_replies_count: u16;
  readonly shares_count: u16;
  readonly upvotes_count: u16;
  readonly downvotes_count: u16;
  readonly score: i32;
}

/** @name PostExtension */
export interface PostExtension extends Enum {
  readonly isRegularPost: boolean;
  readonly isComment: boolean;
  readonly asComment: Comment;
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
  readonly content: Option<Content>;
  readonly hidden: Option<bool>;
}

/** @name Profile */
export interface Profile extends Struct {
  readonly created: WhoAndWhen;
  readonly updated: Option<WhoAndWhen>;
  readonly handle: Text;
  readonly content: Content;
}

/** @name ProfileHistoryRecord */
export interface ProfileHistoryRecord extends Struct {
  readonly edited: WhoAndWhen;
  readonly old_data: ProfileUpdate;
}

/** @name ProfileUpdate */
export interface ProfileUpdate extends Struct {
  readonly handle: Option<Text>;
  readonly content: Option<Content>;
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
  readonly content: Content;
  readonly permissions: SpacePermissionSet;
}

/** @name RoleId */
export interface RoleId extends u64 {}

/** @name RoleUpdate */
export interface RoleUpdate extends Struct {
  readonly disabled: Option<bool>;
  readonly content: Option<Content>;
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
  readonly owner: AccountId;
  readonly parent_id: Option<SpaceId>;
  readonly handle: Option<Text>;
  readonly content: Content;
  readonly hidden: bool;
  readonly posts_count: u32;
  readonly hidden_posts_count: u32;
  readonly followers_count: u32;
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
  readonly isCreateSubspaces: boolean;
  readonly isUpdateOwnSubspaces: boolean;
  readonly isDeleteOwnSubspaces: boolean;
  readonly isHideOwnSubspaces: boolean;
  readonly isUpdateAnySubspace: boolean;
  readonly isDeleteAnySubspace: boolean;
  readonly isHideAnySubspace: boolean;
  readonly isCreatePosts: boolean;
  readonly isUpdateOwnPosts: boolean;
  readonly isDeleteOwnPosts: boolean;
  readonly isHideOwnPosts: boolean;
  readonly isUpdateAnyPost: boolean;
  readonly isDeleteAnyPost: boolean;
  readonly isHideAnyPost: boolean;
  readonly isCreateComments: boolean;
  readonly isUpdateOwnComments: boolean;
  readonly isDeleteOwnComments: boolean;
  readonly isHideOwnComments: boolean;
  readonly isHideAnyComment: boolean;
  readonly isUpvote: boolean;
  readonly isDownvote: boolean;
  readonly isShare: boolean;
  readonly isOverrideSubspacePermissions: boolean;
  readonly isOverridePostPermissions: boolean;
  readonly isSuggestEntityStatus: boolean;
  readonly isUpdateEntityStatus: boolean;
  readonly isUpdateSpaceSettings: boolean;
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
  readonly space_perms: Option<SpacePermissions>;
}

/** @name SpacePermissionSet */
export interface SpacePermissionSet extends BTreeSet<SpacePermission> {}

/** @name SpaceUpdate */
export interface SpaceUpdate extends Struct {
  readonly parent_id: Option<Option<SpaceId>>;
  readonly handle: Option<Option<Text>>;
  readonly content: Option<Content>;
  readonly hidden: Option<bool>;
  readonly permissions: Option<Option<SpacePermissions>>;
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
