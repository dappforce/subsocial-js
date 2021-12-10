import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { bool, GenericAccountId, Option, Tuple } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';
import { AnyAccountId, AnySpaceId, AnyPostId, AnyReactionId, SubstrateId, PalletName } from '@subsocial/types';
import { Space, SpaceId, Post, PostId, Reaction, ReactionId } from '@subsocial/types/substrate/interfaces';
import registry from '@subsocial/types/substrate/registry';
import { getFirstOrUndefined, isEmptyArray, isEmptyStr, newLogger, pluralize } from '@subsocial/utils';
import { asAccountId, getUniqueIds, SupportedSubstrateId, SupportedSubstrateResult } from '../utils';
import { FindSpaceQuery, FindSpacesQuery, FindPostsQuery, FindPostQuery } from '../filters';
import { SocialAccountWithId } from '@subsocial/types/dto';
import { visibilityFilter } from '../filters';
import { SubsocialContext } from '../types';

type StorageItem = {
  pallet: PalletName,
  storage: string
}

type SubstrateApiProps = SubsocialContext & {
  api: SubstrateApi
}

export class SubsocialSubstrateApi {

  private _api: SubstrateApi // Polkadot API (connected)
  // private context?: SubsocialContextProps TODO use when need

  constructor ({ api }: SubstrateApiProps) {
    this._api = api
    // this.context = context
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

  private async queryPallet (params: StorageItem, value?: any): Promise<any> {
    const { storage, pallet } = params
    const query = await this.getPalletQuery(pallet)
    // @ts-ignore
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

  private async queryPalletMulti (params: StorageItem, value: any[]): Promise<any[]> {
    const { storage, pallet } = params
    const query = await this.getPalletQuery(pallet)
        // @ts-ignore
    return query[storage as any].multi(value)
  }

  // TODO maybe pallet: 'posts' | 'spaces
  private async isBooleanByAccount (params: StorageItem, accountId: AnyAccountId, subjectId: SubstrateId): Promise<boolean> {
    const { storage, pallet } = params
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

      const structs = await this.queryPalletMulti(storageItem, ids)

      const res: T[] = [];

      structs.forEach((x, i) => {
        if (x.isSome) {
          const id = ids[i]
          const item = x.unwrap()

          res.push(storageItem.pallet === 'profiles'
            ? {
                id,
                ...item
              }
            : item
          )
        }
      })

      logger.debug(`Loaded ${pluralize({ count: res.length, singularText: 'struct' })} from ${storage}`)
      return res
    } catch (err) {
      logger.error(`Failed to load struct(s) from ${storage} by ${ids.length} id(s):`, err)
      return []
    }
  }

  /**
   * Find and load an array of information about spaces from Subsocial blockchain by a given array of `ids` and
   * `visibility` filter.
   *
   * @returns An array of data about desired spaces from Subsocial blockchain. If no corresponding spaces to given array
   * of `ids` and `visibility`, an empty array is returned.
   */
  async findSpaces (params: FindSpacesQuery): Promise<Space[]> {
    const { ids, visibility } = params
    const spaces: Space[] = await this.findStructs({ pallet: 'spaces', storage: 'spaceById' }, ids);
    return visibilityFilter<Space>(spaces, visibility)
  }

  /**
   * Find and load an array of information about posts from Subsocial blockchain by a given array of `ids` and
   * `visibility` filter.
   *
   * @returns An array of data about desired posts from Subsocial blockchain. If no corresponding posts to given array
   * of `ids` and `visibility`, an empty array is returned.
   */
  async findPosts (params: FindPostsQuery): Promise<Post[]> {
    const { ids, visibility } = params
    const posts: Post[] = await this.findStructs({ pallet: 'posts', storage: 'postById' }, ids);
    return visibilityFilter<Post>(posts, visibility)
  }

  /**
   * Find and load an array of information about social profiles from Subsocial blockchain by a given array of account
   * `ids`.
   *
   * @param ids - An array of account ids of desired profiles.
   *
   * @returns An array of data about desired profiles from Subsocial blockchain. If no corresponding profiles to given
   * array of `ids`, an empty array is returned.
   */
  async findSocialAccounts (ids: AnyAccountId[]): Promise<SocialAccountWithId[]> {
    const accountIds = ids.map(id => asAccountId(id)).filter(x => typeof x !== 'undefined') as AccountId[]
    return this.findStructs({ pallet: 'profiles', storage: 'socialAccountById' }, accountIds);
  }

  /**
   * Find and load an array of information about reactions from Subsocial blockchain by a given array of `ids`.
   *
   * @param ids - An array of ids of desired reactions.
   *
   * @returns An array of data about desired reactions from Subsocial blockchain. If no corresponding reactions to given
   * array of `ids`, an empty array is returned.
   */
  async findReactions (ids: AnyReactionId[]): Promise<Reaction[]> {
    return this.findStructs({ pallet: 'reactions', storage: 'reactionById' }, ids);
  }

  // ---------------------------------------------------------------------
  // Single

  /**
   * Find and load information about a space from Subsocial blockchain by a given `id` and `visibility` filter.
   *
   * @returns Data about desired space from Subsocial blockchain. If no corresponding space to given `id` and
   * `visibility`, `undefined` is returned.
   */
  async findSpace (params: FindSpaceQuery): Promise<Space | undefined> {
    const { id, visibility } = params
    return getFirstOrUndefined(await this.findSpaces({ ids: [ id ], visibility }))
  }

  /**
   * Find and load information about a post from Subsocial blockchain by a given `id` and `visibility` filter.
   *
   * @returns Data about desired post from Subsocial blockchain. If no corresponding post to given `id` and
   * `visibility`, `undefined` is returned.
   */
  async findPost (params: FindPostQuery): Promise<Post | undefined> {
    const { id, visibility } = params
    return getFirstOrUndefined(await this.findPosts({ ids: [ id ], visibility }))
  }

  /**
   * Find and load information about a profile from Subsocial blockchain by a given `id`.
   *
   * @param id - Account id of desired profile.
   *
   * @returns Data about desired profile from Subsocial blockchain. If no corresponding profile to given `id`,
   * `undefined` is returned.
   */
  async findSocialAccount (id: AnyAccountId): Promise<SocialAccountWithId | undefined> {
    return getFirstOrUndefined(await this.findSocialAccounts([ id ]))
  }

  /**
   * Find and load information about a reaction from Subsocial blockchain by a given `id`.
   *
   * @param id - Id of desired reaction.
   *
   * @returns Data about desired reaction from Subsocial blockchain. If no corresponding reaction to given `id`,
   * `undefined` is returned.
   */
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

  async getPostReactionIdByAccount (accountId: AnyAccountId, postId: AnyPostId): Promise<ReactionId> {
    return this.getReactionIdByAccount(accountId, postId)
  }

}

const logger = newLogger(SubsocialSubstrateApi.name);
