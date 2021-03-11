// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { BTreeSet, Enum, Option, Struct, Text, Vec, bool, i32, u16, u32, u64 } from '@polkadot/types';
import type { AccountData } from '@polkadot/types/interfaces/balances';
import type { AccountId, Balance, BlockNumber, Index, Moment } from '@polkadot/types/interfaces/runtime';

/** @name AccountInfo */
export interface AccountInfo extends Struct {
  readonly nonce: Index;
  readonly consumers: RefCount;
  readonly providers: RefCount;
  readonly data: AccountData;
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
  readonly asIpfs: Text;
  readonly isHyper: boolean;
  readonly asHyper: Text;
}

/** @name Donation */
export interface Donation extends Struct {
  readonly id: DonationId;
  readonly created: WhoAndWhen;
  readonly recipient: DonationRecipient;
  readonly donation_wallet: AccountId;
  readonly amount: Balance;
  readonly comment_id: Option<PostId>;
}

/** @name DonationId */
export interface DonationId extends u64 {}

/** @name DonationRecipient */
export interface DonationRecipient extends Enum {
  readonly isAccount: boolean;
  readonly asAccount: AccountId;
  readonly isSpace: boolean;
  readonly asSpace: SpaceId;
  readonly isPost: boolean;
  readonly asPost: PostId;
}

/** @name DonationSettings */
export interface DonationSettings extends Struct {
  readonly donations_allowed: bool;
  readonly min_amount: Option<Balance>;
  readonly max_amount: Option<Balance>;
}

/** @name DonationSettingsUpdate */
export interface DonationSettingsUpdate extends Struct {
  readonly donations_allowed: Option<bool>;
  readonly min_amount: Option<Option<Balance>>;
  readonly max_amount: Option<Option<Balance>>;
}

/** @name Drop */
export interface Drop extends Struct {
  readonly id: DropId;
  readonly first_drop_at: BlockNumber;
  readonly total_dropped: Balance;
}

/** @name DropId */
export interface DropId extends u64 {}

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
}

/** @name EntityStatus */
export interface EntityStatus extends Enum {
  readonly isAllowed: boolean;
  readonly isBlocked: boolean;
}

/** @name Faucet */
export interface Faucet extends Struct {
  readonly enabled: bool;
  readonly period: BlockNumber;
  readonly period_limit: Balance;
  readonly drip_limit: Balance;
  readonly next_period_at: BlockNumber;
  readonly dripped_in_current_period: Balance;
}

/** @name FaucetSettings */
export interface FaucetSettings extends Struct {
  readonly period: Option<BlockNumber>;
  readonly period_limit: Balance;
}

/** @name FaucetSettingsUpdate */
export interface FaucetSettingsUpdate extends Struct {
  readonly period: Option<Option<BlockNumber>>;
  readonly period_limit: Option<Balance>;
}

/** @name FaucetUpdate */
export interface FaucetUpdate extends Struct {
  readonly enabled: Option<bool>;
  readonly period: Option<BlockNumber>;
  readonly period_limit: Option<Balance>;
  readonly drip_limit: Option<Balance>;
}

/** @name IpfsCid */
export interface IpfsCid extends Text {}

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
  readonly content: Content;
}

/** @name ProfileHistoryRecord */
export interface ProfileHistoryRecord extends Struct {
  readonly edited: WhoAndWhen;
  readonly old_data: ProfileUpdate;
}

/** @name ProfileUpdate */
export interface ProfileUpdate extends Struct {
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

/** @name RefCount */
export interface RefCount extends u32 {}

/** @name Report */
export interface Report extends Struct {
  readonly id: ReportId;
  readonly created: WhoAndWhen;
  readonly reported_entity: EntityId;
  readonly reported_within: SpaceId;
  readonly reason: Content;
}

/** @name ReportId */
export interface ReportId extends u64 {}

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

/** @name SessionKey */
export interface SessionKey extends Struct {
  readonly created: WhoAndWhen;
  readonly updated: Option<WhoAndWhen>;
  readonly expires_at: BlockNumber;
  readonly limit: Option<Balance>;
  readonly spent: Balance;
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

/** @name SpaceHistoryRecord */
export interface SpaceHistoryRecord extends Struct {
  readonly edited: WhoAndWhen;
  readonly old_data: SpaceUpdate;
}

/** @name SpaceId */
export interface SpaceId extends u64 {}

/** @name SpaceModerationSettings */
export interface SpaceModerationSettings extends Struct {
  readonly autoblock_threshold: Option<u16>;
}

/** @name SpaceModerationSettingsUpdate */
export interface SpaceModerationSettingsUpdate extends Struct {
  readonly autoblock_threshold: Option<Option<u16>>;
}

/** @name SpaceOwners */
export interface SpaceOwners extends Struct {
  readonly created: WhoAndWhen;
  readonly space_id: SpaceId;
  readonly owners: Vec<AccountId>;
  readonly threshold: u16;
  readonly changes_count: u16;
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

/** @name Subscription */
export interface Subscription extends Struct {
  readonly id: SubscriptionPlanId;
  readonly created: WhoAndWhen;
  readonly updated: Option<WhoAndWhen>;
  readonly is_active: bool;
  readonly wallet: Option<AccountId>;
  readonly plan_id: SubscriptionPlanId;
}

/** @name SubscriptionId */
export interface SubscriptionId extends u64 {}

/** @name SubscriptionPeriod */
export interface SubscriptionPeriod extends Enum {
  readonly isDaily: boolean;
  readonly isWeekly: boolean;
  readonly isMonthly: boolean;
  readonly isQuarterly: boolean;
  readonly isYearly: boolean;
  readonly isCustom: boolean;
  readonly asCustom: BlockNumber;
}

/** @name SubscriptionPlan */
export interface SubscriptionPlan extends Struct {
  readonly id: SubscriptionPlanId;
  readonly created: WhoAndWhen;
  readonly updated: Option<WhoAndWhen>;
  readonly is_active: bool;
  readonly content: Content;
  readonly space_id: SpaceId;
  readonly wallet: Option<AccountId>;
  readonly price: Balance;
  readonly period: SubscriptionPeriod;
}

/** @name SubscriptionPlanId */
export interface SubscriptionPlanId extends u64 {}

/** @name SuggestedStatus */
export interface SuggestedStatus extends Struct {
  readonly suggested: WhoAndWhen;
  readonly status: Option<EntityStatus>;
  readonly report_id: Option<ReportId>;
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
