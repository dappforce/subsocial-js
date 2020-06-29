import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { bool, GenericAccountId, Option, Tuple } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';
import { AnyAccountId, AnySpaceId, AnyPostId, AnyReactionId, SubstrateId, PalletName } from '@subsocial/types';
import { Space, SpaceId, Post, PostId, Reaction, ReactionId, SocialAccount } from '@subsocial/types/substrate/interfaces';
import registry from '@subsocial/types/substrate/registry';
import { getFirstOrUndefined, isEmptyArray, isEmptyStr, newLogger, pluralize } from '@subsocial/utils';
import { asAccountId, getUniqueIds, SupportedSubstrateId, SupportedSubstrateResult } from './utils/utils';
import { VisibilityFilter, visibilityFilter } from './utils/visibility-filter';

type StorageItem = {
  pallet: PalletName,
  storage: string
}

export class SubsocialSubstrateApi {

  private _api: SubstrateApi // Polkadot API (connected)

  constructor (api: SubstrateApi) {
    this._api = api
    logger.info('Initialized')
  }

  getPalletQuery = async (pallet: PalletName) => {
    const api = await this.api
    return api.query[pallet]
  };

  public get api () {
    return this._api.isReady;
  }

  // ---------------------------------------------------------------------
  // Private utils

  private async queryPallet ({ storage, pallet }: StorageItem, value?: any): Promise<any> {
    const query = await this.getPalletQuery(pallet)
    return query[storage](value)
  }

  private async queryPosts (storage: string, value?: any): Promise<any> {
    return this.queryPallet({ pallet: 'posts', storage }, value)
  }

  private async querySpaces (storage: string, value?: any): Promise<any> {
    return this.queryPallet({ pallet: 'spaces', storage }, value)
  }

  private async queryProfiles (storage: string, value?: any): Promise<any> {
    return this.queryPallet({ pallet: 'profiles', storage }, value)
  }

  private async queryPalletMulti ({ storage, pallet }: StorageItem, value: any[]): Promise<any[]> {
    const query = await this.getPalletQuery(pallet)
    return query[storage].multi(value)
  }

  // TODO maybe pallet: 'posts' | 'spaces
  private async isBooleanByAccount ({ storage, pallet }: StorageItem, accountId: AnyAccountId, subjectId: SubstrateId): Promise<boolean> {
    const queryParams = new Tuple(registry, [ GenericAccountId, 'u64' ], [ asAccountId(accountId), subjectId ]);
    const isBoolean = await this.queryPallet({ pallet, storage }, queryParams) as bool
    return isBoolean.valueOf()
  }

  private async getReactionIdByAccount (accountId: AnyAccountId, structId: AnyPostId): Promise<ReactionId> {
    const queryParams = new Tuple(registry, [ GenericAccountId, 'u64' ], [ asAccountId(accountId), structId ]);
    return this.queryPallet({ pallet: 'reactions', storage: 'postReactionIdByAccount' }, queryParams)
  }

  // ---------------------------------------------------------------------
  // Multiple

  async findStructs<T extends SupportedSubstrateResult>
  (storageItem: StorageItem, ids: SupportedSubstrateId[]): Promise<T[]> {
    const storage = storageItem.storage

    try {
      ids = getUniqueIds(ids)

      if (isEmptyArray(ids)) {
        logger.debug(`Nothing to load from ${storage}: no ids provided`)
        return []
      }

      const structs = (await this.queryPalletMulti(storageItem, ids))
        .filter(x => x.isSome)
        .map(x => x.unwrap())

      logger.debug(`Loaded ${pluralize(structs.length, 'struct')} from ${storage}`)
      return structs
    } catch (err) {
      logger.error(`Failed to load struct(s) from ${storage} by ${ids.length} id(s):`, err)
      return []
    }
  }

  async findSpaces (ids: AnySpaceId[], opts?: VisibilityFilter): Promise<Space[]> {
    const spaces: Space[] = await this.findStructs({ pallet: 'spaces', storage: 'spaceById' }, ids);
    return visibilityFilter<Space>(spaces, opts)
  }

  async findPosts (ids: AnyPostId[], opts?: VisibilityFilter): Promise<Post[]> {
    const posts: Post[] = await this.findStructs({ pallet: 'posts', storage: 'postById' }, ids);
    return visibilityFilter<Post>(posts, opts)
  }

