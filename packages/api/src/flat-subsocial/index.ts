import {
  convertToNewPostDataArray,
  convertToNewPostWithAllDetails,
  convertToNewPostWithAllDetailsArray,
  convertToNewSpaceData,
  convertToNewSpaceDataArray,
  convertToNewProfileData,
  convertToNewPostData,
  convertToNewPostWithSomeDetails,
  convertToNewPostWithSomeDetailsArray,
  convertToNewProfileDataArray,
} from './utils'
import { FindPostQuery, FindPostsQuery, FindPostsWithDetailsQuery, FindSpaceQuery } from '../filters'
import { AnyAccountId } from '@subsocial/types'
import { SubsocialApi } from '../subsocial'
import { ProfileData, SpaceData, PostData, PostWithSomeDetails, PostWithAllDetails, AnyId } from './dto'

export interface IFlatSubsocialApi {
  findProfile: (id: AnyAccountId) => Promise<ProfileData | undefined>
  findProfiles: (ids: AnyAccountId[]) => Promise<ProfileData[]>

  findSpace: (query: FindSpaceQuery) => Promise<SpaceData | undefined>
  findPublicSpaces: (ids: AnyId[]) => Promise<SpaceData[]>
  findUnlistedSpaces: (ids: AnyId[]) => Promise<SpaceData[]>

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
  private subsocial: SubsocialApi

  constructor (subsocial: SubsocialApi) {
    this.subsocial = subsocial
  }

  public async findProfile (id: AnyAccountId) {
    const old = await this.subsocial.findProfile(id)
    return !old ? old : convertToNewProfileData(old)
  }

  public async findProfiles (ids: AnyAccountId[]) {
    return convertToNewProfileDataArray(
       await this.subsocial.findProfiles(ids)
    )
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

function idsToBns(ids: AnyId[]): import("@subsocial/types").AnySpaceId[] {
  throw new Error('Function not implemented.')
}


function idToBn(id: AnyId): import("@subsocial/types").AnyPostId {
  throw new Error('Function not implemented.')
}
