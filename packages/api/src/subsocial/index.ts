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

  public async findSpaceStructs (ids: AnyId[], filters?: Filters): Promise<SpaceStruct[]> {
    const structs = await this.blockchain.findSpaces({ ids: idsToBns(ids), ...filters })
    return flattenSpaceStructs(structs)
  }

  public async findPostStructs (ids: AnyId[], filters?: Filters): Promise<PostStruct[]> {
    const structs = await this.blockchain.findPosts({ ids: idsToBns(ids), ...filters })
    return flattenPostStructs(structs)
  }

  public async findSpaceStruct (id: AnyId, filters?: Filters): Promise<SpaceStruct | undefined> {
    return getFirstOrUndefined(await this.findSpaceStructs([ id ], filters))
  }

  public async findPostStruct (id: AnyId, filters?: Filters): Promise<PostStruct | undefined> {
    return getFirstOrUndefined(await this.findPostStructs([ id ], filters))
  }

  //------------------------------------------------
  // Spaces

  public async findSpace (query: FindSpaceQuery) {
    const spaces = await this.findSpaces({ ...query, ids: [ idToBn(query.id) ] })
    return getFirstOrUndefined(spaces)
  }

  public async findSpaces (filter: FindSpacesQuery) {
    return convertToNewSpaceDataArray(
        await this.base.findSpaces(filter)
    )
  }

  public async findPublicSpaces (ids: AnyId[]) {
    return convertToNewSpaceDataArray(
       await this.base.findPublicSpaces(idsToBns(ids))
    )
  }

  public async findUnlistedSpaces (ids: AnyId[]) {
    return convertToNewSpaceDataArray(
       await this.base.findUnlistedSpaces(idsToBns(ids))
    )
  }

  //------------------------------------------------
  // Posts

  public async findPost (query: FindPostQuery) {
    const posts = await this.findPosts({ ...query, ids: [ idToBn(query.id) ] })
    return getFirstOrUndefined(posts)
  }

  public async findPosts (filter: FindPostsQuery) {
    return convertToNewPostDataArray(
        await this.base.findPosts(filter)
    )
  }

  public async findPublicPosts (ids: AnyId[]) {
    return convertToNewPostDataArray(
       await this.base.findPublicPosts(idsToBns(ids))
    )
  }

  //------------------------------------------------
  // Posts with details

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

  public async findProfileSpaces (accounts: AnyAccountId[]) {
    const profileSpaces = await this.base.findProfileSpaces(accounts)
    return convertToNewSpaceDataArray(profileSpaces)
  }

  public async findProfileSpace (account: AnyAccountId) {
    const profileSpaces = await this.findProfileSpaces([ account ])
    return getFirstOrUndefined(profileSpaces)
  }

  //------------------------------------------------
  // Domains

  async findDomains (domainNames: string[]) {
    const structs = await this.blockchain.registeredDomains(domainNames)
    return flattenDomainStructs(structs)
  }

  async findDomain (domainName: string) {
    return getFirstOrUndefined(await this.findDomains([domainName]))
  }
  
}