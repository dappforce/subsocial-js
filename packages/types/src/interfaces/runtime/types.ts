// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable @typescript-eslint/no-empty-interface */

import { ITuple } from '@polkadot/types/types';
import { Compact, Enum, Int, Option, Struct, U8aFixed, Vec } from '@polkadot/types/codec';
import { GenericAccountId, GenericAccountIndex, GenericAddress, GenericBlock, GenericCall, GenericConsensusEngineId, GenericDigest, GenericOrigin } from '@polkadot/types/generic';
import { Bytes, Null, StorageKey, Text, bool, i32, u128, u16, u32, u64, u8 } from '@polkadot/types/primitive';
import { AuthorityId } from '@polkadot/types/interfaces/consensus';
import { Signature } from '@polkadot/types/interfaces/extrinsics';

/** @name AccountId */
export interface AccountId extends GenericAccountId {}

/** @name AccountIdOf */
export interface AccountIdOf extends AccountId {}

/** @name AccountIndex */
export interface AccountIndex extends GenericAccountIndex {}

/** @name Address */
export interface Address extends GenericAddress {}

/** @name AssetId */
export interface AssetId extends u32 {}

/** @name Balance */
export interface Balance extends u128 {}

/** @name BalanceOf */
export interface BalanceOf extends Balance {}

/** @name Block */
export interface Block extends GenericBlock {}

/** @name BlockNumber */
export interface BlockNumber extends u32 {}

/** @name Blog */
export interface Blog extends Struct {
  readonly id: BlogId;
  readonly created: Change;
  readonly updated: Option<Change>;
  readonly writers: VecAccountId;
  readonly slug: Text;
  readonly ipfs_hash: IpfsHash;
  readonly posts_count: u16;
  readonly followers_count: u32;
  readonly edit_history: Vec<BlogHistoryRecord>;
  readonly score: Score;
}

/** @name BlogHistoryRecord */
export interface BlogHistoryRecord extends Struct {
  readonly edited: Change;
  readonly old_data: BlogUpdate;
}

/** @name BlogId */
export interface BlogId extends u64 {}

/** @name BlogUpdate */
export interface BlogUpdate extends Struct {
  readonly writers: OptionVecAccountId;
  readonly slug: OptionText;
  readonly ipfs_hash: OptionIpfsHash;
}

/** @name Call */
export interface Call extends GenericCall {}

/** @name Change */
export interface Change extends Struct {
  readonly account: AccountId;
  readonly block: BlockNumber;
  readonly time: Moment;
}

/** @name ChangesTrieConfiguration */
export interface ChangesTrieConfiguration extends Struct {
  readonly digestInterval: u32;
  readonly digestLevels: u32;
}

/** @name Comment */
export interface Comment extends Struct {
  readonly id: CommentId;
  readonly parent_id: OptionCommentId;
  readonly post_id: PostId;
  readonly created: Change;
  readonly updated: OptionChange;
  readonly ipfs_hash: IpfsHash;
  readonly upvotes_count: u16;
  readonly downvotes_count: u16;
  readonly shares_count: u16;
  readonly direct_replies_count: u16;
  readonly edit_history: VecCommentHistoryRecord;
  readonly score: Score;
}

/** @name CommentHistoryRecord */
export interface CommentHistoryRecord extends Struct {
  readonly edited: Change;
  readonly old_data: CommentUpdate;
}

/** @name CommentId */
export interface CommentId extends u64 {}

/** @name CommentUpdate */
export interface CommentUpdate extends Struct {
  readonly ipfs_hash: IpfsHash;
}

/** @name Consensus */
export interface Consensus extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name ConsensusEngineId */
export interface ConsensusEngineId extends GenericConsensusEngineId {}

/** @name Digest */
export interface Digest extends GenericDigest {}

/** @name DigestItem */
export interface DigestItem extends Enum {
  readonly isOther: boolean;
  readonly asOther: Bytes;
  readonly isAuthoritiesChange: boolean;
  readonly asAuthoritiesChange: Vec<AuthorityId>;
  readonly isChangesTrieRoot: boolean;
  readonly asChangesTrieRoot: Hash;
  readonly isSealV0: boolean;
  readonly asSealV0: SealV0;
  readonly isConsensus: boolean;
  readonly asConsensus: Consensus;
  readonly isSeal: boolean;
  readonly asSeal: Seal;
  readonly isPreRuntime: boolean;
  readonly asPreRuntime: PreRuntime;
}

/** @name DispatchClass */
export interface DispatchClass extends Enum {
  readonly isNormal: boolean;
  readonly isOperational: boolean;
}

/** @name DispatchInfo */
export interface DispatchInfo extends Struct {
  readonly weight: Weight;
  readonly class: DispatchClass;
  readonly paysFee: bool;
}

/** @name DispatchInfoTo190 */
export interface DispatchInfoTo190 extends Struct {
  readonly weight: Weight;
  readonly class: DispatchClass;
}

/** @name Fixed64 */
export interface Fixed64 extends Int {}

/** @name H160 */
export interface H160 extends U8aFixed {}

/** @name H256 */
export interface H256 extends U8aFixed {}

/** @name H512 */
export interface H512 extends U8aFixed {}

/** @name Hash */
export interface Hash extends H256 {}

/** @name Header */
export interface Header extends Struct {
  readonly parentHash: Hash;
  readonly number: Compact<BlockNumber>;
  readonly stateRoot: Hash;
  readonly extrinsicsRoot: Hash;
  readonly digest: Digest;
}

/** @name Index */
export interface Index extends u32 {}