  async findSocialAccounts (ids: AnyAccountId[]): Promise<SocialAccount[]> {
    const accountIds = ids.map(id => asAccountId(id)).filter(x => typeof x !== 'undefined') as AccountId[]
    return this.findStructs({ pallet: 'profiles', storage: 'socialAccountById' }, accountIds);
  }

  async findReactions (ids: AnyReactionId[]): Promise<Reaction[]> {
    return this.findStructs({ pallet: 'reactions', storage: 'reactionById' }, ids);
  }

  // ---------------------------------------------------------------------
  // Single

  async findSpace (id: AnySpaceId, opts?: VisibilityFilter): Promise<Space | undefined> {
    return getFirstOrUndefined(await this.findSpaces([ id ], opts))
  }

  async findPost (id: AnyPostId, opts?: VisibilityFilter): Promise<Post | undefined> {
    return getFirstOrUndefined(await this.findPosts([ id ], opts))
  }

  async findSocialAccount (id: AnyAccountId): Promise<SocialAccount | undefined> {
    return getFirstOrUndefined(await this.findSocialAccounts([ id ]))
  }

  async findReaction (id: AnyReactionId): Promise<Reaction | undefined> {
    return getFirstOrUndefined(await this.findReactions([ id ]))
  }

  // ---------------------------------------------------------------------
  // Get id

  async nextSpaceId (): Promise<SpaceId> {
    return this.querySpaces('nextSpaceId')
  }

  async nextPostId (): Promise<PostId> {
    return this.queryPosts('nextPostId')
  }

  async getSpaceIdByHandle (handle: string): Promise<SpaceId | undefined> {
    if (isEmptyStr(handle)) {
      return undefined
    }
    const idOpt = await this.querySpaces('spaceIdByHandle', handle) as Option<SpaceId>
    return idOpt.unwrapOr(undefined)
  }

  async getAccountIdByHandle (handle: string): Promise<AccountId | undefined> {
    if (isEmptyStr(handle)) {
      return undefined
    }
    const idOpt = await this.queryProfiles('accountByProfileUsername', handle) as Option<AccountId>
    return idOpt.unwrapOr(undefined)
  }

  async getReplyIdsByPostId (id: AnyPostId): Promise<PostId[]> {
    return this.queryPosts('replyIdsByPostId', id);
  }

  async spaceIdsByOwner (id: AnyAccountId): Promise<SpaceId[]> {
    return this.querySpaces('spaceIdsByOwner', asAccountId(id))
  }

  async spaceIdsFollowedByAccount (id: AnyAccountId): Promise<SpaceId[]> {
    return this.queryPallet({ pallet: 'spaceFollows', storage: 'spacesFollowedByAccount' }, asAccountId(id))
  }

  async postIdsBySpaceId (id: AnySpaceId): Promise<PostId[]> {
    return this.queryPosts('postIdsBySpaceId', id)
  }

  // ---------------------------------------------------------------------
  // Is boolean

  async isAccountFollower (myAddress: AnyAccountId, followedAddress: AnyAccountId): Promise<boolean> {
    const followedAccountId = asAccountId(followedAddress)
    const myAccountId = asAccountId(myAddress)
    const queryParams = new Tuple(registry, [ GenericAccountId, GenericAccountId ], [ myAccountId, followedAccountId ]);
    const isFollow = await this.queryPallet({ pallet: 'profileFollows', storage: 'accountFollowedByAccount' }, queryParams) as bool
    return isFollow.valueOf()
  }

  async isSpaceFollower (myAddress: AnyAccountId, spaceId: AnySpaceId): Promise<boolean> {
    return this.isBooleanByAccount({ pallet: 'spaceFollows', storage: 'spaceFollowedByAccount' }, myAddress, spaceId)
  }

  async isPostSharedByAccount (accountId: AnyAccountId, postId: AnyPostId): Promise<boolean> {
    return this.isBooleanByAccount({ pallet: 'posts', storage: 'postSharedByAccount' }, accountId, postId)
  }

  async getPostReactionIdByAccount (accountId: AnyAccountId, postId: AnyPostId): Promise<ReactionId> {
    return this.getReactionIdByAccount(accountId, postId)
  }

}

const logger = newLogger(SubsocialSubstrateApi.name);
