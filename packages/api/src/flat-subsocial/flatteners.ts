import { Option } from '@polkadot/types/codec'
import { AccountId } from '@polkadot/types/interfaces/runtime'
import { bool } from '@polkadot/types/primitive'
import { SocialAccountWithId } from '@subsocial/types'
import { Content, Post, Space, SpacePermissionSet, SpacePermissions, WhoAndWhen } from '@subsocial/types/substrate/interfaces'
import { notEmptyObj } from '@subsocial/utils'
import BN from 'bn.js'
import { CommonContent, EntityData, EntityId } from './dto'
import { FlatSpacePermissionKey, FlatSpacePermissionMap, FlatSpacePermissions, FlatSpacePermissionsKey } from '@subsocial/types/substrate/rpc'

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
  updatedByAccount?: string
  updatedAtBlock?: number
  updatedAtTime?: number
}

export type CanBeHidden = {
  hidden: boolean // TODO rename to 'isHidden'?
  // isPublic: boolean
}

export type FlatSuperCommon =
  HasCreated &
  CanBeUpdated &
  CanHaveContent

type FlatSpaceOrPost =
  FlatSuperCommon &
  HasId &
  HasOwner &
  CanBeHidden

/** Flat space struct. */
export type SpaceStruct = FlatSpaceOrPost & CanHaveParentId & CanHaveHandle & FlatSpacePermissions & {
  postsCount: number
  hiddenPostsCount: number

  // TODO maybe we do not need `visiblePostsCount` field here.
  // It can be easily calculated as (postsCount - hiddenPostsCount)
  visiblePostsCount: number

  canFollowerCreatePosts: boolean
  canEveryoneCreatePosts: boolean

  followersCount: number
  score: number
  // permissions?: SpacePermissions
}

/** Flat post struct. */
export type PostStruct = FlatSpaceOrPost & CanHaveSpaceId & {
  repliesCount: number
  hiddenRepliesCount: number

  // TODO maybe we do not need `visibleRepliesCount` field here.
  // It can be easily calculated as (repliesCount - hiddenRepliesCount)
  visibleRepliesCount: number

  sharesCount: number
  upvotesCount: number
  downvotesCount: number
  score: number

  isRegularPost: boolean
  isSharedPost: boolean
  isComment: boolean
}

type CommentExtension = {
  parentId?: Id
  rootPostId: Id
}

type SharedPostExtension = {
  sharedPostId: Id
}

type FlatPostExtension = {} | CommentExtension | SharedPostExtension

export type SharedPostStruct = PostStruct & SharedPostExtension

export type CommentStruct = PostStruct & CommentExtension

type SocialAccountStruct = HasId & {
  followersCount: number
  followingAccountsCount: number
  followingSpacesCount: number
  reputation: number
  hasProfile: boolean
}

// TODO rename to SocialAccount or AnonProfileStruct?
/** Flat representation of a social account that does not have a profile content. */
export type ProfileStruct = SocialAccountStruct & Partial<FlatSuperCommon>

/** Flat representation of a social account that created a profile content. */
export type PublicProfileStruct = SocialAccountStruct & FlatSuperCommon

export type SuperCommonStruct = {
  created: WhoAndWhen
  updated: Option<WhoAndWhen>
  content: Content
}

type SpaceOrPostStruct = SuperCommonStruct & {
  id: BN
  owner: AccountId
  hidden: bool
}

type EntityDataWithField<S extends {}> = EntityData<HasId & S, CommonContent> | (HasId & S)

export function getUniqueIds<S extends {}> (structs: EntityDataWithField<S>[], idFieldName: keyof S): EntityId[] {
  type _EntityData = EntityData<S & HasId, CommonContent>
  const ids = new Set<EntityId>()
  structs.forEach((x) => {
    const edStruct = (x as _EntityData).struct
    const struct = notEmptyObj(edStruct) ? edStruct : x as S
    const id = struct[idFieldName] as unknown as EntityId
    if (id && !ids.has(id)) {
      ids.add(id)
    }
  })
  return Array.from(ids)
}

export const getUniqueOwnerIds = (entities: EntityDataWithField<HasOwner>[]) =>
  getUniqueIds(entities, 'ownerId')

export const getUniqueContentIds = (entities: EntityDataWithField<CanHaveContent>[]) =>
  getUniqueIds(entities, 'contentId')

export const getUniqueSpaceIds = (entities: EntityDataWithField<CanHaveSpaceId>[]) =>
  getUniqueIds(entities, 'spaceId')

function getUpdatedFields ({ updated }: SuperCommonStruct): CanBeUpdated {
  const maybeUpdated = updated.unwrapOr(undefined)
  let res: CanBeUpdated = {
    isUpdated: updated.isSome,
  }
  if (maybeUpdated) {
    res = {
      ...res,
      updatedByAccount: maybeUpdated.account.toHuman(),
      updatedAtBlock: maybeUpdated.block.toNumber(),
      updatedAtTime: maybeUpdated.time.toNumber()
    }
  }
  return res
}

function getContentFields ({ content }: SuperCommonStruct): CanHaveContent {
  let res: CanHaveContent = {}
  if (content.isIpfs) {
    res = {
      contentId: content.asIpfs.toHuman()
    }
  }
  return res
}

export function flattenCommonFields (struct: SuperCommonStruct): FlatSuperCommon {
  const { created } = struct

  return {
    // created:
    createdByAccount: created.account.toHuman(),
    createdAtBlock: created.block.toNumber(),
    createdAtTime: created.time.toNumber(),

    ...getUpdatedFields(struct),
    ...getContentFields(struct),
  }
}

