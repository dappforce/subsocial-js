import { regularPostId, commentIdOnRegularPost, commentIdOnSharedPost, sharedCommentId, sharedPostId } from './mocks/PostMocks'
import { findSpaces, findPosts, findProfiles  } from './mocks/MocksDB'
import { loadAndSetPostRelatedStructs } from '../src/utils/loadPostStructs'

const methods = {
  findSpaces,
  findPosts,
  findProfiles
}

const opts = { withOwner: true, withSpace: true }

test('Load regular and shared post', async () => {
  const ids = [ regularPostId, sharedPostId ]
  const posts = await findPosts(ids);
  const results = await loadAndSetPostRelatedStructs(posts, methods, opts)
  console.log('Regular and shared post: ', results)
  expect(results.length).toBe(posts.length)
})

test('Load comment on regular and shared post, also shared comment post', async () => {
  const ids = [ commentIdOnRegularPost, commentIdOnSharedPost, sharedCommentId ]
  const posts = await findPosts(ids);
  const results = await loadAndSetPostRelatedStructs(posts, methods, opts)
  console.log('Comment and shared comment post: ', results)
  expect(results.length).toBe(posts.length)
})