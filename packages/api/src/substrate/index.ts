import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { bool, GenericAccountId, Tuple } from '@polkadot/types';
import { Space, SpaceId, Post, PostId, Reaction, ReactionId, RoleId, User } from '../types/substrate';
import { getFirstOrUndefined, idToBn, isEmptyArray, newLogger, pluralize } from '@subsocial/utils';
import { asAccountId, getUniqueIds, SupportedSubstrateId, SupportedSubstrateResult } from '../utils';
import { FindSpaceQuery, FindSpacesQuery, FindPostsQuery, FindPostQuery, visibilityFilter } from '../filters';
import {
  PalletName,
  SpacePermissionKey,
  AnyAccountId,
  SubstrateId,
  AnyPostId,
  AnySpaceId,
  AnyReactionId
} from '../types';
import BN from 'bn.js'
import registry from '../utils/registry';
import { getSubstrateApi } from '../connections';

const U64_BYTES_SIZE = 8
const ACCOUNT32_BYTES_SIZE = 32

type StorageItem = {
  pallet: PalletName,
  storage: string
}

type StorageSizeProps = StorageItem & {
  itemBytesSize: number
}

type SubstrateApiProps = {
  api: SubstrateApi
}

export class SubsocialSubstrateApi {

  private _api: SubstrateApi // Polkadot API (connected)

  constructor ({ api }: SubstrateApiProps) {
    this._api = api
  }

  static async create (substrateNodeUrl: string) {
    const api = await getSubstrateApi(substrateNodeUrl)
    return new SubsocialSubstrateApi({ api })
  }