function flattenSpaceOrPostStruct (struct: SpaceOrPostStruct): FlatSpaceOrPost {
  return {
    ...flattenCommonFields(struct),
    id: struct.id.toString(),
    ownerId: struct.owner.toHuman(),
    hidden: struct.hidden.isTrue,
  }
}

export const flattenPermisions = (permissions?: SpacePermissions) => {
  const flatPermissions: FlatSpacePermissions = {}

  if (permissions) {
    for (const [ key, value ] of permissions) {
      const permissionSet = (value as Option<SpacePermissionSet>).unwrapOr(undefined)
      const permission: FlatSpacePermissionMap = {}

      permissionSet?.forEach(x => {
        permission[x.toString() as FlatSpacePermissionKey] = true
      })

      flatPermissions[`${key}Permissions` as FlatSpacePermissionsKey] = permission
    }
  }

  return flatPermissions
}

export function flattenSpaceStruct (struct: Space): SpaceStruct {
  const postsCount = struct.postsCount.toNumber()
  const hiddenPostsCount = struct.hiddenPostsCount.toNumber()
  const visiblePostsCount = postsCount - hiddenPostsCount
  const flatPermissions = flattenPermisions(struct.permissions.unwrapOr(undefined))

  let parentField: CanHaveParentId = {}
  if (struct.parentId.isSome) {
    parentField = {
      parentId: struct.parentId.unwrap().toString()
    }
  }

  let handleField: CanHaveHandle = {}
  if (struct.handle.isSome) {
    handleField = {
      handle: struct.handle.unwrap().toString()
    }
  }


  return {
    ...flattenSpaceOrPostStruct(struct),
    ...parentField,
    ...handleField,

    ...flatPermissions,
    canFollowerCreatePosts: !!flatPermissions.followerPermissions?.CreatePosts, //TODO: check CreatePosts permissions in follower set
    canEveryoneCreatePosts: !!flatPermissions.everyonePermissions?.CreatePosts, //TODO: check CreatePosts permissions in everyone set
    postsCount,
    hiddenPostsCount,
    visiblePostsCount,
    followersCount: struct.followersCount.toNumber(),
    score: struct.score.toNumber()
  }
}

export function flattenSpaceStructs (structs: Space[]): SpaceStruct[] {
  return structs.map(flattenSpaceStruct)
}

function flattenPostExtension (struct: Post): FlatPostExtension {
  const { isSharedPost, isComment } = struct.extension
  let normExt: FlatPostExtension = {}

  if (isSharedPost) {
    const sharedPost: SharedPostExtension = {
      sharedPostId: struct.extension.asSharedPost.toString()
    }
    normExt = sharedPost
  } else if (isComment) {
    const { parentId, rootPostId } = struct.extension.asComment
    const comment: CommentExtension = {
      rootPostId: rootPostId.toString()
    }
    if (parentId.isSome) {
      comment.parentId = parentId.unwrap().toString()
    }
    normExt = comment
  }

  return normExt
}

export function flattenPostStruct (struct: Post): PostStruct {
  const repliesCount = struct.repliesCount.toNumber()
  const hiddenRepliesCount = struct.hiddenRepliesCount.toNumber()
  const visibleRepliesCount = repliesCount - hiddenRepliesCount
  const { isRegularPost, isSharedPost, isComment } = struct.extension
  const extensionFields = flattenPostExtension(struct)

  let spaceField: CanHaveSpaceId = {}
  if (struct.spaceId.isSome) {
    spaceField = {
      spaceId: struct.spaceId.unwrap().toString(),
    }
  }

  return {
    ...flattenSpaceOrPostStruct(struct),
    ...spaceField,
    ...extensionFields,

    repliesCount,
    hiddenRepliesCount,
    visibleRepliesCount,

    sharesCount: struct.sharesCount.toNumber(),
    upvotesCount: struct.upvotesCount.toNumber(),
    downvotesCount: struct.downvotesCount.toNumber(),
    score: struct.score.toNumber(),

    isRegularPost,
    isSharedPost,
    isComment,
  }
}

export function flattenPostStructs (structs: Post[]): PostStruct[] {
  return structs.map(flattenPostStruct)
}

export function asSharedPostStruct (post: PostStruct): SharedPostStruct {
  if (!post.isSharedPost) throw new Error('Not a shared post')

  return post as SharedPostStruct
}

export function asCommentStruct (post: PostStruct): CommentStruct {
  if (!post.isComment) throw new Error('Not a comment')

  return post as CommentStruct
}

export function asPublicProfileStruct (profile: ProfileStruct): PublicProfileStruct {
  if (!profile.hasProfile) throw new Error('Account has no profile')

  return profile as PublicProfileStruct
}

export function flattenProfileStruct (struct: SocialAccountWithId): ProfileStruct {
  const profile = struct.profile?.unwrapOr(undefined)
  const hasProfile = struct.profile?.isSome
  const maybeProfile: Partial<FlatSuperCommon> = profile
    ? flattenCommonFields(profile)
    : {}

  return {
    id: struct.id.toString(),

    followersCount: struct.followersCount.toNumber(),
    followingAccountsCount: struct.followingAccountsCount.toNumber(),
    followingSpacesCount: struct.followingSpacesCount.toNumber(),
    reputation: struct.reputation.toNumber(),

    hasProfile,
    ...maybeProfile
  }
}

export function flattenProfileStructs (accounts: SocialAccountWithId[]): ProfileStruct[] {
  return accounts.map(flattenProfileStruct)
}
