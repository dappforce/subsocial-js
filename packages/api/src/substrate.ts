import { Blog, Post, Comment, CommonStruct, SubstrateId, BlogId, PostId, SocialAccount, ReactionId, Reaction, CommentId } from '@subsocial/types/substrate/interfaces';
import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { Option, Tuple, GenericAccountId, bool } from '@polkadot/types';
import { newLogger, getFirstOrUndefinded } from '@subsocial/utils';
import { AccountId } from '@polkadot/types/interfaces';
import registry from '@subsocial/types/substrate/registry';
import BN from 'bn.js'

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

  private asAccountId (id: (AccountId | string)): AccountId {
    return typeof id === 'string' ? new GenericAccountId(registry, id) : id
  }

  private async socialQuery (query: string, value?: any): Promise<any> {
    const socialQuery = await this.getSocialQuery()
    return socialQuery[query].multi(value)
  }

  private async structByAccount (query: string, accountId: AccountId | string, id: SubstrateId): Promise<boolean> {
    const queryParams = new Tuple(registry, [ GenericAccountId, 'u64' ], [ this.asAccountId(accountId), id ]);
    const isFollow = await this.socialQuery(query, queryParams) as bool
    return isFollow.valueOf()
  }

  private async getStructReactionIdByAccount (accountId: AccountId | string, id: PostId | CommentId | BN, struct: 'post' | 'comment'): Promise<ReactionId> {
    const queryParams = new Tuple(registry, [ GenericAccountId, 'u64' ], [ this.asAccountId(accountId), id ]);
    return this.socialQuery(`${structType}ReactionIdByAccount`, queryParams)
  }

  // ---------------------------------------------------------------------
  // Multiple

  async findStructs<T extends CommonStruct | SocialAccount | Reaction> (methodName: string, ids: SubstrateId[] | AccountId[] | ReactionId[]): Promise<T[]> {
    try {
      const socialQuery = await this.getSocialQuery()
      const optionStruct = await socialQuery[methodName].multi(ids) as unknown as Option<any>[];
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

  async findSocialAccounts (ids: (AccountId | string)[]): Promise<SocialAccount[]> {
    const count = ids.length

    if (!count) {
      logger.warn('Load social accounts: no account ids provided')
      return [];
    }

    const accountIds = ids.map(id => this.asAccountId(id))
    logger.debug(`Load ${count === 1 ? 'account by id: ' + ids[0] : count + ' accounts'} from Substrate`)
    return this.findStructs('socialAccountById', accountIds);
  }

  async findReactions (ids: (ReactionId | BN)[]): Promise<Reaction[]> {
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

  async findSocialAccount (id: AccountId | string): Promise<SocialAccount | undefined> {
    return getFirstOrUndefinded(await this.findSocialAccounts([ id ]))
  }

  async findReaction (id: ReactionId | BN): Promise<Reaction | undefined> {
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

  async blogIdsByOwner (id: AccountId | string): Promise<BlogId[]> {
    return this.socialQuery('blogIdsByOwner', this.asAccountId(id))
  }

  async blogsFollowedByAccount (id: AccountId | string): Promise<BlogId[]> {
    return this.socialQuery('blogsFollowedByAccount', this.asAccountId(id))
  }

  async postIdsByBlogId (id: BlogId | BN): Promise<PostId[]> {
    return this.socialQuery('postIdsByBlogId', id)
  }

  // ---------------------------------------------------------------------
  // isFollow

  async isAccountFollower (myAddress: AccountId | string, followedAddress: AccountId | string): Promise<boolean> {
    const followedAccountId = this.asAccountId(followedAddress)
    const myAccountId = this.asAccountId(myAddress)
    const queryParams = new Tuple(registry, [ GenericAccountId, GenericAccountId ], [ myAccountId, followedAccountId ]);
    const isFollow = await this.socialQuery('accountFollowedByAccount', queryParams) as bool
    return isFollow.valueOf()
  }

  async isBlogFollower (myAddress: AccountId | string, blogId: BlogId | BN): Promise<boolean> {
    return this.structByAccount('blogFollowedByAccount', myAddress, blogId)
  }

  async isPostSharedByAccount (accountId: AccountId | string, postId: PostId | BN): Promise<boolean> {
    return this.structByAccount('postSharedByAccount', accountId, postId)
  }

  async isCommentSharedByAccount (accountId: AccountId | string, commentId: CommentId | BN): Promise<boolean> {
    return this.structByAccount('commentSharedByAccount', accountId, commentId)
  }

  async getPostReactionIdByAccount (accountId: AccountId | string, postId: PostId | BN): Promise<ReactionId> {
    return this.getStructReactionIdByAccount(accountId, postId, 'post')
  }

  async getCommentReactionIdByAccount (accountId: AccountId | string, commentId: CommentId | BN): Promise<ReactionId> {
    return this.getStructReactionIdByAccount(accountId, commentId, 'comment')
  }

}

const logger = newLogger(SubsocialSubstrateApi.name);
