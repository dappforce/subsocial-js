import BN from 'bn.js'
import { Content, WhoAndWhen } from '@subsocial/definitions/interfaces'
import { GenericAccountId } from '@polkadot/types/generic'
import { Bool, bool } from '@polkadot/types/primitive'

import * as content from './ipfs'

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
export type SpaceStruct = FlatSpaceOrPost & CanHaveParentId & CanHaveHandle & SpacePermissions & {
  postsCount?: number

  canFollowerCreatePosts: boolean
  canEveryoneCreatePosts: boolean
}

/** Flat post struct. */
export type PostStruct = FlatSpaceOrPost & CanHaveSpaceId & {
  upvotesCount: number
  downvotesCount: number

  repliesCount?: number
  sharesCount?: number

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
  edited: Bool
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

export type DerivedContent<C extends content.IpfsCommonContent> = C & SummarizedContent

export type CommonContent = content.IpfsCommonContent & SummarizedContent
export type SpaceContent = DerivedContent<content.IpfsSpaceContent>
export type PostContent = DerivedContent<content.IpfsPostContent>
export type CommentContent = DerivedContent<content.IpfsCommentContent>
export type SharedPostContent = DerivedContent<content.IpfsSharedPostContent>

export type EntityData<S extends HasId, C extends CommonContent> = {

  // TODO maybe we do not need `id` field here, b/c it can be extracted from `struct`
  // See the usage of this field. Most of the time it looks like copypasta from struct.id
  id: EntityId

  struct: S
  content?: C
}

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
& {
  owner?: SpaceData
}

export type PostWithSomeDetails = {
  id: EntityId

  // TODO flatten post? (yes)
  post: PostData

  ext?: PostExtensionData
  owner?: SpaceData
  space?: SpaceData
}

export type PostWithAllDetails = Omit<PostWithSomeDetails, 'owner' | 'space'> & {
  owner: SpaceData
  space: SpaceData
}

export type ReactionType = 'Upvote' | 'Downvote'

export enum ReactionEnum {
  Upvote = 'Upvote',
  Downvote = 'Downvote'
}

export type SpacePermissionMap = {
  /// Create, update, delete, grant and revoke roles in this space.
  ManageRoles?: boolean

  /// Act on behalf of this space within this space.
  RepresentSpaceInternally?: boolean
  /// Act on behalf of this space outside of this space.
  RepresentSpaceExternally?: boolean

   /// Update this space.
  UpdateSpace?: boolean

  // Related to subspaces in this space:
  CreateSubspaces?: boolean
  UpdateOwnSubspaces?: boolean
  DeleteOwnSubspaces?: boolean
  HideOwnSubspaces?: boolean

  UpdateAnySubspace?: boolean
  DeleteAnySubspace?: boolean
  HideAnySubspace?: boolean

  // Related to posts in this space:
  CreatePosts?: boolean
  UpdateOwnPosts?: boolean
  DeleteOwnPosts?: boolean
  HideOwnPosts?: boolean

  UpdateAnyPost?: boolean
  DeleteAnyPost?: boolean
  HideAnyPost?: boolean

  CreateComments?: boolean
  UpdateOwnComments?: boolean
  DeleteOwnComments?: boolean
  HideOwnComments?: boolean

  // NOTE: It was made on purpose that it's not possible to update or delete not own comments.
  // Instead it's possible to allow to hide and block comments.
  HideAnyComment?: boolean

  /// Upvote any post or comment in this space.
  Upvote?: boolean
  /// Downvote any post or comment in this space.
  Downvote?: boolean
  /// Share any post or comment from this space to another outer space.
  Share?: boolean

  /// Override permissions per subspace in this space.
  OverrideSubspacePermissions?: boolean
  /// Override permissions per post in this space.
  OverridePostPermissions?: boolean

  // Related to moderation pallet
  /// Suggest new entity status in space (whether it's blocked or allowed)
  SuggestEntityStatus?: boolean
  /// Update entity status in space
  UpdateEntityStatus?: boolean

  // Related to Space settings
  /// Update collection of space settings in different pallets
  UpdateSpaceSettings?: boolean
}

export type SpacePermissionKey = keyof SpacePermissionMap

export type SpacePermissions = {
  nonePermissions?: SpacePermissionMap
  everyonePermissions?: SpacePermissionMap
  followerPermissions?: SpacePermissionMap
  spaceOwnerPermissions?: SpacePermissionMap
}

export type SpacePermissionsKey = keyof SpacePermissions