/** @name IpfsHash */
export interface IpfsHash extends Text {}

/** @name Justification */
export interface Justification extends Bytes {}

/** @name KeyTypeId */
export interface KeyTypeId extends u32 {}

/** @name KeyValue */
export interface KeyValue extends ITuple<[StorageKey, StorageData]> {}

/** @name LockIdentifier */
export interface LockIdentifier extends U8aFixed {}

/** @name LookupSource */
export interface LookupSource extends Address {}

/** @name LookupTarget */
export interface LookupTarget extends AccountId {}

/** @name Moment */
export interface Moment extends u64 {}

/** @name OptionBlogId */
export interface OptionBlogId extends Option<BlogId> {}

/** @name OptionChange */
export interface OptionChange extends Option<Change> {}

/** @name OptionCommentId */
export interface OptionCommentId extends Option<CommentId> {}

/** @name OptionIpfsHash */
export interface OptionIpfsHash extends Option<IpfsHash> {}

/** @name OptionProfile */
export interface OptionProfile extends Option<Profile> {}

/** @name OptionText */
export interface OptionText extends Option<Text> {}

/** @name OptionVecAccountId */
export interface OptionVecAccountId extends Option<VecAccountId> {}

/** @name Origin */
export interface Origin extends GenericOrigin {}

/** @name Perbill */
export interface Perbill extends u32 {}

/** @name Percent */
export interface Percent extends u8 {}

/** @name Permill */
export interface Permill extends u32 {}

/** @name Perquintill */
export interface Perquintill extends u64 {}

/** @name Phantom */
export interface Phantom extends Null {}

/** @name PhantomData */
export interface PhantomData extends Null {}

/** @name Post */
export interface Post extends Struct {
  readonly id: PostId;
  readonly blog_id: BlogId;
  readonly created: Change;
  readonly updated: OptionChange;
  readonly extension: PostExtension;
  readonly ipfs_hash: IpfsHash;
  readonly comments_count: u16;
  readonly upvotes_count: u16;
  readonly downvotes_count: u16;
  readonly shares_count: u16;
  readonly edit_history: Vec<PostHistoryRecord>;
  readonly score: Score;
}

/** @name PostExtension */
export interface PostExtension extends Enum {
  readonly isRegularPost: boolean;
  readonly isSharedPost: boolean;
  readonly asSharedPost: PostId;
  readonly isSharedComment: boolean;
  readonly asSharedComment: CommentId;
}

/** @name PostHistoryRecord */
export interface PostHistoryRecord extends Struct {
  readonly edited: Change;
  readonly old_data: PostUpdate;
}

/** @name PostId */
export interface PostId extends u64 {}

/** @name PostUpdate */
export interface PostUpdate extends Struct {
  readonly blog_id: OptionBlogId;
  readonly ipfs_hash: OptionIpfsHash;
}

/** @name PreRuntime */
export interface PreRuntime extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name Profile */
export interface Profile extends Struct {
  readonly created: Change;
  readonly updated: OptionChange;
  readonly username: Text;
  readonly ipfs_hash: IpfsHash;
  readonly edit_history: Vec<ProfileHistoryRecord>;
}

/** @name ProfileHistoryRecord */
export interface ProfileHistoryRecord extends Struct {
  readonly edited: Change;
  readonly old_data: ProfileUpdate;
}

/** @name ProfileUpdate */
export interface ProfileUpdate extends Struct {
  readonly username: OptionText;
  readonly ipfs_hash: OptionIpfsHash;
}

/** @name Reaction */
export interface Reaction extends Struct {
  readonly id: ReactionId;
  readonly created: Change;
  readonly updated: OptionChange;
  readonly kind: ReactionKind;
}

/** @name ReactionId */
export interface ReactionId extends u64 {}

/** @name ReactionKind */
export interface ReactionKind extends Enum {
  readonly isUpvote: boolean;
  readonly isDownvote: boolean;
}

/** @name Score */
export interface Score extends i32 {}

/** @name ScoringAction */
export interface ScoringAction extends Enum {
  readonly isUpvotePost: boolean;
  readonly isDownvotePost: boolean;
  readonly isSharePost: boolean;
  readonly isUpvoteComment: boolean;
  readonly isDownvoteComment: boolean;
  readonly isShareComment: boolean;
  readonly isFollowBlog: boolean;
  readonly isFollowAccount: boolean;
}

/** @name Seal */
export interface Seal extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name SealV0 */
export interface SealV0 extends ITuple<[u64, Signature]> {}

/** @name SignedBlock */
export interface SignedBlock extends Struct {
  readonly block: Block;
  readonly justification: Justification;
}

/** @name SocialAccount */
export interface SocialAccount extends Struct {
  readonly followers_count: u32;
  readonly following_accounts_count: u16;
  readonly following_blogs_count: u16;
  readonly reputation: u32;
  readonly profile: OptionProfile;
}

/** @name StorageData */
export interface StorageData extends Bytes {}

/** @name ValidatorId */
export interface ValidatorId extends AccountId {}

/** @name VecAccountId */
export interface VecAccountId extends Vec<AccountId> {}

/** @name VecCommentHistoryRecord */
export interface VecCommentHistoryRecord extends Vec<CommentHistoryRecord> {}

/** @name VecProfileHistoryRecord */
export interface VecProfileHistoryRecord extends Vec<ProfileHistoryRecord> {}

/** @name Weight */
export interface Weight extends u32 {}

/** @name WeightMultiplier */
export interface WeightMultiplier extends Fixed64 {}
