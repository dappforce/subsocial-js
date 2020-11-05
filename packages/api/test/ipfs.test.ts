/* eslint-disable @typescript-eslint/no-var-requires */
import { SpaceContent, PostContent, CommentContent } from '@subsocial/types/src/offchain';
import { SubsocialIpfsApi } from '../src/ipfs';

const ipfs = new SubsocialIpfsApi({
  ipfsNodeUrl: 'http://localhost:8080',
  offchainUrl: 'http://localhost:3001'
});

const cids = new Map();

const spaceContent: SpaceContent = {
  name: 'Test Space',
  about: 'Space about',
  image: 'https://www.jisc.ac.uk/sites/default/files/spaceging.jpg',
  tags: [ 'space_tag_1', 'space_tag_2' ]
}

const postContent: PostContent = {
  title: 'Test Post',
  body: 'Post body',
  canonical: 'http://original.acticle.com',
  image: 'https://www.petpaw.com.au/wp-content/uploads/2013/02/Tonkinese-cute-cat-1030x772.jpg',
  tags: [ 'post_tag_1', 'post_tag_2' ]
}

const commentContent: CommentContent = {
  body: 'Cool Comment'
}

test('Save a space to IPFS', async () => {
  const hash = await ipfs.saveSpace(spaceContent);
  cids.set('Space', hash);
  expect(typeof hash).toBe('string');
})

test('Save a post to IPFS', async () => {
  const hash = await ipfs.savePost(postContent);
  cids.set('Post', hash);
  expect(typeof hash).toBe('string');
})

test('Save a comment to IPFS', async () => {
  const hash = await ipfs.saveComment(commentContent);
  cids.set('Comment', hash);
  expect(typeof hash).toBe('string');
})

test('Load a space from IPFS', async () => {
  const struct = await ipfs.findSpace(cids.get('Space'));
  expect(struct).toEqual(spaceContent);
})

test('Load a post from IPFS', async () => {
  const struct = await ipfs.findPost(cids.get('Post'));
  expect(struct).toEqual(postContent);
})

test('Load a comment from IPFS', async () => {
  const struct = await ipfs.findComment(cids.get('Comment'));
  expect(struct).toEqual(commentContent);
})
