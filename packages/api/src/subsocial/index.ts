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
   * Find and load an array of information about space structs (can be Unlisted or Public, depending on `filters`) from the Subsocial blockchain and IPFS 
   * by a given array of space `ids` and `filters` object.
   * 
   *
   * @param ids -  An array of the space ids of the desired space structs.
   * 
   * @param filters - (Optional) An object containing a visibility filter (`hidden` field) and content filter (with or without IPFS content).
   *
   * @returns An array of information about space structs aggregated from the Subsocial blockchain and IPFS. If there are no
   * space structs corresponding to the given space `ids` and `filters`, an empty array is returned.
   */  
  public async findSpaceStructs (ids: AnyId[], filters?: Filters): Promise<SpaceStruct[]> {
    const structs = await this.blockchain.findSpaces({ ids: idsToBns(ids), ...filters })
    return flattenSpaceStructs(structs)
  }

  /**
   * Find and load an array of information about post structs (can be Unlisted or Public, depending on `filters`) from the Subsocial blockchain and IPFS 
   * by a given array of post `ids` and `filters` object.
   * 
   *
   * @param ids -  An array of the post ids of the desired post structs.
   * 
   * @param filters - (Optional) An object containing a visibility filter (`hidden` field) and content filter (with or without IPFS content).
   *
   * @returns An array of information about post structs aggregated from the Subsocial blockchain and IPFS. If there are no
   * post structs corresponding to the given post `ids` and `filters` object, an empty array is returned.
   */  
  public async findPostStructs (ids: AnyId[], filters?: Filters): Promise<PostStruct[]> {
    const structs = await this.blockchain.findPosts({ ids: idsToBns(ids), ...filters })
    return flattenPostStructs(structs)
  }

  /**
   * Find and load information about space structs (can be Unlisted or Public, depending on `filters`) from the Subsocial blockchain and IPFS 
   * by a given space `id` and `filters` object.
   * 
   *
   * @param id -  The space id of the desired space structs.
   * 
   * @param filters - (Optional) An object containing a visibility filter (`hidden` field) and content filter (with or without IPFS content).
   *
   * @returns Data about space structs aggregated from the Subsocial blockchain and IPFS. If there are no
   * space structs corresponding to the given space `id` and `filters` object, undefined is returned.
   */  
  public async findSpaceStruct (id: AnyId, filters?: Filters): Promise<SpaceStruct | undefined> {
    return getFirstOrUndefined(await this.findSpaceStructs([ id ], filters))
  }

  /**
   * Find and load information about post structs (can be Unlisted or Public, depending on `filters`) from the Subsocial blockchain and IPFS 
   * by a given post `id` and `filters` object.
   * 
   *
   * @param id -  The post id of the desired post structs.
   * 
   * @param filters - (Optional) An object containing a visibility filter (`hidden` field) and content filter (with or without IPFS content).
   *
   * @returns Data about post structs aggregated from the Subsocial blockchain and IPFS. If there are no
   * post structs corresponding to the given post `id` and `filters` object, undefined is returned.
   */  
  public async findPostStruct (id: AnyId, filters?: Filters): Promise<PostStruct | undefined> {
    return getFirstOrUndefined(await this.findPostStructs([ id ], filters))
  }

  //------------------------------------------------
  // Spaces


  /**
   * Find and load data about a space (can be Unlisted or Public, depending on filters set on `query`) from the Subsocial blockchain and IPFS by a given `query` object.
   * 
   *
   * @param query - An object containing the desired space `id`, a visibility filter (`hidden` field), and a content filter (with or without IPFS content).
   *
   * @returns Data about a space aggregated from the Subsocial blockchain and IPFS. If there is no
   * space corresponding to the given `query` object, undefined is returned.
   */  

  public async findSpace (query: FindSpaceQuery) {
    const spaces = await this.findSpaces({ ...query, ids: [ idToBn(query.id) ] })
    return getFirstOrUndefined(spaces)
  }

  /**
   * Find and load an array of information about spaces (can be Unlisted or Public, depending on `filter` object) from the Subsocial blockchain and IPFS by a given `filter` object.
   * 
   *
   * @param filter - An object containing the desired space `ids`, a visibility filter (`hidden` field), and a content filter (with or without IPFS content).
   *
   * @returns An array of data about desired spaces aggregated from the Subsocial blockchain and IPFS. If there are no
   * spaces corresponding to the given `filter` object, undefined is returned.
   */  
  public async findSpaces (filter: FindSpacesQuery) {
    return convertToNewSpaceDataArray(
        await this.base.findSpaces(filter)
    )
  }

  /**
   * Find and load an array of information about public spaces from the Subsocial blockchain and IPFS by a given array of
   * space `ids`.
   *
   * A space is considered public if it meets the following conditions:
   * - The `hidden` field on its blockchain structure is `false`.
   * - There is a corresponding JSON file that represents the space's content on IPFS.
   *
   * @param ids - An array of the ids of the desired spaces.
   *
   * @returns An array of data about the desired spaces aggregated from the Subsocial blockchain and IPFS. If there are no
   * spaces corresponding to the given array of `ids`, an empty array is returned.
   */  
  public async findPublicSpaces (ids: AnyId[]) {
    return convertToNewSpaceDataArray(
       await this.base.findPublicSpaces(idsToBns(ids))
    )
  }

  /**
   * Find and load an array of information about unlisted spaces from the Subsocial blockchain and IPFS by a given array of
   * space `ids`.
   *
   * A space is considered unlisted if it meets either of these conditions:
   * - The `hidden` field on its blockchain structure is `true`.
   * - There is no corresponding JSON file that represents the space's content on IPFS.
   *
   * @param ids - An array of the ids of the desired spaces.
   *
   * @returns An array of data about the desired spaces aggregated from the Subsocial blockchain and IPFS. If there are no
   * spaces corresponding to the given array of `ids`, an empty array is returned.
   */  
  public async findUnlistedSpaces (ids: AnyId[]) {
    return convertToNewSpaceDataArray(
       await this.base.findUnlistedSpaces(idsToBns(ids))
    )
  }

  //------------------------------------------------
  // Posts

  /**
   * Find and load data about a post from the Subsocial blockchain and IPFS by a given `query` object.
   *
   *
   * @param query - An object containing the desired post `id`, a visibility filter (`hidden` field), and a content filter (with or without IPFS content).
   *
   * @returns Data about a post aggregated from the Subsocial blockchain and IPFS. If there is no 
   * post corresponding to the given `query` object, undefined is returned.
   */  
  public async findPost (query: FindPostQuery) {
    const posts = await this.findPosts({ ...query, ids: [ idToBn(query.id) ] })
    return getFirstOrUndefined(posts)
  }

