import BN from 'bn.js'
import { FlatSpacePermissions } from '../substrate'
import { Content, WhoAndWhen } from '../substrate/interfaces'
import { GenericAccountId } from '@polkadot/types/generic'
import { Bool, bool } from '@polkadot/types/primitive'

import * as content from '../offchain'

type Id = string

export type Cid = string

export type RoleId = string

export type HasId = {
  id: Id
}

export type CanHaveParentId = {
  parentId?: Id
}

export type CanHaveSpaceId = {
  spaceId?: Id
}

export type CanHaveContent = {
  contentId?: Cid
}

export type HasOwner = {
  ownerId: string
}

export type HasHandle = {
  handle: string
}

export type CanHaveHandle = Partial<HasHandle>

export type HasCreated = {
  createdByAccount: string
  createdAtBlock: number
  createdAtTime: number
}

export type CanBeUpdated = {
  isUpdated?: boolean
}

export type CanBeHidden = {
  hidden: boolean // TODO rename to 'isHidden'?
  // isPublic: boolean
}

export type FlatSuperCommon =
  HasCreated &
  CanBeUpdated &
  CanHaveContent

export type FlatSpaceOrPost =
  FlatSuperCommon &
  HasId &
  HasOwner &
  CanBeHidden

/** Flat space struct. */
export type SpaceStruct = FlatSpaceOrPost & CanHaveParentId & CanHaveHandle & FlatSpacePermissions & {
  canFollowerCreatePosts: boolean
  canEveryoneCreatePosts: boolean
}

/** Flat post struct. */
export type PostStruct = FlatSpaceOrPost & CanHaveSpaceId & {
  upvotesCount: number
  downvotesCount: number

  isRegularPost: boolean
  isSharedPost: boolean
  isComment: boolean
}

export type CommentExtension = {
  parentId?: Id
  rootPostId: Id
}

export type SharedPostExtension = {
  originalPostId: Id
}

export type FlatPostExtension = {} | CommentExtension | SharedPostExtension

export type SharedPostStruct = PostStruct & SharedPostExtension

export type CommentStruct = PostStruct & CommentExtension

export type SuperCommonStruct = {
  created: WhoAndWhen
  updated: Bool
  content: Content
}

export type SpaceOrPostStruct = SuperCommonStruct & {
  id: BN
  owner: GenericAccountId
  hidden: bool
}

export type AnyId = EntityId | BN
export type EntityId = string
export type AccountId = EntityId
export type SpaceId = EntityId
export type PostId = EntityId
export type ReactionId = EntityId


/** `ProfileId` is the alias for `AccountId`. */
export type ProfileId = EntityId

export type SummarizedContent = {
  summary: string
  isShowMore: boolean
}

export type DerivedContent<C extends content.CommonContent> = C & SummarizedContent

export type CommonContent = content.CommonContent & SummarizedContent
// export type ProfileContent = DerivedContent<content.ProfileContent>
export type SpaceContent = DerivedContent<content.SpaceContent>
export type PostContent = DerivedContent<content.PostContent>
export type CommentContent = DerivedContent<content.CommentContent>
export type SharedPostContent = DerivedContent<content.SharedPostContent>

export type EntityData<S extends HasId, C extends CommonContent> = {

  // TODO maybe we do not need `id` field here, b/c it can be extracted from `struct`
  // See the usage of this field. Most of the time it looks like copypasta from struct.id
  id: EntityId

  struct: S
  content?: C
}

// export type ProfileData = EntityData<ProfileStruct, ProfileContent>
export type SpaceData = EntityData<SpaceStruct, SpaceContent>
export type PostData = EntityData<PostStruct, PostContent>
export type CommentData = EntityData<CommentStruct, CommentContent>
export type SharedPostData = EntityData<SharedPostStruct, SharedPostContent>

export type AnySubsocialData =
  SpaceData |
  PostData |
  CommentData |
  SharedPostData

type PostExtensionData = Exclude<PostWithSomeDetails, 'ext'>

export type SpaceWithSomeDetails = SpaceData
// & {
//   owner?: ProfileData
// }

export type PostWithSomeDetails = {
  id: EntityId

  // TODO flatten post? (yes)
  post: PostData

  ext?: PostExtensionData
  // owner?: ProfileData
  space?: SpaceData
}

export type PostWithAllDetails = Omit<PostWithSomeDetails, 'owner' | 'space'> & {
  // owner: ProfileData
  space: SpaceData
}

export type ReactionType = 'Upvote' | 'Downvote'

export enum ReactionEnum {
  Upvote = 'Upvote',
  Downvote = 'Downvote'
}