  private getPalletQuery = async (pallet: PalletName) => {
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

  private async queryPalletMulti (params: StorageItem, value: any): Promise<any[]> {
    const { storage, pallet } = params
    const query = await this.getPalletQuery(pallet)
        // @ts-ignore
    return query[storage as any].multi(value)
  }

  private async isBooleanByAccount (params: StorageItem, accountId: AnyAccountId, subjectId: SubstrateId): Promise<boolean> {
    const { storage, pallet } = params
    const queryParams = new Tuple(registry, [ GenericAccountId, 'u64' ], [accountId, subjectId ]);
    const isBoolean = await this.queryPallet({ pallet, storage }, queryParams) as bool
    return isBoolean.valueOf()
  }

  /**
   * Find and load data about reaction ids from Subsocial blockchain and IPFS by a given `accountId` and 
   * an array of `structIds`.
   * 
   *
   * @param accountId - An account id of desired reaction ids.
   *    
   * @param structIds - An array of post ids of desired reaction ids.
   *    
   * @returns An array of reaction ids aggregated from Subsocial blockchain. If no corresponding reaction ids to given
   * `accountId` and `structIds`, an empty array is returned.
   * 
   */  
  async getReactionIdsByAccount (accountId: AnyAccountId, structIds: AnyPostId[]): Promise<ReactionId[]> {
    const queryParams = structIds.map(id => new Tuple(registry, [ GenericAccountId, 'u64' ], [ accountId, idToBn(id) ]));
    return this.queryPalletMulti({ pallet: 'reactions', storage: 'postReactionIdByAccount' }, queryParams)
  }

  // ---------------------------------------------------------------------
  // Counter
  private async getStorageLength (params: StorageSizeProps, value?: any): Promise<BN> {
    const { storage, pallet, itemBytesSize } = params
    const query = await this.getPalletQuery(pallet)
    // @ts-ignore
    const storageSize = await query[storage].size(value)
    
    return storageSize.subn(1).divn(itemBytesSize)
  }

  /**
   * Find and load data about the number of posts of a space from Subsocial blockchain and IPFS by a given space id `spaceId`.
   * 
   *
   * @param spaceId - A space id.
   *    
   *    
   * @returns Number of posts of a given space id `spaceId` aggregated from Subsocial blockchain in BN. 
   */  
  async postsCountBySpaceId (spaceId: AnySpaceId) {
    return this.getStorageLength({
      pallet: 'posts',
      storage: 'postIdsBySpaceId',
      itemBytesSize: U64_BYTES_SIZE
    }, spaceId)
  }

  /**
   * Find and load data about the number of shares of a post from Subsocial blockchain and IPFS by a given `postId`.
   * 
   *
   * @param postId - A post id.
   *    
   *    
   * @returns Number of shares of a given `postId` aggregated from Subsocial blockchain in BN. 
   */  
  async sharesCountByPostId (postId: AnyPostId) {
    return this.getStorageLength({
      pallet: 'posts',
      storage: 'sharedPostIdsByOriginalPostId',
      itemBytesSize: U64_BYTES_SIZE
    }, postId)
  }

  /**
   * Find and load data about the number of replies of a post from Subsocial blockchain and IPFS by a given `postId`.
   * 
   *
   * @param postId - A post id.
   *    
   *    
   * @returns Number of replies of a given `postId` aggregated from Subsocial blockchain in BN. 
   */  
  async repliesCountByPostId (postId: AnyPostId) {
    return this.getStorageLength({
      pallet: 'posts',
      storage: 'replyIdsByPostId',
      itemBytesSize: U64_BYTES_SIZE
    }, postId)
  }

/**
   * Find and load data about the number of account followers of an account from Subsocial blockchain and IPFS by a given `accountId`.
   * 
   *
   * @param accountId - An account id.
   *    
   *    
   * @returns Number of account followers of a given `accountId` aggregated from Subsocial blockchain in BN. 
   */  
  async accountFollowersCountByAccountId (accountId: AnyAccountId) {
    return this.getStorageLength({
      pallet: 'accountFollows',
      storage: 'accountFollowers',
      itemBytesSize: ACCOUNT32_BYTES_SIZE
    }, accountId)
  }

/**
   * Find and load data about the number of account followed by an account from Subsocial blockchain and IPFS by a given `accountId`.
   * 
   *
   * @param accountId - An account id.
   *    
   *    
   * @returns Number of account followers of a given `accountId` aggregated from Subsocial blockchain in BN. 
   */  
  async accountsFollowedCountByAccount (accountId: AnyAccountId) {
    return this.getStorageLength({
      pallet: 'accountFollows',
      storage: 'accountsFollowedByAccount',
      itemBytesSize: ACCOUNT32_BYTES_SIZE
    }, accountId)
  }

  // ---------------------------------------------------------------------
  // Multiple

  private async findStructs<T extends SupportedSubstrateResult>
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
   * Find and load an array of information about spaces from Subsocial blockchain and IPFS by a given array of `ids`,
   * `visibility` filter, and `content` filter.
   * 
   * @param params - An object containing an array of space `ids`, visibility filter (`hidden` field), and `content` filter. 
   *
   * @returns An array of data about desired spaces from Subsocial blockchain and IPFS. If no corresponding spaces to given array
   * of `ids`, `content` and `visibility` filter, an empty array is returned.
   */
  async findSpaces (params: FindSpacesQuery): Promise<Space[]> {
    const { ids, visibility } = params
    const spaces: Space[] = await this.findStructs({ pallet: 'spaces', storage: 'spaceById' }, ids);
    return visibilityFilter<Space>(spaces, visibility)
  }

  /**
   * Find and load an array of information about posts from Subsocial blockchain and IPFS by a given array of `ids`, `content` and
   * `visibility` filter.
   * 
   * @param params - An object containing an array of space `ids`, visibility filter (`hidden` field), and `content` filter. 
   *
   * @returns An array of data about desired posts from Subsocial blockchain and IPFS. If no corresponding posts to given array
   * of `ids`, `content` and `visibility` filter, an empty array is returned.
   */
  async findPosts (params: FindPostsQuery): Promise<Post[]> {
    const { ids, visibility } = params
    const posts: Post[] = await this.findStructs({ pallet: 'posts', storage: 'postById' }, ids);
    return visibilityFilter<Post>(posts, visibility)
  }

  /**
   * Find and load an array of information about reactions from Subsocial blockchain by a given array of reaction `ids`.
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
   * Find and load information about a space from Subsocial blockchain and IPFS by a given `id`, `content` and `visibility` filter.
   * 
   * @param params - An object containing a space `id`, visibility filter (`hidden` field), and `content` filter. 
   *
   * @returns Data about desired space from Subsocial blockchain and IPFS. If no corresponding space to given `id`, `content` and
   * `visibility` filter, `undefined` is returned.
   */
  async findSpace (params: FindSpaceQuery): Promise<Space | undefined> {
    const { id, visibility } = params
    return getFirstOrUndefined(await this.findSpaces({ ids: [ id ], visibility }))
  }

  /**
   * Find and load information about a post from Subsocial blockchain and IPFS by a given `id`, `content` and `visibility` filter.
   * 
   * @param params - An object containing a post `id`, visibility filter (`hidden` field), and `content` filter. 
   *
   * @returns Data about desired post from Subsocial blockchain and IPFS. If no corresponding post to given `id`, `content` and
   * `visibility` filter, `undefined` is returned.
   */
  async findPost (params: FindPostQuery): Promise<Post | undefined> {
    const { id, visibility } = params
    return getFirstOrUndefined(await this.findPosts({ ids: [ id ], visibility }))
  }

  /**
   * Find and load information about a reaction from Subsocial blockchain by a given reaction `id`.
   *
   * @param id - Id of desired reaction.
   *
   * @returns Data about desired reaction from Subsocial blockchain. If no corresponding reaction to given reaction `id`,
   * `undefined` is returned.
   */
  async findReaction (id: AnyReactionId): Promise<Reaction | undefined> {
    return getFirstOrUndefined(await this.findReactions([ id ]))
  }

  /**
   * Find and load data about a reaction id from Subsocial blockchain and IPFS by a given `accountId` and 
   * and `postId`.
   * 
   *
   * @param accountId - Id of desired account.
   *    
   * @param postId - Id of desired post.
   *    
   * @returns Data of reaction id aggregated from Subsocial blockchain. If no corresponding reaction id to given
   * `accountId` and `postId`, undefined is returned.
   * 
   */  
  async getPostReactionIdByAccount (accountId: AnyAccountId, postId: AnyPostId): Promise<ReactionId | undefined> {
    return getFirstOrUndefined(await this.getReactionIdsByAccount(accountId, [ postId ]))
  }

  /**
   * Find and load an array of information about reaction ids from Subsocial blockchain and IPFS by a given `accountId` and 
   * and an array of `postIds`.
   * 
   *
   * @param accountId - Id of desired account.
   *    
   * @param postIds - An array of ids of desired posts.
   *    
   * @returns An array of reaction id aggregated from Subsocial blockchain. If no corresponding reaction id to given
   * `accountId` and and array of `postIds`, an empty array is returned.
   * 
   */  
  async getPostReactionIdsByAccount (accountId: AnyAccountId, postIds: AnyPostId[]): Promise<ReactionId[]> {
    return this.getReactionIdsByAccount(accountId, postIds)
  }

  // ---------------------------------------------------------------------
  // Get id

  /**
   * Find and load next space id from Subsocial blockchain.
   *    
   * @returns An integer of the next space id.
   * 
   */  
  async nextSpaceId (): Promise<SpaceId> {
    return this.querySpaces('nextSpaceId')
  }

  /**
   * Find and load next post id from Subsocial blockchain.
   *    
   * @returns An integer of the next post id.
   * 
   */  
  async nextPostId (): Promise<PostId> {
    return this.queryPosts('nextPostId')
  }

  /**
   * Find and load an array of reply ids from Subsocial blockchain by a given post `id`.
   * 
   * @param id - Id of desired post.
   *    
   * @returns An array of reply id aggregated from Subsocial blockchain. If no corresponding reply id to given
   * post `id`, an empty array is returned.
   * 
   */  
  async getReplyIdsByPostId (id: AnyPostId): Promise<PostId[]> {
    return this.queryPosts('replyIdsByPostId', id);
  }

  /**
   * Find and load an array of space ids from Subsocial blockchain of an owner by a given account `id`.
   * 
   * @param id - Id of desired account as spaces owner.
   *    
   * @returns An array of space id aggregated from Subsocial blockchain. If no corresponding space id to given
   * account `id`, an empty array is returned.
   * 
   */  
  async spaceIdsByOwner (id: AnyAccountId): Promise<SpaceId[]> {
    return this.querySpaces('spaceIdsByOwner', asAccountId(id))
  }

  /**
   * Find and load an array of space ids from Subsocial blockchain followed by a given account `id`.
   * 
   * @param id - Id of desired account as spaces follower.
   *    
   * @returns An array of space id aggregated from Subsocial blockchain. If no corresponding space id followed by a given
   * account `id`, an empty array is returned.
   * 
   */  
  async spaceIdsFollowedByAccount (id: AnyAccountId): Promise<SpaceId[]> {
    return this.queryPallet({ pallet: 'spaceFollows', storage: 'spacesFollowedByAccount' }, asAccountId(id))
  }

  /**
   * Find and load an array of post ids from Subsocial blockchain by a given space `id`.
   * 
   * @param id - Id of desired space.
   *    
   * @returns An array of post id aggregated from Subsocial blockchain. If no corresponding post id to given
   * space `id`, an empty array is returned.
   * 
   */  
  async postIdsBySpaceId (id: AnySpaceId): Promise<PostId[]> {
    return this.queryPosts('postIdsBySpaceId', id)
  }

  /**
   * Find and load profile space id from Subsocial blockchain by a given account `id`.
   * 
   * @param accountId - Id of desired account.
   *    
   * @returns Data of profile space id from Subsocial blockchain. 
   * 
   */  
  async profileSpaceIdByAccount (accountId: AnyAccountId): Promise<SpaceId> {
    return this.queryProfiles('profileSpaceIdByAccount', accountId)
  }

  /**
   * Find and load an array of profile space ids from Subsocial blockchain by a given array of `accountIds`.
   * 
   * @param accountIds - An array of desired account ids.
   *    
   * @returns An array of profile space ids aggregated from Subsocial blockchain. If no corresponding space id to given
   * array of `accountIds`, an empty array is returned.
   * 
   */  
  async profileSpaceIdsByAccounts (accountIds: AnyAccountId[]): Promise<SpaceId[]> {
    return this.queryPalletMulti({ pallet: 'profiles', storage: 'profileSpaceIdByAccount'}, accountIds)
  }

  // ---------------------------------------------------------------------
  // Is boolean

  /**
   * Find and load boolean value from Subsocial blockchain by a given `myAddress` and `followedAddress`.
   * 
   * @param myAddress - Id of own account.
   * 
   * @param followedAddress - Id of followedAccount.
   *    
   * @returns A boolean value whether `myAddress` is following `followedAddress` or not, retrieved from Subsocial blockchain.
   * 
   */  
  async isAccountFollower (myAddress: AnyAccountId, followedAddress: AnyAccountId): Promise<boolean> {
    const followedAccountId = asAccountId(followedAddress)
    const myAccountId = asAccountId(myAddress)
    const queryParams = new Tuple(registry, [ GenericAccountId, GenericAccountId ], [ myAccountId, followedAccountId ]);
    const isFollow = await this.queryPallet({ pallet: 'accountFollows', storage: 'accountFollowedByAccount' }, queryParams) as bool
    return isFollow.valueOf()
  }


  /**
   * Find and load boolean value from Subsocial blockchain by a given `myAddress` and `spaceId`.
   * 
   * @param myAddress - Id of own account.
   * 
   * @param spaceId - Id of desired space.
   *    
   * @returns A boolean value whether `myAddress` is following a given `spaceId` or not, retrieved from Subsocial blockchain.
   * 
   */  
  async isSpaceFollower (myAddress: AnyAccountId, spaceId: AnySpaceId): Promise<boolean> {
    return this.isBooleanByAccount({ pallet: 'spaceFollows', storage: 'spaceFollowedByAccount' }, myAddress, spaceId)
  }

  // ---------------------------------------------------------------------
  // Roles

  /**
   * Find and load an array of account ids with any role from Subsocial blockchain by a given `spaceId`.
   * 
   * @param spaceId - Id of desired space.
   *    
   * @returns An array of string representing accounts in any role retrieved from Subsocial blockchain by a given `spaceId`. 
   * If no corresponding account with any role to a given `spaceId`, an empty array is returned.
   * 
   */  
  async getAccountsWithAnyRoleInSpace (spaceId: AnySpaceId): Promise<string[]> {
    const api = await this.api

    const roleIdsCodec = await api.query.roles.roleIdsBySpaceId(spaceId) as unknown as RoleId[]
    const roleIds = getUniqueIds(roleIdsCodec.map(x => x.toString()))
    const usersArrays = await api.query.roles.usersByRoleId.multi(roleIds) as unknown as User[][]

    return usersArrays.flatMap(users => users.filter(x => x.isAccount).map(x => x.asAccount.toString()))
  }

  /**
   * Find and load an array of role ids owned by a given `accountId` from Subsocial blockchain within a given space.
   * 
   * @param accountId - Id of desired account.
   *    
   * @returns An array of role ids retrieved from Subsocial blockchain by a given `accountId` within a space. 
   * If no corresponding role id to a given `accountId`, an empty array is returned.
   * 
   */  
  async getSpaceIdsWithRolesByAccount (accountId: AnyAccountId) {
    const api = await this.api

    const roleIdsByUserInSpace = await api.query.roles
      .roleIdsByUserInSpace.entries({ Account: accountId })

    return roleIdsByUserInSpace.map(([key]) => key.args[1].toString())
  }

  /**
   * Find and load an array of space permissions owned by a given `accountId` from Subsocial blockchain within a given `spaceId`.
   * 
   * @param accountId - Id of desired account.
   *    
   * @param spaceId - Id of desired space.
   * 
   * @returns An array of space permissions retrieved from Subsocial blockchain by a given `accountId` within a `spaceId`. 
   * If no corresponding space permissions to a given `accountId` within a `spaceId`, an empty array is returned.
   * 
   */  
  async getSpacePermissionsByAccount (accountId: AnyAccountId, spaceId: AnySpaceId): Promise<SpacePermissionKey[]> {
    const api = await this.api

    const roleIdsInSpace = await api.query.roles
      .roleIdsByUserInSpace({ Account: accountId }, spaceId) as unknown as RoleId[]
    const setRolesIdsInSpace = getUniqueIds(roleIdsInSpace.map(x => x.toString()))

    const roles = await api.query.roles.roleById.multi(setRolesIdsInSpace)

    const permissions = roles.flatMap(x => (x.toHuman() as any)?.permissions)
    return getUniqueIds(permissions)
  }

  // ---------------------------------------------------------------------
  // Domains

  /**
   * Find and load an array of domain names by key pairs [Owner, SpaceId] from Subsocial blockchain.
   * 
   * @param keys - An array of keypairs [Owner, SpaceId].
   *    
   * @returns An array of domain names retrieved from Subsocial blockchain by a given array of key pairs [Owner, SpaceId]. 
   * If no corresponding domain name to given key pairs, an empty array is returned.
   * 
   */  
  async getDomainNames (keys: [AnyAccountId, AnySpaceId][]): Promise<string[]> {
    const api = await this.api

    const domainNames = await api.query.domains.domainByInnerValue.multi(keys.map(([ account, spaceId ]) => ([account, { Space: spaceId }])))
    return domainNames?.map(x => x.toHuman()) as string[]
  }

  /**
   * Find and load domain by a given `accountId` and `spaceId` from Subsocial blockchain.
   * 
   * @param accountId - Id of a desired account.
   * 
   * @param spaceId - Id of desired space.
   *    
   * @returns Data about domain name (in string) retrieved from Subsocial blockchain by a given `accountId` and `spaceId`. 
   * If no corresponding domain name to given `accountId` and `spaceId`, undefined is returned.
   * 
   */  
  async domainNameBySpaceId (accountId: AnyAccountId, spaceId: AnySpaceId): Promise<string | undefined> {
    return getFirstOrUndefined(await this.getDomainNames([ [accountId, spaceId] ]))
  }

  /**
   * Find and load an array of domain structs of registered domains by a given array of `domainNames` from Subsocial blockchain.
   * 
   * @param domainNames - An array of desired domain names.
   *    
   * @returns An array of information about domain structs of registered domains retrieved from Subsocial blockchain
   * by a given array of `domainNames`. If no corresponding domain structs to given array of `domainNames`, an empty array is returned.
   * 
   */  
  async registeredDomains (domainNames: string[]) {
    const api = await this.api
    const structs = await api.query.domains.registeredDomains.multi(domainNames)

    return structs.filter(x => x.isSome).map(x => x.unwrap())
  }

  /**
   * Find and load information about domain structs of registered domain by a given `domainName` from Subsocial blockchain.
   * 
   * @param domainName - A string of desired domain name.
   *    
   * @returns Data about domain structs of a registered domain retrieved from Subsocial blockchain
   * by a given `domainName`.
   * 
   */  
  async registeredDomain (domainName: string) {
    return this.registeredDomains([domainName])
  }

  /**
   * Find and load an array of information about domains by a given `accountId` from Subsocial blockchain.
   * 
   * @param accountId - Id of owner of domains.
   *    
   * @returns An array of information about domains retrieved from Subsocial blockchain by an owner `accountId`.
   * If no corresponding domain to given owner `accountId`, an empty array is returned.
   * 
   */  
  async domainsByOwner (accountId: AnyAccountId): Promise<string[]> {
    const api = await this.api

    const domains = await api.query.domains.domainsByOwner(accountId)
    return domains.toHuman() as string[]
  }


}

const logger = newLogger(SubsocialSubstrateApi.name);
