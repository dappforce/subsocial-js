import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { SpaceData, CommonData, PostData, ProfileData } from '@subsocial/types';
import { SocialAccountWithId } from '@subsocial/types/dto';
import { SpaceContent, CommonContent, IpfsCid, PostContent, ProfileContent } from '@subsocial/types/offchain';
import { AnyAccountId, AnySpaceId, AnyPostId, CommonStruct } from '@subsocial/types/substrate';
import { Space, Post } from '@subsocial/types/substrate/interfaces';
import { getFirstOrUndefined } from '@subsocial/utils';
import { getCidsOfStructs, getIpfsCidOfStruct, SubsocialIpfsApi } from '../ipfs';
import { SubsocialSubstrateApi } from '../substrate';
import { getUniqueIds, SupportedSubstrateId } from '../utils/common';
import { FindPostQuery, FindSpacesQuery, FindPostsQuery, FindSpaceQuery } from '../filters';
import { contentFilter } from '../filters/content-filter';
import { SubsocialContext, ContentResult } from '../types';

export type SubsocialApiProps = SubsocialContext & {
  substrateApi: SubstrateApi,
  ipfsNodeUrl: string,
  offchainUrl: string
}

export class BasicSubsocialApi {

  private _substrate: SubsocialSubstrateApi

  private _ipfs: SubsocialIpfsApi

  constructor (props: SubsocialApiProps) {
    const { substrateApi, ipfsNodeUrl, offchainUrl, ...context } = props
    this._substrate = new SubsocialSubstrateApi({ api: substrateApi, ...context })
    this._ipfs = new SubsocialIpfsApi({ ipfsNodeUrl, offchainUrl, ...context })
  }

  public get substrate (): SubsocialSubstrateApi {
    return this._substrate
  }

  public get ipfs (): SubsocialIpfsApi {
    return this._ipfs
  }

  private async findDataArray<
    Id extends SupportedSubstrateId,
    Struct extends CommonStruct,
    Content extends CommonContent
  > (
    ids: Id[],
    findStructs: (ids: Id[]) => Promise<Struct[]>,
    findContents: (cids: IpfsCid[]) => Promise<ContentResult<Content>>
  ): Promise<CommonData<Struct, Content>[]> {

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

  async findSpaces (filter: FindSpacesQuery): Promise<SpaceData[]> {
    const findStructs = this.substrate.findSpaces.bind(this.substrate, filter);
    const findContents = this.ipfs.findSpaces.bind(this.ipfs);
    const spaces = await this.findDataArray<AnySpaceId, Space, SpaceContent>(
      filter.ids, findStructs, findContents
    )
    return contentFilter({
      structs: spaces,
      withContentOnly: filter.withContentOnly
    })
  }

  async findPosts (filter: FindPostsQuery): Promise<PostData[]> {
    const findStructs = this.substrate.findPosts.bind(this.substrate, filter)
    const findContents = this.ipfs.findPosts.bind(this.ipfs)
    const posts = await this.findDataArray<AnyPostId, Post, PostContent>(
      filter.ids, findStructs, findContents
    )

    return contentFilter({
      structs: posts,
      withContentOnly: filter.withContentOnly
    })
  }

  async findProfiles (ids: AnyAccountId[]): Promise<ProfileData[]> {
    const findStructs = this.substrate.findSocialAccounts.bind(this.substrate)
    const findContents = this.ipfs.findProfiles.bind(this.ipfs)

    const profiles = await this.findDataArray<AnyAccountId, SocialAccountWithId, ProfileContent>(
      ids, findStructs, findContents
    ) as ProfileData[]

    return profiles.map(x => {
      const profile = x.struct.profile.unwrapOr(undefined)
      return { ...x, profile }
    })
  }

  // ---------------------------------------------------------------------
  // Single

  async findSpace ({ id, visibility }: FindSpaceQuery): Promise<SpaceData | undefined> {
    return getFirstOrUndefined(await this.findSpaces({ ids: [ id ], visibility }))
  }

  async findPost ({ id, visibility }: FindPostQuery): Promise<PostData | undefined> {
    return getFirstOrUndefined(await this.findPosts({ ids: [ id ], visibility }))
  }

  async findProfile (id: AnyAccountId): Promise<ProfileData | undefined> {
    return getFirstOrUndefined(await this.findProfiles([ id ]))
  }
}
