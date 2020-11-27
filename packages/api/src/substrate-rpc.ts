
import { Option } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';
import { AnyAccountId, AnySpaceId, AnyPostId, AnyReactionId, PalletName } from '@subsocial/types';
import { Space, SpaceId, Post, PostId, Reaction, SocialAccount } from '@subsocial/types/substrate/interfaces';
import { getFirstOrUndefined, isEmptyArray, isEmptyStr, newLogger, pluralize } from '@subsocial/utils';
import { asAccountId, getUniqueIds, SupportedSubstrateId, SupportedSubstrateResult } from './utils';
import { SubsocialContext } from './utils/types';
import axios from 'axios'

type SubstrateApiProps = SubsocialContext & {
  rpcUrl: string
}

type FilterType = 'Public' | 'Unlisted'

type IdsWithFilter<T> = {
  ids: T[]
  filterType?: FilterType
}

type IdWithFilter<T> = {
  id: T
  filterType?: FilterType
}

type GetPostsByIdsQuery = IdsWithFilter<PostId>
type GetSpacesByIdsQuery = IdsWithFilter<SpaceId>

type GetPostByIdQuery = IdWithFilter<PostId>
type GetSpaceByIdQuery = IdWithFilter<SpaceId>

type GetQuery = {
  offset: number
  limit: number
}

type GetQueryWithFilter = GetQuery & {
  filterType?: FilterType
}

type RpcParams = any[]

type StorageItem = {
  moduleName: PalletName,
  method: string
}

type RpcResult = {
  result: any
}

const createRpcJson = ({ moduleName, method }: StorageItem, params: RpcParams) => ({
  jsonrpc: "2.0",
  id: 1,
  method: `${moduleName}_${method}`,
  params
})

export class SubsocialSubstrateApi {

  private rpcUrl: string // Polkadot API (connected)
  // private context?: SubsocialContextProps TODO use when need

  constructor ({ rpcUrl }: SubstrateApiProps) {
    this.rpcUrl = rpcUrl
    // this.context = context
    logger.info('Initialized')
  }
  
  // ---------------------------------------------------------------------
  // Private utils

  private async rpcQuery <Params, Result = any>(method: StorageItem, value?: Params): Promise<Result | undefined> {
    try {
      const params = Array.isArray(value) ? value : [ value ]
      const { data, status, statusText } = await axios.post<RpcResult>(
        this.rpcUrl,
        createRpcJson(method, [ null, ...params ]),
        { headers: { 'Content-Type': 'application/json' }}
      )

      if (status !== 200) {
        throw statusText
      }

      return data.result
    } catch (err) {
      logger.error('Failed rpc method:', err)
      return undefined
    }
  }

  private async rpcArrayQuery <Params, Result = any>(storage: StorageItem, value?: Params): Promise<Result[]> {
    const res = await this.rpcQuery<Params, Result[]>(storage, value)
    return res || []
  } 

  private async queryPosts (method: string, value?: any): Promise<any> {
    return this.rpcQuery({ moduleName: 'posts', method }, value)
  }

  private async querySpaces (method: string, value?: any): Promise<any> {
    return this.rpcQuery({ moduleName: 'spaces', method }, value)
  }

  private async getStructQuery (storage: StorageItem, { offset, limit }: GetQuery) {
    return this.rpcQuery(storage, [ offset, limit ])
  }

  // ---------------------------------------------------------------------
  // Multiple

  async getStructsByIds<T extends SupportedSubstrateResult>
  (methodItem: StorageItem, ids: SupportedSubstrateId[]): Promise<T[]> {
    const method = methodItem.method

    try {
      ids = getUniqueIds(ids)

      if (isEmptyArray(ids)) {
        logger.debug(`Nothing to load from ${method}: no ids provided`)
        return []
      }

      const structs = await this.rpcArrayQuery<SupportedSubstrateId[], any>(methodItem, ids)

      logger.debug(`Loaded ${pluralize(structs.length, 'struct')} from ${method}`)
      return structs
    } catch (err) {
      logger.error(`Failed to load struct(s) from ${method} by ${ids.length} id(s):`, err)
      return []
    }
  }

  async getSpacesByIds({ ids, filterType }: GetSpacesByIdsQuery): Promise<Space[]> {
    return this.getStructsByIds(
      { moduleName: 'spaces', method: `get${filterType}SpacesByIds` },
      ids
    );
  }

  async getPublicSpacesByIds(ids: SpaceId[]): Promise<Space[]> {
    return this.getSpacesByIds({ ids, filterType: 'Public' })
  }

  async getUnlistedSpacesByIds(ids: SpaceId[]): Promise<Space[]> {
    return this.getSpacesByIds({ ids, filterType: 'Unlisted' })
  }

