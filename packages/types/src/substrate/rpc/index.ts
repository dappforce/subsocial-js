export type SpacePermissionMap = {
  /// Create, update, delete, grant and revoke roles in this space.
  ManageRoles?: boolean,

  /// Act on behalf of this space within this space.
  RepresentSpaceInternally?: boolean,
  /// Act on behalf of this space outside of this space.
  RepresentSpaceExternally?: boolean,

   /// Update this space.
  UpdateSpace?: boolean,

  // Related to subspaces in this space:
  CreateSubspaces?: boolean,
  UpdateOwnSubspaces?: boolean,
  DeleteOwnSubspaces?: boolean,
  HideOwnSubspaces?: boolean,

  UpdateAnySubspace?: boolean,
  DeleteAnySubspace?: boolean,
  HideAnySubspace?: boolean,

  // Related to posts in this space:
  CreatePosts?: boolean,
  UpdateOwnPosts?: boolean,
  DeleteOwnPosts?: boolean,
  HideOwnPosts?: boolean,

  UpdateAnyPost?: boolean,
  DeleteAnyPost?: boolean,
  HideAnyPost?: boolean,

  CreateComments?: boolean,
  UpdateOwnComments?: boolean,
  DeleteOwnComments?: boolean,
  HideOwnComments?: boolean,

  // NOTE: It was made on purpose that it's not possible to update or delete not own comments.
  // Instead it's possible to allow to hide and block comments.
  HideAnyComment?: boolean,

  /// Upvote any post or comment in this space.
  Upvote?: boolean,
  /// Downvote any post or comment in this space.
  Downvote?: boolean,
  /// Share any post or comment from this space to another outer space.
  Share?: boolean,

  /// Override permissions per subspace in this space.
  OverrideSubspacePermissions?: boolean,
  /// Override permissions per post in this space.
  OverridePostPermissions?: boolean,

  // Related to moderation pallet
  /// Suggest new entity status in space (whether it's blocked or allowed)
  SuggestEntityStatus?: boolean,
  /// Update entity status in space
  UpdateEntityStatus?: boolean,

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