import {
  convertToNewPostDataArray,
  convertToNewPostWithAllDetails,
  convertToNewPostWithAllDetailsArray,
  convertToNewSpaceDataArray,
  convertToNewPostWithSomeDetails,
  convertToNewPostWithSomeDetailsArray,
} from './flatteners/utils'
import {
  Filters,
  FindPostQuery,
  FindPostsQuery,
  FindPostsWithDetailsQuery,
  FindSpaceQuery,
  FindSpacesQuery
} from '../filters'
import { BasicSubsocialApi } from './basic'
import {
  SpaceData,
  PostData,
  PostWithSomeDetails,
  PostWithAllDetails,
  AnyId,
  SpaceStruct,
  PostStruct,
  AnyAccountId, SubsocialApiProps, CreateSubsocialApiProps
} from '../types'
import { getFirstOrUndefined, idsToBns, idToBn } from '@subsocial/utils'
import { flattenSpaceStructs, flattenPostStructs, flattenDomainStructs } from './flatteners'
import { getSubstrateApi } from '../connections'

export interface ISubsocialApi {
  findSpace: (query: FindSpaceQuery) => Promise<SpaceData | undefined>
  findSpaces: (query: FindSpacesQuery) => Promise<SpaceData[]>
  findPublicSpaces: (ids: AnyId[]) => Promise<SpaceData[]>
  findUnlistedSpaces: (ids: AnyId[]) => Promise<SpaceData[]>

  findSpaceStructs: (ids: AnyId[], filters?: Filters) => Promise<SpaceStruct[]>
  findPostStructs: (ids: AnyId[], filters?: Filters) => Promise<PostStruct[]>

  findSpaceStruct: (id: AnyId, filters?: Filters) => Promise<SpaceStruct | undefined>
  findPostStruct: (id: AnyId, filters?: Filters) => Promise<PostStruct | undefined>

  findPost: (query: FindPostQuery) => Promise<PostData | undefined>
  findPosts: (query: FindPostsQuery) => Promise<PostData[]>
  findPublicPosts: (ids: AnyId[]) => Promise<PostData[]>
  findPostWithSomeDetails: (query: FindPostQuery) => Promise<PostWithSomeDetails | undefined>
  findPostWithAllDetails: (id: AnyId) => Promise<PostWithAllDetails | undefined>
  findPostsWithAllDetails: (query: FindPostsQuery) => Promise<PostWithAllDetails[]>
  findPublicPostsWithSomeDetails: (query: FindPostsWithDetailsQuery) => Promise<PostWithSomeDetails[]>
  findPublicPostsWithAllDetails: (ids: AnyId[]) => Promise<PostWithAllDetails[]>
  findUnlistedPostsWithAllDetails: (ids: AnyId[]) => Promise<PostWithAllDetails[]>

  findProfileSpace: (accountId: AnyAccountId) => Promise<SpaceData | undefined>
  findProfileSpaces: (accountIds: AnyAccountId[]) => Promise<SpaceData[]>
}

export class SubsocialApi implements ISubsocialApi {
  private readonly _base: BasicSubsocialApi

  constructor (props: SubsocialApiProps) {
    this._base = new BasicSubsocialApi(props)
  }

  static async create ({ substrateNodeUrl, ...props }: CreateSubsocialApiProps) {
    const substrateApi = await getSubstrateApi(substrateNodeUrl)
    return new SubsocialApi({ substrateApi, ...props })
  }

  /** @deprecated */
  get subsocial() {
    return this._base 
  }

  get base () {
    return this._base 
  }

   /** Accessors for private field {@link _base.substrate}*/
  get blockchain() {
    return this._base.substrate
  }

  /** Accessors for private field {@link _base.ipfs}*/
  get ipfs() {
    return this._base.ipfs
  }

   /** Accessors for private field {@link _base.substrate.api}*/
  get substrateApi() {
    return this._base.substrate.api
  }

