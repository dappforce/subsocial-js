export default {
  types: {
    IpfsHash: 'Text',
    BlogId: 'u64',
    PostId: 'u64',
    CommentId: 'u64',
    ReactionId: 'u64',
    SpaceId: 'u64',
    ChangeId: 'u64',
    Score: 'i32',

    OptionIpfsHash: 'Option<IpfsHash>',
    VecAccountId: 'Vec<AccountId>',
    OptionText: 'Option<Text>',
    OptionWhoAndWhen: 'Option<WhoAndWhen>',
    OptionBlogId: 'Option<BlogId>',
    OptionCommentId: 'Option<CommentId>',
    OptionVecAccountId: 'Option<VecAccountId>',
    OptionProfile: 'Option<Profile>',
    VecCommentHistoryRecord: 'Vec<CommentHistoryRecord>',
    VecProfileHistoryRecord: 'Vec<ProfileHistoryRecord>',

    WhoAndWhen: {
      account: 'AccountId',
      block: 'BlockNumber',
      time: 'Moment'
    },
    SpaceOwners: {
      updated_at: 'WhoAndWhen',
      space_id: 'SpaceId',
      owners: 'VecAccountId',
      threshold: 'u16',
      changes_count: 'u64'
    },
    Change: {
      updated_at: 'WhoAndWhen',
      id: 'ChangeId',
      space_id: 'SpaceId',
      add_owners: 'VecAccountId',
      remove_owners: 'VecAccountId',
      new_threshold: 'Option<u16>',
      notes: 'Text',
      confirmed_by: 'VecAccountId',
      expires_at: 'BlockNumber'
    },
    BlogUpdate: {
      writers: 'OptionVecAccountId',
      handle: 'OptionText',
      ipfs_hash: 'OptionIpfsHash'
    },
    BlogHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'BlogUpdate'
    },
    Blog: {
      id: 'BlogId',
      created: 'WhoAndWhen',
      updated: 'OptionWhoAndWhen',
      writers: 'VecAccountId',
      handle: 'Text',
      ipfs_hash: 'IpfsHash',
      posts_count: 'u16',
      followers_count: 'u32',
      edit_history: 'Vec<BlogHistoryRecord>',
      score: 'Score'
    },
    PostUpdate: {
      blog_id: 'OptionBlogId',
      ipfs_hash: 'OptionIpfsHash'
    },
    PostHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'PostUpdate'
    },
    CommentUpdate: {
      ipfs_hash: 'IpfsHash'
    },
    CommentHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'CommentUpdate'
    },
    Comment: {
      id: 'CommentId',
      parent_id: 'OptionCommentId',
      post_id: 'PostId',
      created: 'WhoAndWhen',
      updated: 'OptionWhoAndWhen',
      ipfs_hash: 'IpfsHash',
      upvotes_count: 'u16',
      downvotes_count: 'u16',
      shares_count: 'u16',
      direct_replies_count: 'u16',
      edit_history: 'VecCommentHistoryRecord',
      score: 'Score'
    },
    ProfileUpdate: {
      username: 'OptionText',
      ipfs_hash: 'OptionIpfsHash'
    },
    ProfileHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'ProfileUpdate'
    },
    Profile: {
      created: 'WhoAndWhen',
      updated: 'OptionWhoAndWhen',
      username: 'Text',
      ipfs_hash: 'IpfsHash',
      edit_history: 'Vec<ProfileHistoryRecord>'
    },
    SocialAccount: {
      followers_count: 'u32',
      following_accounts_count: 'u16',
      following_blogs_count: 'u16',
      reputation: 'u32',
      profile: 'OptionProfile'
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
    ReactionKind: {
      _enum: [
        'Upvote',
        'Downvote'
      ]
    },
    Reaction: {
      id: 'ReactionId',
      created: 'WhoAndWhen',
      updated: 'OptionWhoAndWhen',
      kind: 'ReactionKind'
    },
    PostExtension: {
      _enum: {
        RegularPost: 'Null',
        SharedPost: 'PostId',
        SharedComment: 'CommentId'
      }
    },
    Post: {
      id: 'PostId',
      blog_id: 'BlogId',
      created: 'WhoAndWhen',
      updated: 'OptionWhoAndWhen',
      extension: 'PostExtension',
      ipfs_hash: 'IpfsHash',
      comments_count: 'u16',
      upvotes_count: 'u16',
      downvotes_count: 'u16',
      shares_count: 'u16',
      edit_history: 'Vec<PostHistoryRecord>',
      score: 'Score'
    }
  }
}
