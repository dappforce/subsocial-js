export default {
  types: {
    IpfsHash: 'Text',
    BlogId: 'u64',
    PostId: 'u64',
    CommentId: 'u64',
    ReactionId: 'u64',

    Blog: {
      id: 'BlogId',
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      writers: 'Vec<AccountId>',
      handle: 'Option<Text>',
      ipfs_hash: 'IpfsHash',
      posts_count: 'u16',
      followers_count: 'u32',
      edit_history: 'Vec<BlogHistoryRecord>',
      score: 'i32'
    },
    BlogUpdate: {
      writers: 'Option<Vec<AccountId>>',
      handle: 'Option<Option<Text>>',
      ipfs_hash: 'Option<IpfsHash>'
    },
    BlogHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'BlogUpdate'
    },

    Post: {
      id: 'PostId',
      blog_id: 'BlogId',
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      extension: 'PostExtension',
      ipfs_hash: 'IpfsHash',
      comments_count: 'u16',
      upvotes_count: 'u16',
      downvotes_count: 'u16',
      shares_count: 'u16',
      edit_history: 'Vec<PostHistoryRecord>',
      score: 'i32'
    },
    PostUpdate: {
      blog_id: 'Option<BlogId>',
      ipfs_hash: 'Option<IpfsHash>'
    },
    PostHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'PostUpdate'
    },
    PostExtension: {
      _enum: {
        RegularPost: 'Null',
        SharedPost: 'PostId',
        SharedComment: 'CommentId'
      }
    },

    Comment: {
      id: 'CommentId',
      parent_id: 'Option<CommentId>',
      post_id: 'PostId',
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      ipfs_hash: 'IpfsHash',
      upvotes_count: 'u16',
      downvotes_count: 'u16',
      shares_count: 'u16',
      direct_replies_count: 'u16',
      edit_history: 'Vec<CommentHistoryRecord>',
      score: 'i32'
    },
    CommentUpdate: {
      ipfs_hash: 'IpfsHash'
    },
    CommentHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'CommentUpdate'
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
      following_blogs_count: 'u16',
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
        'UpvoteComment',
        'DownvoteComment',
        'ShareComment',
        'FollowBlog',
        'FollowAccount'
      ]
    },

    WhoAndWhen: {
      account: 'AccountId',
      block: 'BlockNumber',
      time: 'Moment'
    },

    SpaceId: 'u64',
    ChangeId: 'u64',

    SpaceOwners: {
      created: 'WhoAndWhen',
      space_id: 'SpaceId',
      owners: 'Vec<AccountId>',
      threshold: 'u16',
      changes_count: 'u64'
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
    },
    VecAccountId: 'Vec<AccountId>',
    OptionText: 'Option<Text>',
    OptionChange: 'Option<Change>',
    OptionBlogId: 'Option<BlogId>',
    OptionCommentId: 'Option<CommentId>',
    OptionVecAccountId: 'Option<VecAccountId>',
    OptionUpdateHandle: 'Option<Option<Text>>'
  }
}
