// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';

declare module '@polkadot/api-base/types/errors' {
  export interface AugmentedErrors<ApiType extends ApiTypes> {
    balances: {
      /**
       * Beneficiary account must pre-exist
       **/
      DeadAccount: AugmentedError<ApiType>;
      /**
       * Value too low to create account due to existential deposit
       **/
      ExistentialDeposit: AugmentedError<ApiType>;
      /**
       * A vesting schedule already exists for this account
       **/
      ExistingVestingSchedule: AugmentedError<ApiType>;
      /**
       * Balance too low to send value
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * Transfer/payment would kill account
       **/
      KeepAlive: AugmentedError<ApiType>;
      /**
       * Account liquidity restrictions prevent withdrawal
       **/
      LiquidityRestrictions: AugmentedError<ApiType>;
      /**
       * Number of named reserves exceed MaxReserves
       **/
      TooManyReserves: AugmentedError<ApiType>;
      /**
       * Vesting balance too high to send value
       **/
      VestingBalance: AugmentedError<ApiType>;
    };
    domains: {
      /**
       * This domain is already held by another account.
       **/
      DomainAlreadyStored: AugmentedError<ApiType>;
      /**
       * The content stored in domain metadata was not changed.
       **/
      DomainContentNotChanged: AugmentedError<ApiType>;
      /**
       * The domain has expired.
       **/
      DomainHasExpired: AugmentedError<ApiType>;
      /**
       * Domain was not found by either custom domain name or top level domain.
       **/
      DomainNotFound: AugmentedError<ApiType>;
      /**
       * This domain cannot be registered yet, because it is reserved.
       **/
      DomainReserved: AugmentedError<ApiType>;
      /**
       * Cannot insert that many domains to a storage at once.
       **/
      DomainsInsertLimitReached: AugmentedError<ApiType>;
      /**
       * A new inner value is the same as the old one.
       **/
      InnerValueNotChanged: AugmentedError<ApiType>;
      /**
       * This inner value is not supported yet.
       **/
      InnerValueNotSupported: AugmentedError<ApiType>;
      /**
       * Lower than Second level domains are not allowed.
       **/
      LowerLevelDomainsNotAllowed: AugmentedError<ApiType>;
      /**
       * This account is not allowed to update the domain metadata.
       **/
      NotADomainOwner: AugmentedError<ApiType>;
      /**
       * A new outer value is the same as the old one.
       **/
      OuterValueNotChanged: AugmentedError<ApiType>;
      /**
       * Outer value exceeds its length limit.
       **/
      OuterValueOffLengthLimit: AugmentedError<ApiType>;
      /**
       * Cannot store a domain for that long period of time.
       **/
      TooBigReservationPeriod: AugmentedError<ApiType>;
      /**
       * The top level domain may contain only A-Z, 0-9 and hyphen characters.
       **/
      TopLevelDomainContainsInvalidChar: AugmentedError<ApiType>;
      /**
       * The top level domain length must be between 3 and 63 characters, inclusive.
       **/
      TopLevelDomainIsOffLengthLimits: AugmentedError<ApiType>;
      /**
       * This top level domain is not supported.
       **/
      TopLevelDomainNotSupported: AugmentedError<ApiType>;
      /**
       * Reservation period cannot be a zero value.
       **/
      ZeroReservationPeriod: AugmentedError<ApiType>;
    };
    dotsamaClaims: {
      AccountNotEligible: AugmentedError<ApiType>;
      AddingTooManyAccountsAtOnce: AugmentedError<ApiType>;
      NoRewardsSenderSet: AugmentedError<ApiType>;
      RewardsSenderHasInsufficientBalance: AugmentedError<ApiType>;
      TokensAlreadyClaimed: AugmentedError<ApiType>;
    };
    faucets: {
      DripLimitCannotExceedPeriodLimit: AugmentedError<ApiType>;
      DripLimitReached: AugmentedError<ApiType>;
      FaucetAlreadyAdded: AugmentedError<ApiType>;
      FaucetDisabled: AugmentedError<ApiType>;
      FaucetNotFound: AugmentedError<ApiType>;
      NoFaucetsProvided: AugmentedError<ApiType>;
      NoFreeBalanceOnFaucet: AugmentedError<ApiType>;
      NotEnoughFreeBalanceOnFaucet: AugmentedError<ApiType>;
      NotFaucetOwner: AugmentedError<ApiType>;
      NothingToUpdate: AugmentedError<ApiType>;
      NoUpdatesProvided: AugmentedError<ApiType>;
      PeriodLimitReached: AugmentedError<ApiType>;
      RecipientEqualsFaucet: AugmentedError<ApiType>;
      ZeroDripAmountProvided: AugmentedError<ApiType>;
      ZeroDripLimitProvided: AugmentedError<ApiType>;
      ZeroPeriodLimitProvided: AugmentedError<ApiType>;
      ZeroPeriodProvided: AugmentedError<ApiType>;
    };
    grandpa: {
      /**
       * Attempt to signal GRANDPA change with one already pending.
       **/
      ChangePending: AugmentedError<ApiType>;
      /**
       * A given equivocation report is valid but already previously reported.
       **/
      DuplicateOffenceReport: AugmentedError<ApiType>;
      /**
       * An equivocation proof provided as part of an equivocation report is invalid.
       **/
      InvalidEquivocationProof: AugmentedError<ApiType>;
      /**
       * A key ownership proof provided as part of an equivocation report is invalid.
       **/
      InvalidKeyOwnershipProof: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA pause when the authority set isn't live
       * (either paused or already pending pause).
       **/
      PauseFailed: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA resume when the authority set isn't paused
       * (either live or already pending resume).
       **/
      ResumeFailed: AugmentedError<ApiType>;
      /**
       * Cannot signal forced change so soon after last.
       **/
      TooSoon: AugmentedError<ApiType>;
    };
    multisig: {
      /**
       * Call is already approved by this signatory.
       **/
      AlreadyApproved: AugmentedError<ApiType>;
      /**
       * The data to be stored is already stored.
       **/
      AlreadyStored: AugmentedError<ApiType>;
      /**
       * The maximum weight information provided was too low.
       **/
      MaxWeightTooLow: AugmentedError<ApiType>;
      /**
       * Threshold must be 2 or greater.
       **/
      MinimumThreshold: AugmentedError<ApiType>;
      /**
       * Call doesn't need any (more) approvals.
       **/
      NoApprovalsNeeded: AugmentedError<ApiType>;
      /**
       * Multisig operation not found when attempting to cancel.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * No timepoint was given, yet the multisig operation is already underway.
       **/
      NoTimepoint: AugmentedError<ApiType>;
      /**
       * Only the account that originally created the multisig is able to cancel it.
       **/
      NotOwner: AugmentedError<ApiType>;
      /**
       * The sender was contained in the other signatories; it shouldn't be.
       **/
      SenderInSignatories: AugmentedError<ApiType>;
      /**
       * The signatories were provided out of order; they should be ordered.
       **/
      SignatoriesOutOfOrder: AugmentedError<ApiType>;
      /**
       * There are too few signatories in the list.
       **/
      TooFewSignatories: AugmentedError<ApiType>;
      /**
       * There are too many signatories in the list.
       **/
      TooManySignatories: AugmentedError<ApiType>;
      /**
       * A timepoint was given, yet no multisig operation is underway.
       **/
      UnexpectedTimepoint: AugmentedError<ApiType>;
      /**
       * A different timepoint was given to the multisig operation that is underway.
       **/
      WrongTimepoint: AugmentedError<ApiType>;
    };
    posts: {
      /**
       * Not allowed to create a post/comment when a scope (space or root post) is hidden.
       **/
      CannotCreateInHiddenScope: AugmentedError<ApiType>;
      /**
       * Cannot move a post to the same space.
       **/
      CannotMoveToSameSpace: AugmentedError<ApiType>;
      /**
       * Cannot share a post that that is sharing another post.
       **/
      CannotShareSharingPost: AugmentedError<ApiType>;
      /**
       * Cannot update space id of a comment.
       **/
      CannotUpdateSpaceIdOnComment: AugmentedError<ApiType>;
      /**
       * Max comment depth reached.
       **/
      MaxCommentDepthReached: AugmentedError<ApiType>;
      /**
       * User has no permission to create comments (aka replies) in this space.
       **/
      NoPermissionToCreateComments: AugmentedError<ApiType>;
      /**
       * User has no permission to create root posts in this space.
       **/
      NoPermissionToCreatePosts: AugmentedError<ApiType>;
      /**
       * User has no permission to share posts/comments from this space to another space.
       **/
      NoPermissionToShare: AugmentedError<ApiType>;
      /**
       * User has no permission to update any posts in this space.
       **/
      NoPermissionToUpdateAnyPost: AugmentedError<ApiType>;
      /**
       * A comment owner is not allowed to update their own comments in this space.
       **/
      NoPermissionToUpdateOwnComments: AugmentedError<ApiType>;
      /**
       * A post owner is not allowed to update their own posts in this space.
       **/
      NoPermissionToUpdateOwnPosts: AugmentedError<ApiType>;
      /**
       * Post has no replies.
       **/
      NoRepliesOnPost: AugmentedError<ApiType>;
      /**
       * Only comment owner can update this comment.
       **/
      NotACommentAuthor: AugmentedError<ApiType>;
      /**
       * Post by `parent_id` is not of a `Comment` extension.
       **/
      NotACommentByParentId: AugmentedError<ApiType>;
      /**
       * An account is not a post owner.
       **/
      NotAPostOwner: AugmentedError<ApiType>;
      /**
       * This post's extension is not a `SharedPost`.
       **/
      NotASharingPost: AugmentedError<ApiType>;
      /**
       * This post's extension is not a `Comment`.
       **/
      NotComment: AugmentedError<ApiType>;
      /**
       * Nothing to update in this post.
       **/
      NoUpdatesForPost: AugmentedError<ApiType>;
      /**
       * Original post not found when sharing.
       **/
      OriginalPostNotFound: AugmentedError<ApiType>;
      /**
       * Root post should have a space id.
       **/
      PostHasNoSpaceId: AugmentedError<ApiType>;
      /**
       * Post was not found by id.
       **/
      PostNotFound: AugmentedError<ApiType>;
      /**
       * Unknown parent comment id.
       **/
      UnknownParentComment: AugmentedError<ApiType>;
    };
    profileFollows: {
      /**
       * Account can not follow itself.
       **/
      AccountCannotFollowItself: AugmentedError<ApiType>;
      /**
       * Account can not unfollow itself.
       **/
      AccountCannotUnfollowItself: AugmentedError<ApiType>;
      /**
       * Account (Alice) is already a follower of another account (Bob).
       **/
      AlreadyAccountFollower: AugmentedError<ApiType>;
      /**
       * Social account that is being followed was not found by id.
       **/
      FollowedAccountNotFound: AugmentedError<ApiType>;
      /**
       * Follower social account was not found by id.
       **/
      FollowerAccountNotFound: AugmentedError<ApiType>;
      /**
       * Account (Alice) is not a follower of another account (Bob).
       **/
      NotAccountFollower: AugmentedError<ApiType>;
    };
    profiles: {
      /**
       * Account has no profile yet.
       **/
      AccountHasNoProfile: AugmentedError<ApiType>;
      /**
       * Nothing to update in a profile.
       **/
      NoUpdatesForProfile: AugmentedError<ApiType>;
      /**
       * Profile is already created for this account.
       **/
      ProfileAlreadyCreated: AugmentedError<ApiType>;
      /**
       * Social account was not found by id.
       **/
      SocialAccountNotFound: AugmentedError<ApiType>;
    };
    proxy: {
      /**
       * Account is already a proxy.
       **/
      Duplicate: AugmentedError<ApiType>;
      /**
       * Call may not be made by proxy because it may escalate its privileges.
       **/
      NoPermission: AugmentedError<ApiType>;
      /**
       * Cannot add self as proxy.
       **/
      NoSelfProxy: AugmentedError<ApiType>;
      /**
       * Proxy registration not found.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * Sender is not a proxy of the account to be proxied.
       **/
      NotProxy: AugmentedError<ApiType>;
      /**
       * There are too many proxies registered or too many announcements pending.
       **/
      TooMany: AugmentedError<ApiType>;
      /**
       * Announcement, if made at all, was made too recently.
       **/
      Unannounced: AugmentedError<ApiType>;
      /**
       * A call which is incompatible with the proxy type's filter was attempted.
       **/
      Unproxyable: AugmentedError<ApiType>;
    };
    reactions: {
      /**
       * Account has already reacted to this post/comment.
       **/
      AccountAlreadyReacted: AugmentedError<ApiType>;
      /**
       * Not allowed to react on a post/comment if a root post is hidden.
       **/
      CannotReactWhenPostHidden: AugmentedError<ApiType>;
      /**
       * Not allowed to react on a post/comment in a hidden space.
       **/
      CannotReactWhenSpaceHidden: AugmentedError<ApiType>;
      /**
       * User has no permission to downvote posts/comments in this space.
       **/
      NoPermissionToDownvote: AugmentedError<ApiType>;
      /**
       * User has no permission to upvote posts/comments in this space.
       **/
      NoPermissionToUpvote: AugmentedError<ApiType>;
      /**
       * Only reaction owner can update their reaction.
       **/
      NotReactionOwner: AugmentedError<ApiType>;
      /**
       * There is no reaction by account on this post/comment.
       **/
      ReactionByAccountNotFound: AugmentedError<ApiType>;
      /**
       * Reaction was not found by id.
       **/
      ReactionNotFound: AugmentedError<ApiType>;
      /**
       * New reaction kind is the same as old one on this post/comment.
       **/
      SameReaction: AugmentedError<ApiType>;
    };
    roles: {
      /**
       * No permissions provided when trying to create a new role.
       * A role must have at least one permission.
       **/
      NoPermissionsProvided: AugmentedError<ApiType>;
      /**
       * Account does not have permission to manage roles in this space.
       **/
      NoPermissionToManageRoles: AugmentedError<ApiType>;
      /**
       * Nothing to update in role.
       **/
      NoUpdatesProvided: AugmentedError<ApiType>;
      /**
       * No users provided when trying to grant a role.
       * A role must be granted/revoked to/from at least one user.
       **/
      NoUsersProvided: AugmentedError<ApiType>;
      /**
       * Cannot disable a role that is already disabled.
       **/
      RoleAlreadyDisabled: AugmentedError<ApiType>;
      /**
       * Cannot enable a role that is already enabled.
       **/
      RoleAlreadyEnabled: AugmentedError<ApiType>;
      /**
       * `NextRoleId` exceeds its maximum value.
       **/
      RoleIdOverflow: AugmentedError<ApiType>;
      /**
       * Role was not found by id.
       **/
      RoleNotFound: AugmentedError<ApiType>;
      /**
       * Canot remove a role from this many users in a single transaction.
       * See `MaxUsersToProcessPerDeleteRole` parameter of this trait.
       **/
      TooManyUsersToDeleteRole: AugmentedError<ApiType>;
    };
    scheduler: {
      /**
       * Failed to schedule a call
       **/
      FailedToSchedule: AugmentedError<ApiType>;
      /**
       * Cannot find the scheduled call.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * Reschedule failed because it does not change scheduled time.
       **/
      RescheduleNoChange: AugmentedError<ApiType>;
      /**
       * Given target block number is in the past.
       **/
      TargetBlockNumberInPast: AugmentedError<ApiType>;
    };
    spaceFollows: {
      /**
       * Account is already a space follower.
       **/
      AlreadySpaceFollower: AugmentedError<ApiType>;
      /**
       * Not allowed to follow a hidden space.
       **/
      CannotFollowHiddenSpace: AugmentedError<ApiType>;
      /**
       * Account is not a space follower.
       **/
      NotSpaceFollower: AugmentedError<ApiType>;
      /**
       * Social account was not found by id.
       **/
      SocialAccountNotFound: AugmentedError<ApiType>;
    };
    spaceOwnership: {
      /**
       * Account is already an owner of a space.
       **/
      AlreadyASpaceOwner: AugmentedError<ApiType>;
      /**
       * The current space owner cannot transfer ownership to themself.
       **/
      CannotTranferToCurrentOwner: AugmentedError<ApiType>;
      /**
       * There is no pending ownership transfer for a given space.
       **/
      NoPendingTransferOnSpace: AugmentedError<ApiType>;
      /**
       * Account is not allowed to accept ownership transfer.
       **/
      NotAllowedToAcceptOwnershipTransfer: AugmentedError<ApiType>;
      /**
       * Account is not allowed to reject ownership transfer.
       **/
      NotAllowedToRejectOwnershipTransfer: AugmentedError<ApiType>;
    };
    spaces: {
      /**
       * Handles are disabled in `PalletSettings`.
       **/
      HandlesAreDisabled: AugmentedError<ApiType>;
      /**
       * User has no permission to create subspaces within this space.
       **/
      NoPermissionToCreateSubspaces: AugmentedError<ApiType>;
      /**
       * User has no permission to update this space.
       **/
      NoPermissionToUpdateSpace: AugmentedError<ApiType>;
      /**
       * Only space owners can manage this space.
       **/
      NotASpaceOwner: AugmentedError<ApiType>;
      /**
       * Nothing to update in this space.
       **/
      NoUpdatesForSpace: AugmentedError<ApiType>;
      /**
       * New spaces' settings don't differ from the old ones.
       **/
      NoUpdatesForSpacesSettings: AugmentedError<ApiType>;
      /**
       * Space handle is not unique.
       **/
      SpaceHandleIsNotUnique: AugmentedError<ApiType>;
      /**
       * Space is at root level, no `parent_id` specified.
       **/
      SpaceIsAtRoot: AugmentedError<ApiType>;
      /**
       * Space was not found by id.
       **/
      SpaceNotFound: AugmentedError<ApiType>;
    };
    sudo: {
      /**
       * Sender must be the Sudo account
       **/
      RequireSudo: AugmentedError<ApiType>;
    };
    system: {
      /**
       * Failed to extract the runtime version from the new runtime.
       * 
       * Either calling `Core_version` or decoding `RuntimeVersion` failed.
       **/
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      /**
       * The name of specification does not match between the current runtime
       * and the new runtime.
       **/
      InvalidSpecName: AugmentedError<ApiType>;
      /**
       * Suicide called when the account has non-default composite data.
       **/
      NonDefaultComposite: AugmentedError<ApiType>;
      /**
       * There is a non-zero reference count preventing the account from being purged.
       **/
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * The specification version is not allowed to decrease between the current runtime
       * and the new runtime.
       **/
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
    };
    utility: {
      /**
       * Too many calls batched.
       **/
      TooManyCalls: AugmentedError<ApiType>;
    };
    utils: {
      /**
       * Account is blocked in a given space.
       **/
      AccountIsBlocked: AugmentedError<ApiType>;
      /**
       * Content is blocked in a given space.
       **/
      ContentIsBlocked: AugmentedError<ApiType>;
      /**
       * Content type is `None`.
       **/
      ContentIsEmpty: AugmentedError<ApiType>;
      /**
       * Space handle contains invalid characters.
       **/
      HandleContainsInvalidChars: AugmentedError<ApiType>;
      /**
       * Space handle is too long.
       **/
      HandleIsTooLong: AugmentedError<ApiType>;
      /**
       * Space handle is too short.
       **/
      HandleIsTooShort: AugmentedError<ApiType>;
      /**
       * `Hyper` content type is not yet supported.
       **/
      HypercoreContentTypeNotSupported: AugmentedError<ApiType>;
      /**
       * IPFS CID is invalid.
       **/
      InvalidIpfsCid: AugmentedError<ApiType>;
      /**
       * Post is blocked in a given space.
       **/
      PostIsBlocked: AugmentedError<ApiType>;
      /**
       * `Raw` content type is not yet supported.
       **/
      RawContentTypeNotSupported: AugmentedError<ApiType>;
    };
  } // AugmentedErrors
} // declare module
