import { BTreeSet, Enum, Null, Struct, Option } from '@polkadot/types';
import { SpacePermission as ISpacePermission, SpacePermissionSet as ISpacePermissionSet } from '../interfaces';
import registry from '../registry';

export class ManageRoles extends Null {}
export class RepresentSpaceInternally extends Null {}
export class RepresentSpaceExternally extends Null {}
export class UpdateSpace extends Null {}
export class CreateSubspaces extends Null {}
export class UpdateOwnSubspaces extends Null {}
export class DeleteOwnSubspaces extends Null {}
export class HideOwnSubspaces extends Null {}
export class UpdateAnySubspace extends Null {}
export class DeleteAnySubspace extends Null {}
export class HideAnySubspace extends Null {}
export class CreatePosts extends Null {}
export class UpdateOwnPosts extends Null {}
export class DeleteOwnPosts extends Null {}
export class HideOwnPosts extends Null {}
export class UpdateAnyPost extends Null {}
export class DeleteAnyPost extends Null {}
export class HideAnyPost extends Null {}
export class CreateComments extends Null {}
export class UpdateOwnComments extends Null {}
export class DeleteOwnComments extends Null {}
export class HideOwnComments extends Null {}
export class HideAnyComment extends Null {}
export class Upvote extends Null {}
export class Downvote extends Null {}
export class Share extends Null {}
export class OverrideSubspacePermissions extends Null {}
export class OverridePostPermissions extends Null {}
export class SuggestEntityStatus extends Null {}
export class UpdateEntityStatus extends Null {}
export class UpdateSpaceSettings extends Null {}

type SpacePermissionValue = { ManageRoles: ManageRoles } | { RepresentSpaceInternally: RepresentSpaceInternally } | { RepresentSpaceExternally: RepresentSpaceExternally } | { UpdateSpace: UpdateSpace } | { CreateSubspaces: CreateSubspaces } | { UpdateOwnSubspaces: UpdateOwnSubspaces } | { DeleteOwnSubspaces: DeleteOwnSubspaces } | { HideOwnSubspaces: HideOwnSubspaces } | { UpdateAnySubspace: UpdateAnySubspace } | { DeleteAnySubspace: DeleteAnySubspace } | { HideAnySubspace: HideAnySubspace } | { CreatePosts: CreatePosts } | { UpdateOwnPosts: UpdateOwnPosts } | { DeleteOwnPosts: DeleteOwnPosts } | { HideOwnPosts: HideOwnPosts } | { UpdateAnyPost: UpdateAnyPost } | { DeleteAnyPost: DeleteAnyPost } | { HideAnyPost: HideAnyPost } | { CreateComments: CreateComments } | { UpdateOwnComments: UpdateOwnComments } | { DeleteOwnComments: DeleteOwnComments } | { HideOwnComments: HideOwnComments } | { HideAnyComment: HideAnyComment } | { Upvote: Upvote } | { Downvote: Downvote } | { Share: Share } | { OverrideSubspacePermissions: OverrideSubspacePermissions } | { OverridePostPermissions: OverridePostPermissions } | { SuggestEntityStatus: SuggestEntityStatus } | { UpdateEntityStatus: UpdateEntityStatus } | { UpdateSpaceSettings: UpdateSpaceSettings }

export class SpacePermission extends Enum /* implements ISpacePermission */ {
  constructor(value?: SpacePermissionValue) {
    super(registry, {
      ManageRoles,
      RepresentSpaceInternally,
      RepresentSpaceExternally,
      UpdateSpace,
      CreateSubspaces,
      UpdateOwnSubspaces,
      DeleteOwnSubspaces,
      HideOwnSubspaces,
      UpdateAnySubspace,
      DeleteAnySubspace,
      HideAnySubspace,
      CreatePosts,
      UpdateOwnPosts,
      DeleteOwnPosts,
      HideOwnPosts,
      UpdateAnyPost,
      DeleteAnyPost,
      HideAnyPost,
      CreateComments,
      UpdateOwnComments,
      DeleteOwnComments,
      HideOwnComments,
      HideAnyComment,
      Upvote,
      Downvote,
      Share,
      OverrideSubspacePermissions,
      OverridePostPermissions,
      SuggestEntityStatus,
      UpdateEntityStatus,
      UpdateSpaceSettings
    }, value)
  }

  get isCreatePosts () {
    return this.type === 'CreatePosts'
  }

  get isUpdateOwnPosts () {
    return this.type === 'UpdateOwnPosts'
  }
  
  get isDeleteOwnPosts () {
    return this.type === 'DeleteOwnPosts'
  }

  get isHideOwnPosts () {
    return this.type === 'HideOwnPosts'
  }
}

export const SpacePermissionSet = BTreeSet.with<ISpacePermission>('Text')

export type SpacePermissionsType = {
  none: Option<ISpacePermissionSet>,
  everyone: Option<ISpacePermissionSet>,
  follower: Option<ISpacePermissionSet>,
  space_owner: Option<ISpacePermissionSet>,
}

export class SpacePermissions extends Struct {
  constructor(value?: SpacePermissionsType) {
    super(registry, {
      none: 'Option<SpacePermissionSet>',
      everyone: 'Option<SpacePermissionSet>',
      follower: 'Option<SpacePermissionSet>',
      space_owner: 'Option<SpacePermissionSet>'
    }, value)
  }
}

const createEmptySpacePermission = () => new Option(registry, 'Option<SpacePermissionSet>', new Null(registry))

export const grantWritePermissionToFollower = () => {
  const follower = new SpacePermissionSet(registry, [ CreatePosts, UpdateOwnPosts, DeleteOwnPosts, HideOwnPosts ])
  const followerOpt = new Option(registry, 'SpacePermissionSet', follower)

  return new Option(registry, 'SpacePermissions', { 
    none: createEmptySpacePermission(),
    everyone: createEmptySpacePermission(),
    follower: followerOpt,
    space_owner: createEmptySpacePermission()
  })
}