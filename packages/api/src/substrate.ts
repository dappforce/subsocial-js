import { Blog, Post, Comment, CommonStruct, SubstrateId } from '@subsocial/types/substrate/interfaces';
import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { Option } from '@polkadot/types';
import { newLogger, getFirstOrUndefinded } from '@subsocial/utils';

const logger = newLogger(SubsocialSubstrateApi.name);

export class SubsocialSubstrateApi {

  private _api: SubstrateApi // Polkadot Api (connected)

  constructor (api: SubstrateApi) {
    this._api = api
    logger.info('Initialized')
  }

  socialQuery = () => this.api.query.social;

  public get api () {
    return this._api;
  }

  // ---------------------------------------------------------------------
  // Multiple

  async findStructs<T extends CommonStruct> (methodName: string, ids: SubstrateId[]): Promise<T[]> {
    try {
      const optionStruct = await this.socialQuery()[methodName].multi(ids) as unknown as Option<any>[];
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

  async findStructsAndSubscribe<T extends CommonStruct> (methodName: string, args: SubstrateId[]): Promise<T[]> {
    const optionStruct = await this.socialQuery()[methodName].multi(args) as unknown as Option<any>[];
    return optionStruct.filter((x) => x.isSome).map((x) => x.unwrapOr(undefined)) as T[];
  } // TODO create functions

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
}
