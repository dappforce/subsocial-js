export default {
  types: {
    IpfsHash: 'Text',
    PostId: 'u64',
    ReactionId: 'u64',
    OptionVecAccountId: 'Option<Vec<AccountId>>',
    Space: {
      id: 'SpaceId',
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      hidden: 'bool',
      owner: 'AccountId',
      handle: 'Option<Text>',
      ipfs_hash: 'IpfsHash',
      posts_count: 'u16',
      followers_count: 'u32',
      edit_history: 'Vec<SpaceHistoryRecord>',
      score: 'i32',
      permissions: 'Option<SpacePermissions>'
    },
    SpaceUpdate: {
      handle: 'Option<Option<Text>>',
      ipfs_hash: 'Option<IpfsHash>',
      hidden: 'Option<bool>'
    },
    SpaceHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'SpaceUpdate'
    },
    Post: {
      id: 'PostId',
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      hidden: 'bool',
      space_id: 'Option<SpaceId>',
      extension: 'PostExtension',
      ipfs_hash: 'IpfsHash',
      edit_history: 'Vec<PostHistoryRecord>',
      direct_replies_count: 'u16',
      total_replies_count: 'u32',
      shares_count: 'u16',
      upvotes_count: 'u16',
      downvotes_count: 'u16',
      score: 'i32'
    },
    PostUpdate: {
      space_id: 'Option<SpaceId>',
      ipfs_hash: 'Option<IpfsHash>',
      hidden: 'Option<bool>'
    },
    PostHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'PostUpdate'
    },
    PostExtension: {
      _enum: {
        RegularPost: 'Null',
        Comment: 'CommentExt',
        SharedPost: 'PostId'
      }
    },
    CommentExt: {
      parent_id: 'Option<PostId>',
      root_post_id: 'PostId'
    },
    ReactionKind: {
      _enum: [
        'Upvote',
        'Downvote'
      ]
    },
    Reaction: {
      id: 'ReactionId',
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      kind: 'ReactionKind'
    },
    SocialAccount: {
      followers_count: 'u32',
      following_accounts_count: 'u16',
      following_spaces_count: 'u16',
      reputation: 'u32',
      profile: 'Option<Profile>'
    },
    Profile: {
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      username: 'Text',
      ipfs_hash: 'IpfsHash',
      edit_history: 'Vec<ProfileHistoryRecord>'
    },
    ProfileUpdate: {
      username: 'Option<Text>',
      ipfs_hash: 'Option<IpfsHash>'
    },
    ProfileHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'ProfileUpdate'
    },
    ScoringAction: {
      _enum: [
        'UpvotePost',
        'DownvotePost',
        'SharePost',
        'CreateComment',
        'UpvoteComment',
        'DownvoteComment',
        'ShareComment',
        'FollowSpace',
        'FollowAccount'
      ]
    },
    SpaceForRoles: {
      owner: 'AccountId',
      permissions: 'Option<SpacePermissions>'
    },
    SpaceId: 'u64',
    WhoAndWhen: {
      account: 'AccountId',
      block: 'BlockNumber',
      time: 'Moment'
    },
    User: {
      _enum: {
        Account: 'AccountId',
        Space: 'SpaceId'
      }
    },
    SpacePermissionSet: 'BTreeSet<SpacePermission>',
    SpacePermission: {
      _enum: [
        'ManageRoles',
        'RepresentSpaceInternally',
        'RepresentSpaceExternally',
        'UpdateSpace',
        'BlockUsers',
        'CreateSubspaces',
        'UpdateOwnSubspaces',
        'UpdateAnySubspaces',
        'DeleteOwnSubspaces',
        'BlockSubspaces',
        'CreatePosts',
        'UpdateOwnPosts',
        'UpdateAnyPosts',
        'DeleteOwnPosts',
        'BlockPosts',
        'CreateComments',
        'UpdateOwnComments',
        'DeleteOwnComments',
        'BlockComments',
        'Upvote',
        'Downvote',
        'Share',
        'OverridePostPermissions'
      ]
    },
    SpacePermissions: {
      none: 'Option<SpacePermissionSet>',
      everyone: 'Option<SpacePermissionSet>',
      follower: 'Option<SpacePermissionSet>',
      space_owner: 'Option<SpacePermissionSet>'
    },
    SpacePermissionsContext: {
      space_id: 'SpaceId',
      is_space_owner: 'bool',
      is_space_follower: 'bool',
      space_perms: 'Option<SpacePermissionSet>'
    },
    RoleId: 'u64',
    Role: {
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      id: 'RoleId',
      space_id: 'SpaceId',
      disabled: 'bool',
      expires_at: 'Option<BlockNumber>',
      ipfs_hash: 'Option<IpfsHash>',
      permissions: 'SpacePermissionSet'
    },
    RoleUpdate: {
      disabled: 'Option<bool>',
      ipfs_hash: 'Option<Option<IpfsHash>>',
      permissions: 'Option<SpacePermissionSet>'
    }
  }
}
