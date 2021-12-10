// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Index, pallet_balances::AccountData<Balance>>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u32',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'PalletBalancesAccountData'
  },
  /**
   * Lookup5: pallet_balances::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u128',
    reserved: 'u128',
    miscFrozen: 'u128',
    feeFrozen: 'u128'
  },
  /**
   * Lookup7: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU64: {
    normal: 'u64',
    operational: 'u64',
    mandatory: 'u64'
  },
  /**
   * Lookup11: sp_runtime::generic::digest::Digest<primitive_types::H256>
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup13: sp_runtime::generic::digest::DigestItem<primitive_types::H256>
   **/
  SpRuntimeDigestDigestItem: {
    _enum: {
      Other: 'Bytes',
      __Unused1: 'Null',
      ChangesTrieRoot: 'H256',
      __Unused3: 'Null',
      Consensus: '([u8;4],Bytes)',
      Seal: '([u8;4],Bytes)',
      PreRuntime: '([u8;4],Bytes)',
      ChangesTrieSignal: 'SpRuntimeDigestChangesTrieSignal',
      RuntimeEnvironmentUpdated: 'Null'
    }
  },
  /**
   * Lookup15: sp_runtime::generic::digest::ChangesTrieSignal
   **/
  SpRuntimeDigestChangesTrieSignal: {
    _enum: {
      NewConfiguration: 'Option<SpCoreChangesTrieChangesTrieConfiguration>'
    }
  },
  /**
   * Lookup17: sp_core::changes_trie::ChangesTrieConfiguration
   **/
  SpCoreChangesTrieChangesTrieConfiguration: {
    digestInterval: 'u32',
    digestLevels: 'u32'
  },
  /**
   * Lookup19: frame_system::EventRecord<subsocial_runtime::Event, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup21: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: 'FrameSupportWeightsDispatchInfo',
      ExtrinsicFailed: '(SpRuntimeDispatchError,FrameSupportWeightsDispatchInfo)',
      CodeUpdated: 'Null',
      NewAccount: 'AccountId32',
      KilledAccount: 'AccountId32',
      Remarked: '(AccountId32,H256)'
    }
  },
  /**
   * Lookup22: frame_support::weights::DispatchInfo
   **/
  FrameSupportWeightsDispatchInfo: {
    weight: 'u64',
    class: 'FrameSupportWeightsDispatchClass',
    paysFee: 'FrameSupportWeightsPays'
  },
  /**
   * Lookup23: frame_support::weights::DispatchClass
   **/
  FrameSupportWeightsDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup24: frame_support::weights::Pays
   **/
  FrameSupportWeightsPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup25: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: 'Null',
      CannotLookup: 'Null',
      BadOrigin: 'Null',
      Module: {
        index: 'u8',
        error: 'u8',
      },
      ConsumerRemaining: 'Null',
      NoProviders: 'Null',
      Token: 'SpRuntimeTokenError',
      Arithmetic: 'SpRuntimeArithmeticError'
    }
  },
  /**
   * Lookup26: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
  },
  /**
   * Lookup27: sp_runtime::ArithmeticError
   **/
  SpRuntimeArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup28: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
      Paused: 'Null',
      Resumed: 'Null'
    }
  },
  /**
   * Lookup31: sp_finality_grandpa::app::Public
   **/
  SpFinalityGrandpaAppPublic: 'SpCoreEd25519Public',
  /**
   * Lookup32: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: '[u8;32]',
  /**
   * Lookup33: pallet_balances::pallet::Event<T, I>
   **/
  PalletBalancesEvent: {
    _enum: {
      Endowed: '(AccountId32,u128)',
      DustLost: '(AccountId32,u128)',
      Transfer: '(AccountId32,AccountId32,u128)',
      BalanceSet: '(AccountId32,u128,u128)',
      Reserved: '(AccountId32,u128)',
      Unreserved: '(AccountId32,u128)',
      ReserveRepatriated: '(AccountId32,AccountId32,u128,FrameSupportTokensMiscBalanceStatus)',
      Deposit: '(AccountId32,u128)',
      Withdraw: '(AccountId32,u128)',
      Slashed: '(AccountId32,u128)'
    }
  },
  /**
   * Lookup34: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup35: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: 'Result<Null, SpRuntimeDispatchError>',
      KeyChanged: 'AccountId32',
      SudoAsDone: 'Result<Null, SpRuntimeDispatchError>'
    }
  },
  /**
   * Lookup38: pallet_scheduler::pallet::Event<T>
   **/
  PalletSchedulerEvent: {
    _enum: {
      Scheduled: '(u32,u32)',
      Canceled: '(u32,u32)',
      Dispatched: '((u32,u32),Option<Bytes>,Result<Null, SpRuntimeDispatchError>)'
    }
  },
  /**
   * Lookup41: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: '(u32,SpRuntimeDispatchError)',
      BatchCompleted: 'Null',
      ItemCompleted: 'Null'
    }
  },
  /**
   * Lookup42: pallet_multisig::pallet::Event<T>
   **/
  PalletMultisigEvent: {
    _enum: {
      NewMultisig: '(AccountId32,AccountId32,[u8;32])',
      MultisigApproval: '(AccountId32,PalletMultisigTimepoint,AccountId32,[u8;32])',
      MultisigExecuted: '(AccountId32,PalletMultisigTimepoint,AccountId32,[u8;32],Result<Null, SpRuntimeDispatchError>)',
      MultisigCancelled: '(AccountId32,PalletMultisigTimepoint,AccountId32,[u8;32])'
    }
  },
  /**
   * Lookup43: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup44: pallet_proxy::pallet::Event<T>
   **/
  PalletProxyEvent: {
    _enum: {
      ProxyExecuted: 'Result<Null, SpRuntimeDispatchError>',
      AnonymousCreated: '(AccountId32,AccountId32,SubsocialRuntimeProxyType,u16)',
      Announced: '(AccountId32,AccountId32,H256)',
      ProxyAdded: '(AccountId32,AccountId32,SubsocialRuntimeProxyType,u32)'
    }
  },
  /**
   * Lookup45: subsocial_runtime::ProxyType
   **/
  SubsocialRuntimeProxyType: {
    _enum: ['Any', 'NonTransfer']
  },
  /**
   * Lookup47: pallet_posts::RawEvent<sp_core::crypto::AccountId32>
   **/
  PalletPostsRawEvent: {
    _enum: {
      PostCreated: '(AccountId32,u64)',
      PostUpdated: '(AccountId32,u64)',
      PostDeleted: '(AccountId32,u64)',
      PostShared: '(AccountId32,u64)',
      PostMoved: '(AccountId32,u64)'
    }
  },
  /**
   * Lookup48: pallet_profile_follows::RawEvent<sp_core::crypto::AccountId32>
   **/
  PalletProfileFollowsRawEvent: {
    _enum: {
      AccountFollowed: '(AccountId32,AccountId32)',
      AccountUnfollowed: '(AccountId32,AccountId32)'
    }
  },
  /**
   * Lookup49: pallet_profiles::RawEvent<sp_core::crypto::AccountId32>
   **/
  PalletProfilesRawEvent: {
    _enum: {
      ProfileCreated: 'AccountId32',
      ProfileUpdated: 'AccountId32'
    }
  },
  /**
   * Lookup50: pallet_reactions::RawEvent<sp_core::crypto::AccountId32>
   **/
  PalletReactionsRawEvent: {
    _enum: {
      PostReactionCreated: '(AccountId32,u64,u64,PalletReactionsReactionKind)',
      PostReactionUpdated: '(AccountId32,u64,u64,PalletReactionsReactionKind)',
      PostReactionDeleted: '(AccountId32,u64,u64,PalletReactionsReactionKind)'
    }
  },
  /**
   * Lookup51: pallet_reactions::ReactionKind
   **/
  PalletReactionsReactionKind: {
    _enum: ['Upvote', 'Downvote']
  },
  /**
   * Lookup52: pallet_roles::RawEvent<sp_core::crypto::AccountId32>
   **/
  PalletRolesRawEvent: {
    _enum: {
      RoleCreated: '(AccountId32,u64,u64)',
      RoleUpdated: '(AccountId32,u64)',
      RoleDeleted: '(AccountId32,u64)',
      RoleGranted: '(AccountId32,u64,Vec<PalletUtilsUser>)',
      RoleRevoked: '(AccountId32,u64,Vec<PalletUtilsUser>)'
    }
  },
  /**
   * Lookup54: pallet_utils::User<sp_core::crypto::AccountId32>
   **/
  PalletUtilsUser: {
    _enum: {
      Account: 'AccountId32',
      Space: 'u64'
    }
  },
  /**
   * Lookup55: pallet_space_follows::RawEvent<sp_core::crypto::AccountId32>
   **/
  PalletSpaceFollowsRawEvent: {
    _enum: {
      SpaceFollowed: '(AccountId32,u64)',
      SpaceUnfollowed: '(AccountId32,u64)'
    }
  },
  /**
   * Lookup56: pallet_space_ownership::RawEvent<sp_core::crypto::AccountId32>
   **/
  PalletSpaceOwnershipRawEvent: {
    _enum: {
      SpaceOwnershipTransferCreated: '(AccountId32,u64,AccountId32)',
      SpaceOwnershipTransferAccepted: '(AccountId32,u64)',
      SpaceOwnershipTransferRejected: '(AccountId32,u64)'
    }
  },
  /**
   * Lookup57: pallet_spaces::RawEvent<sp_core::crypto::AccountId32>
   **/
  PalletSpacesRawEvent: {
    _enum: {
      SpaceCreated: '(AccountId32,u64)',
      SpaceUpdated: '(AccountId32,u64)',
      SpaceDeleted: '(AccountId32,u64)'
    }
  },
  /**
   * Lookup58: pallet_utils::RawEvent<Balance>
   **/
  PalletUtilsRawEvent: {
    _enum: {
      Deposit: 'u128'
    }
  },
  /**
   * Lookup59: pallet_faucets::RawEvent<sp_core::crypto::AccountId32, Balance>
   **/
  PalletFaucetsRawEvent: {
    _enum: {
      FaucetAdded: 'AccountId32',
      FaucetUpdated: 'AccountId32',
      FaucetsRemoved: 'Vec<AccountId32>',
      Dripped: '(AccountId32,AccountId32,u128)'
    }
  },
  /**
   * Lookup61: pallet_domains::pallet::Event<T>
   **/
  PalletDomainsEvent: {
    _enum: {
      DomainPurchased: '(AccountId32,Bytes,Bytes)',
      DomainUpdated: '(AccountId32,Bytes,Bytes)',
      DomainsReserved: 'Null',
      TopLevelDomainsAllowed: 'Null'
    }
  },
  /**
   * Lookup62: pallet_dotsama_claims::pallet::Event<T>
   **/
  PalletDotsamaClaimsEvent: {
    _enum: {
      RewardsSenderSet: 'AccountId32',
      RewardsSenderRemoved: 'Null',
      EligibleAccountsAdded: 'u16',
      TokensClaimed: '(AccountId32,u128)'
    }
  },
  /**
   * Lookup63: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup66: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup70: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      fill_block: {
        ratio: 'Perbill',
      },
      remark: {
        remark: 'Bytes',
      },
      set_heap_pages: {
        pages: 'u64',
      },
      set_code: {
        code: 'Bytes',
      },
      set_code_without_checks: {
        code: 'Bytes',
      },
      set_changes_trie_config: {
        changesTrieConfig: 'Option<SpCoreChangesTrieChangesTrieConfiguration>',
      },
      set_storage: {
        items: 'Vec<(Bytes,Bytes)>',
      },
      kill_storage: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'Vec<Bytes>',
      },
      kill_prefix: {
        prefix: 'Bytes',
        subkeys: 'u32',
      },
      remark_with_event: {
        remark: 'Bytes'
      }
    }
  },
  /**
   * Lookup75: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'u64',
    maxBlock: 'u64',
    perClass: 'FrameSupportWeightsPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup76: frame_support::weights::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportWeightsPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup77: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'u64',
    maxExtrinsic: 'Option<u64>',
    maxTotal: 'Option<u64>',
    reserved: 'Option<u64>'
  },
  /**
   * Lookup79: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportWeightsPerDispatchClassU32'
  },
  /**
   * Lookup80: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup81: frame_support::weights::RuntimeDbWeight
   **/
  FrameSupportWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup82: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32'
  },
  /**
   * Lookup87: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount']
  },
  /**
   * Lookup88: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup90: pallet_grandpa::StoredState<N>
   **/
  PalletGrandpaStoredState: {
    _enum: {
      Live: 'Null',
      PendingPause: {
        scheduledAt: 'u32',
        delay: 'u32',
      },
      Paused: 'Null',
      PendingResume: {
        scheduledAt: 'u32',
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup91: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
    forced: 'Option<u32>'
  },
  /**
   * Lookup94: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      note_stalled: {
        delay: 'u32',
        bestFinalizedBlockNumber: 'u32'
      }
    }
  },
  /**
   * Lookup95: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpFinalityGrandpaEquivocation'
  },
  /**
   * Lookup96: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit'
    }
  },
  /**
   * Lookup97: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup98: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup99: sp_finality_grandpa::app::Signature
   **/
  SpFinalityGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup100: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup103: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup104: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup106: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup107: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup109: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup110: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup113: pallet_balances::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup115: pallet_balances::Releases
   **/
  PalletBalancesReleases: {
    _enum: ['V1_0_0', 'V2_0_0']
  },
  /**
   * Lookup116: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      set_balance: {
        who: 'MultiAddress',
        newFree: 'Compact<u128>',
        newReserved: 'Compact<u128>',
      },
      force_transfer: {
        source: 'MultiAddress',
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      transfer_keep_alive: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      transfer_all: {
        dest: 'MultiAddress',
        keepAlive: 'bool',
      },
      force_unreserve: {
        who: 'MultiAddress',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup121: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup123: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup125: frame_support::weights::WeightToFeeCoefficient<Balance>
   **/
  FrameSupportWeightsWeightToFeeCoefficient: {
    coeffInteger: 'u128',
    coeffFrac: 'Perbill',
    negative: 'bool',
    degree: 'u8'
  },
  /**
   * Lookup126: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'u64',
      },
      set_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'MultiAddress',
      },
      sudo_as: {
        who: 'MultiAddress',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup128: pallet_scheduler::pallet::Call<T>
   **/
  PalletSchedulerCall: {
    _enum: {
      schedule: {
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel: {
        when: 'u32',
        index: 'u32',
      },
      schedule_named: {
        id: 'Bytes',
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel_named: {
        id: 'Bytes',
      },
      schedule_after: {
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      schedule_named_after: {
        id: 'Bytes',
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup130: pallet_utility::pallet::Call<T>
   **/
  PalletUtilityCall: {
    _enum: {
      batch: {
        calls: 'Vec<Call>',
      },
      as_derivative: {
        index: 'u16',
        call: 'Call',
      },
      batch_all: {
        calls: 'Vec<Call>'
      }
    }
  },
  /**
   * Lookup132: pallet_multisig::pallet::Call<T>
   **/
  PalletMultisigCall: {
    _enum: {
      as_multi_threshold_1: {
        otherSignatories: 'Vec<AccountId32>',
        call: 'Call',
      },
      as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        call: 'Bytes',
        storeCall: 'bool',
        maxWeight: 'u64',
      },
      approve_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        callHash: '[u8;32]',
        maxWeight: 'u64',
      },
      cancel_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        timepoint: 'PalletMultisigTimepoint',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup134: pallet_proxy::pallet::Call<T>
   **/
  PalletProxyCall: {
    _enum: {
      proxy: {
        real: 'AccountId32',
        forceProxyType: 'Option<SubsocialRuntimeProxyType>',
        call: 'Call',
      },
      add_proxy: {
        delegate: 'AccountId32',
        proxyType: 'SubsocialRuntimeProxyType',
        delay: 'u32',
      },
      remove_proxy: {
        delegate: 'AccountId32',
        proxyType: 'SubsocialRuntimeProxyType',
        delay: 'u32',
      },
      remove_proxies: 'Null',
      anonymous: {
        proxyType: 'SubsocialRuntimeProxyType',
        delay: 'u32',
        index: 'u16',
      },
      kill_anonymous: {
        spawner: 'AccountId32',
        proxyType: 'SubsocialRuntimeProxyType',
        index: 'u16',
        height: 'Compact<u32>',
        extIndex: 'Compact<u32>',
      },
      announce: {
        real: 'AccountId32',
        callHash: 'H256',
      },
      remove_announcement: {
        real: 'AccountId32',
        callHash: 'H256',
      },
      reject_announcement: {
        delegate: 'AccountId32',
        callHash: 'H256',
      },
      proxy_announced: {
        delegate: 'AccountId32',
        real: 'AccountId32',
        forceProxyType: 'Option<SubsocialRuntimeProxyType>',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup136: pallet_permissions::Call<T>
   **/
  PalletPermissionsCall: 'Null',
  /**
   * Lookup137: pallet_posts::Call<T>
   **/
  PalletPostsCall: {
    _enum: {
      create_post: {
        spaceIdOpt: 'Option<u64>',
        extension: 'PalletPostsPostExtension',
        content: 'PalletUtilsContent',
      },
      update_post: {
        postId: 'u64',
        update: 'PalletPostsPostUpdate',
      },
      move_post: {
        postId: 'u64',
        newSpaceId: 'Option<u64>'
      }
    }
  },
  /**
   * Lookup138: pallet_posts::PostExtension
   **/
  PalletPostsPostExtension: {
    _enum: {
      RegularPost: 'Null',
      Comment: 'PalletPostsComment',
      SharedPost: 'u64'
    }
  },
  /**
   * Lookup139: pallet_posts::Comment
   **/
  PalletPostsComment: {
    parentId: 'Option<u64>',
    rootPostId: 'u64'
  },
  /**
   * Lookup140: pallet_utils::Content
   **/
  PalletUtilsContent: {
    _enum: {
      None: 'Null',
      Raw: 'Bytes',
      IPFS: 'Bytes',
      Hyper: 'Bytes'
    }
  },
  /**
   * Lookup141: pallet_posts::PostUpdate
   **/
  PalletPostsPostUpdate: {
    spaceId: 'Option<u64>',
    content: 'Option<PalletUtilsContent>',
    hidden: 'Option<bool>'
  },
  /**
   * Lookup144: pallet_profile_follows::Call<T>
   **/
  PalletProfileFollowsCall: {
    _enum: {
      follow_account: {
        account: 'AccountId32',
      },
      unfollow_account: {
        account: 'AccountId32'
      }
    }
  },
  /**
   * Lookup145: pallet_profiles::Call<T>
   **/
  PalletProfilesCall: {
    _enum: {
      create_profile: {
        content: 'PalletUtilsContent',
      },
      update_profile: {
        update: 'PalletProfilesProfileUpdate'
      }
    }
  },
  /**
   * Lookup146: pallet_profiles::ProfileUpdate
   **/
  PalletProfilesProfileUpdate: {
    content: 'Option<PalletUtilsContent>'
  },
  /**
   * Lookup147: pallet_reactions::Call<T>
   **/
  PalletReactionsCall: {
    _enum: {
      create_post_reaction: {
        postId: 'u64',
        kind: 'PalletReactionsReactionKind',
      },
      update_post_reaction: {
        postId: 'u64',
        reactionId: 'u64',
        newKind: 'PalletReactionsReactionKind',
      },
      delete_post_reaction: {
        postId: 'u64',
        reactionId: 'u64'
      }
    }
  },
  /**
   * Lookup148: pallet_roles::Call<T>
   **/
  PalletRolesCall: {
    _enum: {
      create_role: {
        spaceId: 'u64',
        timeToLive: 'Option<u32>',
        content: 'PalletUtilsContent',
        permissions: 'Vec<PalletPermissionsSpacePermission>',
      },
      update_role: {
        roleId: 'u64',
        update: 'PalletRolesRoleUpdate',
      },
      delete_role: {
        roleId: 'u64',
      },
      grant_role: {
        roleId: 'u64',
        users: 'Vec<PalletUtilsUser>',
      },
      revoke_role: {
        roleId: 'u64',
        users: 'Vec<PalletUtilsUser>'
      }
    }
  },
  /**
   * Lookup150: pallet_permissions::SpacePermission
   **/
  PalletPermissionsSpacePermission: {
    _enum: ['ManageRoles', 'RepresentSpaceInternally', 'RepresentSpaceExternally', 'UpdateSpace', 'CreateSubspaces', 'UpdateOwnSubspaces', 'DeleteOwnSubspaces', 'HideOwnSubspaces', 'UpdateAnySubspace', 'DeleteAnySubspace', 'HideAnySubspace', 'CreatePosts', 'UpdateOwnPosts', 'DeleteOwnPosts', 'HideOwnPosts', 'UpdateAnyPost', 'DeleteAnyPost', 'HideAnyPost', 'CreateComments', 'UpdateOwnComments', 'DeleteOwnComments', 'HideOwnComments', 'HideAnyComment', 'Upvote', 'Downvote', 'Share', 'OverrideSubspacePermissions', 'OverridePostPermissions', 'SuggestEntityStatus', 'UpdateEntityStatus', 'UpdateSpaceSettings']
  },
  /**
   * Lookup151: pallet_roles::RoleUpdate
   **/
  PalletRolesRoleUpdate: {
    disabled: 'Option<bool>',
    content: 'Option<PalletUtilsContent>',
    permissions: 'Option<BTreeSet>'
  },
  /**
   * Lookup153: BTreeSet<pallet_permissions::SpacePermission>
   **/
  BTreeSet: 'Vec<PalletPermissionsSpacePermission>',
  /**
   * Lookup154: pallet_space_follows::Call<T>
   **/
  PalletSpaceFollowsCall: {
    _enum: {
      follow_space: {
        spaceId: 'u64',
      },
      unfollow_space: {
        spaceId: 'u64'
      }
    }
  },
  /**
   * Lookup155: pallet_space_ownership::Call<T>
   **/
  PalletSpaceOwnershipCall: {
    _enum: {
      transfer_space_ownership: {
        spaceId: 'u64',
        transferTo: 'AccountId32',
      },
      accept_pending_ownership: {
        spaceId: 'u64',
      },
      reject_pending_ownership: {
        spaceId: 'u64'
      }
    }
  },
  /**
   * Lookup156: pallet_spaces::Call<T>
   **/
  PalletSpacesCall: {
    _enum: {
      create_space: {
        parentIdOpt: 'Option<u64>',
        handleOpt: 'Option<Bytes>',
        content: 'PalletUtilsContent',
        permissionsOpt: 'Option<PalletPermissionsSpacePermissions>',
      },
      update_space: {
        spaceId: 'u64',
        update: 'PalletSpacesSpaceUpdate',
      },
      update_settings: {
        newSettings: 'PalletSpacesSpacesSettings',
      },
      force_unreserve_handle: {
        handle: 'Bytes'
      }
    }
  },
  /**
   * Lookup158: pallet_permissions::SpacePermissions
   **/
  PalletPermissionsSpacePermissions: {
    none: 'Option<BTreeSet>',
    everyone: 'Option<BTreeSet>',
    follower: 'Option<BTreeSet>',
    spaceOwner: 'Option<BTreeSet>'
  },
  /**
   * Lookup159: pallet_spaces::SpaceUpdate
   **/
  PalletSpacesSpaceUpdate: {
    parentId: 'Option<Option<u64>>',
    handle: 'Option<Option<Bytes>>',
    content: 'Option<PalletUtilsContent>',
    hidden: 'Option<bool>',
    permissions: 'Option<Option<PalletPermissionsSpacePermissions>>'
  },
  /**
   * Lookup163: pallet_spaces::SpacesSettings
   **/
  PalletSpacesSpacesSettings: {
    handlesEnabled: 'bool'
  },
  /**
   * Lookup164: pallet_faucets::Call<T>
   **/
  PalletFaucetsCall: {
    _enum: {
      add_faucet: {
        faucet: 'AccountId32',
        period: 'u32',
        periodLimit: 'u128',
        dripLimit: 'u128',
      },
      update_faucet: {
        faucet: 'AccountId32',
        update: 'PalletFaucetsFaucetUpdate',
      },
      remove_faucets: {
        faucets: 'Vec<AccountId32>',
      },
      drip: {
        recipient: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup165: pallet_faucets::FaucetUpdate<BlockNumber, Balance>
   **/
  PalletFaucetsFaucetUpdate: {
    enabled: 'Option<bool>',
    period: 'Option<u32>',
    periodLimit: 'Option<u128>',
    dripLimit: 'Option<u128>'
  },
  /**
   * Lookup167: pallet_domains::pallet::Call<T>
   **/
  PalletDomainsCall: {
    _enum: {
      purchase_domain: {
        owner: 'AccountId32',
        domain: 'PalletDomainsDomain',
        content: 'PalletUtilsContent',
        expiresIn: 'u32',
        soldFor: 'Compact<u128>',
      },
      set_inner_value: {
        domain: 'PalletDomainsDomain',
        value: 'Option<PalletDomainsEntityId>',
      },
      set_outer_value: {
        domain: 'PalletDomainsDomain',
        valueOpt: 'Option<Bytes>',
      },
      set_domain_content: {
        domain: 'PalletDomainsDomain',
        newContent: 'PalletUtilsContent',
      },
      reserve: {
        domains: 'Vec<Bytes>',
      },
      add_top_level_domains: {
        domains: 'Vec<Bytes>'
      }
    }
  },
  /**
   * Lookup168: pallet_domains::pallet::Domain
   **/
  PalletDomainsDomain: {
    tld: 'Bytes',
    nested: 'Bytes'
  },
  /**
   * Lookup170: pallet_domains::pallet::EntityId<sp_core::crypto::AccountId32>
   **/
  PalletDomainsEntityId: {
    _enum: {
      Account: 'AccountId32',
      Space: 'u64',
      Post: 'u64'
    }
  },
  /**
   * Lookup171: pallet_dotsama_claims::pallet::Call<T>
   **/
  PalletDotsamaClaimsCall: {
    _enum: {
      claim_tokens: 'Null',
      set_rewards_sender: {
        rewardsSenderOpt: 'Option<AccountId32>',
      },
      add_eligible_accounts: {
        eligibleAccounts: 'Vec<AccountId32>'
      }
    }
  },
  /**
   * Lookup173: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup176: pallet_scheduler::ScheduledV2<subsocial_runtime::Call, BlockNumber, subsocial_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduledV2: {
    maybeId: 'Option<Bytes>',
    priority: 'u8',
    call: 'Call',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'SubsocialRuntimeOriginCaller'
  },
  /**
   * Lookup177: subsocial_runtime::OriginCaller
   **/
  SubsocialRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSystemRawOrigin',
      Void: 'SpCoreVoid'
    }
  },
  /**
   * Lookup178: frame_system::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSystemRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup179: pallet_scheduler::Releases
   **/
  PalletSchedulerReleases: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup180: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange']
  },
  /**
   * Lookup181: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup183: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigTimepoint',
    deposit: 'u128',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup185: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'MaxWeightTooLow', 'AlreadyStored']
  },
  /**
   * Lookup188: pallet_proxy::ProxyDefinition<sp_core::crypto::AccountId32, subsocial_runtime::ProxyType, BlockNumber>
   **/
  PalletProxyProxyDefinition: {
    delegate: 'AccountId32',
    proxyType: 'SubsocialRuntimeProxyType',
    delay: 'u32'
  },
  /**
   * Lookup192: pallet_proxy::Announcement<sp_core::crypto::AccountId32, primitive_types::H256, BlockNumber>
   **/
  PalletProxyAnnouncement: {
    real: 'AccountId32',
    callHash: 'H256',
    height: 'u32'
  },
  /**
   * Lookup194: pallet_proxy::pallet::Error<T>
   **/
  PalletProxyError: {
    _enum: ['TooMany', 'NotFound', 'NotProxy', 'Unproxyable', 'Duplicate', 'NoPermission', 'Unannounced', 'NoSelfProxy']
  },
  /**
   * Lookup195: pallet_posts::Post<T>
   **/
  PalletPostsPost: {
    id: 'u64',
    created: 'PalletUtilsWhoAndWhen',
    updated: 'Option<PalletUtilsWhoAndWhen>',
    owner: 'AccountId32',
    extension: 'PalletPostsPostExtension',
    spaceId: 'Option<u64>',
    content: 'PalletUtilsContent',
    hidden: 'bool',
    repliesCount: 'u16',
    hiddenRepliesCount: 'u16',
    sharesCount: 'u16',
    upvotesCount: 'u16',
    downvotesCount: 'u16',
    score: 'i32'
  },
  /**
   * Lookup196: pallet_utils::WhoAndWhen<T>
   **/
  PalletUtilsWhoAndWhen: {
    account: 'AccountId32',
    block: 'u32',
    time: 'u64'
  },
  /**
   * Lookup200: pallet_posts::Error<T>
   **/
  PalletPostsError: {
    _enum: ['PostNotFound', 'NotAPostOwner', 'NoUpdatesForPost', 'PostHasNoSpaceId', 'CannotCreateInHiddenScope', 'NoRepliesOnPost', 'CannotMoveToSameSpace', 'OriginalPostNotFound', 'CannotShareSharingPost', 'NotASharingPost', 'UnknownParentComment', 'NotACommentByParentId', 'CannotUpdateSpaceIdOnComment', 'MaxCommentDepthReached', 'NotACommentAuthor', 'NotComment', 'NoPermissionToCreatePosts', 'NoPermissionToCreateComments', 'NoPermissionToShare', 'NoPermissionToUpdateAnyPost', 'NoPermissionToUpdateOwnPosts', 'NoPermissionToUpdateOwnComments']
  },
  /**
   * Lookup202: pallet_post_history::PostHistoryRecord<T>
   **/
  PalletPostHistoryPostHistoryRecord: {
    edited: 'PalletUtilsWhoAndWhen',
    oldData: 'PalletPostsPostUpdate'
  },
  /**
   * Lookup204: pallet_profile_follows::Error<T>
   **/
  PalletProfileFollowsError: {
    _enum: ['FollowerAccountNotFound', 'FollowedAccountNotFound', 'AccountCannotFollowItself', 'AccountCannotUnfollowItself', 'AlreadyAccountFollower', 'NotAccountFollower']
  },
  /**
   * Lookup205: pallet_profiles::SocialAccount<T>
   **/
  PalletProfilesSocialAccount: {
    followersCount: 'u32',
    followingAccountsCount: 'u16',
    followingSpacesCount: 'u16',
    reputation: 'u32',
    profile: 'Option<PalletProfilesProfile>'
  },
  /**
   * Lookup207: pallet_profiles::Profile<T>
   **/
  PalletProfilesProfile: {
    created: 'PalletUtilsWhoAndWhen',
    updated: 'Option<PalletUtilsWhoAndWhen>',
    content: 'PalletUtilsContent'
  },
  /**
   * Lookup208: pallet_profiles::Error<T>
   **/
  PalletProfilesError: {
    _enum: ['SocialAccountNotFound', 'ProfileAlreadyCreated', 'NoUpdatesForProfile', 'AccountHasNoProfile']
  },
  /**
   * Lookup210: pallet_profile_history::ProfileHistoryRecord<T>
   **/
  PalletProfileHistoryProfileHistoryRecord: {
    edited: 'PalletUtilsWhoAndWhen',
    oldData: 'PalletProfilesProfileUpdate'
  },
  /**
   * Lookup211: pallet_reactions::Reaction<T>
   **/
  PalletReactionsReaction: {
    id: 'u64',
    created: 'PalletUtilsWhoAndWhen',
    updated: 'Option<PalletUtilsWhoAndWhen>',
    kind: 'PalletReactionsReactionKind'
  },
  /**
   * Lookup213: pallet_reactions::Error<T>
   **/
  PalletReactionsError: {
    _enum: ['ReactionNotFound', 'AccountAlreadyReacted', 'ReactionByAccountNotFound', 'NotReactionOwner', 'SameReaction', 'CannotReactWhenSpaceHidden', 'CannotReactWhenPostHidden', 'NoPermissionToUpvote', 'NoPermissionToDownvote']
  },
  /**
   * Lookup214: pallet_roles::Role<T>
   **/
  PalletRolesRole: {
    created: 'PalletUtilsWhoAndWhen',
    updated: 'Option<PalletUtilsWhoAndWhen>',
    id: 'u64',
    spaceId: 'u64',
    disabled: 'bool',
    expiresAt: 'Option<u32>',
    content: 'PalletUtilsContent',
    permissions: 'BTreeSet'
  },
  /**
   * Lookup216: pallet_roles::Error<T>
   **/
  PalletRolesError: {
    _enum: ['RoleNotFound', 'RoleIdOverflow', 'NoPermissionToManageRoles', 'NoUpdatesProvided', 'NoPermissionsProvided', 'NoUsersProvided', 'TooManyUsersToDeleteRole', 'RoleAlreadyDisabled', 'RoleAlreadyEnabled']
  },
  /**
   * Lookup217: pallet_space_follows::Error<T>
   **/
  PalletSpaceFollowsError: {
    _enum: ['SocialAccountNotFound', 'AlreadySpaceFollower', 'NotSpaceFollower', 'CannotFollowHiddenSpace']
  },
  /**
   * Lookup219: pallet_space_history::SpaceHistoryRecord<T>
   **/
  PalletSpaceHistorySpaceHistoryRecord: {
    edited: 'PalletUtilsWhoAndWhen',
    oldData: 'PalletSpacesSpaceUpdate'
  },
  /**
   * Lookup220: pallet_space_ownership::Error<T>
   **/
  PalletSpaceOwnershipError: {
    _enum: ['CannotTranferToCurrentOwner', 'AlreadyASpaceOwner', 'NoPendingTransferOnSpace', 'NotAllowedToAcceptOwnershipTransfer', 'NotAllowedToRejectOwnershipTransfer']
  },
  /**
   * Lookup221: pallet_spaces::Space<T>
   **/
  PalletSpacesSpace: {
    id: 'u64',
    created: 'PalletUtilsWhoAndWhen',
    updated: 'Option<PalletUtilsWhoAndWhen>',
    owner: 'AccountId32',
    parentId: 'Option<u64>',
    handle: 'Option<Bytes>',
    content: 'PalletUtilsContent',
    hidden: 'bool',
    postsCount: 'u32',
    hiddenPostsCount: 'u32',
    followersCount: 'u32',
    score: 'i32',
    permissions: 'Option<PalletPermissionsSpacePermissions>'
  },
  /**
   * Lookup222: pallet_spaces::Error<T>
   **/
  PalletSpacesError: {
    _enum: ['SpaceNotFound', 'SpaceHandleIsNotUnique', 'HandlesAreDisabled', 'NoUpdatesForSpace', 'NotASpaceOwner', 'NoPermissionToUpdateSpace', 'NoPermissionToCreateSubspaces', 'SpaceIsAtRoot', 'NoUpdatesForSpacesSettings']
  },
  /**
   * Lookup223: pallet_utils::Error<T>
   **/
  PalletUtilsError: {
    _enum: ['AccountIsBlocked', 'ContentIsBlocked', 'PostIsBlocked', 'InvalidIpfsCid', 'RawContentTypeNotSupported', 'HypercoreContentTypeNotSupported', 'HandleIsTooShort', 'HandleIsTooLong', 'HandleContainsInvalidChars', 'ContentIsEmpty']
  },
  /**
   * Lookup224: pallet_faucets::Faucet<T>
   **/
  PalletFaucetsFaucet: {
    enabled: 'bool',
    period: 'u32',
    periodLimit: 'u128',
    dripLimit: 'u128',
    nextPeriodAt: 'u32',
    drippedInCurrentPeriod: 'u128'
  },
  /**
   * Lookup225: pallet_faucets::Error<T>
   **/
  PalletFaucetsError: {
    _enum: ['FaucetNotFound', 'FaucetAlreadyAdded', 'NoFreeBalanceOnFaucet', 'NotEnoughFreeBalanceOnFaucet', 'NoFaucetsProvided', 'NoUpdatesProvided', 'NothingToUpdate', 'FaucetDisabled', 'NotFaucetOwner', 'RecipientEqualsFaucet', 'DripLimitCannotExceedPeriodLimit', 'ZeroPeriodProvided', 'ZeroPeriodLimitProvided', 'ZeroDripLimitProvided', 'ZeroDripAmountProvided', 'PeriodLimitReached', 'DripLimitReached']
  },
  /**
   * Lookup226: pallet_domains::pallet::DomainMeta<T>
   **/
  PalletDomainsDomainMeta: {
    created: 'PalletUtilsWhoAndWhen',
    updated: 'Option<PalletUtilsWhoAndWhen>',
    owner: 'AccountId32',
    expiresAt: 'u32',
    soldFor: 'u128',
    content: 'PalletUtilsContent',
    innerValue: 'Option<PalletDomainsEntityId>',
    outerValue: 'Option<Bytes>',
    outerValueBond: 'u128'
  },
  /**
   * Lookup228: pallet_domains::pallet::Error<T>
   **/
  PalletDomainsError: {
    _enum: ['DomainContentWasNotChanged', 'DomainHasExpired', 'DomainNotFound', 'DomainReserved', 'DomainAlreadyStored', 'InnerValueNotChanged', 'LowerLevelDomainsNotAllowed', 'NotADomainOwner', 'OuterValueOffLengthLimit', 'OuterValueNotChanged', 'ZeroReservationPeriod', 'TooBigReservationPeriod', 'TopLevelDomainContainsInvalidChar', 'TopLevelDomainIsOffLengthLimits', 'TopLevelDomainNotAllowed', 'InnerValueNotSupported']
  },
  /**
   * Lookup229: pallet_dotsama_claims::pallet::Error<T>
   **/
  PalletDotsamaClaimsError: {
    _enum: ['NoRewardsSenderSet', 'RewardsSenderHasInsufficientBalance', 'AddingTooManyAccountsAtOnce', 'AccountNotEligible', 'TokensAlreadyClaimed']
  },
  /**
   * Lookup231: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup232: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup233: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup236: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup237: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup238: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup241: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup242: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup243: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup244: pallet_dotsama_claims::EnsureAllowedToClaimTokens<T>
   **/
  PalletDotsamaClaimsEnsureAllowedToClaimTokens: 'Null',
  /**
   * Lookup245: subsocial_runtime::Runtime
   **/
  SubsocialRuntimeRuntime: 'Null'
};
