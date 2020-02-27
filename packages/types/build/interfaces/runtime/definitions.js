"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _definitions = _interopRequireDefault(require("@polkadot/types/interfaces/runtime/definitions"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  types: _objectSpread({}, _definitions.default.types, {
    Score: 'i32',
    BlogId: 'u64',
    PostId: 'u64',
    CommentId: 'u64',
    ReactionId: 'u64',
    IpfsHash: 'Text',
    OptionIpfsHash: 'Option<IpfsHash>',
    ScoringAction: {
      _enum: ['UpvotePost', 'DownvotePost', 'SharePost', 'UpvoteComment', 'DownvoteComment', 'ShareComment', 'FollowBlog', 'FollowAccount']
    },
    PostExtension: {
      _enum: {
        RegularPost: 'Null',
        SharedPost: 'PostId',
        SharedComment: 'CommentId'
      }
    },
    ReactionKind: {
      _enum: ['Upvote', 'Downvote']
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
  })
};
exports.default = _default;