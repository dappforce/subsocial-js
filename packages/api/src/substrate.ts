import { Blog, Post, Comment, CommonStruct, SubstrateId, BlogId, PostId, SocialAccount } from '@subsocial/types/substrate/interfaces';
import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { Option, Tuple, GenericAccountId, bool } from '@polkadot/types';
import { newLogger, getFirstOrUndefinded } from '@subsocial/utils';
import { AccountId } from '@polkadot/types/interfaces';
import registry from '@subsocial/types/substrate/registry';

export class SubsocialSubstrateApi {

  private _api: SubstrateApi // Polkadot Api (connected)

  constructor (api: SubstrateApi) {
    this._api = api
    logger.info('Initialized')
  }

  getSocialQuery = async () => {
    const api = await this.api.isReady
    return api.query.social
  };

  public get api () {
    return this._api;
  }

  // ---------------------------------------------------------------------
  // Multiple

  async findStructs<T extends CommonStruct | SocialAccount> (methodName: string, ids: (SubstrateId | AccountId)[]): Promise<T[]> {
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
      logger.debug('Find blogs: no ids provided')
      return [];
    }
    logger.debug(`Find ${count === 1 ? 'blog by id: ' + ids[0] : count + ' blogs'} from Substrate`)
    return this.findStructs('blogById', ids);
  }

  async findPosts (ids: SubstrateId[]): Promise<Post[]> {
    const count = ids.length

    if (!count) {
      logger.debug('Find posts: no ids provided')
      return [];
    }
    logger.debug(`Find ${count === 1 ? 'post by id: ' + ids[0] : count + ' posts'} from Substrate`)
    return this.findStructs('postById', ids);
  }

  async findComments (ids: SubstrateId[]): Promise<Comment[]> {
    const count = ids.length

    if (!count) {
      logger.debug('Find comments: no ids provided')
      return [];
    }
    logger.debug(`Find ${count === 1 ? 'comment by id: ' + ids[0] : count + ' comments'} from Substrate`)
    return this.findStructs('commentById', ids);
  }

  async findSocialAccounts (ids: (AccountId | string)[]): Promise<SocialAccount[]> {
    const count = ids.length

    if (!count) {
      logger.warn('Find social accounts: no account ids provided')
      return [];
    }

    const accountIds = ids.map(id => this.asAccountId(id))
    logger.debug(`Load ${count === 1 ? 'account by id: ' + ids[0] : count + ' accounts'} from Substrate`)
    return this.findStructs('socialAccountById', accountIds);
  }

  private async socialQuery (query: string, value?: any): Promise<any> {
    const socialQuery = await this.getSocialQuery()
    return socialQuery[query].multi(value)
  }

  async nextBlogId (): Promise<BlogId> {
    return this.socialQuery('nextBlogId')
  }

  async nextPostId (): Promise<PostId> {
    return this.socialQuery('nextPostId')
  }

  async blogIdsByOwner (id: AccountId): Promise<BlogId[]> {
    return this.socialQuery('blogIdsByOwner', id)
  }

  async blogsFollowedByAccount (id: AccountId): Promise<BlogId[]> {
    return this.socialQuery('blogsFollowedByAccount', id)
  }

  async postIdsByBlogId (id: BlogId): Promise<PostId[]> {
    return this.socialQuery('postIdsByBlogId', id)
  }

  private asAccountId (id: (AccountId | string)): AccountId {
    return typeof id === 'string' ? new GenericAccountId(registry, id) : id
  }

  async isAccountFollower (followedAddress: AccountId | string, myAddress: AccountId | string): Promise<boolean> {
    const followedAccountId = this.asAccountId(followedAddress)
    const myAccountId = this.asAccountId(myAddress)
    const queryParams = new Tuple(registry, [ GenericAccountId, GenericAccountId ], [ followedAccountId, myAccountId ]);
    const isFollow = await this.socialQuery('accountFollowedByAccount', queryParams) as bool
    return isFollow.valueOf()
  }

  // async findStructsAndSubscribe<T extends CommonStruct> (methodName: string, args: SubstrateId[]): Promise<T[]> {
  //   const optionStruct = await this.socialQuery()[methodName].multi(args) as unknown as Option<any>[];
  //   return optionStruct.filter((x) => x.isSome).map((x) => x.unwrapOr(undefined)) as T[];
  // } // TODO create functions

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
}

const logger = newLogger(SubsocialSubstrateApi.name);
