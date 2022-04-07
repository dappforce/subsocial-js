// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';
import type { Bytes, Option, Vec, bool, u128, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces/runtime';
import type { FrameSupportWeightsPerDispatchClassU64, FrameSystemAccountInfo, FrameSystemEventRecord, FrameSystemLastRuntimeUpgradeInfo, FrameSystemPhase, PalletBalancesAccountData, PalletBalancesBalanceLock, PalletBalancesReleases, PalletBalancesReserveData, PalletFaucetsFaucet, PalletGrandpaStoredPendingChange, PalletGrandpaStoredState, PalletPostHistoryPostHistoryRecord, PalletPostsPost, PalletProfileHistoryProfileHistoryRecord, PalletProfilesSocialAccount, PalletReactionsReaction, PalletRolesRole, PalletSchedulerReleases, PalletSchedulerScheduledV2, PalletSpaceHistorySpaceHistoryRecord, PalletSpacesSpace, PalletSpacesSpacesSettings, PalletTransactionPaymentReleases, PalletUtilsUser, SpRuntimeDigest } from '@polkadot/types/lookup';
import type { Observable } from '@polkadot/types/types';

declare module '@polkadot/api-base/types/storage' {
  export interface AugmentedQueries<ApiType extends ApiTypes> {
    balances: {
      /**
       * The balance of an account.
       * 
       * NOTE: This is only used in the case that this pallet is used to store balances.
       **/
      account: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<PalletBalancesAccountData>, [AccountId32]>;
      /**
       * Any liquidity locks on some account balances.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesBalanceLock>>, [AccountId32]>;
      /**
       * Named reserves on some account balances.
       **/
      reserves: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesReserveData>>, [AccountId32]>;
      /**
       * Storage version of the pallet.
       * 
       * This is set to v2.0.0 for new networks.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<PalletBalancesReleases>, []>;
      /**
       * The total units issued in the system.
       **/
      totalIssuance: AugmentedQuery<ApiType, () => Observable<u128>, []>;
    };
    dotsamaClaims: {
      eligibleAccounts: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<bool>, [AccountId32]>;
      rewardsSender: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []>;
      tokensClaimedByAccount: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<u128>, [AccountId32]>;
      totalTokensClaimed: AugmentedQuery<ApiType, () => Observable<Option<u128>>, []>;
    };
    faucets: {
      /**
       * Get a faucet data by its account id.
       **/
      faucetByAccount: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<PalletFaucetsFaucet>>, [AccountId32]>;
    };
    grandpa: {
      /**
       * The number of changes (both in terms of keys and underlying economic responsibilities)
       * in the "set" of Grandpa validators from genesis.
       **/
      currentSetId: AugmentedQuery<ApiType, () => Observable<u64>, []>;
      /**
       * next block number where we can force a change.
       **/
      nextForced: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
      /**
       * Pending change: (signaled at, scheduled change).
       **/
      pendingChange: AugmentedQuery<ApiType, () => Observable<Option<PalletGrandpaStoredPendingChange>>, []>;
      /**
       * A mapping from grandpa set ID to the index of the *most recent* session for which its
       * members were responsible.
       * 
       * TWOX-NOTE: `SetId` is not under user control.
       **/
      setIdSession: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Option<u32>>, [u64]>;
      /**
       * `true` if we are currently stalled.
       **/
      stalled: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[u32, u32]>>>, []>;
      /**
       * State of the current authority set.
       **/
      state: AugmentedQuery<ApiType, () => Observable<PalletGrandpaStoredState>, []>;
    };
    postHistory: {
      editHistory: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Vec<PalletPostHistoryPostHistoryRecord>>, [u64]>;
    };
    posts: {
      /**
       * The next post id.
       **/
      nextPostId: AugmentedQuery<ApiType, () => Observable<u64>, []>;
      /**
       * Get the details of a post by its' id.
       **/
      postById: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Option<PalletPostsPost>>, [u64]>;
      /**
       * Get the ids of all posts in a given space, by the space's id.
       **/
      postIdsBySpaceId: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Vec<u64>>, [u64]>;
      /**
       * Get the ids of all direct replies by their parent's post id.
       **/
      replyIdsByPostId: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Vec<u64>>, [u64]>;
      /**
       * Get the ids of all posts that have shared a given original post id.
       **/
      sharedPostIdsByOriginalPostId: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Vec<u64>>, [u64]>;
    };
    profileFollows: {
      accountFollowedByAccount: AugmentedQuery<ApiType, (arg: ITuple<[AccountId32, AccountId32]> | [AccountId32 | string | Uint8Array, AccountId32 | string | Uint8Array]) => Observable<bool>, [ITuple<[AccountId32, AccountId32]>]>;
      accountFollowers: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<AccountId32>>, [AccountId32]>;
      accountsFollowedByAccount: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<AccountId32>>, [AccountId32]>;
    };
    profileHistory: {
      editHistory: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletProfileHistoryProfileHistoryRecord>>, [AccountId32]>;
    };
    profiles: {
      socialAccountById: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<PalletProfilesSocialAccount>>, [AccountId32]>;
    };
    randomnessCollectiveFlip: {
      /**
       * Series of block headers from the last 81 blocks that acts as random seed material. This
       * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
       * the oldest hash.
       **/
      randomMaterial: AugmentedQuery<ApiType, () => Observable<Vec<H256>>, []>;
    };
    reactions: {
      /**
       * The next reaction id.
       **/
      nextReactionId: AugmentedQuery<ApiType, () => Observable<u64>, []>;
      postReactionIdByAccount: AugmentedQuery<ApiType, (arg: ITuple<[AccountId32, u64]> | [AccountId32 | string | Uint8Array, u64 | AnyNumber | Uint8Array]) => Observable<u64>, [ITuple<[AccountId32, u64]>]>;
      reactionById: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Option<PalletReactionsReaction>>, [u64]>;
      reactionIdsByPostId: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Vec<u64>>, [u64]>;
    };
    roles: {
      /**
       * The next role id.
       **/
      nextRoleId: AugmentedQuery<ApiType, () => Observable<u64>, []>;
      /**
       * Get the details of a role by its' id.
       **/
      roleById: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Option<PalletRolesRole>>, [u64]>;
      /**
       * Get a list of all role ids available in a given space.
       **/
      roleIdsBySpaceId: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Vec<u64>>, [u64]>;
      /**
       * Get a list of all role ids owned by a given user (account or space id)
       * within a given space.
       **/
      roleIdsByUserInSpace: AugmentedQuery<ApiType, (arg1: PalletUtilsUser | { Account: any } | { Space: any } | string | Uint8Array, arg2: u64 | AnyNumber | Uint8Array) => Observable<Vec<u64>>, [PalletUtilsUser, u64]>;
      /**
       * Get a list of all users (account or space ids) that a given role has been granted to.
       **/
      usersByRoleId: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Vec<PalletUtilsUser>>, [u64]>;
    };
    scheduler: {
      /**
       * Items to be executed, indexed by the block number that they should be executed on.
       **/
      agenda: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Vec<Option<PalletSchedulerScheduledV2>>>, [u32]>;
      /**
       * Lookup from identity to the block number and index of the task.
       **/
      lookup: AugmentedQuery<ApiType, (arg: Bytes | string | Uint8Array) => Observable<Option<ITuple<[u32, u32]>>>, [Bytes]>;
      /**
       * Storage version of the pallet.
       * 
       * New networks start with last version.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<PalletSchedulerReleases>, []>;
    };
    spaceFollows: {
      spaceFollowedByAccount: AugmentedQuery<ApiType, (arg: ITuple<[AccountId32, u64]> | [AccountId32 | string | Uint8Array, u64 | AnyNumber | Uint8Array]) => Observable<bool>, [ITuple<[AccountId32, u64]>]>;
      spaceFollowers: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Vec<AccountId32>>, [u64]>;
      spacesFollowedByAccount: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<u64>>, [AccountId32]>;
    };
    spaceHistory: {
      editHistory: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Vec<PalletSpaceHistorySpaceHistoryRecord>>, [u64]>;
    };
    spaceOwnership: {
      pendingSpaceOwner: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Option<AccountId32>>, [u64]>;
    };
    spaces: {
      /**
       * The next space id.
       **/
      nextSpaceId: AugmentedQuery<ApiType, () => Observable<u64>, []>;
      palletSettings: AugmentedQuery<ApiType, () => Observable<PalletSpacesSpacesSettings>, []>;
      /**
       * Get the details of a space by its' id.
       **/
      spaceById: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Option<PalletSpacesSpace>>, [u64]>;
      /**
       * Find a given space id by its' unique handle.
       * If a handle is not registered, nothing will be returned (`None`).
       **/
      spaceIdByHandle: AugmentedQuery<ApiType, (arg: Bytes | string | Uint8Array) => Observable<Option<u64>>, [Bytes]>;
      /**
       * True if `SpaceIdByHandle` storage is already fixed.
       **/
      spaceIdByHandleStorageFixed: AugmentedQuery<ApiType, () => Observable<bool>, []>;
      /**
       * Find the ids of all spaces owned, by a given account.
       **/
      spaceIdsByOwner: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<u64>>, [AccountId32]>;
    };
    sudo: {
      /**
       * The `AccountId` of the sudo key.
       **/
      key: AugmentedQuery<ApiType, () => Observable<AccountId32>, []>;
    };
    system: {
      /**
       * The full account information for a particular account ID.
       **/
      account: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<FrameSystemAccountInfo>, [AccountId32]>;
      /**
       * Total length (in bytes) for all extrinsics put together, for the current block.
       **/
      allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
      /**
       * Map of block numbers to block hashes.
       **/
      blockHash: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<H256>, [u32]>;
      /**
       * The current weight for the block.
       **/
      blockWeight: AugmentedQuery<ApiType, () => Observable<FrameSupportWeightsPerDispatchClassU64>, []>;
      /**
       * Digest of the current block, also part of the block header.
       **/
      digest: AugmentedQuery<ApiType, () => Observable<SpRuntimeDigest>, []>;
      /**
       * The number of events in the `Events<T>` list.
       **/
      eventCount: AugmentedQuery<ApiType, () => Observable<u32>, []>;
      /**
       * Events deposited for the current block.
       * 
       * NOTE: This storage item is explicitly unbounded since it is never intended to be read
       * from within the runtime.
       **/
      events: AugmentedQuery<ApiType, () => Observable<Vec<FrameSystemEventRecord>>, []>;
      /**
       * Mapping between a topic (represented by T::Hash) and a vector of indexes
       * of events in the `<Events<T>>` list.
       * 
       * All topic vectors have deterministic storage locations depending on the topic. This
       * allows light-clients to leverage the changes trie storage tracking mechanism and
       * in case of changes fetch the list of events of interest.
       * 
       * The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
       * the `EventIndex` then in case if the topic has the same contents on the next block
       * no notification will be triggered thus the event might be lost.
       **/
      eventTopics: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Vec<ITuple<[u32, u32]>>>, [H256]>;
      /**
       * The execution phase of the block.
       **/
      executionPhase: AugmentedQuery<ApiType, () => Observable<Option<FrameSystemPhase>>, []>;
      /**
       * Total extrinsics count for the current block.
       **/
      extrinsicCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []>;
      /**
       * Extrinsics data for the current block (maps an extrinsic's index to its data).
       **/
      extrinsicData: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Bytes>, [u32]>;
      /**
       * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
       **/
      lastRuntimeUpgrade: AugmentedQuery<ApiType, () => Observable<Option<FrameSystemLastRuntimeUpgradeInfo>>, []>;
      /**
       * The current block number being processed. Set by `execute_block`.
       **/
      number: AugmentedQuery<ApiType, () => Observable<u32>, []>;
      /**
       * Hash of the previous block.
       **/
      parentHash: AugmentedQuery<ApiType, () => Observable<H256>, []>;
      /**
       * True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
       * (default) if not.
       **/
      upgradedToTripleRefCount: AugmentedQuery<ApiType, () => Observable<bool>, []>;
      /**
       * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
       **/
      upgradedToU32RefCount: AugmentedQuery<ApiType, () => Observable<bool>, []>;
    };
    timestamp: {
      /**
       * Did the timestamp get updated in this block?
       **/
      didUpdate: AugmentedQuery<ApiType, () => Observable<bool>, []>;
      /**
       * Current time for the current block.
       **/
      now: AugmentedQuery<ApiType, () => Observable<u64>, []>;
    };
    transactionPayment: {
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<u128>, []>;
      storageVersion: AugmentedQuery<ApiType, () => Observable<PalletTransactionPaymentReleases>, []>;
    };
    utils: {
      treasuryAccount: AugmentedQuery<ApiType, () => Observable<AccountId32>, []>;
    };
  } // AugmentedQueries
} // declare module
