import { getApi } from '../src/substrateConnect';
import { SubsocialApi } from '../src/fullApi';
import BN from 'bn.js';

// NOTE: To run this test pack you need to have Substrate node, IPFS node
// and Offchain app running at locally the next URLs:

const ipfsNodeUrl = 'http://localhost:8080'
const ipfsClusterUrl = 'http://localhost:9094'
const offchainUrl = 'http://localhost:3001'

test('Find a blog in Substrate and IPFS', async () => {
  const substrateApi = await getApi();
  const blogId = new BN(1);
  const api = new SubsocialApi({ substrateApi, ipfsNodeUrl, ipfsClusterUrl, offchainUrl: offchainUrl} );
  const blog = await api.findBlog(blogId);
  console.log('Found blog:', { ...blog });
  expect(blog.struct.id.toString()).toBe(blogId.toString());
})

test('Find a shared post in Substrate and IPFS', async () => {
  const substrateApi = await getApi();
  const postId = new BN(2);
  const api = new SubsocialApi({ substrateApi, ipfsNodeUrl, ipfsClusterUrl, offchainUrl: offchainUrl} );
  const extPostData = await api.findPostWithExt(postId)
  console.log('Found a PostData of extension:', { ...extPostData })
  expect(extPostData.post.struct.id.toString()).toBe(postId.toString());
})
