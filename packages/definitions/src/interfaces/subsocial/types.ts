// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { BTreeSet, Enum, Option, Struct, Text, Vec, bool, u16, u64 } from '@polkadot/types-codec';
import type { AccountId, Balance, BlockNumber, Moment } from '@polkadot/types/interfaces/runtime';
import type { AccountInfoWithTripleRefCount } from '@polkadot/types/interfaces/system';

/** @name AccountInfo */
export interface AccountInfo extends AccountInfoWithTripleRefCount {}

/** @name Address */
export interface Address extends AccountId {}

/** @name Comment */
export interface Comment extends Struct {
  readonly parentId: Option<PostId>;
  readonly rootPostId: PostId;
}

/** @name Content */
export interface Content extends Enum {
  readonly isNone: boolean;
  readonly isRaw: boolean;
  readonly asRaw: Text;
  readonly isIpfs: boolean;
  readonly asIpfs: Text;
  readonly isHyper: boolean;
  readonly asHyper: Text;
  readonly type: 'None' | 'Raw' | 'Ipfs' | 'Hyper';
}

/** @name EntityId */
export interface EntityId extends Enum {
  readonly isContent: boolean;
  readonly asContent: Content;
  readonly isAccount: boolean;
  readonly asAccount: AccountId;
  readonly isSpace: boolean;
  readonly asSpace: SpaceId;
  readonly isPost: boolean;
  readonly asPost: PostId;
  readonly type: 'Content' | 'Account' | 'Space' | 'Post';
}

/** @name EntityStatus */
export interface EntityStatus extends Enum {
  readonly isAllowed: boolean;
  readonly isBlocked: boolean;
  readonly type: 'Allowed' | 'Blocked';
}

/** @name Faucet */
export interface Faucet extends Struct {
  readonly enabled: bool;
  readonly period: BlockNumber;
  readonly periodLimit: Balance;
  readonly dripLimit: Balance;
  readonly nextPeriodAt: BlockNumber;
  readonly drippedInCurrentPeriod: Balance;
}

/** @name FaucetSettings */
export interface FaucetSettings extends Struct {
  readonly period: Option<BlockNumber>;
  readonly periodLimit: Balance;
}

/** @name FaucetSettingsUpdate */
export interface FaucetSettingsUpdate extends Struct {
  readonly period: Option<Option<BlockNumber>>;
  readonly periodLimit: Option<Balance>;
}

/** @name FaucetUpdate */
export interface FaucetUpdate extends Struct {
  readonly enabled: Option<bool>;
  readonly period: Option<BlockNumber>;
  readonly periodLimit: Option<Balance>;
  readonly dripLimit: Option<Balance>;
}

/** @name IpfsCid */
export interface IpfsCid extends Text {}

/** @name LookupSource */
export interface LookupSource extends AccountId {}

/** @name Post */
export interface Post extends Struct {
  readonly id: PostId;
  readonly created: WhoAndWhen;
  readonly edited: bool;
  readonly owner: AccountId;
  readonly extension: PostExtension;
  readonly spaceId: Option<SpaceId>;
  readonly content: Content;
  readonly hidden: bool;
  readonly upvotesCount: u16;
  readonly downvotesCount: u16;
}

/** @name PostExtension */
export interface PostExtension extends Enum {
  readonly isRegularPost: boolean;
  readonly isComment: boolean;
  readonly asComment: Comment;
  readonly isSharedPost: boolean;
  readonly asSharedPost: PostId;
  readonly type: 'RegularPost' | 'Comment' | 'SharedPost';
}

/** @name PostId */
export interface PostId extends u64 {}

/** @name PostUpdate */
export interface PostUpdate extends Struct {
  readonly spaceId: Option<SpaceId>;
  readonly content: Option<Content>;
  readonly hidden: Option<bool>;
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
  readonly type: 'Upvote' | 'Downvote';
}

/** @name Report */
export interface Report extends Struct {
  readonly id: ReportId;
  readonly created: WhoAndWhen;
  readonly reportedEntity: EntityId;
  readonly reportedWithin: SpaceId;
  readonly reason: Content;
}

/** @name ReportId */
export interface ReportId extends u64 {}

