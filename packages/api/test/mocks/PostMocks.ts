import { Null } from '@polkadot/types';
import { registry } from '@subsocial/types/src/substrate/registry';
import { BlogId, Post, PostId, AccountId, BlockNumber, Moment, WhoAndWhen, IpfsHash } from '@subsocial/types/src/substrate/interfaces';
import { PostContent } from '@subsocial/types/src/offchain';
import BN from 'bn.js'
import { mockAccountAlice, mockAccountBob } from './AccountMocks';
import { PostData } from '@subsocial/types/src';

import { PostExtension, OptionId, CommentExt } from '@subsocial/types/src/substrate/classes';

let _id = 0
const nextId = (): PostId => new BN(++_id) as PostId
const createPostId = (id: number): PostId => new BN(id) as PostId
export const mockPostId = nextId()

type NewPostProps = {
  id?: number | BN | PostId,
  blog_id: OptionId<BlogId>
  account?: AccountId,
  extension?: PostExtension,
  ipfs_hash?: string,
}

function newPostStructMock ({
  id = nextId(),
  account = mockAccountAlice,
  ipfs_hash = '',
  blog_id = new OptionId(),
  extension = new PostExtension({ RegularPost: new Null(registry) })
}: NewPostProps): Post {
  return {
    id: new BN(id) as PostId,
    created: {
      account,
      block: new BN(12345) as BlockNumber,
      time: new BN(1586523823996) as Moment
    } as WhoAndWhen,
    ipfs_hash: ipfs_hash as unknown as IpfsHash,
    blog_id: blog_id,
    extension: extension
  } as unknown as Post
}

export const regularPostId = createPostId(1) 
export const sharedPostId = createPostId(2)
export const commentIdOnRegularPost = createPostId(3)
export const sharedCommentId = createPostId(4)
export const commentIdOnSharedPost = createPostId(5)

export const mockRegularPostStruct = newPostStructMock({
  id: regularPostId,
  account: mockAccountAlice,
  blog_id: new OptionId(new BN(1)),
  extension: new PostExtension({ RegularPost: new Null(registry) })
})

export const mockSharedPostStruct = newPostStructMock({
  account: mockAccountBob,
  id: sharedPostId,
  blog_id: new OptionId(new BN(2)),
  extension: new PostExtension({ SharedPost: regularPostId })
})

export const mockCommentOnRegularPostStruct = newPostStructMock({
  account: mockAccountAlice,
  id: commentIdOnRegularPost,
  blog_id: new OptionId(),
  extension: new PostExtension({ Comment: new CommentExt({ parent_id: new OptionId(), root_post_id: regularPostId})})
})

export const mockSharedCommentStruct = newPostStructMock({
  account: mockAccountBob,
  id: sharedCommentId,
  blog_id: new OptionId(new BN(1)),
  extension: new PostExtension({ SharedPost: commentIdOnRegularPost })
})

export const mockCommentOnSharedPostStruct = newPostStructMock({
  account: mockAccountAlice,
  id: commentIdOnSharedPost,
  blog_id: new OptionId(),
  extension: new PostExtension({ Comment: new CommentExt({ parent_id: new OptionId(), root_post_id: sharedPostId})})
})

export const mockRegularPostJson: PostContent = {
  title: 'Example post',
  body: 'The most interesting content ever.',
  image: '',
  tags: [ 'bitcoin', 'ethereum', 'polkadot' ],
  canonical: 'http://example.com'
}

export const mockSharedPostJson: PostContent = {
  body: 'The most interesting shared content ever.',
} as PostContent

export const mockCommentOnRegularPostJson: PostContent = {
  body: 'The most interesting comment content ever.',
} as PostContent

export const mockSharedCommentJson: PostContent = {
  body: 'The most interesting shared comment content ever.',
} as PostContent

export const mockCommentOnSharedPostJson: PostContent = {
  body: 'The most interesting comment on shared post content ever.',
} as PostContent

export const mockRegularPostData = {
  struct: mockRegularPostStruct,
  content: mockRegularPostJson
}

export const mockSharedPostData = {
  struct: mockSharedPostStruct,
  content: mockSharedPostJson
}

export const mockCommentOnRegularPostData = {
  struct: mockCommentOnRegularPostStruct,
  content: mockCommentOnRegularPostJson
}

export const mockSharedCommentData = {
  struct: mockSharedCommentStruct,
  content: mockSharedCommentJson
}

export const mockCommentOnSharedPostData = {
  struct: mockCommentOnSharedPostStruct,
  content: mockCommentOnSharedPostJson
}

export const mockPostsData: PostData[] = [
  mockRegularPostData,
  mockSharedPostData,
  mockCommentOnRegularPostData,
  mockSharedCommentData,
  mockCommentOnSharedPostData
]
