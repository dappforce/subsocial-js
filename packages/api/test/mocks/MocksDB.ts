import { PostData, BlogData, AnyPostId, AnyAccountId, ProfileData, AnyBlogId } from '@subsocial/types/src'
import { mockPostsData } from './PostMocks'
import { mockBlogsData } from './BlogMocks'
import { profilesData } from './SocialProfileMocks'
import { isDefined } from '@subsocial/utils'

const mockPosts = new Map<string, PostData>()
mockPostsData.forEach(x => mockPosts.set(x.struct.id.toString(), x))

console.log(mockPostsData)

const mockBlogs = new Map<string, BlogData>()
mockBlogsData.forEach(x => mockBlogs.set(x.struct.id.toString(), x))

const mockProfiles = new Map<string, ProfileData>()
profilesData.forEach(x => {
  const idStr = x.profile?.created.account.toString()
  idStr && mockProfiles.set(idStr, x)
}) 

export async function findPosts (ids: AnyPostId[]): Promise<PostData[]> {
  const posts = ids.map(id => mockPosts.get(id.toString()) as PostData)
  return posts.filter(x => isDefined(x)) as PostData[]
}

export async function findProfiles (ids: AnyAccountId[]): Promise<ProfileData[]> {
  const profiles = ids.map(id => mockProfiles.get(id.toString()))
  return profiles.filter(x => isDefined(x)) as ProfileData[]
}

export async function findBlogs (ids: AnyBlogId[]): Promise<BlogData[]> {
  const blogs = ids.map(id => mockBlogs.get(id.toString()))
  return blogs.filter(x => isDefined(x)) as BlogData[]
}