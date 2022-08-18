import { IpfsCommonContent, IpfsSpaceContent, IpfsPostContent, IpfsCommentContent } from '../types/ipfs'

import { AccountId } from '@polkadot/types/interfaces';
import BN from 'bn.js';
import { SpaceId, PostId, Space, Post, ReactionId } from '@subsocial/definitions/interfaces';

export type SubstrateId = SpaceId | PostId | BN;
export type CommonStruct = Space | Post;
export type AnyAccountId = AccountId | string;
export type AnySpaceId = SpaceId | BN;
export type AnyPostId = PostId | BN;
export type AnyReactionId = ReactionId | BN;

export type CommonData<S extends CommonStruct, C extends IpfsCommonContent> = {
  struct: S
  content?: C
}

export type SpaceData = CommonData<Space, IpfsSpaceContent>
export type PostData = CommonData<Post, IpfsPostContent>
export type CommentData = CommonData<Post, IpfsCommentContent>

export type AnySubsocialData = SpaceData | PostData | CommentData;

export type PostWithSomeDetails = {
  post: PostData
  ext?: Exclude<PostWithSomeDetails, 'ext'>
  owner?: SpaceData
  space?: SpaceData
}

export type PostWithOwner = Exclude<PostWithSomeDetails, 'owner'> 
& {
  owner: SpaceData
}

export type PostWithSpace = Exclude<PostWithSomeDetails, 'space'> & {
  space: SpaceData
}

export type PostWithAllDetails = PostWithOwner & PostWithSpace