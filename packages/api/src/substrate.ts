import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { bool, GenericAccountId, Option, Tuple } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';
import { AnyAccountId, AnyBlogId, AnyCommentId, AnyPostId, AnyReactionId, SubstrateId } from '@subsocial/types';
import { Blog, BlogId, Comment, Post, PostId, Reaction, ReactionId, SocialAccount } from '@subsocial/types/substrate/interfaces';
import registry from '@subsocial/types/substrate/registry';
import { getFirstOrUndefined, isEmptyArray, isEmptyStr, newLogger, pluralize } from '@subsocial/utils';
import { asAccountId, getUniqueIds, SupportedSubstrateId, SupportedSubstrateResult } from './utils';

export class SubsocialSubstrateApi {

  private _api: SubstrateApi // Polkadot API (connected)

  constructor (api: SubstrateApi) {
    this._api = api
    logger.info('Initialized')
  }

  getSocialQuery = async () => {
    const api = await this.api
    return api.query.social
  };

  public get api () {
    return this._api.isReady;
  }

  // ---------------------------------------------------------------------
  // Private utils

  private async socialQuery (storage: string, value?: any): Promise<any> {
    const socialQuery = await this.getSocialQuery()
    return socialQuery[storage](value)
  }

  private async socialQueryMulti (storage: string, value: any[]): Promise<any[]> {
    const socialQuery = await this.getSocialQuery()
    return socialQuery[storage].multi(value)
  }

  private async isBooleanByAccount (storage: string, accountId: AnyAccountId, subjectId: SubstrateId): Promise<boolean> {
    const queryParams = new Tuple(registry, [ GenericAccountId, 'u64' ], [ asAccountId(accountId), subjectId ]);
    const isBoolean = await this.socialQuery(storage, queryParams) as bool
    return isBoolean.valueOf()
  }

  private async getReactionIdByAccount (accountId: AnyAccountId, structId: AnyPostId | AnyCommentId, structType: 'post' | 'comment'): Promise<ReactionId> {
    const queryParams = new Tuple(registry, [ GenericAccountId, 'u64' ], [ asAccountId(accountId), structId ]);
    return this.socialQuery(`${structType}ReactionIdByAccount`, queryParams)
  }

  // ---------------------------------------------------------------------
  // Multiple

  async findStructs<T extends SupportedSubstrateResult>
    (storage: string, ids: SupportedSubstrateId[]): Promise<T[]> {

    try {
      ids = getUniqueIds(ids)

      if (isEmptyArray(ids)) {
        logger.debug(`Nothing to load from ${storage}: no ids provided`)
        return []
      }

      const structs = (await this.socialQueryMulti(storage, ids))
        .filter(x => x.isSome)
        .map(x => x.unwrap())

      logger.debug(`Loaded ${pluralize(structs.length, 'struct')} from ${storage}`)
      return structs
    } catch (err) {
      logger.error(`Failed to load struct(s) from ${storage} by ${ids.length} id(s):`, err)
      return []
    }
  }

  async findBlogs (ids: AnyBlogId[]): Promise<Blog[]> {
    return this.findStructs('blogById', ids);
  }

  async findPosts (ids: AnyPostId[]): Promise<Post[]> {
    return this.findStructs('postById', ids);
  }

  async findComments (ids: AnyCommentId[]): Promise<Comment[]> {
    return this.findStructs('commentById', ids);
  }

  async findSocialAccounts (ids: AnyAccountId[]): Promise<SocialAccount[]> {
    const accountIds = ids.map(id => asAccountId(id)).filter(x => typeof x !== 'undefined') as AccountId[]
    return this.findStructs('socialAccountById', accountIds);
  }

  async findReactions (ids: AnyReactionId[]): Promise<Reaction[]> {
    return this.findStructs('reactionById', ids);
  }

  // ---------------------------------------------------------------------
  // Single

  async findBlog (id: AnyBlogId): Promise<Blog | undefined> {
    return getFirstOrUndefined(await this.findBlogs([ id ]))
  }

  async findPost (id: AnyPostId): Promise<Post | undefined> {
    return getFirstOrUndefined(await this.findPosts([ id ]))
  }

  async findComment (id: AnyCommentId): Promise<Comment | undefined> {
    return getFirstOrUndefined(await this.findComments([ id ]))
  }

  async findSocialAccount (id: AnyAccountId): Promise<SocialAccount | undefined> {
    return getFirstOrUndefined(await this.findSocialAccounts([ id ]))
  }

  async findReaction (id: AnyReactionId): Promise<Reaction | undefined> {
    return getFirstOrUndefined(await this.findReactions([ id ]))
  }

  // ---------------------------------------------------------------------
  // Get id

  async nextBlogId (): Promise<BlogId> {
    return this.socialQuery('nextBlogId')
  }

  async nextPostId (): Promise<PostId> {
    return this.socialQuery('nextPostId')
  }

  async getBlogIdByHandle (handle: string): Promise<BlogId | undefined> {
    if (isEmptyStr(handle)) {
      return undefined
    }
    const idOpt = await this.socialQuery('blogIdByHandle', handle) as Option<BlogId>
    return idOpt.unwrapOr(undefined)
  }

  async blogIdsByOwner (id: AnyAccountId): Promise<BlogId[]> {
    return this.socialQuery('blogIdsByOwner', asAccountId(id))
  }

  async blogIdsFollowedByAccount (id: AnyAccountId): Promise<BlogId[]> {
    return this.socialQuery('blogsFollowedByAccount', asAccountId(id))
  }

  async postIdsByBlogId (id: AnyBlogId): Promise<PostId[]> {
    return this.socialQuery('postIdsByBlogId', id)
  }

  // ---------------------------------------------------------------------
  // Is boolean

  async isAccountFollower (myAddress: AnyAccountId, followedAddress: AnyAccountId): Promise<boolean> {
    const followedAccountId = asAccountId(followedAddress)
    const myAccountId = asAccountId(myAddress)
    const queryParams = new Tuple(registry, [ GenericAccountId, GenericAccountId ], [ myAccountId, followedAccountId ]);
    const isFollow = await this.socialQuery('accountFollowedByAccount', queryParams) as bool
    return isFollow.valueOf()
  }

  async isBlogFollower (myAddress: AnyAccountId, blogId: AnyBlogId): Promise<boolean> {
    return this.isBooleanByAccount('blogFollowedByAccount', myAddress, blogId)
  }

  async isPostSharedByAccount (accountId: AnyAccountId, postId: AnyPostId): Promise<boolean> {
    return this.isBooleanByAccount('postSharedByAccount', accountId, postId)
  }

  async isCommentSharedByAccount (accountId: AnyAccountId, commentId: AnyCommentId): Promise<boolean> {
    return this.isBooleanByAccount('commentSharedByAccount', accountId, commentId)
  }

  async getPostReactionIdByAccount (accountId: AnyAccountId, postId: AnyPostId): Promise<ReactionId> {
    return this.getReactionIdByAccount(accountId, postId, 'post')
  }

  async getCommentReactionIdByAccount (accountId: AnyAccountId, commentId: AnyCommentId): Promise<ReactionId> {
    return this.getReactionIdByAccount(accountId, commentId, 'comment')
  }
}

const logger = newLogger(SubsocialSubstrateApi.name);
