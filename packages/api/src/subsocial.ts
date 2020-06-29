import { BasicSubsocialApi } from './basic-subsocial';
import { FindStructsFns, PostDetailsOpts, loadAndSetPostRelatedStructs, PostDetailsOptsWithVisibilityFilter } from './utils/loadPostStructs';
import { AnyPostId, PostWithSomeDetails, PostWithAllDetails, AnySpaceId } from '@subsocial/types';
import { getFirstOrUndefined } from '@subsocial/utils';
import { VisibilityFilter } from './utils/visibility-filter';

export class SubsocialApi extends BasicSubsocialApi {

  private structFinders: FindStructsFns = {
    findSpaces: this.findSpaces.bind(this),
    findPosts: this.findPosts.bind(this),
    findProfiles: this.findProfiles.bind(this)
  }

  /** Find and load spaces with hidden = true */
  async findVisibleSpaces (ids: AnySpaceId[]) {
    return this.findSpaces(ids, 'onlyVisible')
  }

  /** Find and load spaces with hidden = false */
  async findHiddenSpaces (ids: AnySpaceId[]) {
    return this.findSpaces(ids, 'onlyHidden')
  }

  /** Find and load posts with hidden = true */
  async findVisiblePosts (ids: AnySpaceId[]) {
    return this.findPosts(ids, 'onlyVisible')
  }

  /** Find and load posts with hidden = false */
  async findHiddenPosts (ids: AnySpaceId[]) {
    return this.findPosts(ids, 'onlyHidden')
  }

  /** Find and load posts with their extension and owner's profile (if defined). */
  async findPostsWithSomeDetails (ids: AnyPostId[], opts?: PostDetailsOptsWithVisibilityFilter): Promise<PostWithSomeDetails[]> {
    const posts = await this.findPosts(ids, opts?.visibilityFilter)
    return loadAndSetPostRelatedStructs(posts, this.structFinders, opts)
  }

  async findVisiblePostsWithSomeDetails (ids: AnyPostId[], opts?: PostDetailsOptsWithVisibilityFilter): Promise<PostWithSomeDetails[]> {
    const posts = await this.findPosts(ids, 'onlyVisible')
    return loadAndSetPostRelatedStructs(posts, this.structFinders, opts)
  }

  async findHiddenPostsWithSomeDetails (ids: AnyPostId[], opts?: PostDetailsOptsWithVisibilityFilter): Promise<PostWithSomeDetails[]> {
    const posts = await this.findPosts(ids, 'onlyHidden')
    return loadAndSetPostRelatedStructs(posts, this.structFinders, opts)
  }

  async findPostsWithAllDetails (ids: AnyPostId[], opts?: VisibilityFilter): Promise<PostWithAllDetails[]> {
    return this.findPostsWithSomeDetails(ids, { withSpace: true, withOwner: true, visibilityFilter: opts }) as Promise<PostWithAllDetails[]>
  }

  async findVisiblePostsWithAllDetails (ids: AnyPostId[], opts?: VisibilityFilter): Promise<PostWithAllDetails[]> {
    return this.findPostsWithSomeDetails(ids, { withSpace: true, withOwner: true, visibilityFilter: 'onlyVisible' }) as Promise<PostWithAllDetails[]>
  }

  async findHiddenPostsWithAllDetails (ids: AnyPostId[], opts?: VisibilityFilter): Promise<PostWithAllDetails[]> {
    return this.findPostsWithSomeDetails(ids, { withSpace: true, withOwner: true, visibilityFilter: 'onlyHidden' }) as Promise<PostWithAllDetails[]>
  }

  // Single
  /** Find and load space with hidden = true */
  async findVisibleSpace (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findVisibleSpaces([ id ]))
  }

  /** Find and load space with hidden = false */
  async findHiddenSpace (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findHiddenSpaces([ id ]))
  }

  /** Find and load post with hidden = true */
  async findVisiblePost (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findVisiblePosts([ id ]))
  }

  /** Find and load post with hidden = false */
  async findHiddenPost (id: AnySpaceId) {
    return getFirstOrUndefined(await this.findHiddenPosts([ id ]))
  }

  async findPostWithSomeDetails (id: AnyPostId, opts?: PostDetailsOpts) {
    return getFirstOrUndefined(await this.findPostsWithSomeDetails([ id ], opts))
  }

  async findPostWithAllDetails (id: AnyPostId) {
    return getFirstOrUndefined(await this.findPostsWithAllDetails([ id ]))
  }

  async findVisiblePostWithSomeDetails (id: AnyPostId, opts?: PostDetailsOptsWithVisibilityFilter) {
    return getFirstOrUndefined(await this.findVisiblePostsWithSomeDetails([ id ], opts))
  }

  async findHiddenPostWithSomeDetails (id: AnyPostId, opts?: PostDetailsOptsWithVisibilityFilter) {
    return getFirstOrUndefined(await this.findHiddenPostsWithSomeDetails([ id ], opts))
  }

  async findVisiblePostWithAllDetails (id: AnyPostId, opts?: VisibilityFilter) {
    return getFirstOrUndefined(await this.findVisiblePostsWithAllDetails([ id ], opts))
  }

  async findHiddenPostWithAllDetails (id: AnyPostId, opts?: VisibilityFilter) {
    return getFirstOrUndefined(await this.findHiddenPostsWithAllDetails([ id ], opts))
  }
}
