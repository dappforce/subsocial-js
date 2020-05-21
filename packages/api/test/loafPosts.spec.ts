import { SubsocialApi } from "../src/fullApi"
import { PostData, AnyPostId, AnyAccountId, ProfileData } from '@subsocial/types/src'

const mockPosts = new Map<string, PostData>()

class MockSubsocialApi extends SubsocialApi {

  async findPosts (ids: AnyPostId[]): Promise<PostData[]> {
    return [] as any
  }

  async findProfiles (ids: AnyAccountId[]): Promise<ProfileData[]> {
    return [] as any
  }
}