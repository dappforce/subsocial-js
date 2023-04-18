// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/errors';

import type { ApiTypes, AugmentedError } from '@polkadot/api-base/types';

export type __AugmentedError<ApiType extends ApiTypes> = AugmentedError<ApiType>;

declare module '@polkadot/api-base/types/errors' {
  interface AugmentedErrors<ApiType extends ApiTypes> {
    accountFollows: {
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
    authorship: {
      /**
       * The uncle is genesis.
       **/
      GenesisUncle: AugmentedError<ApiType>;
      /**
       * The uncle parent not in the chain.
       **/
      InvalidUncleParent: AugmentedError<ApiType>;
      /**
       * The uncle isn't recent enough to be included.
       **/
      OldUncle: AugmentedError<ApiType>;
      /**
       * The uncle is too high in chain.
       **/
      TooHighUncle: AugmentedError<ApiType>;
      /**
       * Too many uncles.
       **/
      TooManyUncles: AugmentedError<ApiType>;
      /**
       * The uncle is already included.
       **/
      UncleAlreadyIncluded: AugmentedError<ApiType>;
      /**
       * Uncles already set in the block.
       **/
      UnclesAlreadySet: AugmentedError<ApiType>;
    };
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
       * Balance too low to send value.
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
    collatorSelection: {
      /**
       * User is already a candidate
       **/
      AlreadyCandidate: AugmentedError<ApiType>;
      /**
       * User is already an Invulnerable
       **/
      AlreadyInvulnerable: AugmentedError<ApiType>;
      /**
       * Account has no associated validator ID
       **/
      NoAssociatedValidatorId: AugmentedError<ApiType>;
      /**
       * User is not a candidate
       **/
      NotCandidate: AugmentedError<ApiType>;
      /**
       * Permission issue
       **/
      Permission: AugmentedError<ApiType>;
      /**
       * Too few candidates
       **/
      TooFewCandidates: AugmentedError<ApiType>;
      /**
       * Too many candidates
       **/
      TooManyCandidates: AugmentedError<ApiType>;
      /**
       * Too many invulnerables
       **/
      TooManyInvulnerables: AugmentedError<ApiType>;
      /**
       * Unknown error
       **/
      Unknown: AugmentedError<ApiType>;
      /**
       * Validator ID is not yet registered
       **/
      ValidatorNotRegistered: AugmentedError<ApiType>;
    };
    cumulusXcm: {
    };
    dmpQueue: {
      /**
       * The amount of weight given is possibly not enough for executing the message.
       **/
      OverLimit: AugmentedError<ApiType>;
      /**
       * The message index given is unknown.
       **/
      Unknown: AugmentedError<ApiType>;
    };
    domains: {
      /**
       * This domain is already held by another account.
       **/
      DomainAlreadyOwned: AugmentedError<ApiType>;
      /**
       * This domain label may contain only a-z, 0-9 and hyphen characters.
       **/
      DomainContainsInvalidChar: AugmentedError<ApiType>;
      /**
       * The content stored in a domain metadata was not changed.
       **/
      DomainContentNotChanged: AugmentedError<ApiType>;
      /**
       * This domain has expired.
       **/
      DomainHasExpired: AugmentedError<ApiType>;
      /**
       * This domain cannot be registered yet, because this word is reserved.
       **/
      DomainIsReserved: AugmentedError<ApiType>;
      /**
       * This domain label length must be between `MinDomainLength` and 63 characters, inclusive.
       **/
      DomainIsTooShort: AugmentedError<ApiType>;
      /**
       * Domain was not found by the domain name.
       **/
      DomainNotFound: AugmentedError<ApiType>;
      /**
       * A new inner value is the same as the old one.
       **/
      InnerValueNotChanged: AugmentedError<ApiType>;
      /**
       * This account is not allowed to update the domain metadata.
       **/
      NotDomainOwner: AugmentedError<ApiType>;
      /**
       * A new outer value is the same as the old one.
       **/
      OuterValueNotChanged: AugmentedError<ApiType>;
      /**
       * Lower than the second-level domains are not allowed.
       **/
      SubdomainsNotAllowed: AugmentedError<ApiType>;
      /**
       * Top-level domain must be specified.
       **/
      TldNotSpecified: AugmentedError<ApiType>;
      /**
       * Top-level domain is not supported.
       **/
      TldNotSupported: AugmentedError<ApiType>;
      /**
       * Cannot store a domain for such a long period of time.
       **/
      TooBigRegistrationPeriod: AugmentedError<ApiType>;
      /**
       * Cannot register more than `MaxDomainsPerAccount` domains.
       **/
      TooManyDomainsPerAccount: AugmentedError<ApiType>;
      /**
       * Reservation period cannot be a zero value.
       **/
      ZeroReservationPeriod: AugmentedError<ApiType>;
    };
    energy: {
      /**
       * Value too low to create account due to existential deposit
       **/
      BalanceBelowExistentialDeposit: AugmentedError<ApiType>;
      /**
       * Not enough native balance to burn and generate energy.
       **/
      NotEnoughBalance: AugmentedError<ApiType>;
      /**
       * Value coefficient is not a positive number.
       **/
      ValueCoefficientIsNotPositive: AugmentedError<ApiType>;
    };
    freeProxy: {
      OnlyFirstProxyCanBeFree: AugmentedError<ApiType>;
    };
    parachainSystem: {
      /**
       * The inherent which supplies the host configuration did not run this block
       **/
      HostConfigurationNotAvailable: AugmentedError<ApiType>;
      /**
       * No code upgrade has been authorized.
       **/
      NothingAuthorized: AugmentedError<ApiType>;
      /**
       * No validation function upgrade is currently scheduled.
       **/
      NotScheduled: AugmentedError<ApiType>;
      /**
       * Attempt to upgrade validation function while existing upgrade pending
       **/
      OverlappingUpgrades: AugmentedError<ApiType>;
      /**
       * Polkadot currently prohibits this parachain from upgrading its validation function
       **/
      ProhibitedByPolkadot: AugmentedError<ApiType>;
      /**
       * The supplied validation function has compiled into a blob larger than Polkadot is
       * willing to run
       **/
      TooBig: AugmentedError<ApiType>;
      /**
       * The given code upgrade has not been authorized.
       **/
      Unauthorized: AugmentedError<ApiType>;
      /**
       * The inherent which supplies the validation data did not run this block
       **/
      ValidationDataNotAvailable: AugmentedError<ApiType>;
    };
    polkadotXcm: {
      /**
       * The location is invalid since it already has a subscription from us.
       **/
      AlreadySubscribed: AugmentedError<ApiType>;
      /**
       * The given location could not be used (e.g. because it cannot be expressed in the
       * desired version of XCM).
       **/
      BadLocation: AugmentedError<ApiType>;
      /**
       * The version of the `Versioned` value used is not able to be interpreted.
       **/
      BadVersion: AugmentedError<ApiType>;
      /**
       * Could not re-anchor the assets to declare the fees for the destination chain.
       **/
      CannotReanchor: AugmentedError<ApiType>;
      /**
       * The destination `MultiLocation` provided cannot be inverted.
       **/
      DestinationNotInvertible: AugmentedError<ApiType>;
      /**
       * The assets to be sent are empty.
       **/
      Empty: AugmentedError<ApiType>;
      /**
       * The message execution fails the filter.
       **/
      Filtered: AugmentedError<ApiType>;
      /**
       * Origin is invalid for sending.
       **/
      InvalidOrigin: AugmentedError<ApiType>;
      /**
       * The referenced subscription could not be found.
       **/
      NoSubscription: AugmentedError<ApiType>;
      /**
       * There was some other issue (i.e. not to do with routing) in sending the message. Perhaps
       * a lack of space for buffering the message.
       **/
      SendFailure: AugmentedError<ApiType>;
      /**
       * Too many assets have been attempted for transfer.
       **/
      TooManyAssets: AugmentedError<ApiType>;
      /**
       * The desired destination was unreachable, generally because there is a no way of routing
       * to it.
       **/
      Unreachable: AugmentedError<ApiType>;
      /**
       * The message's weight could not be determined.
       **/
      UnweighableMessage: AugmentedError<ApiType>;
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
       * Cannot share a post that is sharing another post.
       **/
      CannotShareSharedPost: AugmentedError<ApiType>;
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
      NotASharedPost: AugmentedError<ApiType>;
      /**
       * This post's extension is not a `Comment`.
       **/
      NotComment: AugmentedError<ApiType>;
      /**
       * Nothing to update in this post.
       **/
      NoUpdatesForPost: AugmentedError<ApiType>;
      /**
       * Cannot share, because the original post was not found.
       **/
      OriginalPostNotFound: AugmentedError<ApiType>;
      /**
       * `force_create_post` failed, because this post already exists.
       * Consider removing the post with `force_remove_post` first.
       **/
      PostAlreadyExists: AugmentedError<ApiType>;
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
    profiles: {
      /**
       * There is no space set as profile.
       **/
      NoSpaceSetAsProfile: AugmentedError<ApiType>;
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
       * `force_create_post_reaction` failed, because reaction already exists.
       * Consider removing reaction first with `force_delete_post_reaction`.
       **/
      ReactionAlreadyExists: AugmentedError<ApiType>;
      /**
       * There is no reaction by account on this post/comment.
       **/
      ReactionByAccountNotFound: AugmentedError<ApiType>;
      /**
       * Reaction was not found by id.
       **/
      ReactionNotFound: AugmentedError<ApiType>;
      /**
       * Reaction not found on post by provided [post_id] and [reaction_id].
       **/
      ReactionNotFoundOnPost: AugmentedError<ApiType>;
      /**
       * New reaction kind is the same as old one on this post/comment.
       **/
      SameReaction: AugmentedError<ApiType>;
    };
    roles: {
      /**
       * The user count sent doesn't match the real user count.
       **/
      IncorrectUserCount: AugmentedError<ApiType>;
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
    session: {
      /**
       * Registered duplicate key.
       **/
      DuplicatedKey: AugmentedError<ApiType>;
      /**
       * Invalid ownership proof.
       **/
      InvalidProof: AugmentedError<ApiType>;
      /**
       * Key setting account is not live, so it's impossible to associate keys.
       **/
      NoAccount: AugmentedError<ApiType>;
      /**
       * No associated validator ID for account.
       **/
      NoAssociatedValidatorId: AugmentedError<ApiType>;
      /**
       * No keys are associated with this account.
       **/
      NoKeys: AugmentedError<ApiType>;
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
    };
    spaceOwnership: {
      /**
       * Account is already an owner of a space.
       **/
      AlreadyASpaceOwner: AugmentedError<ApiType>;
      /**
       * The current space owner cannot transfer ownership to themself.
       **/
      CannotTransferToCurrentOwner: AugmentedError<ApiType>;
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
       * Space is at root level, no `parent_id` specified.
       **/
      SpaceIsAtRoot: AugmentedError<ApiType>;
      /**
       * Space was not found by id.
       **/
      SpaceNotFound: AugmentedError<ApiType>;
      /**
       * There are too many spaces created by this account already
       **/
      TooManySpacesPerAccount: AugmentedError<ApiType>;
    };
    sudo: {
      /**
       * Sender must be the Sudo account
       **/
      RequireSudo: AugmentedError<ApiType>;
    };
    system: {
      /**
       * The origin filter prevent the call to be dispatched.
       **/
      CallFiltered: AugmentedError<ApiType>;
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
    vesting: {
      /**
       * Amount being transferred is too low to create a vesting schedule.
       **/
      AmountLow: AugmentedError<ApiType>;
      /**
       * The account already has `MaxVestingSchedules` count of schedules and thus
       * cannot add another one. Consider merging existing schedules in order to add another.
       **/
      AtMaxVestingSchedules: AugmentedError<ApiType>;
      /**
       * Failed to create a new schedule because some parameter was invalid.
       **/
      InvalidScheduleParams: AugmentedError<ApiType>;
      /**
       * The account given is not vesting.
       **/
      NotVesting: AugmentedError<ApiType>;
      /**
       * An index was out of bounds of the vesting schedules.
       **/
      ScheduleIndexOutOfBounds: AugmentedError<ApiType>;
    };
    xcmpQueue: {
      /**
       * Bad overweight index.
       **/
      BadOverweightIndex: AugmentedError<ApiType>;
      /**
       * Bad XCM data.
       **/
      BadXcm: AugmentedError<ApiType>;
      /**
       * Bad XCM origin.
       **/
      BadXcmOrigin: AugmentedError<ApiType>;
      /**
       * Failed to send XCM message.
       **/
      FailedToSend: AugmentedError<ApiType>;
      /**
       * Provided weight is possibly not enough to execute the message.
       **/
      WeightOverLimit: AugmentedError<ApiType>;
    };
  } // AugmentedErrors
} // declare module
