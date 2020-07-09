import { BasicSubsocialApi } from './basic-subsocial';
import { FindStructsFns, loadAndSetPostRelatedStructs } from './utils/loadPostStructs';
import { PostWithSomeDetails, PostWithAllDetails, AnySpaceId } from '@subsocial/types';
import { getFirstOrUndefined } from '@subsocial/utils';
import { FindPostsQuery, FindPostsWithDetailsQuery, FindPostWithDetailsQuery } from './utils/types';

export class SubsocialApi extends BasicSubsocialApi {

  private structFinders: FindStructsFns = {
    findSpaces: this.findVisibleSpaces.bind(this),
    findPosts: this.findVisiblePosts.bind(this),
    findProfiles: this.findProfiles.bind(this)
  }

  async findAllSpaces (ids: AnySpaceId[]) {
    return this.findSpaces({ ids })
  }

  /** Find and load spaces with hidden = false */
  async findVisibleSpaces (ids: AnySpaceId[]) {
    return this.findSpaces({ ids, visibility: 'onlyVisible' })
  }

  /** Find and load spaces with hidden = true */
  async findHiddenSpaces (ids: AnySpaceId[]) {
    return this.findSpaces({ ids, visibility: 'onlyHidden' })
  }

  async findAllPosts (ids: AnySpaceId[]) {
    return this.findPosts({ ids })
  }

  /** Find and load posts with hidden = false */
  async findVisiblePosts (ids: AnySpaceId[]) {
    return this.findPosts({ ids, visibility: 'onlyVisible' })
  }

  /** Find and load posts with hidden = true */
  async findHiddenPosts (ids: AnySpaceId[]) {
    return this.findPosts({ ids, visibility: 'onlyHidden' })
  }

  /** Find and load posts with their extension and owner's profile (if defined). */
  async findPostsWithSomeDetails (filter: FindPostsWithDetailsQuery): Promise<PostWithSomeDetails[]> {
    const posts = await this.findPosts(filter)
    return loadAndSetPostRelatedStructs(posts, this.structFinders, filter)
  }

  async findVisiblePostsWithSomeDetails (filter: FindPostsWithDetailsQuery): Promise<PostWithSomeDetails[]> {
    const posts = await this.findPosts({ ids: filter.ids, visibility: 'onlyVisible' })
    return loadAndSetPostRelatedStructs(posts, this.structFinders, filter)
  }

  async findHiddenPostsWithSomeDetails (filter: FindPostsWithDetailsQuery): Promise<PostWithSomeDetails[]> {
    const posts = await this.findPosts({ ids: filter.ids, visibility: 'onlyHidden' })
    return loadAndSetPostRelatedStructs(posts, this.structFinders, filter)
  }

  async findPostsWithAllDetails ({ ids, visibility }: FindPostsQuery): Promise<PostWithAllDetails[]> {
    return this.findPostsWithSomeDetails({ ids, withSpace: true, withOwner: true, visibility }) as Promise<PostWithAllDetails[]>
  }

  async findVisiblePostsWithAllDetails ({ ids, visibility }: FindPostsQuery): Promise<PostWithAllDetails[]> {
    return this.findPostsWithSomeDetails({ ids, withSpace: true, withOwner: true, visibility }) as Promise<PostWithAllDetails[]>
  }

  async findHiddenPostsWithAllDetails ({ ids, visibility }: FindPostsQuery): Promise<PostWithAllDetails[]> {
    return this.findPostsWithSomeDetails({ ids, withSpace: true, withOwner: true, visibility }) as Promise<PostWithAllDetails[]>
  }

  // Functions that return a single element

  /** Find and load space with hidden = false */
  async findVisibleSpace (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findVisibleSpaces([ id ]))
  }

  /** Find and load space with hidden = true */
  async findHiddenSpace (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findHiddenSpaces([ id ]))
  }

  /** Find and load post with hidden = false */
  async findVisiblePost (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findVisiblePosts([ id ]))
  }

  /** Find and load post with hidden = true */
  async findHiddenPost (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findHiddenPosts([ id ]))
  }

  async findPostWithSomeDetails ({ id, ...opts }: FindPostWithDetailsQuery) {
    return getFirstOrUndefined(await this.findPostsWithSomeDetails({ ids: [ id ], ...opts }))
  }

  async findPostWithAllDetails ({ id }: FindPostWithDetailsQuery) {
    return getFirstOrUndefined(await this.findPostsWithAllDetails({ ids: [ id ] }))
  }

  async findVisiblePostWithSomeDetails ({ id, ...opts }: FindPostWithDetailsQuery) {
    return getFirstOrUndefined(await this.findVisiblePostsWithSomeDetails({ ids: [ id ], ...opts }))
  }

  async findHiddenPostWithSomeDetails ({ id, ...opts }: FindPostWithDetailsQuery) {
    return getFirstOrUndefined(await this.findHiddenPostsWithSomeDetails({ ids: [ id ], ...opts }))
  }

  async findVisiblePostWithAllDetails ({ id, ...opts }: FindPostWithDetailsQuery) {
    return getFirstOrUndefined(await this.findVisiblePostsWithAllDetails({ ids: [ id ], ...opts }))
  }

  async findHiddenPostWithAllDetails ({ id, ...opts }: FindPostWithDetailsQuery) {
    return getFirstOrUndefined(await this.findHiddenPostsWithAllDetails({ ids: [ id ], ...opts }))
  }
}