  //------------------------------------------------
  // Structs from chain

  /**
   * Find and load an array of information about space structs (can be Unlisted or Public, depending on filters set on `query`) from Subsocial blockchain and IPFS 
   * by a given array of space `ids` and `filters` object.
   * 
   *
   * @param ids -  An array of space ids of desired space structs.
   * 
   * @param filters - (Optional) An object containing visibility filter (`hidden` field) and content filter (with or without IPFS content).
   *
   * @returns An array of information about space structs aggregated from Subsocial blockchain and IPFS. If no corresponding
   * space structs to given space `ids` and `filters`, an empty array is returned.
   */  
  public async findSpaceStructs (ids: AnyId[], filters?: Filters): Promise<SpaceStruct[]> {
    const structs = await this.blockchain.findSpaces({ ids: idsToBns(ids), ...filters })
    return flattenSpaceStructs(structs)
  }

  /**
   * Find and load an array of information about post structs (can be Unlisted or Public, depending on filters set on `query`) from Subsocial blockchain and IPFS 
   * by a given array of post `ids` and `filters` object.
   * 
   *
   * @param ids -  An array of post ids of desired post structs.
   * 
   * @param filters - (Optional) An object containing visibility filter (`hidden` field) and content filter (with or without IPFS content).
   *
   * @returns An array of information about post structs aggregated from Subsocial blockchain and IPFS. If no corresponding
   * post structs to given post `ids` and `filters` object, an empty array is returned.
   */  
  public async findPostStructs (ids: AnyId[], filters?: Filters): Promise<PostStruct[]> {
    const structs = await this.blockchain.findPosts({ ids: idsToBns(ids), ...filters })
    return flattenPostStructs(structs)
  }

  /**
   * Find and load information about space structs (can be Unlisted or Public, depending on filters set on `query`) from Subsocial blockchain and IPFS 
   * by a given space `id` and `filters` object.
   * 
   *
   * @param id -  Space id of desired space structs.
   * 
   * @param filters - (Optional) An object containing visibility filter (`hidden` field) and content filter (with or without IPFS content).
   *
   * @returns Data about space structs aggregated from Subsocial blockchain and IPFS. If no corresponding
   * space structs to given space `id` and `filters` object, undefined is returned.
   */  
  public async findSpaceStruct (id: AnyId, filters?: Filters): Promise<SpaceStruct | undefined> {
    return getFirstOrUndefined(await this.findSpaceStructs([ id ], filters))
  }

  /**
   * Find and load information about post structs (can be Unlisted or Public, depending on filters set on `query`) from Subsocial blockchain and IPFS 
   * by a given post `id` and `filters` object.
   * 
   *
   * @param id -  Post id of desired post structs.
   * 
   * @param filters - (Optional) An object containing visibility filter (`hidden` field) and content filter (with or without IPFS content).
   *
   * @returns Data about post structs aggregated from Subsocial blockchain and IPFS. If no corresponding
   * post structs to given post `id` and `filters` object, undefined is returned.
   */  
  public async findPostStruct (id: AnyId, filters?: Filters): Promise<PostStruct | undefined> {
    return getFirstOrUndefined(await this.findPostStructs([ id ], filters))
  }

  //------------------------------------------------
  // Spaces


  /**
   * Find and load data about a space (can be Unlisted or Public, depending on filters set on `query`) from Subsocial blockchain and IPFS by a given `query` object.
   * 
   *
   * @param query - An object containing desired space `id`, visibility filter (`hidden` field), and content filter (with or without IPFS content).
   *
   * @returns Data about a space aggregated from Subsocial blockchain and IPFS. If no corresponding
   * space to given `query` object, undefined is returned.
   */  

  public async findSpace (query: FindSpaceQuery) {
    const spaces = await this.findSpaces({ ...query, ids: [ idToBn(query.id) ] })
    return getFirstOrUndefined(spaces)
  }

