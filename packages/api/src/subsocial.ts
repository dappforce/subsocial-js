import { BasicSubsocialApi } from './basic-subsocial';
import { FindStructsFns, loadAndSetPostRelatedStructs } from './utils/loadPostStructs';
import { PostWithSomeDetails, PostWithAllDetails, AnySpaceId, AnyPostId } from '@subsocial/types';
import { getFirstOrUndefined } from '@subsocial/utils';
import { FindPostsQuery, FindPostsWithDetailsQuery, FindPostWithDetailsQuery } from './utils/types';

export class SubsocialApi extends BasicSubsocialApi {

  private structFinders: FindStructsFns = {
    findSpaces: this.findPublicSpaces.bind(this),
    findPosts: this.findPublicPosts.bind(this),
    findProfiles: this.findProfiles.bind(this)
  }

  async findAllSpaces (ids: AnySpaceId[]) {
    return this.findSpaces({ ids })
  }

  /** Find and load spaces with hidden = false */
  async findPublicSpaces (ids: AnySpaceId[]) {
    return this.findSpaces({ ids, visibility: 'onlyPublic', withContentOnly: true })
  }

  /** Find and load spaces with hidden = true */
  async findUnlistedSpaces (ids: AnySpaceId[]) {
    return this.findSpaces({ ids, visibility: 'onlyUnlisted' })
  }

  async findAllPosts (ids: AnySpaceId[]) {
    return this.findPosts({ ids })
  }

  /** Find and load posts with hidden = false */
  async findPublicPosts (ids: AnySpaceId[]) {
    return this.findPosts({ ids, visibility: 'onlyPublic', withContentOnly: true })
  }

  /** Find and load posts with hidden = true */
  async findUnlistedPosts (ids: AnySpaceId[]) {
    return this.findPosts({ ids, visibility: 'onlyUnlisted' })
  }

  /** Find and load posts with their extension and owner's profile (if defined). */
  async findPostsWithSomeDetails (filter: FindPostsWithDetailsQuery): Promise<PostWithSomeDetails[]> {
    const posts = await this.findPosts(filter)
    return loadAndSetPostRelatedStructs(posts, this.structFinders, filter)
  }

  async findPublicPostsWithSomeDetails (filter: FindPostsWithDetailsQuery): Promise<PostWithSomeDetails[]> {
    return this.findPostsWithSomeDetails({ ...filter, visibility: 'onlyPublic' })
  }

  async findUnlistedPostsWithSomeDetails (filter: FindPostsWithDetailsQuery): Promise<PostWithSomeDetails[]> {
    return this.findPostsWithSomeDetails({ ...filter, visibility: 'onlyUnlisted' })
  }

  async findPostsWithAllDetails ({ ids, visibility }: FindPostsQuery): Promise<PostWithAllDetails[]> {
    return this.findPostsWithSomeDetails({ ids, withSpace: true, withOwner: true, visibility }) as Promise<PostWithAllDetails[]>
  }

  async findPublicPostsWithAllDetails (ids: AnyPostId[]): Promise<PostWithAllDetails[]> {
    return this.findPostsWithAllDetails({ ids, visibility: 'onlyPublic' })
  }

  async findUnlistedPostsWithAllDetails (ids: AnyPostId[]): Promise<PostWithAllDetails[]> {
    return this.findPostsWithAllDetails({ ids, visibility: 'onlyUnlisted' })
  }

  // Functions that return a single element

  /** Find and load space with hidden = false */
  async findPublicSpace (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findPublicSpaces([ id ]))
  }

  /** Find and load space with hidden = true */
  async findUnlistedSpace (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findUnlistedSpaces([ id ]))
  }

  /** Find and load post with hidden = false */
  async findPublicPost (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findPublicPosts([ id ]))
  }

  /** Find and load post with hidden = true */
  async findUnlistedPost (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findUnlistedPosts([ id ]))
  }

  async findPostWithSomeDetails ({ id, ...opts }: FindPostWithDetailsQuery) {
    return getFirstOrUndefined(await this.findPostsWithSomeDetails({ ids: [ id ], ...opts }))
  }

  async findPublicPostWithSomeDetails ({ id, ...opts }: FindPostWithDetailsQuery) {
    return getFirstOrUndefined(await this.findPublicPostsWithSomeDetails({ ids: [ id ], ...opts }))
  }

  async findUnlistedPostWithSomeDetails ({ id, ...opts }: FindPostWithDetailsQuery) {
    return getFirstOrUndefined(await this.findUnlistedPostsWithSomeDetails({ ids: [ id ], ...opts }))
  }

  async findPostWithAllDetails (id: AnyPostId) {
    return getFirstOrUndefined(await this.findPostsWithAllDetails({ ids: [ id ] }))
  }

  async findPublicPostWithAllDetails (id: AnyPostId) {
    return getFirstOrUndefined(await this.findPublicPostsWithAllDetails([ id ]))
  }

  async findUnlistedPostWithAllDetails (id: AnyPostId) {
    return getFirstOrUndefined(await this.findUnlistedPostsWithAllDetails([ id ]))
  }
}
