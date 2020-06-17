import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { bool, GenericAccountId, Option, Tuple } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';
import { AnyAccountId, AnySpaceId, AnyPostId, AnyReactionId, SubstrateId, PalletName } from '@subsocial/types';
import { Space, SpaceId, Post, PostId, Reaction, ReactionId, SocialAccount } from '@subsocial/types/substrate/interfaces';
import registry from '@subsocial/types/substrate/registry';
import { getFirstOrUndefined, isEmptyArray, isEmptyStr, newLogger, pluralize } from '@subsocial/utils';
import { asAccountId, getUniqueIds, SupportedSubstrateId, SupportedSubstrateResult } from './utils';

type StorageAndPallet = {
  pallet: PalletName,
  storage: string
}

export class SubsocialSubstrateApi {

  private _api: SubstrateApi // Polkadot API (connected)

  constructor (api: SubstrateApi) {
    this._api = api
    logger.info('Initialized')
  }

  getQueryFromPallet = async (pallet: PalletName) => {
    const api = await this.api
    return api.query[pallet]
  };

  public get api () {
    return this._api.isReady;
  }

  // ---------------------------------------------------------------------
  // Private utils

  private async queryFromPallet ({ storage, pallet }: StorageAndPallet, value?: any): Promise<any> {
    const queryFromPallet = await this.getQueryFromPallet(pallet)
    return queryFromPallet[storage](value)
  }

  private async postsPalletQuery (storage: string, value?: any): Promise<any> {
    return this.queryFromPallet({ pallet: 'posts', storage }, value)
  }

  private async spacesPalletQuery (storage: string, value?: any): Promise<any> {
    return this.queryFromPallet({ pallet: 'spaces', storage }, value)
  }

  private async profilesPalletQuery (storage: string, value?: any): Promise<any> {
    return this.queryFromPallet({ pallet: 'profiles', storage }, value)
  }

  private async queryFromPalletMulti ({ storage, pallet }: StorageAndPallet, value: any[]): Promise<any[]> {
    const queryFromPallet = await this.getQueryFromPallet(pallet)
    return queryFromPallet[storage].multi(value)
  }

  // TODO maybe pallet: 'posts' | 'spaces
  private async isBooleanByAccount ({ storage, pallet }: StorageAndPallet, accountId: AnyAccountId, subjectId: SubstrateId): Promise<boolean> {
    const queryParams = new Tuple(registry, [ GenericAccountId, 'u64' ], [ asAccountId(accountId), subjectId ]);
    const isBoolean = await this.queryFromPallet({ pallet, storage }, queryParams) as bool
    return isBoolean.valueOf()
  }

  private async getReactionIdByAccount (accountId: AnyAccountId, structId: AnyPostId): Promise<ReactionId> {
    const queryParams = new Tuple(registry, [ GenericAccountId, 'u64' ], [ asAccountId(accountId), structId ]);
    return this.queryFromPallet({ pallet: 'reactions', storage: 'postReactionIdByAccount' }, queryParams)
  }

  // ---------------------------------------------------------------------
  // Multiple

  async findStructs<T extends SupportedSubstrateResult>
    (storageAndPallet: StorageAndPallet, ids: SupportedSubstrateId[]): Promise<T[]> {
    const storage = storageAndPallet.storage

    try {
      ids = getUniqueIds(ids)

      if (isEmptyArray(ids)) {
        logger.debug(`Nothing to load from ${storage}: no ids provided`)
        return []
      }

      const structs = (await this.queryFromPalletMulti(storageAndPallet, ids))
        .filter(x => x.isSome)
        .map(x => x.unwrap())

      logger.debug(`Loaded ${pluralize(structs.length, 'struct')} from ${storage}`)
      return structs
    } catch (err) {
      logger.error(`Failed to load struct(s) from ${storage} by ${ids.length} id(s):`, err)
      return []
    }
  }

  async findSpaces (ids: AnySpaceId[]): Promise<Space[]> {
    return this.findStructs({ pallet: 'spaces', storage: 'spaceById' }, ids);
  }

  async findPosts (ids: AnyPostId[]): Promise<Post[]> {
    return this.findStructs({ pallet: 'posts', storage: 'postById' }, ids);
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

  async findSpace (id: AnySpaceId): Promise<Space | undefined> {
    return getFirstOrUndefined(await this.findSpaces([ id ]))
  }

  async findPost (id: AnyPostId): Promise<Post | undefined> {
    return getFirstOrUndefined(await this.findPosts([ id ]))
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
    return this.spacesPalletQuery('nextSpaceId')
  }

  async nextPostId (): Promise<PostId> {
    return this.postsPalletQuery('nextPostId')
  }

  async getSpaceIdByHandle (handle: string): Promise<SpaceId | undefined> {
    if (isEmptyStr(handle)) {
      return undefined
    }
    const idOpt = await this.spacesPalletQuery('spaceIdByHandle', handle) as Option<SpaceId>
    return idOpt.unwrapOr(undefined)
  }

  async getAccountIdByHandle (handle: string): Promise<AccountId | undefined> {
    if (isEmptyStr(handle)) {
      return undefined
    }
    const idOpt = await this.profilesPalletQuery('accountByProfileUsername', handle) as Option<AccountId>
    return idOpt.unwrapOr(undefined)
  }

  async getReplyIdsByPostId (id: AnyPostId): Promise<PostId[]> {
    return this.postsPalletQuery('replyIdsByPostId', id);
  }

  async spaceIdsByOwner (id: AnyAccountId): Promise<SpaceId[]> {
    return this.spacesPalletQuery('spaceIdsByOwner', asAccountId(id))
  }

  async spaceIdsFollowedByAccount (id: AnyAccountId): Promise<SpaceId[]> {
    return this.queryFromPallet({ pallet: 'space-follows', storage: 'spacesFollowedByAccount' }, asAccountId(id))
  }

  async postIdsBySpaceId (id: AnySpaceId): Promise<PostId[]> {
    return this.postsPalletQuery('postIdsBySpaceId', id)
  }

  // ---------------------------------------------------------------------
  // Is boolean

  async isAccountFollower (myAddress: AnyAccountId, followedAddress: AnyAccountId): Promise<boolean> {
    const followedAccountId = asAccountId(followedAddress)
    const myAccountId = asAccountId(myAddress)
    const queryParams = new Tuple(registry, [ GenericAccountId, GenericAccountId ], [ myAccountId, followedAccountId ]);
    const isFollow = await this.profilesPalletQuery('accountFollowedByAccount', queryParams) as bool
    return isFollow.valueOf()
  }

  async isSpaceFollower (myAddress: AnyAccountId, spaceId: AnySpaceId): Promise<boolean> {
    return this.isBooleanByAccount({ pallet: 'space-follows', storage: 'spaceFollowedByAccount' }, myAddress, spaceId)
  }

  async isPostSharedByAccount (accountId: AnyAccountId, postId: AnyPostId): Promise<boolean> {
    return this.isBooleanByAccount({ pallet: 'posts', storage: 'postSharedByAccount' }, accountId, postId)
  }

  async getPostReactionIdByAccount (accountId: AnyAccountId, postId: AnyPostId): Promise<ReactionId> {
    return this.getReactionIdByAccount(accountId, postId)
  }

}

const logger = newLogger(SubsocialSubstrateApi.name);