  /**
   * Find and load an array of information about spaces (can be Unlisted or Public, depending on `filter` object) from Subsocial blockchain and IPFS by a given `filter` object.
   * 
   *
   * @param filter - An object containing desired space `ids`, visibility filter (`hidden` field), and content filter (with or without IPFS content).
   *
   * @returns An array of data about desired spaces aggregated from Subsocial blockchain and IPFS. If no corresponding
   * spaces to given `filter` object, undefined is returned.
   */  
  public async findSpaces (filter: FindSpacesQuery) {
    return convertToNewSpaceDataArray(
        await this.base.findSpaces(filter)
    )
  }

  /**
   * Find and load an array of information about public spaces from Subsocial blockchain and IPFS by a given array of
   * space `ids`.
   *
   * Space is considered public if it meets the next conditions:
   * - The `hidden` field on its blockchain structure is `false`.
   * - And there is a corresponding JSON file that represents the space's content on IPFS.
   *
   * @param ids - An array of ids of desired spaces.
   *
   * @returns An array of data about desired spaces aggregated from Subsocial blockchain and IPFS. If no corresponding
   * spaces to given array of `ids`, an empty array is returned.
   */  
  public async findPublicSpaces (ids: AnyId[]) {
    return convertToNewSpaceDataArray(
       await this.base.findPublicSpaces(idsToBns(ids))
    )
  }

  /**
   * Find and load an array of information about unlisted spaces from Subsocial blockchain and IPFS by a given array of
   * space `ids`.
   *
   * Space is considered unlisted if it meets either of these conditions:
   * - The `hidden` field on it's blockchain structure is `true`.
   * - Or there is no corresponding JSON file that represents the space's content on IPFS.
   *
   * @param ids - An array of ids of desired spaces.
   *
   * @returns An array of data about desired spaces aggregated from Subsocial blockchain and IPFS. If no corresponding
   * spaces to given array of `ids`, an empty array is returned.
   */  
  public async findUnlistedSpaces (ids: AnyId[]) {
    return convertToNewSpaceDataArray(
       await this.base.findUnlistedSpaces(idsToBns(ids))
    )
  }

  //------------------------------------------------
  // Posts

  /**
   * Find and load data about a post from Subsocial blockchain and IPFS by a given `query` object.
   *
   *
   * @param query - An object containing desired post `id`, visibility filter (`hidden` field), and content filter (with or without IPFS content).
   *
   * @returns Data about a post aggregated from Subsocial blockchain and IPFS. If no corresponding
   * post to given `query` object, undefined is returned.
   */  
  public async findPost (query: FindPostQuery) {
    const posts = await this.findPosts({ ...query, ids: [ idToBn(query.id) ] })
    return getFirstOrUndefined(posts)
  }

/**
   * Find and load an array of information about posts (can be Unlisted or Public, depending on `filter` object) from Subsocial blockchain and IPFS by a given `filter` object.
   * 
   *
   * @param filter - An object containing desired post `ids`, visibility filter (`hidden` field), and content filter (with or without IPFS content).
   *
   * @returns An array of data about desired posts aggregated from Subsocial blockchain and IPFS. If no corresponding
   * posts to given `filter` object, an empty array is returned.
   */  
  public async findPosts (filter: FindPostsQuery) {
    return convertToNewPostDataArray(
        await this.base.findPosts(filter)
    )
  }

/**
   * Find and load an array of information public posts from Subsocial blockchain and IPFS by a given array of post `ids`.
   * 
   * Post is considered public if it meets the next conditions:
   * - The `hidden` field on its blockchain structure is `false`.
   * - And there is a corresponding JSON file that represents the space's content on IPFS.
   *
   * @param ids - An array of ids of desired posts.
   *
   * @returns An array of data about desired posts aggregated from Subsocial blockchain and IPFS. If no corresponding
   * posts to given array of `ids`, an empty array is returned.
   */  
  public async findPublicPosts (ids: AnyId[]) {
    return convertToNewPostDataArray(
       await this.base.findPublicPosts(idsToBns(ids))
    )
  }

