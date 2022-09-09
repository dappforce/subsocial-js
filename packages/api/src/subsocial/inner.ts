import { IpfsSpaceContent, IpfsCommonContent, IpfsCid, IpfsPostContent } from '../types/ipfs';
import { AnySpaceId, AnyPostId, CommonStruct,SubsocialApiProps, RawCommonData, RawPostData, RawSpaceData } from '../types';
import { Space, Post } from '@subsocial/definitions/interfaces';
import { getFirstOrUndefined } from '@subsocial/utils';
import { getCidsOfStructs, getIpfsCidOfStruct, SubsocialIpfsApi } from '../ipfs';
import { SubsocialSubstrateApi } from '../substrate';
import { getUniqueIds, SupportedSubstrateId } from '../utils/common';
import { FindPostQuery, FindSpacesQuery, FindPostsQuery, FindSpaceQuery } from '../filters';
import { contentFilter } from '../filters/content-filter';
import { ContentResult } from '../types';

/** Using this class, you can get all the data of posts, spaces and profiles from blockchain storages and ipfs */
export class InnerSubsocialApi {

  /** Gives access to subsocial substrate api*/
  private _substrate: SubsocialSubstrateApi

  /** Gives access to subsocial ipfs api*/
  private _ipfs: SubsocialIpfsApi

  constructor (props: SubsocialApiProps) {
    const { substrateApi, ipfsNodeUrl, offchainUrl, ...context } = props
    this._substrate = new SubsocialSubstrateApi({ api: substrateApi, ...context })
    this._ipfs = new SubsocialIpfsApi({ ipfsNodeUrl, offchainUrl, ...context })
  }
  /** Accessors for privat field {@link _substrate}*/
  public get substrate (): SubsocialSubstrateApi {
    return this._substrate
  }
  /** Accessors for privat field {@link _ipfs}*/
  public get ipfs (): SubsocialIpfsApi {
    return this._ipfs
  }

  /** Get an array of data from blockchain storages and ipfs that is passed in the parameters of the method
   * @param findStructs gets an array of structures by ids
   * @param findContents gets contents by cids
  */
  private async findDataArray<
    Id extends SupportedSubstrateId,
    Struct extends CommonStruct,
    Content extends IpfsCommonContent
  > (
    ids: Id[],
    findStructs: (ids: Id[]) => Promise<Struct[]>,
    findContents: (cids: IpfsCid[]) => Promise<ContentResult<Content>>
  ): Promise<RawCommonData<Struct, Content>[]> {

    const structs = await findStructs(ids)
    const cids = getUniqueIds(getCidsOfStructs(structs))
    const contents = await findContents(cids)

    return structs.map(struct => {
      const hash = getIpfsCidOfStruct(struct)
      const content = hash ? contents[hash] : undefined
      return { struct, content }
    })
  }

  // ---------------------------------------------------------------------
  // Multiple
  /** Find and load an array of spaces */
  async findSpaces (filter: FindSpacesQuery): Promise<RawSpaceData[]> {
    const findStructs = this.substrate.findSpaces.bind(this.substrate, filter);
    const findContents = this.ipfs.getContentArray.bind(this.ipfs);
    const spaces = await this.findDataArray<AnySpaceId, Space, IpfsSpaceContent>(
      filter.ids, findStructs, findContents
    )
    return contentFilter({
      structs: spaces,
      withContentOnly: filter.withContentOnly
    })
  }
  /** Find and load an array of posts */
  async findPosts (filter: FindPostsQuery): Promise<RawPostData[]> {
    const findStructs = this.substrate.findPosts.bind(this.substrate, filter)
    const findContents = this.ipfs.getContentArray.bind(this.ipfs)
    const posts = await this.findDataArray<AnyPostId, Post, IpfsPostContent>(
      filter.ids, findStructs, findContents
    )

    return contentFilter({
      structs: posts,
      withContentOnly: filter.withContentOnly
    })
  }

  // ---------------------------------------------------------------------
  // Single
  /** Find and load single space */
  async findSpace ({ id, visibility }: FindSpaceQuery): Promise<RawSpaceData | undefined> {
    return getFirstOrUndefined(await this.findSpaces({ ids: [ id ], visibility }))
  }
  /** Find and load single post */
  async findPost ({ id, visibility }: FindPostQuery): Promise<RawPostData | undefined> {
    return getFirstOrUndefined(await this.findPosts({ ids: [ id ], visibility }))
  }
}
