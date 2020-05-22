import { regularPostId, commentIdOnRegularPost, commentIdOnSharedPost, sharedCommentId, sharedPostId } from './mocks/PostMocks'
import { findBlogs, findPosts, findProfiles  } from './mocks/MocksDB'
import { loadPostsStruct } from '../src/loadPostsStruct'

const methods = {
  findBlogs,
  findPosts,
  findProfiles
}

test('Load regular and shared post', async () => {
  const ids = [ regularPostId, sharedPostId ]
  const posts = await findPosts(ids);
  const results = await loadPostsStruct(posts, methods)
  console.log('Regular and shared post: ', results)
  expect(posts.length).toBe(2)
})

test('Load comment on regular and shared post, also shared comment post', async () => {
  const ids = [ commentIdOnRegularPost, commentIdOnSharedPost, sharedCommentId ]
  const posts = await findPosts(ids);
  const results = await loadPostsStruct(posts, methods)
  console.log('Comment and shared comment post: ', results)
  expect(results.length).toBe(posts.length)
})