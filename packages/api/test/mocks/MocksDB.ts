import { PostData, SpaceData, AnyPostId, AnyAccountId, ProfileData, AnySpaceId } from '@subsocial/types/src'
import { mockPostsData } from './PostMocks'
import { mockSpacesData } from './SpaceMocks'
import { profilesData } from './SocialProfileMocks'
import { isDefined } from '@subsocial/utils'

const mockPosts = new Map<string, PostData>()
mockPostsData.forEach(x => mockPosts.set(x.struct.id.toString(), x))

const mockSpaces = new Map<string, SpaceData>()
mockSpacesData.forEach(x => mockSpaces.set(x.struct.id.toString(), x))

const mockProfiles = new Map<string, ProfileData>()
profilesData.forEach(x => {
  const idStr = x.profile?.created.account.toString()
  idStr && mockProfiles.set(idStr, x)
}) 

export async function findPosts (ids: AnyPostId[]): Promise<PostData[]> {
  const posts = ids.map(id => mockPosts.get(id.toString()) as PostData)
  return posts.filter(isDefined) as PostData[]
}

export async function findProfiles (ids: AnyAccountId[]): Promise<ProfileData[]> {
  const profiles = ids.map(id => mockProfiles.get(id.toString()))
  return profiles.filter(isDefined) as ProfileData[]
}

export async function findSpaces (ids: AnySpaceId[]): Promise<SpaceData[]> {
  const spaces = ids.map(id => mockSpaces.get(id.toString()))
  return spaces.filter(isDefined) as SpaceData[]
}