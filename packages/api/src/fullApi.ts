import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { BlogData, CommonData, PostData, ProfileData, PostWithSomeDetails, PostWithAllDetails } from '@subsocial/types';
import { BlogContent, CommonContent, IpfsCid, PostContent, ProfileContent } from '@subsocial/types/offchain';
import { AnyAccountId, AnyBlogId, AnyPostId, CommonStruct } from '@subsocial/types/substrate';
import { Blog, Post, SocialAccount } from '@subsocial/types/substrate/interfaces';
import { getFirstOrUndefined } from '@subsocial/utils';
import { getCidsOfStructs, getIpfsHashOfStruct, SubsocialIpfsApi } from './ipfs';
import { SubsocialSubstrateApi } from './substrate';
import { getUniqueIds, SupportedSubstrateId } from './utils';
import { PostDetailsOpts, loadAndSetPostRelatedStructs, FindStructsFns } from './loadPostsStruct';

export type SubsocialApiProps = {
  substrateApi: SubstrateApi,
  ipfsNodeUrl: string,
  offchainUrl: string
}

export class SubsocialApi {

  private _substrate: SubsocialSubstrateApi

  private _ipfs: SubsocialIpfsApi

  constructor(props: SubsocialApiProps) {
    const { substrateApi, ipfsNodeUrl, offchainUrl } = props
    this._substrate = new SubsocialSubstrateApi(substrateApi)
    this._ipfs = new SubsocialIpfsApi({ ipfsNodeUrl, offchainUrl })
  }

  public get substrate(): SubsocialSubstrateApi {
    return this._substrate
  }

  public get ipfs(): SubsocialIpfsApi {
    return this._ipfs
  }

  private async findDataArray<
    Id extends SupportedSubstrateId,
    Struct extends CommonStruct,
    Content extends CommonContent
  >(
    ids: Id[],
    findStructs: (ids: Id[]) => Promise<Struct[]>,
    findContents: (cids: IpfsCid[]) => Promise<Content[]>
  ): Promise<CommonData<Struct, Content>[]> {

    const structs = await findStructs(ids)
    const cids = getUniqueIds(getCidsOfStructs(structs))
    const contents = await findContents(cids)
    const contentByHashMap = new Map<string, Content>()
    cids.forEach((cid, i) => contentByHashMap.set(cid.toString(), contents[i]))

    return structs.map(struct => {
      const hash = getIpfsHashOfStruct(struct)
      const content = hash ? contentByHashMap.get(hash) : undefined
      return { struct, content }
    })
  }

  // ---------------------------------------------------------------------
  // Multiple

  async findBlogs(ids: AnyBlogId[]): Promise<BlogData[]> {
    const findStructs = this.substrate.findBlogs.bind(this.substrate);
    const findContents = this.ipfs.findBlogs.bind(this.ipfs);
    return this.findDataArray<AnyBlogId, Blog, BlogContent>(
      ids, findStructs, findContents
    )
  }

  async findPosts(ids: AnyPostId[]): Promise<PostData[]> {
    const findStructs = this.substrate.findPosts.bind(this.substrate)
    const findContents = this.ipfs.findPosts.bind(this.ipfs)
    return this.findDataArray<AnyPostId, Post, PostContent>(
      ids, findStructs, findContents
    )
  }

  private structFinders: FindStructsFns = {
    findBlogs: this.findBlogs,
    findPosts: this.findPosts,
    findProfiles: this.findProfiles
  }

  /** Find and load posts with their extension and owner's profile (if defined). */
  async findPostsWithSomeDetails(ids: AnyPostId[], opts?: PostDetailsOpts): Promise<PostWithSomeDetails[]> {
    const posts = await this.findPosts(ids)
    return loadAndSetPostRelatedStructs(posts, this.structFinders, opts)
  }

  async findPostsWithAllDetails(ids: AnyPostId[]): Promise<PostWithAllDetails[]> {
    return this.findPostsWithSomeDetails(ids, { withBlog: true, withOwner: true }) as Promise<PostWithAllDetails[]>
  }

  async findProfiles(ids: AnyAccountId[]): Promise<ProfileData[]> {
    const findStructs = this.substrate.findSocialAccounts.bind(this.substrate)
    const findContents = this.ipfs.findProfiles.bind(this.ipfs)

    const profiles = await this.findDataArray<AnyAccountId, SocialAccount, ProfileContent>(
      ids, findStructs, findContents
    ) as ProfileData[]

    return profiles.map(x => {
      const profile = x.struct.profile.unwrapOr(undefined)
      return { ...x, profile }
    })
  }

  // ---------------------------------------------------------------------
  // Single

  async findBlog(id: AnyBlogId): Promise<BlogData | undefined> {
    return getFirstOrUndefined(await this.findBlogs([ id ]))
  }

  async findPost(id: AnyPostId): Promise<PostData | undefined> {
    return getFirstOrUndefined(await this.findPosts([ id ]))
  }

  async findPostWithSomeDetails(id: AnyPostId, opts?: PostDetailsOpts): Promise<PostWithSomeDetails | undefined> {
    return getFirstOrUndefined(await this.findPostsWithSomeDetails([ id ], opts))
  }

  async findPostWithAllDetails(id: AnyPostId): Promise<PostWithAllDetails | undefined> {
    return getFirstOrUndefined(await this.findPostsWithAllDetails([ id ]))
  }

  async findProfile(id: AnyAccountId): Promise<ProfileData | undefined> {
    return getFirstOrUndefined(await this.findProfiles([ id ]))
  }
}