/**
   * Find and load an array of information about posts (can be Unlisted or Public, depending on `filter` object) from the Subsocial blockchain and IPFS by a given `filter` object.
   * 
   *
   * @param filter - An object containing the desired post `ids`, a visibility filter (`hidden` field), and a content filter (with or without IPFS content).
   *
   * @returns An array of data about the desired posts aggregated from the Subsocial blockchain and IPFS. If there are no 
   * posts corresponding to the given `filter` object, an empty array is returned.
   */  
  public async findPosts (filter: FindPostsQuery) {
    return convertToNewPostDataArray(
        await this.base.findPosts(filter)
    )
  }

/**
   * Find and load an array of public posts from the Subsocial blockchain and IPFS by a given array of post `ids`.
   * 
   * A post is considered public if it meets the following conditions:
   * - The `hidden` field on its blockchain structure is `false`.
   * - There is a corresponding JSON file that represents the space's content on IPFS.
   *
   * @param ids - An array of the ids of the desired posts.
   *
   * @returns An array of data about the desired posts aggregated from the Subsocial blockchain and IPFS. If there are no 
   * posts corresponding to the given array of `ids`, an empty array is returned.
   */  
  public async findPublicPosts (ids: AnyId[]) {
    return convertToNewPostDataArray(
       await this.base.findPublicPosts(idsToBns(ids))
    )
  }

  //------------------------------------------------
  // Posts with details