  async getPostsByIds ({ ids, filterType }: GetPostsByIdsQuery): Promise<Post[]> {
    return this.getStructsByIds(
      { moduleName: 'posts', method: `get${filterType}PostsByIds` },
      ids
    );
  }

  async getPublicPostsByIds (ids: PostId[]) {
    return this.getPostsByIds({ ids, filterType: 'Public' })
  }

  async getUnlistedPostsByIds (ids: PostId[]) {
    return this.getPostsByIds({ ids, filterType: 'Unlisted' })
  }

  async getSpaces ({ filterType, ...params }: GetQueryWithFilter): Promise<Space[]> {
    return this.getStructQuery(
      { moduleName: 'spaces', method: `get${filterType}Spaces` },
      params
    );
  }

  async getPublicSpaces (params: GetQuery): Promise<Space[]> {
    return this.getSpaces({ ...params, filterType: 'Public' })
  }

  async getUnlistedSpaces (params: GetQuery): Promise<Space[]> {
    return this.getSpaces({ ...params, filterType: 'Unlisted' })
  }

  async getPosts ({ filterType, ...params }: GetQueryWithFilter): Promise<Post[]> {
    return this.getStructQuery(
      { moduleName: 'posts', method: `get${filterType}PostsByIds` },
      params);
  }

  async getPublicPosts (ids: PostId[]) {
    return this.getPostsByIds({ ids, filterType: 'Public' })
  }

  async getUnlistedPosts (ids: PostId[]) {
    return this.getPostsByIds({ ids, filterType: 'Unlisted' })
  }

  async getSocialAccountsByIds (ids: AnyAccountId[]): Promise<SocialAccount[]> {
    const accountIds = ids.map(id => asAccountId(id))
      .filter(x => typeof x !== 'undefined') as AccountId[]
    return this.getStructsByIds(
      { moduleName: 'profiles', method: 'getSocialAccountsByIds' },
      accountIds
    );
  }

  async getReactionsByIds (ids: AnyReactionId[]): Promise<Reaction[]> {
    return this.getStructsByIds(
      { moduleName: 'reactions', method: 'getReactionsByIds' },
    ids);
  }

  // ---------------------------------------------------------------------
  // Single

  async getSpaceById ({ id, filterType }: GetSpaceByIdQuery): Promise<Space | undefined> {
    return getFirstOrUndefined(await this.getSpacesByIds({ ids: [ id ], filterType }))
  }

  async getPostById ({ id, filterType }: GetPostByIdQuery): Promise<Post | undefined> {
    return getFirstOrUndefined(await this.getPostsByIds({ ids: [ id ], filterType }))
  }

  async getSocialAccountById (id: AnyAccountId): Promise<SocialAccount | undefined> {
    return getFirstOrUndefined(await this.getSocialAccountsByIds([ id ]))
  }

  async getReactionById (id: AnyReactionId): Promise<Reaction | undefined> {
    return getFirstOrUndefined(await this.getReactionsByIds([ id ]))
  }

  private async getByHandle <T>(method: string, handle: string): Promise<T | undefined>  {
    if (isEmptyStr(handle)) {
      return undefined
    }
    const idOpt = await this.querySpaces(method, handle) as Option<any>
    return idOpt.unwrapOr(undefined)
  }

  async getSpaceIdByHandle (handle: string): Promise<SpaceId | undefined> {
    return this.getByHandle<SpaceId>('getSpaceIdByHandle', handle)
  }

  async getSpaceByHandle (handle: string): Promise<Space | undefined> {
    return this.getByHandle<Space>('getSpaceByHandle', handle)
  }

  async getReplyIdsByPostId (id: AnyPostId): Promise<PostId[]> {
    return this.queryPosts('getReplyIdsByPostId', id);
  }

  async getSpaceIdsByOwner (id: AnyAccountId): Promise<SpaceId[]> {
    return this.querySpaces('getSpaceIdsByOwner', asAccountId(id))
  }

  async getSpaceIdsFollowedByAccount (id: AnyAccountId): Promise<SpaceId[]> {
    return this.rpcArrayQuery<AnyAccountId, SpaceId>(
      { moduleName: 'spaceFollows', method: 'getSpaceIdsFollowedByAccount' },
      asAccountId(id)
    )
  }

  async getPostIdsBySpaceId (id: AnySpaceId): Promise<PostId[]> {
    return this.queryPosts('getPostIdsBySpaceId', id)
  }

  async getReactionIdsByPostId (id: AnySpaceId): Promise<PostId[]> {
    return this.queryPosts('getReactionIdsByPostId', id)
  }

  async getReactionIdsByCommentId (id: AnySpaceId): Promise<PostId[]> {
    return this.queryPosts('getReactionIdsByCommentId', id)
  }

}

const logger = newLogger(SubsocialSubstrateApi.name);
