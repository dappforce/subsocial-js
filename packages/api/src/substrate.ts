import { Blog, Post, Comment, CommonStruct, SubstrateId, BlogId, PostId, SocialAccount, ReactionId, Reaction, AnyAccountId, AnyCommentId, AnyReactionId, AnyBlogId, AnyPostId } from '@subsocial/types/substrate/interfaces';
import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { Option, Tuple, GenericAccountId, bool } from '@polkadot/types';
import { newLogger, getFirstOrUndefinded, nonEmptyStr } from '@subsocial/utils';
import { AccountId } from '@polkadot/types/interfaces';
import registry from '@subsocial/types/substrate/registry';

export class SubsocialSubstrateApi {

  private _api: SubstrateApi // Polkadot Api (connected)

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

  private asAccountId (id: (AnyAccountId)): AccountId | undefined {
    if (id instanceof GenericAccountId) {
      return id
    } else if (nonEmptyStr(id) && id.length === 48) {
      return new GenericAccountId(registry, id)
    } else {
      return undefined
    }
  }

  private async socialQuery (query: string, value?: any): Promise<any> {
    const socialQuery = await this.getSocialQuery()
    return socialQuery[query](value)
  }

  private async socialQueryMulti (query: string, value: any[]): Promise<any[]> {
    const socialQuery = await this.getSocialQuery()
    return socialQuery[query].multi(value)
  }

  private async structByAccount (query: string, accountId: AnyAccountId, id: SubstrateId): Promise<boolean> {
    const queryParams = new Tuple(registry, [ GenericAccountId, 'u64' ], [ this.asAccountId(accountId), id ]);
    const isFollow = await this.socialQuery(query, queryParams) as bool
    return isFollow.valueOf()
  }

  private async getStructReactionIdByAccount (accountId: AnyAccountId, id: PostId | AnyCommentId, structType: 'post' | 'comment'): Promise<ReactionId> {
    const queryParams = new Tuple(registry, [ GenericAccountId, 'u64' ], [ this.asAccountId(accountId), id ]);
    return this.socialQuery(`${structType}ReactionIdByAccount`, queryParams)
  }

  // ---------------------------------------------------------------------
  // Multiple

  async findStructs<T extends CommonStruct | SocialAccount | Reaction> (methodName: string, ids: SubstrateId[] | AccountId[] | ReactionId[]): Promise<T[]> {
    try {
      const optionStruct = await this.socialQueryMulti(methodName, ids);
      const optionFillStruct = optionStruct.filter((x) => x.isSome);
      return optionFillStruct.map((x) => x.unwrap());
    } catch (error) {
      logger.error('Failed to load structs from Substrate by ids. Error:', error);
      return [];
    }
  }

  async findBlogs (ids: SubstrateId[]): Promise<Blog[]> {
    const count = ids.length

    if (!count) {
      logger.debug('Load blogs: no ids provided')
      return [];
    }
    logger.debug(`Load ${count === 1 ? 'blog by id: ' + ids[0] : count + ' blogs'} from Substrate`)
    return this.findStructs('blogById', ids);
  }

  async findPosts (ids: SubstrateId[]): Promise<Post[]> {
    const count = ids.length

    if (!count) {
      logger.debug('Load posts: no ids provided')
      return [];
    }
    logger.debug(`Load ${count === 1 ? 'post by id: ' + ids[0] : count + ' posts'} from Substrate`)
    return this.findStructs('postById', ids);
  }

  async findComments (ids: SubstrateId[]): Promise<Comment[]> {
    const count = ids.length

    if (!count) {
      logger.debug('Load comments: no ids provided')
      return [];
    }
    logger.debug(`Load ${count === 1 ? 'comment by id: ' + ids[0] : count + ' comments'} from Substrate`)
    return this.findStructs('commentById', ids);
  }

  async findSocialAccounts (ids: (AnyAccountId)[]): Promise<SocialAccount[]> {
    const count = ids.length

    if (!count) {
      logger.warn('Load social accounts: no account ids provided')
      return [];
    }

    const accountIds = ids.map(id => this.asAccountId(id)).filter(x => typeof x !== 'undefined') as AccountId[]
    logger.debug(`Load ${count === 1 ? 'account by id: ' + ids[0] : count + ' accounts'} from Substrate`)
    return this.findStructs('socialAccountById', accountIds);
  }