/**
   * Find and load information about a post with some of its details: extension (PostExtensionData), owner (SpaceData), and space (SpaceData).
   * These methods are **deprecated**, because they are slow (although quite useful for UI).
*/  
  public async findPostWithSomeDetails (query: FindPostQuery) {
    return convertToNewPostWithSomeDetails(
       await this.base.findPostWithSomeDetails(query)
    )
  }

/**
   * Find and load information about a post with all of its details: extension (PostExtensionData), owner (SpaceData), and space (SpaceData).
   * These methods are **deprecated**, because they are slow (although quite useful for UI).
*/  
  public async findPostWithAllDetails (id: AnyId) {
    return convertToNewPostWithAllDetails(
       await this.base.findPostWithAllDetails(idToBn(id))
    )
  }

/**
   * Find and load an array of information about a post with all of its details: extension (PostExtensionData), owner (SpaceData), and space (SpaceData).
   * These methods are **deprecated**, because they are slow (although quite useful for UI).
*/  
  public async findPostsWithAllDetails (query: FindPostsQuery) {
    return convertToNewPostWithAllDetailsArray(
       await this.base.findPostsWithAllDetails(query)
    )
  }

/**
   * Find and load an array of information about a public post with some of its details: extension (PostExtensionData), owner (SpaceData), and space (SpaceData).
   * These methods are **deprecated**, because they are slow (although quite useful for UI).
*/  
  public async findPublicPostsWithSomeDetails (query: FindPostsWithDetailsQuery) {
    return convertToNewPostWithSomeDetailsArray(
       await this.base.findPublicPostsWithSomeDetails(query)
    )
  }

/**
   * Find and load an array of information about a public post with all of its details: extension (PostExtensionData), owner (SpaceData), and space (SpaceData).
   * These methods are **deprecated**, because they are slow (although quite useful for UI).
*/  
  public async findPublicPostsWithAllDetails (ids: AnyId[]) {
    return convertToNewPostWithAllDetailsArray(
       await this.base.findPublicPostsWithAllDetails(idsToBns(ids))
    )
  }

/**
   * Find and load an array of information about an unlisted post with all of its details: extension (PostExtensionData), owner (SpaceData), and space (SpaceData).
   * These methods are **deprecated**, because they are slow (although quite useful for UI).
*/  
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
   * @param accounts - An array of the account ids related to the desired profile spaces
   *
   * @returns Find and load an array of information about the profile space of each accountId in the array 
   * from the Subsocial blockchain and IPFS. 
   *
   */  
  public async findProfileSpaces (accounts: AnyAccountId[]) {
    const profileSpaces = await this.base.findProfileSpaces(accounts)
    return convertToNewSpaceDataArray(profileSpaces)
  }

  /**
   * Find and load information about a profile space from the Subsocial blockchain and IPFS using an account id.
   *
   *
   * A profile space is just a space set to a profile. 
   * 
   * @param account - An account id corresponding to a desired space profile.
   *
   * @returns Data about the desired profile space aggregated from the Subsocial blockchain and IPFS. If there is space corresponding to the given account id,
   * `undefined` is returned.
   */  
  public async findProfileSpace (account: AnyAccountId) {
    const profileSpaces = await this.findProfileSpaces([ account ])
    return getFirstOrUndefined(profileSpaces)
  }

  //------------------------------------------------
  // Domains

  /**
   * Find and load an array of information about some domain structs from the Subsocial blockchain by a given array of `domainNames`.
   *
   * 
   * @param domainNames - An array of domain names.
   *
   * @returns An array of data about the desired domain structs aggregated from the Subsocial blockchain. If there are no domains corresponding to the given array of `domainNames`,
   * an empty array is returned.
   */  
  async findDomains (domainNames: string[]) {
    const structs = await this.blockchain.registeredDomains(domainNames)
    return flattenDomainStructs(structs)
  }

  /**
   * Find and load data about a domain from the Subsocial blockchain by a given string of `domainName`.
   *
   * 
   * @param domainName - A string that is a domain name.
   *
   * @returns Data about a desired domain name from the Subsocial blockchain. If there is no domain name corresponding to the given `domainName`,
   * `undefined` is returned.
   */  
  async findDomain (domainName: string) {
    return getFirstOrUndefined(await this.findDomains([domainName]))
  }
  
}