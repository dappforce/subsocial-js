export default {
  types: {
    RefCount: 'u32',
    AccountInfo: {
      nonce: 'Index',
      consumers: 'RefCount',
      providers: 'RefCount',
      data: 'AccountData'
    },
    IpfsCid: 'Text',
    DonationId: 'u64',
    DonationRecipient: {
      _enum: {
        Account: 'AccountId',
        Space: 'SpaceId',
        Post: 'PostId'
      }
    },
    Donation: {
      id: 'DonationId',
      created: 'WhoAndWhen',
      recipient: 'DonationRecipient',
      donation_wallet: 'AccountId',
      amount: 'Balance',
      comment_id: 'Option<PostId>'
    },
    DonationSettings: {
      donations_allowed: 'bool',
      min_amount: 'Option<Balance>',
      max_amount: 'Option<Balance>'
    },
    DonationSettingsUpdate: {
      donations_allowed: 'Option<bool>',
      min_amount: 'Option<Option<Balance>>',
      max_amount: 'Option<Option<Balance>>'
    },
    DropId: 'u64',
    Drop: {
      id: 'DropId',
      first_drop_at: 'BlockNumber',
      total_dropped: 'Balance'
    },
    FaucetSettings: {
      period: 'Option<BlockNumber>',
      period_limit: 'Balance'
    },
    FaucetSettingsUpdate: {
      period: 'Option<Option<BlockNumber>>',
      period_limit: 'Option<Balance>'
    },
    ReportId: 'u64',
    EntityId: {
      _enum: {
        Content: 'Content',
        Account: 'AccountId',
        Space: 'SpaceId',
        Post: 'PostId'
      }
    },
    EntityStatus: {
      _enum: [
        'Allowed',
        'Blocked'
      ]
    },
    Report: {
      id: 'ReportId',
      created: 'WhoAndWhen',
      reported_entity: 'EntityId',
      reported_within: 'SpaceId',
      reason: 'Content'
    },
    SuggestedStatus: {
      suggested: 'WhoAndWhen',
      status: 'Option<EntityStatus>',
      report_id: 'Option<ReportId>'
    },
    SpaceModerationSettings: {
      autoblock_threshold: 'Option<u16>'
    },
    SpaceModerationSettingsUpdate: {
      autoblock_threshold: 'Option<Option<u16>>'
    },
    SpacePermissionSet: 'BTreeSet<SpacePermission>',
    SpacePermission: {
      _enum: [
        'ManageRoles',
        'RepresentSpaceInternally',
        'RepresentSpaceExternally',
        'UpdateSpace',
        'CreateSubspaces',
        'UpdateOwnSubspaces',
        'DeleteOwnSubspaces',
        'HideOwnSubspaces',
        'UpdateAnySubspace',
        'DeleteAnySubspace',
        'HideAnySubspace',
        'CreatePosts',
        'UpdateOwnPosts',
        'DeleteOwnPosts',
        'HideOwnPosts',
        'UpdateAnyPost',
        'DeleteAnyPost',
        'HideAnyPost',
        'CreateComments',
        'UpdateOwnComments',
        'DeleteOwnComments',
        'HideOwnComments',
        'HideAnyComment',
        'Upvote',
        'Downvote',
        'Share',
        'OverrideSubspacePermissions',
        'OverridePostPermissions',
        'SuggestEntityStatus',
        'UpdateEntityStatus',
        'UpdateSpaceSettings'
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
      space_perms: 'Option<SpacePermissions>'
    },
    PostHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'PostUpdate'
    },
    PostId: 'u64',
    Post: {
      id: 'PostId',
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      owner: 'AccountId',
      extension: 'PostExtension',
      space_id: 'Option<SpaceId>',
      content: 'Content',
      hidden: 'bool',
      replies_count: 'u16',
      hidden_replies_count: 'u16',
      shares_count: 'u16',
      upvotes_count: 'u16',
      downvotes_count: 'u16',
      score: 'i32'
    },
    PostUpdate: {
      space_id: 'Option<SpaceId>',
      content: 'Option<Content>',
      hidden: 'Option<bool>'
    },
    PostExtension: {
      _enum: {
        RegularPost: 'Null',
        Comment: 'Comment',
        SharedPost: 'PostId'
      }
    },
    Comment: {
      parent_id: 'Option<PostId>',
      root_post_id: 'PostId'
    },
    ProfileHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'ProfileUpdate'
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
      content: 'Content'
    },
    ProfileUpdate: {
      content: 'Option<Content>'
    },
    ReactionId: 'u64',
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
    RoleId: 'u64',
    Role: {
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      id: 'RoleId',
      space_id: 'SpaceId',
      disabled: 'bool',
      expires_at: 'Option<BlockNumber>',
      content: 'Content',
      permissions: 'SpacePermissionSet'
    },
    RoleUpdate: {
      disabled: 'Option<bool>',
      content: 'Option<Content>',
      permissions: 'Option<SpacePermissionSet>'
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
    SessionKey: {
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      expires_at: 'BlockNumber',
      limit: 'Option<Balance>',
      spent: 'Balance'
    },
    SpaceHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'SpaceUpdate'
    },
    Space: {
      id: 'SpaceId',
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      owner: 'AccountId',
      parent_id: 'Option<SpaceId>',
      handle: 'Option<Text>',
      content: 'Content',
      hidden: 'bool',
      posts_count: 'u32',
      hidden_posts_count: 'u32',
      followers_count: 'u32',
      score: 'i32',
      permissions: 'Option<SpacePermissions>'
    },
    SpaceUpdate: {
      parent_id: 'Option<Option<SpaceId>>',
      handle: 'Option<Option<Text>>',
      content: 'Option<Content>',
      hidden: 'Option<bool>',
      permissions: 'Option<Option<SpacePermissions>>'
    },
    SubscriptionPlanId: 'u64',
    SubscriptionId: 'u64',
    SubscriptionPeriod: {
      _enum: {
        Daily: 'Null',
        Weekly: 'Null',
        Monthly: 'Null',
        Quarterly: 'Null',
        Yearly: 'Null',
        Custom: 'BlockNumber'
      }
    },
    SubscriptionPlan: {
      id: 'SubscriptionPlanId',
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      is_active: 'bool',
      content: 'Content',
      space_id: 'SpaceId',
      wallet: 'Option<AccountId>',
      price: 'Balance',
      period: 'SubscriptionPeriod'
    },
    Subscription: {
      id: 'SubscriptionPlanId',
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      is_active: 'bool',
      wallet: 'Option<AccountId>',
      plan_id: 'SubscriptionPlanId'
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
    Content: {
      _enum: {
        None: 'Null',
        Raw: 'Text',
        IPFS: 'Text',
        Hyper: 'Text'
      }
    },
    Faucet: {
      enabled: 'bool',
      period: 'BlockNumber',
      period_limit: 'Balance',
      drip_limit: 'Balance',
  
      next_period_at: 'BlockNumber',
      dripped_in_current_period: 'Balance'
    },
  
    FaucetUpdate: {
      enabled: 'Option<bool>',
      period: 'Option<BlockNumber>',
      period_limit: 'Option<Balance>',
      drip_limit: 'Option<Balance>'
    },
    ChangeId: 'u64',
  
    SpaceOwners: {
      created: 'WhoAndWhen',
      space_id: 'SpaceId',
      owners: 'Vec<AccountId>',
      threshold: 'u16',
      changes_count: 'u16'
    },
    Change: {
      created: 'WhoAndWhen',
      id: 'ChangeId',
      space_id: 'SpaceId',
      add_owners: 'Vec<AccountId>',
      remove_owners: 'Vec<AccountId>',
      new_threshold: 'Option<u16>',
      notes: 'Text',
      confirmed_by: 'Vec<AccountId>',
      expires_at: 'BlockNumber'
    }
  }
}
