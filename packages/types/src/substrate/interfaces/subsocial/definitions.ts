export default {
  types: {
    WhoAndWhen: {
      account: 'AccountId',
      block: 'BlockNumber',
      time: 'Moment'
    },
    OptionVecAccountId: 'Option<Vec<AccountId>>',
    IpfsHash: 'Text',
    BlogId: 'u64',
    PostId: 'u64',
    ReactionId: 'u64',
    Blog: {
      id: 'BlogId',
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      hidden: 'bool',
      owner: 'AccountId',
      handle: 'Option<Text>',
      ipfs_hash: 'IpfsHash',
      posts_count: 'u16',
      followers_count: 'u32',
      edit_history: 'Vec<BlogHistoryRecord>',
      score: 'i32'
    },
    BlogUpdate: {
      handle: 'Option<Option<Text>>',
      ipfs_hash: 'Option<IpfsHash>',
      hidden: 'Option<bool>'
    },
    BlogHistoryRecord: {
      edited: 'WhoAndWhen',
      old_data: 'BlogUpdate'
    },
    Post: {
      id: 'PostId',
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      hidden: 'bool',
      blog_id: 'Option<BlogId>',
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
      blog_id: 'Option<BlogId>',
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
        'CreateComment',
        'UpvoteComment',
        'DownvoteComment',
        'ShareComment',
        'FollowBlog',
        'FollowAccount'
      ]
    }
  }
}
