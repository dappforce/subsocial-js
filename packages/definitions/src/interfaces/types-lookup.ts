// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

declare module '@polkadot/types/lookup' {
  import type { BTreeSet, Bytes, Compact, Enum, Null, Option, Result, Struct, Text, U8aFixed, Vec, bool, i32, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
  import type { ITuple } from '@polkadot/types-codec/types';
  import type { AccountId32, Call, H256, MultiAddress, Perbill } from '@polkadot/types/interfaces/runtime';
  import type { Event } from '@polkadot/types/interfaces/system';

  /** @name FrameSystemAccountInfo (3) */
  export interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletBalancesAccountData;
  }

  /** @name PalletBalancesAccountData (5) */
  export interface PalletBalancesAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly miscFrozen: u128;
    readonly feeFrozen: u128;
  }

  /** @name FrameSupportWeightsPerDispatchClassU64 (7) */
  export interface FrameSupportWeightsPerDispatchClassU64 extends Struct {
    readonly normal: u64;
    readonly operational: u64;
    readonly mandatory: u64;
  }

  /** @name SpRuntimeDigest (11) */
  export interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (13) */
  export interface SpRuntimeDigestDigestItem extends Enum {
    readonly isOther: boolean;
    readonly asOther: Bytes;
    readonly isChangesTrieRoot: boolean;
    readonly asChangesTrieRoot: H256;
    readonly isConsensus: boolean;
    readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
    readonly isSeal: boolean;
    readonly asSeal: ITuple<[U8aFixed, Bytes]>;
    readonly isPreRuntime: boolean;
    readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
    readonly isChangesTrieSignal: boolean;
    readonly asChangesTrieSignal: SpRuntimeDigestChangesTrieSignal;
    readonly isRuntimeEnvironmentUpdated: boolean;
    readonly type: 'Other' | 'ChangesTrieRoot' | 'Consensus' | 'Seal' | 'PreRuntime' | 'ChangesTrieSignal' | 'RuntimeEnvironmentUpdated';
  }

  /** @name SpRuntimeDigestChangesTrieSignal (15) */
  export interface SpRuntimeDigestChangesTrieSignal extends Enum {
    readonly isNewConfiguration: boolean;
    readonly asNewConfiguration: Option<SpCoreChangesTrieChangesTrieConfiguration>;
    readonly type: 'NewConfiguration';
  }

  /** @name SpCoreChangesTrieChangesTrieConfiguration (17) */
  export interface SpCoreChangesTrieChangesTrieConfiguration extends Struct {
    readonly digestInterval: u32;
    readonly digestLevels: u32;
  }

  /** @name FrameSystemEventRecord (19) */
  export interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (21) */
  export interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: FrameSupportWeightsDispatchInfo;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: ITuple<[SpRuntimeDispatchError, FrameSupportWeightsDispatchInfo]>;
    readonly isCodeUpdated: boolean;
    readonly isNewAccount: boolean;
    readonly asNewAccount: AccountId32;
    readonly isKilledAccount: boolean;
    readonly asKilledAccount: AccountId32;
    readonly isRemarked: boolean;
    readonly asRemarked: ITuple<[AccountId32, H256]>;
    readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked';
  }

  /** @name FrameSupportWeightsDispatchInfo (22) */
  export interface FrameSupportWeightsDispatchInfo extends Struct {
    readonly weight: u64;
    readonly class: FrameSupportWeightsDispatchClass;
    readonly paysFee: FrameSupportWeightsPays;
  }

  /** @name FrameSupportWeightsDispatchClass (23) */
  export interface FrameSupportWeightsDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportWeightsPays (24) */
  export interface FrameSupportWeightsPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (25) */
  export interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: {
      readonly index: u8;
      readonly error: u8;
    } & Struct;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpRuntimeArithmeticError;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'Token' | 'Arithmetic';
  }

  /** @name SpRuntimeTokenError (26) */
  export interface SpRuntimeTokenError extends Enum {
    readonly isNoFunds: boolean;
    readonly isWouldDie: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly type: 'NoFunds' | 'WouldDie' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported';
  }

  /** @name SpRuntimeArithmeticError (27) */
  export interface SpRuntimeArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name PalletGrandpaEvent (28) */
  export interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpFinalityGrandpaAppPublic (31) */
  export interface SpFinalityGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (32) */
  export interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletBalancesEvent (33) */
  export interface PalletBalancesEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: ITuple<[AccountId32, u128]>;
    readonly isDustLost: boolean;
    readonly asDustLost: ITuple<[AccountId32, u128]>;
    readonly isTransfer: boolean;
    readonly asTransfer: ITuple<[AccountId32, AccountId32, u128]>;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: ITuple<[AccountId32, u128, u128]>;
    readonly isReserved: boolean;
    readonly asReserved: ITuple<[AccountId32, u128]>;
    readonly isUnreserved: boolean;
    readonly asUnreserved: ITuple<[AccountId32, u128]>;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: ITuple<[AccountId32, AccountId32, u128, FrameSupportTokensMiscBalanceStatus]>;
    readonly isDeposit: boolean;
    readonly asDeposit: ITuple<[AccountId32, u128]>;
    readonly isWithdraw: boolean;
    readonly asWithdraw: ITuple<[AccountId32, u128]>;
    readonly isSlashed: boolean;
    readonly asSlashed: ITuple<[AccountId32, u128]>;
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (34) */
  export interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name PalletSudoEvent (35) */
  export interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: Result<Null, SpRuntimeDispatchError>;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: AccountId32;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: Result<Null, SpRuntimeDispatchError>;
    readonly type: 'Sudid' | 'KeyChanged' | 'SudoAsDone';
  }

  /** @name PalletSchedulerEvent (38) */
  export interface PalletSchedulerEvent extends Enum {
    readonly isScheduled: boolean;
    readonly asScheduled: ITuple<[u32, u32]>;
    readonly isCanceled: boolean;
    readonly asCanceled: ITuple<[u32, u32]>;
    readonly isDispatched: boolean;
    readonly asDispatched: ITuple<[ITuple<[u32, u32]>, Option<Bytes>, Result<Null, SpRuntimeDispatchError>]>;
    readonly type: 'Scheduled' | 'Canceled' | 'Dispatched';
  }

  /** @name PalletUtilityEvent (41) */
  export interface PalletUtilityEvent extends Enum {
    readonly isBatchInterrupted: boolean;
    readonly asBatchInterrupted: ITuple<[u32, SpRuntimeDispatchError]>;
    readonly isBatchCompleted: boolean;
    readonly isItemCompleted: boolean;
    readonly type: 'BatchInterrupted' | 'BatchCompleted' | 'ItemCompleted';
  }

  /** @name PalletMultisigEvent (42) */
  export interface PalletMultisigEvent extends Enum {
    readonly isNewMultisig: boolean;
    readonly asNewMultisig: ITuple<[AccountId32, AccountId32, U8aFixed]>;
    readonly isMultisigApproval: boolean;
    readonly asMultisigApproval: ITuple<[AccountId32, PalletMultisigTimepoint, AccountId32, U8aFixed]>;
    readonly isMultisigExecuted: boolean;
    readonly asMultisigExecuted: ITuple<[AccountId32, PalletMultisigTimepoint, AccountId32, U8aFixed, Result<Null, SpRuntimeDispatchError>]>;
    readonly isMultisigCancelled: boolean;
    readonly asMultisigCancelled: ITuple<[AccountId32, PalletMultisigTimepoint, AccountId32, U8aFixed]>;
    readonly type: 'NewMultisig' | 'MultisigApproval' | 'MultisigExecuted' | 'MultisigCancelled';
  }

  /** @name PalletMultisigTimepoint (43) */
  export interface PalletMultisigTimepoint extends Struct {
    readonly height: u32;
    readonly index: u32;
  }

  /** @name PalletProxyEvent (44) */
  export interface PalletProxyEvent extends Enum {
    readonly isProxyExecuted: boolean;
    readonly asProxyExecuted: Result<Null, SpRuntimeDispatchError>;
    readonly isAnonymousCreated: boolean;
    readonly asAnonymousCreated: ITuple<[AccountId32, AccountId32, SubsocialRuntimeProxyType, u16]>;
    readonly isAnnounced: boolean;
    readonly asAnnounced: ITuple<[AccountId32, AccountId32, H256]>;
    readonly isProxyAdded: boolean;
    readonly asProxyAdded: ITuple<[AccountId32, AccountId32, SubsocialRuntimeProxyType, u32]>;
    readonly type: 'ProxyExecuted' | 'AnonymousCreated' | 'Announced' | 'ProxyAdded';
  }

  /** @name SubsocialRuntimeProxyType (45) */
  export interface SubsocialRuntimeProxyType extends Enum {
    readonly isAny: boolean;
    readonly isNonTransfer: boolean;
    readonly type: 'Any' | 'NonTransfer';
  }

  /** @name PalletPostsRawEvent (47) */
  export interface PalletPostsRawEvent extends Enum {
    readonly isPostCreated: boolean;
    readonly asPostCreated: ITuple<[AccountId32, u64]>;
    readonly isPostUpdated: boolean;
    readonly asPostUpdated: ITuple<[AccountId32, u64]>;
    readonly isPostDeleted: boolean;
    readonly asPostDeleted: ITuple<[AccountId32, u64]>;
    readonly isPostShared: boolean;
    readonly asPostShared: ITuple<[AccountId32, u64]>;
    readonly isPostMoved: boolean;
    readonly asPostMoved: ITuple<[AccountId32, u64]>;
    readonly type: 'PostCreated' | 'PostUpdated' | 'PostDeleted' | 'PostShared' | 'PostMoved';
  }

  /** @name PalletProfileFollowsRawEvent (48) */
  export interface PalletProfileFollowsRawEvent extends Enum {
    readonly isAccountFollowed: boolean;
    readonly asAccountFollowed: ITuple<[AccountId32, AccountId32]>;
    readonly isAccountUnfollowed: boolean;
    readonly asAccountUnfollowed: ITuple<[AccountId32, AccountId32]>;
    readonly type: 'AccountFollowed' | 'AccountUnfollowed';
  }

  /** @name PalletProfilesRawEvent (49) */
  export interface PalletProfilesRawEvent extends Enum {
    readonly isProfileCreated: boolean;
    readonly asProfileCreated: AccountId32;
    readonly isProfileUpdated: boolean;
    readonly asProfileUpdated: AccountId32;
    readonly type: 'ProfileCreated' | 'ProfileUpdated';
  }

  /** @name PalletReactionsRawEvent (50) */
  export interface PalletReactionsRawEvent extends Enum {
    readonly isPostReactionCreated: boolean;
    readonly asPostReactionCreated: ITuple<[AccountId32, u64, u64, PalletReactionsReactionKind]>;
    readonly isPostReactionUpdated: boolean;
    readonly asPostReactionUpdated: ITuple<[AccountId32, u64, u64, PalletReactionsReactionKind]>;
    readonly isPostReactionDeleted: boolean;
    readonly asPostReactionDeleted: ITuple<[AccountId32, u64, u64, PalletReactionsReactionKind]>;
    readonly type: 'PostReactionCreated' | 'PostReactionUpdated' | 'PostReactionDeleted';
  }

  /** @name PalletReactionsReactionKind (51) */
  export interface PalletReactionsReactionKind extends Enum {
    readonly isUpvote: boolean;
    readonly isDownvote: boolean;
    readonly type: 'Upvote' | 'Downvote';
  }

  /** @name PalletRolesRawEvent (52) */
  export interface PalletRolesRawEvent extends Enum {
    readonly isRoleCreated: boolean;
    readonly asRoleCreated: ITuple<[AccountId32, u64, u64]>;
    readonly isRoleUpdated: boolean;
    readonly asRoleUpdated: ITuple<[AccountId32, u64]>;
    readonly isRoleDeleted: boolean;
    readonly asRoleDeleted: ITuple<[AccountId32, u64]>;
    readonly isRoleGranted: boolean;
    readonly asRoleGranted: ITuple<[AccountId32, u64, Vec<PalletUtilsUser>]>;
    readonly isRoleRevoked: boolean;
    readonly asRoleRevoked: ITuple<[AccountId32, u64, Vec<PalletUtilsUser>]>;
    readonly type: 'RoleCreated' | 'RoleUpdated' | 'RoleDeleted' | 'RoleGranted' | 'RoleRevoked';
  }

  /** @name PalletUtilsUser (54) */
  export interface PalletUtilsUser extends Enum {
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly isSpace: boolean;
    readonly asSpace: u64;
    readonly type: 'Account' | 'Space';
  }

  /** @name PalletSpaceFollowsRawEvent (55) */
  export interface PalletSpaceFollowsRawEvent extends Enum {
    readonly isSpaceFollowed: boolean;
    readonly asSpaceFollowed: ITuple<[AccountId32, u64]>;
    readonly isSpaceUnfollowed: boolean;
    readonly asSpaceUnfollowed: ITuple<[AccountId32, u64]>;
    readonly type: 'SpaceFollowed' | 'SpaceUnfollowed';
  }

  /** @name PalletSpaceOwnershipRawEvent (56) */
  export interface PalletSpaceOwnershipRawEvent extends Enum {
    readonly isSpaceOwnershipTransferCreated: boolean;
    readonly asSpaceOwnershipTransferCreated: ITuple<[AccountId32, u64, AccountId32]>;
    readonly isSpaceOwnershipTransferAccepted: boolean;
    readonly asSpaceOwnershipTransferAccepted: ITuple<[AccountId32, u64]>;
    readonly isSpaceOwnershipTransferRejected: boolean;
    readonly asSpaceOwnershipTransferRejected: ITuple<[AccountId32, u64]>;
    readonly type: 'SpaceOwnershipTransferCreated' | 'SpaceOwnershipTransferAccepted' | 'SpaceOwnershipTransferRejected';
  }

  /** @name PalletSpacesRawEvent (57) */
  export interface PalletSpacesRawEvent extends Enum {
    readonly isSpaceCreated: boolean;
    readonly asSpaceCreated: ITuple<[AccountId32, u64]>;
    readonly isSpaceUpdated: boolean;
    readonly asSpaceUpdated: ITuple<[AccountId32, u64]>;
    readonly isSpaceDeleted: boolean;
    readonly asSpaceDeleted: ITuple<[AccountId32, u64]>;
    readonly type: 'SpaceCreated' | 'SpaceUpdated' | 'SpaceDeleted';
  }

  /** @name PalletUtilsRawEvent (58) */
  export interface PalletUtilsRawEvent extends Enum {
    readonly isDeposit: boolean;
    readonly asDeposit: u128;
    readonly type: 'Deposit';
  }

  /** @name PalletFaucetsRawEvent (59) */
  export interface PalletFaucetsRawEvent extends Enum {
    readonly isFaucetAdded: boolean;
    readonly asFaucetAdded: AccountId32;
    readonly isFaucetUpdated: boolean;
    readonly asFaucetUpdated: AccountId32;
    readonly isFaucetsRemoved: boolean;
    readonly asFaucetsRemoved: Vec<AccountId32>;
    readonly isDripped: boolean;
    readonly asDripped: ITuple<[AccountId32, AccountId32, u128]>;
    readonly type: 'FaucetAdded' | 'FaucetUpdated' | 'FaucetsRemoved' | 'Dripped';
  }

  /** @name PalletDomainsEvent (61) */
  export interface PalletDomainsEvent extends Enum {
    readonly isDomainRegistered: boolean;
    readonly asDomainRegistered: ITuple<[AccountId32, PalletDomainsDomain, u128]>;
    readonly isDomainUpdated: boolean;
    readonly asDomainUpdated: ITuple<[AccountId32, PalletDomainsDomain]>;
    readonly isDomainsReserved: boolean;
    readonly asDomainsReserved: u16;
    readonly isNewTldAdded: boolean;
    readonly asNewTldAdded: u16;
    readonly type: 'DomainRegistered' | 'DomainUpdated' | 'DomainsReserved' | 'NewTldAdded';
  }

  /** @name PalletDomainsDomain (62) */
  export interface PalletDomainsDomain extends Struct {
    readonly tld: Bytes;
    readonly domain: Bytes;
  }

  /** @name PalletDotsamaClaimsEvent (63) */
  export interface PalletDotsamaClaimsEvent extends Enum {
    readonly isRewardsSenderSet: boolean;
    readonly asRewardsSenderSet: AccountId32;
    readonly isRewardsSenderRemoved: boolean;
    readonly isEligibleAccountsAdded: boolean;
    readonly asEligibleAccountsAdded: u16;
    readonly isTokensClaimed: boolean;
    readonly asTokensClaimed: ITuple<[AccountId32, u128]>;
    readonly type: 'RewardsSenderSet' | 'RewardsSenderRemoved' | 'EligibleAccountsAdded' | 'TokensClaimed';
  }

  /** @name FrameSystemPhase (64) */
  export interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (67) */
  export interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (71) */
  export interface FrameSystemCall extends Enum {
    readonly isFillBlock: boolean;
    readonly asFillBlock: {
      readonly ratio: Perbill;
    } & Struct;
    readonly isRemark: boolean;
    readonly asRemark: {
      readonly remark: Bytes;
    } & Struct;
    readonly isSetHeapPages: boolean;
    readonly asSetHeapPages: {
      readonly pages: u64;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetCodeWithoutChecks: boolean;
    readonly asSetCodeWithoutChecks: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetChangesTrieConfig: boolean;
    readonly asSetChangesTrieConfig: {
      readonly changesTrieConfig: Option<SpCoreChangesTrieChangesTrieConfiguration>;
    } & Struct;
    readonly isSetStorage: boolean;
    readonly asSetStorage: {
      readonly items: Vec<ITuple<[Bytes, Bytes]>>;
    } & Struct;
    readonly isKillStorage: boolean;
    readonly asKillStorage: {
      readonly keys_: Vec<Bytes>;
    } & Struct;
    readonly isKillPrefix: boolean;
    readonly asKillPrefix: {
      readonly prefix: Bytes;
      readonly subkeys: u32;
    } & Struct;
    readonly isRemarkWithEvent: boolean;
    readonly asRemarkWithEvent: {
      readonly remark: Bytes;
    } & Struct;
    readonly type: 'FillBlock' | 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetChangesTrieConfig' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (76) */
  export interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: u64;
    readonly maxBlock: u64;
    readonly perClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportWeightsPerDispatchClassWeightsPerClass (77) */
  export interface FrameSupportWeightsPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (78) */
  export interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: u64;
    readonly maxExtrinsic: Option<u64>;
    readonly maxTotal: Option<u64>;
    readonly reserved: Option<u64>;
  }

  /** @name FrameSystemLimitsBlockLength (80) */
  export interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportWeightsPerDispatchClassU32;
  }

  /** @name FrameSupportWeightsPerDispatchClassU32 (81) */
  export interface FrameSupportWeightsPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name FrameSupportWeightsRuntimeDbWeight (82) */
  export interface FrameSupportWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (83) */
  export interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
  }

  /** @name FrameSystemError (88) */
  export interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount';
  }

  /** @name PalletTimestampCall (89) */
  export interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name PalletGrandpaStoredState (91) */
  export interface PalletGrandpaStoredState extends Enum {
    readonly isLive: boolean;
    readonly isPendingPause: boolean;
    readonly asPendingPause: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly isPaused: boolean;
    readonly isPendingResume: boolean;
    readonly asPendingResume: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly type: 'Live' | 'PendingPause' | 'Paused' | 'PendingResume';
  }

  /** @name PalletGrandpaStoredPendingChange (92) */
  export interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaCall (95) */
  export interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpFinalityGrandpaEquivocationProof (96) */
  export interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }

  /** @name SpFinalityGrandpaEquivocation (97) */
  export interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (98) */
  export interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (99) */
  export interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpFinalityGrandpaAppSignature (100) */
  export interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (101) */
  export interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (104) */
  export interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (105) */
  export interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpCoreVoid (107) */
  export type SpCoreVoid = Null;

  /** @name PalletGrandpaError (108) */
  export interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'PauseFailed' | 'ResumeFailed' | 'ChangePending' | 'TooSoon' | 'InvalidKeyOwnershipProof' | 'InvalidEquivocationProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletBalancesBalanceLock (110) */
  export interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (111) */
  export interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (114) */
  export interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name PalletBalancesReleases (116) */
  export interface PalletBalancesReleases extends Enum {
    readonly isV100: boolean;
    readonly isV200: boolean;
    readonly type: 'V100' | 'V200';
  }

  /** @name PalletBalancesCall (117) */
  export interface PalletBalancesCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSetBalance: boolean;
    readonly asSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u128>;
      readonly newReserved: Compact<u128>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly source: MultiAddress;
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferAll: boolean;
    readonly asTransferAll: {
      readonly dest: MultiAddress;
      readonly keepAlive: bool;
    } & Struct;
    readonly isForceUnreserve: boolean;
    readonly asForceUnreserve: {
      readonly who: MultiAddress;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Transfer' | 'SetBalance' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve';
  }

  /** @name PalletBalancesError (122) */
  export interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isKeepAlive: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'KeepAlive' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves';
  }

  /** @name PalletTransactionPaymentReleases (124) */
  export interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name FrameSupportWeightsWeightToFeeCoefficient (126) */
  export interface FrameSupportWeightsWeightToFeeCoefficient extends Struct {
    readonly coeffInteger: u128;
    readonly coeffFrac: Perbill;
    readonly negative: bool;
    readonly degree: u8;
  }

  /** @name PalletSudoCall (127) */
  export interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: u64;
    } & Struct;
    readonly isSetKey: boolean;
    readonly asSetKey: {
      readonly new_: MultiAddress;
    } & Struct;
    readonly isSudoAs: boolean;
    readonly asSudoAs: {
      readonly who: MultiAddress;
      readonly call: Call;
    } & Struct;
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs';
  }

  /** @name PalletSchedulerCall (129) */
  export interface PalletSchedulerCall extends Enum {
    readonly isSchedule: boolean;
    readonly asSchedule: {
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isCancel: boolean;
    readonly asCancel: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isScheduleNamed: boolean;
    readonly asScheduleNamed: {
      readonly id: Bytes;
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isCancelNamed: boolean;
    readonly asCancelNamed: {
      readonly id: Bytes;
    } & Struct;
    readonly isScheduleAfter: boolean;
    readonly asScheduleAfter: {
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isScheduleNamedAfter: boolean;
    readonly asScheduleNamedAfter: {
      readonly id: Bytes;
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly type: 'Schedule' | 'Cancel' | 'ScheduleNamed' | 'CancelNamed' | 'ScheduleAfter' | 'ScheduleNamedAfter';
  }

  /** @name PalletUtilityCall (131) */
  export interface PalletUtilityCall extends Enum {
    readonly isBatch: boolean;
    readonly asBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isAsDerivative: boolean;
    readonly asAsDerivative: {
      readonly index: u16;
      readonly call: Call;
    } & Struct;
    readonly isBatchAll: boolean;
    readonly asBatchAll: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly type: 'Batch' | 'AsDerivative' | 'BatchAll';
  }

  /** @name PalletMultisigCall (133) */
  export interface PalletMultisigCall extends Enum {
    readonly isAsMultiThreshold1: boolean;
    readonly asAsMultiThreshold1: {
      readonly otherSignatories: Vec<AccountId32>;
      readonly call: Call;
    } & Struct;
    readonly isAsMulti: boolean;
    readonly asAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly maybeTimepoint: Option<PalletMultisigTimepoint>;
      readonly call: Bytes;
      readonly storeCall: bool;
      readonly maxWeight: u64;
    } & Struct;
    readonly isApproveAsMulti: boolean;
    readonly asApproveAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly maybeTimepoint: Option<PalletMultisigTimepoint>;
      readonly callHash: U8aFixed;
      readonly maxWeight: u64;
    } & Struct;
    readonly isCancelAsMulti: boolean;
    readonly asCancelAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly timepoint: PalletMultisigTimepoint;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly type: 'AsMultiThreshold1' | 'AsMulti' | 'ApproveAsMulti' | 'CancelAsMulti';
  }

  /** @name PalletProxyCall (135) */
  export interface PalletProxyCall extends Enum {
    readonly isProxy: boolean;
    readonly asProxy: {
      readonly real: AccountId32;
      readonly forceProxyType: Option<SubsocialRuntimeProxyType>;
      readonly call: Call;
    } & Struct;
    readonly isAddProxy: boolean;
    readonly asAddProxy: {
      readonly delegate: AccountId32;
      readonly proxyType: SubsocialRuntimeProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isRemoveProxy: boolean;
    readonly asRemoveProxy: {
      readonly delegate: AccountId32;
      readonly proxyType: SubsocialRuntimeProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isRemoveProxies: boolean;
    readonly isAnonymous: boolean;
    readonly asAnonymous: {
      readonly proxyType: SubsocialRuntimeProxyType;
      readonly delay: u32;
      readonly index: u16;
    } & Struct;
    readonly isKillAnonymous: boolean;
    readonly asKillAnonymous: {
      readonly spawner: AccountId32;
      readonly proxyType: SubsocialRuntimeProxyType;
      readonly index: u16;
      readonly height: Compact<u32>;
      readonly extIndex: Compact<u32>;
    } & Struct;
    readonly isAnnounce: boolean;
    readonly asAnnounce: {
      readonly real: AccountId32;
      readonly callHash: H256;
    } & Struct;
    readonly isRemoveAnnouncement: boolean;
    readonly asRemoveAnnouncement: {
      readonly real: AccountId32;
      readonly callHash: H256;
    } & Struct;
    readonly isRejectAnnouncement: boolean;
    readonly asRejectAnnouncement: {
      readonly delegate: AccountId32;
      readonly callHash: H256;
    } & Struct;
    readonly isProxyAnnounced: boolean;
    readonly asProxyAnnounced: {
      readonly delegate: AccountId32;
      readonly real: AccountId32;
      readonly forceProxyType: Option<SubsocialRuntimeProxyType>;
      readonly call: Call;
    } & Struct;
    readonly type: 'Proxy' | 'AddProxy' | 'RemoveProxy' | 'RemoveProxies' | 'Anonymous' | 'KillAnonymous' | 'Announce' | 'RemoveAnnouncement' | 'RejectAnnouncement' | 'ProxyAnnounced';
  }

  /** @name PalletPermissionsCall (137) */
  export type PalletPermissionsCall = Null;

  /** @name PalletPostsCall (138) */
  export interface PalletPostsCall extends Enum {
    readonly isCreatePost: boolean;
    readonly asCreatePost: {
      readonly spaceIdOpt: Option<u64>;
      readonly extension: PalletPostsPostExtension;
      readonly content: PalletUtilsContent;
    } & Struct;
    readonly isUpdatePost: boolean;
    readonly asUpdatePost: {
      readonly postId: u64;
      readonly update: PalletPostsPostUpdate;
    } & Struct;
    readonly isMovePost: boolean;
    readonly asMovePost: {
      readonly postId: u64;
      readonly newSpaceId: Option<u64>;
    } & Struct;
    readonly type: 'CreatePost' | 'UpdatePost' | 'MovePost';
  }

  /** @name PalletPostsPostExtension (139) */
  export interface PalletPostsPostExtension extends Enum {
    readonly isRegularPost: boolean;
    readonly isComment: boolean;
    readonly asComment: PalletPostsComment;
    readonly isSharedPost: boolean;
    readonly asSharedPost: u64;
    readonly type: 'RegularPost' | 'Comment' | 'SharedPost';
  }

  /** @name PalletPostsComment (140) */
  export interface PalletPostsComment extends Struct {
    readonly parentId: Option<u64>;
    readonly rootPostId: u64;
  }

  /** @name PalletUtilsContent (141) */
  export interface PalletUtilsContent extends Enum {
    readonly isNone: boolean;
    readonly isRaw: boolean;
    readonly asRaw: Bytes;
    readonly isIpfs: boolean;
    readonly asIpfs: Bytes;
    readonly isHyper: boolean;
    readonly asHyper: Bytes;
    readonly type: 'None' | 'Raw' | 'Ipfs' | 'Hyper';
  }

  /** @name PalletPostsPostUpdate (142) */
  export interface PalletPostsPostUpdate extends Struct {
    readonly spaceId: Option<u64>;
    readonly content: Option<PalletUtilsContent>;
    readonly hidden: Option<bool>;
  }

  /** @name PalletProfileFollowsCall (145) */
  export interface PalletProfileFollowsCall extends Enum {
    readonly isFollowAccount: boolean;
    readonly asFollowAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isUnfollowAccount: boolean;
    readonly asUnfollowAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly type: 'FollowAccount' | 'UnfollowAccount';
  }

  /** @name PalletProfilesCall (146) */
  export interface PalletProfilesCall extends Enum {
    readonly isCreateProfile: boolean;
    readonly asCreateProfile: {
      readonly content: PalletUtilsContent;
    } & Struct;
    readonly isUpdateProfile: boolean;
    readonly asUpdateProfile: {
      readonly update: PalletProfilesProfileUpdate;
    } & Struct;
    readonly type: 'CreateProfile' | 'UpdateProfile';
  }

  /** @name PalletProfilesProfileUpdate (147) */
  export interface PalletProfilesProfileUpdate extends Struct {
    readonly content: Option<PalletUtilsContent>;
  }

  /** @name PalletReactionsCall (148) */
  export interface PalletReactionsCall extends Enum {
    readonly isCreatePostReaction: boolean;
    readonly asCreatePostReaction: {
      readonly postId: u64;
      readonly kind: PalletReactionsReactionKind;
    } & Struct;
    readonly isUpdatePostReaction: boolean;
    readonly asUpdatePostReaction: {
      readonly postId: u64;
      readonly reactionId: u64;
      readonly newKind: PalletReactionsReactionKind;
    } & Struct;
    readonly isDeletePostReaction: boolean;
    readonly asDeletePostReaction: {
      readonly postId: u64;
      readonly reactionId: u64;
    } & Struct;
    readonly type: 'CreatePostReaction' | 'UpdatePostReaction' | 'DeletePostReaction';
  }

  /** @name PalletRolesCall (149) */
  export interface PalletRolesCall extends Enum {
    readonly isCreateRole: boolean;
    readonly asCreateRole: {
      readonly spaceId: u64;
      readonly timeToLive: Option<u32>;
      readonly content: PalletUtilsContent;
      readonly permissions: Vec<PalletPermissionsSpacePermission>;
    } & Struct;
    readonly isUpdateRole: boolean;
    readonly asUpdateRole: {
      readonly roleId: u64;
      readonly update: PalletRolesRoleUpdate;
    } & Struct;
    readonly isDeleteRole: boolean;
    readonly asDeleteRole: {
      readonly roleId: u64;
    } & Struct;
    readonly isGrantRole: boolean;
    readonly asGrantRole: {
      readonly roleId: u64;
      readonly users: Vec<PalletUtilsUser>;
    } & Struct;
    readonly isRevokeRole: boolean;
    readonly asRevokeRole: {
      readonly roleId: u64;
      readonly users: Vec<PalletUtilsUser>;
    } & Struct;
    readonly type: 'CreateRole' | 'UpdateRole' | 'DeleteRole' | 'GrantRole' | 'RevokeRole';
  }

  /** @name PalletPermissionsSpacePermission (151) */
  export interface PalletPermissionsSpacePermission extends Enum {
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

  /** @name PalletRolesRoleUpdate (152) */
  export interface PalletRolesRoleUpdate extends Struct {
    readonly disabled: Option<bool>;
    readonly content: Option<PalletUtilsContent>;
    readonly permissions: Option<BTreeSet>;
  }

  /** @name PalletSpaceFollowsCall (155) */
  export interface PalletSpaceFollowsCall extends Enum {
    readonly isFollowSpace: boolean;
    readonly asFollowSpace: {
      readonly spaceId: u64;
    } & Struct;
    readonly isUnfollowSpace: boolean;
    readonly asUnfollowSpace: {
      readonly spaceId: u64;
    } & Struct;
    readonly type: 'FollowSpace' | 'UnfollowSpace';
  }

  /** @name PalletSpaceOwnershipCall (156) */
  export interface PalletSpaceOwnershipCall extends Enum {
    readonly isTransferSpaceOwnership: boolean;
    readonly asTransferSpaceOwnership: {
      readonly spaceId: u64;
      readonly transferTo: AccountId32;
    } & Struct;
    readonly isAcceptPendingOwnership: boolean;
    readonly asAcceptPendingOwnership: {
      readonly spaceId: u64;
    } & Struct;
    readonly isRejectPendingOwnership: boolean;
    readonly asRejectPendingOwnership: {
      readonly spaceId: u64;
    } & Struct;
    readonly type: 'TransferSpaceOwnership' | 'AcceptPendingOwnership' | 'RejectPendingOwnership';
  }

  /** @name PalletSpacesCall (157) */
  export interface PalletSpacesCall extends Enum {
    readonly isCreateSpace: boolean;
    readonly asCreateSpace: {
      readonly parentIdOpt: Option<u64>;
      readonly handleOpt: Option<Bytes>;
      readonly content: PalletUtilsContent;
      readonly permissionsOpt: Option<PalletPermissionsSpacePermissions>;
    } & Struct;
    readonly isUpdateSpace: boolean;
    readonly asUpdateSpace: {
      readonly spaceId: u64;
      readonly update: PalletSpacesSpaceUpdate;
    } & Struct;
    readonly isUpdateSettings: boolean;
    readonly asUpdateSettings: {
      readonly newSettings: PalletSpacesSpacesSettings;
    } & Struct;
    readonly isForceUnreserveHandle: boolean;
    readonly asForceUnreserveHandle: {
      readonly handle: Bytes;
    } & Struct;
    readonly type: 'CreateSpace' | 'UpdateSpace' | 'UpdateSettings' | 'ForceUnreserveHandle';
  }

  /** @name PalletPermissionsSpacePermissions (159) */
  export interface PalletPermissionsSpacePermissions extends Struct {
    readonly none: Option<BTreeSet>;
    readonly everyone: Option<BTreeSet>;
    readonly follower: Option<BTreeSet>;
    readonly spaceOwner: Option<BTreeSet>;
  }

  /** @name PalletSpacesSpaceUpdate (160) */
  export interface PalletSpacesSpaceUpdate extends Struct {
    readonly parentId: Option<Option<u64>>;
    readonly handle: Option<Option<Bytes>>;
    readonly content: Option<PalletUtilsContent>;
    readonly hidden: Option<bool>;
    readonly permissions: Option<Option<PalletPermissionsSpacePermissions>>;
  }

  /** @name PalletSpacesSpacesSettings (164) */
  export interface PalletSpacesSpacesSettings extends Struct {
    readonly handlesEnabled: bool;
  }

  /** @name PalletFaucetsCall (165) */
  export interface PalletFaucetsCall extends Enum {
    readonly isAddFaucet: boolean;
    readonly asAddFaucet: {
      readonly faucet: AccountId32;
      readonly period: u32;
      readonly periodLimit: u128;
      readonly dripLimit: u128;
    } & Struct;
    readonly isUpdateFaucet: boolean;
    readonly asUpdateFaucet: {
      readonly faucet: AccountId32;
      readonly update: PalletFaucetsFaucetUpdate;
    } & Struct;
    readonly isRemoveFaucets: boolean;
    readonly asRemoveFaucets: {
      readonly faucets: Vec<AccountId32>;
    } & Struct;
    readonly isDrip: boolean;
    readonly asDrip: {
      readonly recipient: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type: 'AddFaucet' | 'UpdateFaucet' | 'RemoveFaucets' | 'Drip';
  }

  /** @name PalletFaucetsFaucetUpdate (166) */
  export interface PalletFaucetsFaucetUpdate extends Struct {
    readonly enabled: Option<bool>;
    readonly period: Option<u32>;
    readonly periodLimit: Option<u128>;
    readonly dripLimit: Option<u128>;
  }

  /** @name PalletDomainsCall (168) */
  export interface PalletDomainsCall extends Enum {
    readonly isRegisterDomain: boolean;
    readonly asRegisterDomain: {
      readonly owner: AccountId32;
      readonly fullDomain: PalletDomainsDomain;
      readonly content: PalletUtilsContent;
      readonly expiresIn: u32;
      readonly price: Compact<u128>;
    } & Struct;
    readonly isSetInnerValue: boolean;
    readonly asSetInnerValue: {
      readonly domain: PalletDomainsDomain;
      readonly value: Option<PalletDomainsDomainInnerLink>;
    } & Struct;
    readonly isSetOuterValue: boolean;
    readonly asSetOuterValue: {
      readonly domain: PalletDomainsDomain;
      readonly valueOpt: Option<Bytes>;
    } & Struct;
    readonly isSetDomainContent: boolean;
    readonly asSetDomainContent: {
      readonly domain: PalletDomainsDomain;
      readonly newContent: PalletUtilsContent;
    } & Struct;
    readonly isReserveDomains: boolean;
    readonly asReserveDomains: {
      readonly domains: Vec<Bytes>;
    } & Struct;
    readonly isAddTlds: boolean;
    readonly asAddTlds: {
      readonly domains: Vec<Bytes>;
    } & Struct;
    readonly type: 'RegisterDomain' | 'SetInnerValue' | 'SetOuterValue' | 'SetDomainContent' | 'ReserveDomains' | 'AddTlds';
  }

  /** @name PalletDomainsDomainInnerLink (170) */
  export interface PalletDomainsDomainInnerLink extends Enum {
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly isSpace: boolean;
    readonly asSpace: u64;
    readonly isPost: boolean;
    readonly asPost: u64;
    readonly type: 'Account' | 'Space' | 'Post';
  }

  /** @name PalletDotsamaClaimsCall (171) */
  export interface PalletDotsamaClaimsCall extends Enum {
    readonly isClaimTokens: boolean;
    readonly isSetRewardsSender: boolean;
    readonly asSetRewardsSender: {
      readonly rewardsSenderOpt: Option<AccountId32>;
    } & Struct;
    readonly isAddEligibleAccounts: boolean;
    readonly asAddEligibleAccounts: {
      readonly eligibleAccounts: Vec<AccountId32>;
    } & Struct;
    readonly type: 'ClaimTokens' | 'SetRewardsSender' | 'AddEligibleAccounts';
  }

  /** @name PalletSudoError (173) */
  export interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletSchedulerScheduledV2 (176) */
  export interface PalletSchedulerScheduledV2 extends Struct {
    readonly maybeId: Option<Bytes>;
    readonly priority: u8;
    readonly call: Call;
    readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
    readonly origin: SubsocialRuntimeOriginCaller;
  }

  /** @name SubsocialRuntimeOriginCaller (177) */
  export interface SubsocialRuntimeOriginCaller extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: FrameSystemRawOrigin;
    readonly isVoid: boolean;
    readonly type: 'System' | 'Void';
  }

  /** @name FrameSystemRawOrigin (178) */
  export interface FrameSystemRawOrigin extends Enum {
    readonly isRoot: boolean;
    readonly isSigned: boolean;
    readonly asSigned: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Root' | 'Signed' | 'None';
  }

  /** @name PalletSchedulerReleases (179) */
  export interface PalletSchedulerReleases extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly type: 'V1' | 'V2';
  }

  /** @name PalletSchedulerError (180) */
  export interface PalletSchedulerError extends Enum {
    readonly isFailedToSchedule: boolean;
    readonly isNotFound: boolean;
    readonly isTargetBlockNumberInPast: boolean;
    readonly isRescheduleNoChange: boolean;
    readonly type: 'FailedToSchedule' | 'NotFound' | 'TargetBlockNumberInPast' | 'RescheduleNoChange';
  }

  /** @name PalletUtilityError (181) */
  export interface PalletUtilityError extends Enum {
    readonly isTooManyCalls: boolean;
    readonly type: 'TooManyCalls';
  }

  /** @name PalletMultisigMultisig (183) */
  export interface PalletMultisigMultisig extends Struct {
    readonly when: PalletMultisigTimepoint;
    readonly deposit: u128;
    readonly depositor: AccountId32;
    readonly approvals: Vec<AccountId32>;
  }

  /** @name PalletMultisigError (185) */
  export interface PalletMultisigError extends Enum {
    readonly isMinimumThreshold: boolean;
    readonly isAlreadyApproved: boolean;
    readonly isNoApprovalsNeeded: boolean;
    readonly isTooFewSignatories: boolean;
    readonly isTooManySignatories: boolean;
    readonly isSignatoriesOutOfOrder: boolean;
    readonly isSenderInSignatories: boolean;
    readonly isNotFound: boolean;
    readonly isNotOwner: boolean;
    readonly isNoTimepoint: boolean;
    readonly isWrongTimepoint: boolean;
    readonly isUnexpectedTimepoint: boolean;
    readonly isMaxWeightTooLow: boolean;
    readonly isAlreadyStored: boolean;
    readonly type: 'MinimumThreshold' | 'AlreadyApproved' | 'NoApprovalsNeeded' | 'TooFewSignatories' | 'TooManySignatories' | 'SignatoriesOutOfOrder' | 'SenderInSignatories' | 'NotFound' | 'NotOwner' | 'NoTimepoint' | 'WrongTimepoint' | 'UnexpectedTimepoint' | 'MaxWeightTooLow' | 'AlreadyStored';
  }

  /** @name PalletProxyProxyDefinition (188) */
  export interface PalletProxyProxyDefinition extends Struct {
    readonly delegate: AccountId32;
    readonly proxyType: SubsocialRuntimeProxyType;
    readonly delay: u32;
  }

  /** @name PalletProxyAnnouncement (192) */
  export interface PalletProxyAnnouncement extends Struct {
    readonly real: AccountId32;
    readonly callHash: H256;
    readonly height: u32;
  }

  /** @name PalletProxyError (194) */
  export interface PalletProxyError extends Enum {
    readonly isTooMany: boolean;
    readonly isNotFound: boolean;
    readonly isNotProxy: boolean;
    readonly isUnproxyable: boolean;
    readonly isDuplicate: boolean;
    readonly isNoPermission: boolean;
    readonly isUnannounced: boolean;
    readonly isNoSelfProxy: boolean;
    readonly type: 'TooMany' | 'NotFound' | 'NotProxy' | 'Unproxyable' | 'Duplicate' | 'NoPermission' | 'Unannounced' | 'NoSelfProxy';
  }

  /** @name PalletPostsPost (195) */
  export interface PalletPostsPost extends Struct {
    readonly id: u64;
    readonly created: PalletUtilsWhoAndWhen;
    readonly updated: Option<PalletUtilsWhoAndWhen>;
    readonly owner: AccountId32;
    readonly extension: PalletPostsPostExtension;
    readonly spaceId: Option<u64>;
    readonly content: PalletUtilsContent;
    readonly hidden: bool;
    readonly repliesCount: u16;
    readonly hiddenRepliesCount: u16;
    readonly sharesCount: u16;
    readonly upvotesCount: u16;
    readonly downvotesCount: u16;
    readonly score: i32;
  }

  /** @name PalletUtilsWhoAndWhen (196) */
  export interface PalletUtilsWhoAndWhen extends Struct {
    readonly account: AccountId32;
    readonly block: u32;
    readonly time: u64;
  }

  /** @name PalletPostsError (200) */
  export interface PalletPostsError extends Enum {
    readonly isPostNotFound: boolean;
    readonly isNotAPostOwner: boolean;
    readonly isNoUpdatesForPost: boolean;
    readonly isPostHasNoSpaceId: boolean;
    readonly isCannotCreateInHiddenScope: boolean;
    readonly isNoRepliesOnPost: boolean;
    readonly isCannotMoveToSameSpace: boolean;
    readonly isOriginalPostNotFound: boolean;
    readonly isCannotShareSharingPost: boolean;
    readonly isNotASharingPost: boolean;
    readonly isUnknownParentComment: boolean;
    readonly isNotACommentByParentId: boolean;
    readonly isCannotUpdateSpaceIdOnComment: boolean;
    readonly isMaxCommentDepthReached: boolean;
    readonly isNotACommentAuthor: boolean;
    readonly isNotComment: boolean;
    readonly isNoPermissionToCreatePosts: boolean;
    readonly isNoPermissionToCreateComments: boolean;
    readonly isNoPermissionToShare: boolean;
    readonly isNoPermissionToUpdateAnyPost: boolean;
    readonly isNoPermissionToUpdateOwnPosts: boolean;
    readonly isNoPermissionToUpdateOwnComments: boolean;
    readonly type: 'PostNotFound' | 'NotAPostOwner' | 'NoUpdatesForPost' | 'PostHasNoSpaceId' | 'CannotCreateInHiddenScope' | 'NoRepliesOnPost' | 'CannotMoveToSameSpace' | 'OriginalPostNotFound' | 'CannotShareSharingPost' | 'NotASharingPost' | 'UnknownParentComment' | 'NotACommentByParentId' | 'CannotUpdateSpaceIdOnComment' | 'MaxCommentDepthReached' | 'NotACommentAuthor' | 'NotComment' | 'NoPermissionToCreatePosts' | 'NoPermissionToCreateComments' | 'NoPermissionToShare' | 'NoPermissionToUpdateAnyPost' | 'NoPermissionToUpdateOwnPosts' | 'NoPermissionToUpdateOwnComments';
  }

  /** @name PalletPostHistoryPostHistoryRecord (202) */
  export interface PalletPostHistoryPostHistoryRecord extends Struct {
    readonly edited: PalletUtilsWhoAndWhen;
    readonly oldData: PalletPostsPostUpdate;
  }

  /** @name PalletProfileFollowsError (204) */
  export interface PalletProfileFollowsError extends Enum {
    readonly isFollowerAccountNotFound: boolean;
    readonly isFollowedAccountNotFound: boolean;
    readonly isAccountCannotFollowItself: boolean;
    readonly isAccountCannotUnfollowItself: boolean;
    readonly isAlreadyAccountFollower: boolean;
    readonly isNotAccountFollower: boolean;
    readonly type: 'FollowerAccountNotFound' | 'FollowedAccountNotFound' | 'AccountCannotFollowItself' | 'AccountCannotUnfollowItself' | 'AlreadyAccountFollower' | 'NotAccountFollower';
  }

  /** @name PalletProfilesSocialAccount (205) */
  export interface PalletProfilesSocialAccount extends Struct {
    readonly followersCount: u32;
    readonly followingAccountsCount: u16;
    readonly followingSpacesCount: u16;
    readonly reputation: u32;
    readonly profile: Option<PalletProfilesProfile>;
  }

  /** @name PalletProfilesProfile (207) */
  export interface PalletProfilesProfile extends Struct {
    readonly created: PalletUtilsWhoAndWhen;
    readonly updated: Option<PalletUtilsWhoAndWhen>;
    readonly content: PalletUtilsContent;
  }

  /** @name PalletProfilesError (208) */
  export interface PalletProfilesError extends Enum {
    readonly isSocialAccountNotFound: boolean;
    readonly isProfileAlreadyCreated: boolean;
    readonly isNoUpdatesForProfile: boolean;
    readonly isAccountHasNoProfile: boolean;
    readonly type: 'SocialAccountNotFound' | 'ProfileAlreadyCreated' | 'NoUpdatesForProfile' | 'AccountHasNoProfile';
  }

  /** @name PalletProfileHistoryProfileHistoryRecord (210) */
  export interface PalletProfileHistoryProfileHistoryRecord extends Struct {
    readonly edited: PalletUtilsWhoAndWhen;
    readonly oldData: PalletProfilesProfileUpdate;
  }

  /** @name PalletReactionsReaction (211) */
  export interface PalletReactionsReaction extends Struct {
    readonly id: u64;
    readonly created: PalletUtilsWhoAndWhen;
    readonly updated: Option<PalletUtilsWhoAndWhen>;
    readonly kind: PalletReactionsReactionKind;
  }

  /** @name PalletReactionsError (213) */
  export interface PalletReactionsError extends Enum {
    readonly isReactionNotFound: boolean;
    readonly isAccountAlreadyReacted: boolean;
    readonly isReactionByAccountNotFound: boolean;
    readonly isNotReactionOwner: boolean;
    readonly isSameReaction: boolean;
    readonly isCannotReactWhenSpaceHidden: boolean;
    readonly isCannotReactWhenPostHidden: boolean;
    readonly isNoPermissionToUpvote: boolean;
    readonly isNoPermissionToDownvote: boolean;
    readonly type: 'ReactionNotFound' | 'AccountAlreadyReacted' | 'ReactionByAccountNotFound' | 'NotReactionOwner' | 'SameReaction' | 'CannotReactWhenSpaceHidden' | 'CannotReactWhenPostHidden' | 'NoPermissionToUpvote' | 'NoPermissionToDownvote';
  }

  /** @name PalletRolesRole (214) */
  export interface PalletRolesRole extends Struct {
    readonly created: PalletUtilsWhoAndWhen;
    readonly updated: Option<PalletUtilsWhoAndWhen>;
    readonly id: u64;
    readonly spaceId: u64;
    readonly disabled: bool;
    readonly expiresAt: Option<u32>;
    readonly content: PalletUtilsContent;
    readonly permissions: BTreeSet;
  }

  /** @name PalletRolesError (216) */
  export interface PalletRolesError extends Enum {
    readonly isRoleNotFound: boolean;
    readonly isRoleIdOverflow: boolean;
    readonly isNoPermissionToManageRoles: boolean;
    readonly isNoUpdatesProvided: boolean;
    readonly isNoPermissionsProvided: boolean;
    readonly isNoUsersProvided: boolean;
    readonly isTooManyUsersToDeleteRole: boolean;
    readonly isRoleAlreadyDisabled: boolean;
    readonly isRoleAlreadyEnabled: boolean;
    readonly type: 'RoleNotFound' | 'RoleIdOverflow' | 'NoPermissionToManageRoles' | 'NoUpdatesProvided' | 'NoPermissionsProvided' | 'NoUsersProvided' | 'TooManyUsersToDeleteRole' | 'RoleAlreadyDisabled' | 'RoleAlreadyEnabled';
  }

  /** @name PalletSpaceFollowsError (217) */
  export interface PalletSpaceFollowsError extends Enum {
    readonly isSocialAccountNotFound: boolean;
    readonly isAlreadySpaceFollower: boolean;
    readonly isNotSpaceFollower: boolean;
    readonly isCannotFollowHiddenSpace: boolean;
    readonly type: 'SocialAccountNotFound' | 'AlreadySpaceFollower' | 'NotSpaceFollower' | 'CannotFollowHiddenSpace';
  }

  /** @name PalletSpaceHistorySpaceHistoryRecord (219) */
  export interface PalletSpaceHistorySpaceHistoryRecord extends Struct {
    readonly edited: PalletUtilsWhoAndWhen;
    readonly oldData: PalletSpacesSpaceUpdate;
  }

  /** @name PalletSpaceOwnershipError (220) */
  export interface PalletSpaceOwnershipError extends Enum {
    readonly isCannotTranferToCurrentOwner: boolean;
    readonly isAlreadyASpaceOwner: boolean;
    readonly isNoPendingTransferOnSpace: boolean;
    readonly isNotAllowedToAcceptOwnershipTransfer: boolean;
    readonly isNotAllowedToRejectOwnershipTransfer: boolean;
    readonly type: 'CannotTranferToCurrentOwner' | 'AlreadyASpaceOwner' | 'NoPendingTransferOnSpace' | 'NotAllowedToAcceptOwnershipTransfer' | 'NotAllowedToRejectOwnershipTransfer';
  }

  /** @name PalletSpacesSpace (221) */
  export interface PalletSpacesSpace extends Struct {
    readonly id: u64;
    readonly created: PalletUtilsWhoAndWhen;
    readonly updated: Option<PalletUtilsWhoAndWhen>;
    readonly owner: AccountId32;
    readonly parentId: Option<u64>;
    readonly handle: Option<Bytes>;
    readonly content: PalletUtilsContent;
    readonly hidden: bool;
    readonly postsCount: u32;
    readonly hiddenPostsCount: u32;
    readonly followersCount: u32;
    readonly score: i32;
    readonly permissions: Option<PalletPermissionsSpacePermissions>;
  }

  /** @name PalletSpacesError (222) */
  export interface PalletSpacesError extends Enum {
    readonly isSpaceNotFound: boolean;
    readonly isSpaceHandleIsNotUnique: boolean;
    readonly isHandlesAreDisabled: boolean;
    readonly isNoUpdatesForSpace: boolean;
    readonly isNotASpaceOwner: boolean;
    readonly isNoPermissionToUpdateSpace: boolean;
    readonly isNoPermissionToCreateSubspaces: boolean;
    readonly isSpaceIsAtRoot: boolean;
    readonly isNoUpdatesForSpacesSettings: boolean;
    readonly type: 'SpaceNotFound' | 'SpaceHandleIsNotUnique' | 'HandlesAreDisabled' | 'NoUpdatesForSpace' | 'NotASpaceOwner' | 'NoPermissionToUpdateSpace' | 'NoPermissionToCreateSubspaces' | 'SpaceIsAtRoot' | 'NoUpdatesForSpacesSettings';
  }

  /** @name PalletUtilsError (223) */
  export interface PalletUtilsError extends Enum {
    readonly isAccountIsBlocked: boolean;
    readonly isContentIsBlocked: boolean;
    readonly isPostIsBlocked: boolean;
    readonly isInvalidIpfsCid: boolean;
    readonly isRawContentTypeNotSupported: boolean;
    readonly isHypercoreContentTypeNotSupported: boolean;
    readonly isHandleIsTooShort: boolean;
    readonly isHandleIsTooLong: boolean;
    readonly isHandleContainsInvalidChars: boolean;
    readonly isContentIsEmpty: boolean;
    readonly type: 'AccountIsBlocked' | 'ContentIsBlocked' | 'PostIsBlocked' | 'InvalidIpfsCid' | 'RawContentTypeNotSupported' | 'HypercoreContentTypeNotSupported' | 'HandleIsTooShort' | 'HandleIsTooLong' | 'HandleContainsInvalidChars' | 'ContentIsEmpty';
  }

  /** @name PalletFaucetsFaucet (224) */
  export interface PalletFaucetsFaucet extends Struct {
    readonly enabled: bool;
    readonly period: u32;
    readonly periodLimit: u128;
    readonly dripLimit: u128;
    readonly nextPeriodAt: u32;
    readonly drippedInCurrentPeriod: u128;
  }

  /** @name PalletFaucetsError (225) */
  export interface PalletFaucetsError extends Enum {
    readonly isFaucetNotFound: boolean;
    readonly isFaucetAlreadyAdded: boolean;
    readonly isNoFreeBalanceOnFaucet: boolean;
    readonly isNotEnoughFreeBalanceOnFaucet: boolean;
    readonly isNoFaucetsProvided: boolean;
    readonly isNoUpdatesProvided: boolean;
    readonly isNothingToUpdate: boolean;
    readonly isFaucetDisabled: boolean;
    readonly isNotFaucetOwner: boolean;
    readonly isRecipientEqualsFaucet: boolean;
    readonly isDripLimitCannotExceedPeriodLimit: boolean;
    readonly isZeroPeriodProvided: boolean;
    readonly isZeroPeriodLimitProvided: boolean;
    readonly isZeroDripLimitProvided: boolean;
    readonly isZeroDripAmountProvided: boolean;
    readonly isPeriodLimitReached: boolean;
    readonly isDripLimitReached: boolean;
    readonly type: 'FaucetNotFound' | 'FaucetAlreadyAdded' | 'NoFreeBalanceOnFaucet' | 'NotEnoughFreeBalanceOnFaucet' | 'NoFaucetsProvided' | 'NoUpdatesProvided' | 'NothingToUpdate' | 'FaucetDisabled' | 'NotFaucetOwner' | 'RecipientEqualsFaucet' | 'DripLimitCannotExceedPeriodLimit' | 'ZeroPeriodProvided' | 'ZeroPeriodLimitProvided' | 'ZeroDripLimitProvided' | 'ZeroDripAmountProvided' | 'PeriodLimitReached' | 'DripLimitReached';
  }

  /** @name PalletDomainsDomainMeta (226) */
  export interface PalletDomainsDomainMeta extends Struct {
    readonly created: PalletUtilsWhoAndWhen;
    readonly updated: Option<PalletUtilsWhoAndWhen>;
    readonly expiresAt: u32;
    readonly owner: AccountId32;
    readonly content: PalletUtilsContent;
    readonly innerValue: Option<PalletDomainsDomainInnerLink>;
    readonly outerValue: Option<Bytes>;
    readonly domainDeposit: u128;
    readonly outerValueDeposit: u128;
  }

  /** @name PalletDomainsError (228) */
  export interface PalletDomainsError extends Enum {
    readonly isDomainContentNotChanged: boolean;
    readonly isDomainsInsertLimitReached: boolean;
    readonly isDomainHasExpired: boolean;
    readonly isDomainNotFound: boolean;
    readonly isDomainReserved: boolean;
    readonly isDomainAlreadyStored: boolean;
    readonly isInnerValueNotChanged: boolean;
    readonly isLowerLevelDomainsNotAllowed: boolean;
    readonly isNotADomainOwner: boolean;
    readonly isOuterValueOffLengthLimit: boolean;
    readonly isOuterValueNotChanged: boolean;
    readonly isZeroReservationPeriod: boolean;
    readonly isTooBigReservationPeriod: boolean;
    readonly isTopLevelDomainContainsInvalidChar: boolean;
    readonly isTopLevelDomainIsOffLengthLimits: boolean;
    readonly isTopLevelDomainNotSupported: boolean;
    readonly isInnerValueNotSupported: boolean;
    readonly type: 'DomainContentNotChanged' | 'DomainsInsertLimitReached' | 'DomainHasExpired' | 'DomainNotFound' | 'DomainReserved' | 'DomainAlreadyStored' | 'InnerValueNotChanged' | 'LowerLevelDomainsNotAllowed' | 'NotADomainOwner' | 'OuterValueOffLengthLimit' | 'OuterValueNotChanged' | 'ZeroReservationPeriod' | 'TooBigReservationPeriod' | 'TopLevelDomainContainsInvalidChar' | 'TopLevelDomainIsOffLengthLimits' | 'TopLevelDomainNotSupported' | 'InnerValueNotSupported';
  }

  /** @name PalletDotsamaClaimsError (229) */
  export interface PalletDotsamaClaimsError extends Enum {
    readonly isNoRewardsSenderSet: boolean;
    readonly isRewardsSenderHasInsufficientBalance: boolean;
    readonly isAddingTooManyAccountsAtOnce: boolean;
    readonly isAccountNotEligible: boolean;
    readonly isTokensAlreadyClaimed: boolean;
    readonly type: 'NoRewardsSenderSet' | 'RewardsSenderHasInsufficientBalance' | 'AddingTooManyAccountsAtOnce' | 'AccountNotEligible' | 'TokensAlreadyClaimed';
  }

  /** @name SpRuntimeMultiSignature (231) */
  export interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreSr25519Signature (232) */
  export interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name SpCoreEcdsaSignature (233) */
  export interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name FrameSystemExtensionsCheckSpecVersion (236) */
  export type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (237) */
  export type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (238) */
  export type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (241) */
  export interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (242) */
  export type FrameSystemExtensionsCheckWeight = Null;

  /** @name PalletTransactionPaymentChargeTransactionPayment (243) */
  export interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name PalletDotsamaClaimsEnsureAllowedToClaimTokens (244) */
  export type PalletDotsamaClaimsEnsureAllowedToClaimTokens = Null;

  /** @name SubsocialRuntimeRuntime (245) */
  export type SubsocialRuntimeRuntime = Null;

} // declare module
