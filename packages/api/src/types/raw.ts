import { CommonStruct } from '../types'
import { IpfsCommonContent, IpfsSpaceContent, IpfsPostContent, IpfsCommentContent } from '../types/ipfs'
import { Post, Space } from '../types/substrate'

export type RawCommonData<S extends CommonStruct, C extends IpfsCommonContent> = {
  struct: S
  content?: C
}

export type RawSpaceData = RawCommonData<Space, IpfsSpaceContent>
export type RawPostData = RawCommonData<Post, IpfsPostContent>
export type RawCommentData = RawCommonData<Post, IpfsCommentContent>

export type AnyRawSubsocialData = RawSpaceData | RawPostData | RawCommentData;

export type RawPostWithSomeDetails = {
  post: RawPostData
  ext?: Exclude<RawPostWithSomeDetails, 'ext'>
  owner?: RawSpaceData
  space?: RawSpaceData
}

export type RawPostWithOwner = Exclude<RawPostWithSomeDetails, 'owner'> 
& {
  owner: RawSpaceData
}

export type RawPostWithSpace = Exclude<RawPostWithSomeDetails, 'space'> & {
  space: RawSpaceData
}

export type RawPostWithAllDetails = RawPostWithOwner & RawPostWithSpace