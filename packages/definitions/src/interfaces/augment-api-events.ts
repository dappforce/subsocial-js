// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, Vec, u128, u16, u32, u64 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces/runtime';
import type { FrameSupportTokensMiscBalanceStatus, FrameSupportWeightsDispatchInfo, PalletReactionsReactionKind, PalletUtilsUser, SpFinalityGrandpaAppPublic, SpRuntimeDispatchError } from '@polkadot/types/lookup';

declare module '@polkadot/api-base/types/events' {
  export interface AugmentedEvents<ApiType extends ApiTypes> {
    balances: {
      /**
       * A balance was set by root. \[who, free, reserved\]
       **/
      BalanceSet: AugmentedEvent<ApiType, [AccountId32, u128, u128]>;
      /**
       * Some amount was deposited into the account (e.g. for transaction fees). \[who,
       * deposit\]
       **/
      Deposit: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss. \[account, balance\]
       **/
      DustLost: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * An account was created with some free balance. \[account, free_balance\]
       **/
      Endowed: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Some balance was reserved (moved from free to reserved). \[who, value\]
       **/
      Reserved: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       * \[from, to, balance, destination_status\]
       **/
      ReserveRepatriated: AugmentedEvent<ApiType, [AccountId32, AccountId32, u128, FrameSupportTokensMiscBalanceStatus]>;
      /**
       * Some amount was removed from the account (e.g. for misbehavior). \[who,
       * amount_slashed\]
       **/
      Slashed: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Transfer succeeded. \[from, to, value\]
       **/
      Transfer: AugmentedEvent<ApiType, [AccountId32, AccountId32, u128]>;
      /**
       * Some balance was unreserved (moved from reserved to free). \[who, value\]
       **/
      Unreserved: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Some amount was withdrawn from the account (e.g. for transaction fees). \[who, value\]
       **/
      Withdraw: AugmentedEvent<ApiType, [AccountId32, u128]>;
    };
    dotsamaClaims: {
      EligibleAccountsAdded: AugmentedEvent<ApiType, [u16]>;
      RewardsSenderRemoved: AugmentedEvent<ApiType, []>;
      RewardsSenderSet: AugmentedEvent<ApiType, [AccountId32]>;
      TokensClaimed: AugmentedEvent<ApiType, [AccountId32, u128]>;
    };
    faucets: {
      Dripped: AugmentedEvent<ApiType, [AccountId32, AccountId32, u128]>;
      FaucetAdded: AugmentedEvent<ApiType, [AccountId32]>;
      FaucetsRemoved: AugmentedEvent<ApiType, [Vec<AccountId32>]>;
      FaucetUpdated: AugmentedEvent<ApiType, [AccountId32]>;
    };
    grandpa: {
      /**
       * New authority set has been applied. \[authority_set\]
       **/
      NewAuthorities: AugmentedEvent<ApiType, [Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>]>;
      /**
       * Current authority set has been paused.
       **/
      Paused: AugmentedEvent<ApiType, []>;
      /**
       * Current authority set has been resumed.
       **/
      Resumed: AugmentedEvent<ApiType, []>;
    };
    posts: {
      PostCreated: AugmentedEvent<ApiType, [AccountId32, u64]>;
      PostDeleted: AugmentedEvent<ApiType, [AccountId32, u64]>;
      PostMoved: AugmentedEvent<ApiType, [AccountId32, u64]>;
      PostShared: AugmentedEvent<ApiType, [AccountId32, u64]>;
      PostUpdated: AugmentedEvent<ApiType, [AccountId32, u64]>;
    };
    profileFollows: {
      AccountFollowed: AugmentedEvent<ApiType, [AccountId32, AccountId32]>;
      AccountUnfollowed: AugmentedEvent<ApiType, [AccountId32, AccountId32]>;
    };
    profiles: {
      ProfileCreated: AugmentedEvent<ApiType, [AccountId32]>;
      ProfileUpdated: AugmentedEvent<ApiType, [AccountId32]>;
    };
    reactions: {
      PostReactionCreated: AugmentedEvent<ApiType, [AccountId32, u64, u64, PalletReactionsReactionKind]>;
      PostReactionDeleted: AugmentedEvent<ApiType, [AccountId32, u64, u64, PalletReactionsReactionKind]>;
      PostReactionUpdated: AugmentedEvent<ApiType, [AccountId32, u64, u64, PalletReactionsReactionKind]>;
    };
    roles: {
      RoleCreated: AugmentedEvent<ApiType, [AccountId32, u64, u64]>;
      RoleDeleted: AugmentedEvent<ApiType, [AccountId32, u64]>;
      RoleGranted: AugmentedEvent<ApiType, [AccountId32, u64, Vec<PalletUtilsUser>]>;
      RoleRevoked: AugmentedEvent<ApiType, [AccountId32, u64, Vec<PalletUtilsUser>]>;
      RoleUpdated: AugmentedEvent<ApiType, [AccountId32, u64]>;
    };
    scheduler: {
      /**
       * Canceled some task. \[when, index\]
       **/
      Canceled: AugmentedEvent<ApiType, [u32, u32]>;
      /**
       * Dispatched some task. \[task, id, result\]
       **/
      Dispatched: AugmentedEvent<ApiType, [ITuple<[u32, u32]>, Option<Bytes>, Result<Null, SpRuntimeDispatchError>]>;
      /**
       * Scheduled some task. \[when, index\]
       **/
      Scheduled: AugmentedEvent<ApiType, [u32, u32]>;
    };
    spaceFollows: {
      SpaceFollowed: AugmentedEvent<ApiType, [AccountId32, u64]>;
      SpaceUnfollowed: AugmentedEvent<ApiType, [AccountId32, u64]>;
    };
    spaceOwnership: {
      SpaceOwnershipTransferAccepted: AugmentedEvent<ApiType, [AccountId32, u64]>;
      SpaceOwnershipTransferCreated: AugmentedEvent<ApiType, [AccountId32, u64, AccountId32]>;
      SpaceOwnershipTransferRejected: AugmentedEvent<ApiType, [AccountId32, u64]>;
    };
    spaces: {
      SpaceCreated: AugmentedEvent<ApiType, [AccountId32, u64]>;
      SpaceDeleted: AugmentedEvent<ApiType, [AccountId32, u64]>;
      SpaceUpdated: AugmentedEvent<ApiType, [AccountId32, u64]>;
    };
    sudo: {
      /**
       * The \[sudoer\] just switched identity; the old key is supplied.
       **/
      KeyChanged: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * A sudo just took place. \[result\]
       **/
      Sudid: AugmentedEvent<ApiType, [Result<Null, SpRuntimeDispatchError>]>;
      /**
       * A sudo just took place. \[result\]
       **/
      SudoAsDone: AugmentedEvent<ApiType, [Result<Null, SpRuntimeDispatchError>]>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed. \[error, info\]
       **/
      ExtrinsicFailed: AugmentedEvent<ApiType, [SpRuntimeDispatchError, FrameSupportWeightsDispatchInfo]>;
      /**
       * An extrinsic completed successfully. \[info\]
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [FrameSupportWeightsDispatchInfo]>;
      /**
       * An \[account\] was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * A new \[account\] was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * On on-chain remark happened. \[origin, remark_hash\]
       **/
      Remarked: AugmentedEvent<ApiType, [AccountId32, H256]>;
    };
    utility: {
      /**
       * Batch of dispatches completed fully with no error.
       **/
      BatchCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error. \[index, error\]
       **/
      BatchInterrupted: AugmentedEvent<ApiType, [u32, SpRuntimeDispatchError]>;
      /**
       * A single item within a Batch of dispatches has completed with no error.
       **/
      ItemCompleted: AugmentedEvent<ApiType, []>;
    };
    utils: {
      Deposit: AugmentedEvent<ApiType, [u128]>;
    };
  } // AugmentedEvents
} // declare module