/** @name Role */
export interface Role extends Struct {
  readonly created: WhoAndWhen;
  readonly updated: Option<WhoAndWhen>;
  readonly id: RoleId;
  readonly spaceId: SpaceId;
  readonly disabled: bool;
  readonly expiresAt: Option<BlockNumber>;
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
  readonly type: 'UpvotePost' | 'DownvotePost' | 'SharePost' | 'CreateComment' | 'UpvoteComment' | 'DownvoteComment' | 'ShareComment' | 'FollowSpace' | 'FollowAccount';
}

/** @name Space */
export interface Space extends Struct {
  readonly id: SpaceId;
  readonly created: WhoAndWhen;
  readonly edited: bool;
  readonly owner: AccountId;
  readonly parentId: Option<SpaceId>;
  readonly content: Content;
  readonly hidden: bool;
  readonly permissions: Option<SpacePermissions>;
}

/** @name SpaceId */
export interface SpaceId extends u64 {}

/** @name SpaceModerationSettings */
export interface SpaceModerationSettings extends Struct {
  readonly autoblockThreshold: Option<u16>;
}

/** @name SpaceModerationSettingsUpdate */
export interface SpaceModerationSettingsUpdate extends Struct {
  readonly autoblockThreshold: Option<Option<u16>>;
}

/** @name SpaceOwners */
export interface SpaceOwners extends Struct {
  readonly created: WhoAndWhen;
  readonly spaceId: SpaceId;
  readonly owners: Vec<AccountId>;
  readonly threshold: u16;
  readonly changesCount: u16;
}

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
  readonly type: 'ManageRoles' | 'RepresentSpaceInternally' | 'RepresentSpaceExternally' | 'UpdateSpace' | 'CreateSubspaces' | 'UpdateOwnSubspaces' | 'DeleteOwnSubspaces' | 'HideOwnSubspaces' | 'UpdateAnySubspace' | 'DeleteAnySubspace' | 'HideAnySubspace' | 'CreatePosts' | 'UpdateOwnPosts' | 'DeleteOwnPosts' | 'HideOwnPosts' | 'UpdateAnyPost' | 'DeleteAnyPost' | 'HideAnyPost' | 'CreateComments' | 'UpdateOwnComments' | 'DeleteOwnComments' | 'HideOwnComments' | 'HideAnyComment' | 'Upvote' | 'Downvote' | 'Share' | 'OverrideSubspacePermissions' | 'OverridePostPermissions' | 'SuggestEntityStatus' | 'UpdateEntityStatus' | 'UpdateSpaceSettings';
}

/** @name SpacePermissions */
export interface SpacePermissions extends Struct {
  readonly none: Option<SpacePermissionSet>;
  readonly everyone: Option<SpacePermissionSet>;
  readonly follower: Option<SpacePermissionSet>;
  readonly spaceOwner: Option<SpacePermissionSet>;
}

/** @name SpacePermissionsContext */
export interface SpacePermissionsContext extends Struct {
  readonly spaceId: SpaceId;
  readonly isSpaceOwner: bool;
  readonly isSpaceFollower: bool;
  readonly spacePerms: Option<SpacePermissions>;
}

/** @name SpacePermissionSet */
export interface SpacePermissionSet extends BTreeSet<SpacePermission> {}

/** @name SpacesSettings */
export interface SpacesSettings extends Struct {
  readonly handlesEnabled: bool;
}

/** @name SpaceUpdate */
export interface SpaceUpdate extends Struct {
  readonly parentId: Option<Option<SpaceId>>;
  readonly content: Option<Content>;
  readonly hidden: Option<bool>;
  readonly permissions: Option<Option<SpacePermissions>>;
}

/** @name SuggestedStatus */
export interface SuggestedStatus extends Struct {
  readonly suggested: WhoAndWhen;
  readonly status: Option<EntityStatus>;
  readonly reportId: Option<ReportId>;
}

/** @name User */
export interface User extends Enum {
  readonly isAccount: boolean;
  readonly asAccount: AccountId;
  readonly isSpace: boolean;
  readonly asSpace: SpaceId;
  readonly type: 'Account' | 'Space';
}

/** @name WhoAndWhen */
export interface WhoAndWhen extends Struct {
  readonly account: AccountId;
  readonly block: BlockNumber;
  readonly time: Moment;
}

export type PHANTOM_SUBSOCIAL = 'subsocial';
