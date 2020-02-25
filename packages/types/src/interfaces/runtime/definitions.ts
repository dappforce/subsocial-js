/* eslint-disable @typescript-eslint/camelcase */
import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
  types: {
    ...definitions.types,
    Score: 'i32',
    BlogId: 'u64',
    PostId: 'u64',
    CommentId: 'u64',
    ReactionId: 'u64',
    IpfsHash: 'Text',
    OptionIpfsHash: 'Option<IpfsHash>',
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
    PostExtension: {
      _enum: {
        RegularPost: 'Null',
        SharedPost: 'PostId',
        SharedComment: 'CommentId'
      }
    },
    ReactionKind: {
      _enum: [
        'Upvote',
        'Downvote'
      ]
    },
    Change: {
      account: 'AccountId',
      block: 'BlockNumber',
      time: 'Moment'
    },
    VecAccountId: 'Vec<AccountId>',
    OptionText: 'Option<Text>',
    OptionChange: 'Option<Change>',
    OptionBlogId: 'Option<BlogId>',
    OptionCommentId: 'Option<CommentId>',
    OptionVecAccountId: 'Option<VecAccountId>',
    Blog: {
      id: 'BlogId',
      created: 'Change',
      updated: 'Option<Change>',
      writers: 'VecAccountId',
      slug: 'Text',
      ipfs_hash: 'IpfsHash',
      posts_count: 'u16',
      followers_count: 'u32',
      edit_history: 'Vec<BlogHistoryRecord>',
      score: 'Score'
    },
    BlogUpdate: {
      writers: 'OptionVecAccountId',
      slug: 'OptionText',
      ipfs_hash: 'OptionIpfsHash'
    },
    Post: {
      id: 'PostId',
      blog_id: 'BlogId',
      created: 'Change',
      updated: 'OptionChange',
      extension: 'PostExtension',
      ipfs_hash: 'IpfsHash',
      comments_count: 'u16',
      upvotes_count: 'u16',
      downvotes_count: 'u16',
      shares_count: 'u16',
      edit_history: 'Vec<PostHistoryRecord>',
      score: 'Score'
    },
    PostUpdate: {
      blog_id: 'OptionBlogId',
      ipfs_hash: 'OptionIpfsHash'
    },
    Comment: {
      id: 'CommentId',
      parent_id: 'OptionCommentId',
      post_id: 'PostId',
      created: 'Change',
      updated: 'OptionChange',
      ipfs_hash: 'IpfsHash',
      upvotes_count: 'u16',
      downvotes_count: 'u16',
      shares_count: 'u16',
      direct_replies_count: 'u16',
      edit_history: 'VecCommentHistoryRecord',
      score: 'Score'
    },
    Reaction: {
      id: 'ReactionId',
      created: 'Change',
      updated: 'OptionChange',
      kind: 'ReactionKind'
    },
    SocialAccount: {
      followers_count: 'u32',
      following_accounts_count: 'u16',
      following_blogs_count: 'u16',
      reputation: 'u32',
      profile: 'OptionProfile'
    },
    Profile: {
      created: 'Change',
      updated: 'OptionChange',
      username: 'Text',
      ipfs_hash: 'IpfsHash',
      edit_history: 'Vec<ProfileHistoryRecord>'
    },
    CommentUpdate: {
      ipfs_hash: 'IpfsHash'
    },
    OptionProfile: 'Option<Profile>',
    ProfileUpdate: {
      username: 'OptionText',
      ipfs_hash: 'OptionIpfsHash'
    },
    BlogHistoryRecord: {
      edited: 'Change',
      old_data: 'BlogUpdate'
    },
    PostHistoryRecord: {
      edited: 'Change',
      old_data: 'PostUpdate'
    },
    CommentHistoryRecord: {
      edited: 'Change',
      old_data: 'CommentUpdate'
    },
    VecCommentHistoryRecord: 'Vec<CommentHistoryRecord>',
    ProfileHistoryRecord: {
      edited: 'Change',
      old_data: 'ProfileUpdate'
    },
    VecProfileHistoryRecord: 'Vec<ProfileHistoryRecord>'
  }
};