  //------------------------------------------------
  // Posts with details

/**
   * Find and load an array of posts or a post with (optionally) details: extension (PostExtensionData), owner (SpaceData), and space (SpaceData).
   * These methods are **deprecated**, because it is slow (although quite useful for UI).
*/  
  public async findPostWithSomeDetails (query: FindPostQuery) {
    return convertToNewPostWithSomeDetails(
       await this.base.findPostWithSomeDetails(query)
    )
  }

  public async findPostWithAllDetails (id: AnyId) {
    return convertToNewPostWithAllDetails(
       await this.base.findPostWithAllDetails(idToBn(id))
    )
  }

  public async findPostsWithAllDetails (query: FindPostsQuery) {
    return convertToNewPostWithAllDetailsArray(
       await this.base.findPostsWithAllDetails(query)
    )
  }

  public async findPublicPostsWithSomeDetails (query: FindPostsWithDetailsQuery) {
    return convertToNewPostWithSomeDetailsArray(
       await this.base.findPublicPostsWithSomeDetails(query)
    )
  }

  public async findPublicPostsWithAllDetails (ids: AnyId[]) {
    return convertToNewPostWithAllDetailsArray(
       await this.base.findPublicPostsWithAllDetails(idsToBns(ids))
    )
  }

  public async findUnlistedPostsWithAllDetails (ids: AnyId[]) {
    return convertToNewPostWithAllDetailsArray(
       await this.base.findUnlistedPostsWithAllDetails(idsToBns(ids))
    )
  }

  //------------------------------------------------
  // Profile spaces

  /**
   * Find and load an array of information about profile spaces from Subsocial blockchain and IPFS by a given array of
   * account ids `accounts`.
   *
   * A profile space is just a space set to a profile. 
   *
   * @param accounts - An array of account ids related to desired profile spaces
   *
   * @returns An array of data about desired profile spaces aggregated from Subsocial blockchain and IPFS. If no corresponding
   * profile spaces to given array of `accounts`, an empty array is returned.
   */  
  public async findProfileSpaces (accounts: AnyAccountId[]) {
    const profileSpaces = await this.base.findProfileSpaces(accounts)
    return convertToNewSpaceDataArray(profileSpaces)
  }

  /**
   * Find and load information about a profile space from Subsocial blockchain and IPFS using account id.
   *
   *
   * A profile space is just a space set to a profile. 
   * 
   * @param account - Account id corresponding to desired space profile.
   *
   * @returns Data about desired profile space aggregated from blockchain and IPFS. If no corresponding space to given account id,
   * `undefined` is returned.
   */  
  public async findProfileSpace (account: AnyAccountId) {
    const profileSpaces = await this.findProfileSpaces([ account ])
    return getFirstOrUndefined(profileSpaces)
  }

  //------------------------------------------------
  // Domains

  /**
   * Find and load an array of information about domain structs from Subsocial blockchain and IPFS by a given array of `domainNames`.
   *
   * 
   * @param domainNames - An array of domain names.
   *
   * @returns An array of data about desired domain structs aggregated from blockchain and IPFS. If no corresponding domains to given array of `domainNames`,
   * an empty array is returned.
   */  
  async findDomains (domainNames: string[]) {
    const structs = await this.blockchain.registeredDomains(domainNames)
    return flattenDomainStructs(structs)
  }

  /**
   * Find and load data about a domain from Subsocial blockchain and IPFS by a given string of `domainName`.
   *
   * 
   * @param domainName - A string of domain name.
   *
   * @returns Data about desired domain name aggregated from blockchain and IPFS. If no corresponding domain name to given `domainName`,
   * `undefined` is returned.
   */  
  async findDomain (domainName: string) {
    return getFirstOrUndefined(await this.findDomains([domainName]))
  }
  
}