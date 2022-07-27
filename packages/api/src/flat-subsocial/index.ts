import {
  convertToNewPostDataArray,
  convertToNewPostWithAllDetails,
  convertToNewPostWithAllDetailsArray,
  convertToNewSpaceData,
  convertToNewSpaceDataArray,
  convertToNewPostData,
  convertToNewPostWithSomeDetails,
  convertToNewPostWithSomeDetailsArray,
} from './utils'
import { FindPostQuery, FindPostsQuery, FindPostsWithDetailsQuery, FindSpaceQuery } from '../filters'
import { SubsocialApi } from '../subsocial'
import { SpaceData, PostData, PostWithSomeDetails, PostWithAllDetails, AnyId, SpaceStruct, PostStruct } from '@subsocial/types/dto'
import { getFirstOrUndefined, idsToBns, idToBn } from '@subsocial/utils'
import { flattenSpaceStructs, flattenPostStructs } from './flatteners'

export interface IFlatSubsocialApi {
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

export class FlatSubsocialApi implements IFlatSubsocialApi {
  private _subsocial: SubsocialApi

  constructor (subsocial: SubsocialApi) {
    this._subsocial = subsocial
  }

  get subsocial() {
    return this._subsocial 
  }

  public async findSpaceStructs (ids: AnyId[]): Promise<SpaceStruct[]> {
    const structs = await this.subsocial.substrate.findSpaces({ ids: idsToBns(ids), visibility: 'onlyPublic', withContentOnly: true })
    return flattenSpaceStructs(structs)
  }

  public async findPostStructs (ids: AnyId[]): Promise<PostStruct[]> {
    const structs = await this.subsocial.substrate.findPosts({ ids: idsToBns(ids), visibility: 'onlyPublic', withContentOnly: true })
    return flattenPostStructs(structs)
  }

  public async findSpaceStruct (id: AnyId): Promise<SpaceStruct | undefined> {
    return getFirstOrUndefined(await this.findSpaceStructs([ id ]))
  }

  public async findPostStruct (id: AnyId): Promise<PostStruct | undefined> {
    return getFirstOrUndefined(await this.findPostStructs([ id ]))
  }

  public async findSpace (query: FindSpaceQuery) {
    const old =  await this.subsocial.findSpace(query)
    return !old ? old: convertToNewSpaceData(old)
  }

  public async findPublicSpaces (ids: AnyId[]) {
    return convertToNewSpaceDataArray(
       await this.subsocial.findPublicSpaces(idsToBns(ids))
    )
  }

  public async findUnlistedSpaces (ids: AnyId[]) {
    return convertToNewSpaceDataArray(
       await this.subsocial.findUnlistedSpaces(idsToBns(ids))
    )
  }

  public async findPost (query: FindPostQuery) {
    const old =  await this.subsocial.findPost(query)
    return !old ? old: convertToNewPostData(old)
  }

  public async findPublicPosts (ids: AnyId[]) {
    return convertToNewPostDataArray(
       await this.subsocial.findPublicPosts(idsToBns(ids))
    )
  }

  public async findPostWithSomeDetails (query: FindPostQuery) {
    return convertToNewPostWithSomeDetails(
       await this.subsocial.findPostWithSomeDetails(query)
    )
  }

  public async findPostWithAllDetails (id: AnyId) {
    return convertToNewPostWithAllDetails(
       await this.subsocial.findPostWithAllDetails(idToBn(id))
    )
  }

  public async findPostsWithAllDetails (query: FindPostsQuery) {
    return convertToNewPostWithAllDetailsArray(
       await this.subsocial.findPostsWithAllDetails(query)
    )
  }

  public async findPublicPostsWithSomeDetails (query: FindPostsWithDetailsQuery) {
    return convertToNewPostWithSomeDetailsArray(
       await this.subsocial.findPublicPostsWithSomeDetails(query)
    )
  }

  public async findPublicPostsWithAllDetails (ids: AnyId[]) {
    return convertToNewPostWithAllDetailsArray(
       await this.subsocial.findPublicPostsWithAllDetails(idsToBns(ids))
    )
  }

  public async findUnlistedPostsWithAllDetails (ids: AnyId[]) {
    return convertToNewPostWithAllDetailsArray(
       await this.subsocial.findUnlistedPostsWithAllDetails(idsToBns(ids))
    )
  }
  
}