  async findReactions (ids: AnyReactionId[]): Promise<Reaction[]> {
    const count = ids.length

    if (!count) {
      logger.warn('Load reactions: no reaction ids provided')
      return [];
    }

    logger.debug(`Load ${count === 1 ? 'reaction by id: ' + ids[0] : count + ' reactions'} from Substrate`)
    return this.findStructs('reactionById', ids);
  }

  // ---------------------------------------------------------------------
  // Single

  async findBlog (id: SubstrateId): Promise<Blog | undefined> {
    return getFirstOrUndefinded(await this.findBlogs([ id ]))
  }

  async findPost (id: SubstrateId): Promise<Post | undefined> {
    return getFirstOrUndefinded(await this.findPosts([ id ]))
  }

  async findComment (id: SubstrateId): Promise<Comment | undefined> {
    return getFirstOrUndefinded(await this.findComments([ id ]))
  }

  async findSocialAccount (id: AnyAccountId): Promise<SocialAccount | undefined> {
    return getFirstOrUndefinded(await this.findSocialAccounts([ id ]))
  }

  async findReaction (id: AnyReactionId): Promise<Reaction | undefined> {
    return getFirstOrUndefinded(await this.findReactions([ id ]))
  }

  // ---------------------------------------------------------------------
  // Get id

  async nextBlogId (): Promise<BlogId> {
    return this.socialQuery('nextBlogId')
  }

  async nextPostId (): Promise<PostId> {
    return this.socialQuery('nextPostId')
  }

  async getIdByHandle (handle: string): Promise<BlogId | undefined> {
    const idOpt = await this.socialQuery('blogIdByHandle', handle) as Option<BlogId>
    return idOpt.unwrapOr(undefined)
  }

  async blogIdsByOwner (id: AnyAccountId): Promise<BlogId[]> {
    return this.socialQuery('blogIdsByOwner', this.asAccountId(id))
  }

  async blogsFollowedByAccount (id: AnyAccountId): Promise<BlogId[]> {
    return this.socialQuery('blogsFollowedByAccount', this.asAccountId(id))
  }

  async postIdsByBlogId (id: AnyBlogId): Promise<PostId[]> {
    return this.socialQuery('postIdsByBlogId', id)
  }

  // ---------------------------------------------------------------------
  // isFollow

  async isAccountFollower (myAddress: AnyAccountId, followedAddress: AnyAccountId): Promise<boolean> {
    const followedAccountId = this.asAccountId(followedAddress)
    const myAccountId = this.asAccountId(myAddress)
    const queryParams = new Tuple(registry, [ GenericAccountId, GenericAccountId ], [ myAccountId, followedAccountId ]);
    const isFollow = await this.socialQuery('accountFollowedByAccount', queryParams) as bool
    return isFollow.valueOf()
  }

  async isBlogFollower (myAddress: AnyAccountId, blogId: AnyBlogId): Promise<boolean> {
    return this.structByAccount('blogFollowedByAccount', myAddress, blogId)
  }

  async isPostSharedByAccount (accountId: AnyAccountId, postId: AnyPostId): Promise<boolean> {
    return this.structByAccount('postSharedByAccount', accountId, postId)
  }

  async isCommentSharedByAccount (accountId: AnyAccountId, commentId: AnyCommentId): Promise<boolean> {
    return this.structByAccount('commentSharedByAccount', accountId, commentId)
  }

  async getPostReactionIdByAccount (accountId: AnyAccountId, postId: AnyPostId): Promise<ReactionId> {
    return this.getStructReactionIdByAccount(accountId, postId, 'post')
  }

  async getCommentReactionIdByAccount (accountId: AnyAccountId, commentId: AnyCommentId): Promise<ReactionId> {
    return this.getStructReactionIdByAccount(accountId, commentId, 'comment')
  }

}

const logger = newLogger(SubsocialSubstrateApi.name);
