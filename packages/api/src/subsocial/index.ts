import {
  convertToNewPostDataArray,
  convertToNewPostWithAllDetails,
  convertToNewPostWithAllDetailsArray,
  convertToNewSpaceData,
  convertToNewSpaceDataArray,
  convertToNewPostData,
  convertToNewPostWithSomeDetails,
  convertToNewPostWithSomeDetailsArray,
} from './flatteners/utils'
import { FindPostQuery, FindPostsQuery, FindPostsWithDetailsQuery, FindSpaceQuery } from '../filters'
import { BasicSubsocialApi } from './basic'
import { SpaceData, PostData, PostWithSomeDetails, PostWithAllDetails, AnyId, SpaceStruct, PostStruct } from '../types'
import { getFirstOrUndefined, idsToBns, idToBn } from '@subsocial/utils'
import { flattenSpaceStructs, flattenPostStructs, flattenDomainStruct, flattenDomainStructs } from './flatteners'
import { CreateSubsocialApiProps, SubsocialApiProps } from '../types'
import { getSubstrateApi } from '../connections'

export interface ISubsocialApi {
  findSpace: (query: FindSpaceQuery) => Promise<SpaceData | undefined>
  findPublicSpaces: (ids: AnyId[]) => Promise<SpaceData[]>
  findUnlistedSpaces: (ids: AnyId[]) => Promise<SpaceData[]>

  findSpaceStructs: (ids: AnyId[]) => Promise<SpaceStruct[]>
  findPostStructs: (ids: AnyId[]) => Promise<PostStruct[]>

  findSpaceStruct: (id: AnyId) => Promise<SpaceStruct | undefined>
  findPostStruct: (id: AnyId) => Promise<PostStruct | undefined>

  findPost: (query: FindPostQuery) => Promise<PostData | undefined>
  findPublicPosts: (ids: AnyId[]) => Promise<PostData[]>
  findPostWithSomeDetails: (query: FindPostQuery) => Promise<PostWithSomeDetails | undefined>
  findPostWithAllDetails: (id: AnyId) => Promise<PostWithAllDetails | undefined>
  findPostsWithAllDetails: (query: FindPostsQuery) => Promise<PostWithAllDetails[]>
  findPublicPostsWithSomeDetails: (query: FindPostsWithDetailsQuery) => Promise<PostWithSomeDetails[]>
  findPublicPostsWithAllDetails: (ids: AnyId[]) => Promise<PostWithAllDetails[]>
  findUnlistedPostsWithAllDetails: (ids: AnyId[]) => Promise<PostWithAllDetails[]>
}

export class SubsocialApi implements ISubsocialApi {
  private _base: BasicSubsocialApi

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

  public async findSpaceStructs (ids: AnyId[]): Promise<SpaceStruct[]> {
    const structs = await this.base.substrate.findSpaces({ ids: idsToBns(ids), visibility: 'onlyPublic', withContentOnly: true })
    return flattenSpaceStructs(structs)
  }

  public async findPostStructs (ids: AnyId[]): Promise<PostStruct[]> {
    const structs = await this.base.substrate.findPosts({ ids: idsToBns(ids), visibility: 'onlyPublic', withContentOnly: true })
    return flattenPostStructs(structs)
  }

  public async findSpaceStruct (id: AnyId): Promise<SpaceStruct | undefined> {
    return getFirstOrUndefined(await this.findSpaceStructs([ id ]))
  }

  public async findPostStruct (id: AnyId): Promise<PostStruct | undefined> {
    return getFirstOrUndefined(await this.findPostStructs([ id ]))
  }

  public async findSpace (query: FindSpaceQuery) {
    const old =  await this.base.findSpace(query)
    return !old ? old: convertToNewSpaceData(old)
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

  public async findPost (query: FindPostQuery) {
    const old =  await this.base.findPost(query)
    return !old ? old: convertToNewPostData(old)
  }

  public async findPublicPosts (ids: AnyId[]) {
    return convertToNewPostDataArray(
       await this.base.findPublicPosts(idsToBns(ids))
    )
  }

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
  // Domains

  async findDomains (domainNames: string[]) {
    const structs = await this.blockchain.registeredDomains(domainNames)
    return flattenDomainStructs(structs)
  }

  async findDomain (domainName: string) {
    return getFirstOrUndefined(await this.findDomains([domainName]))
  }
  
}