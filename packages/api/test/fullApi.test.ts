import { getApi } from '../src/substrateConnect';
import { SubsocialApi } from '../src/fullApi';
import BN from 'bn.js';

const ipfsUrl = '/ip4/127.0.0.1/tcp/8080/http';
const offchainUrl = 'http://localhost:3001'

test('Find blog from Substrate and IPFS', async () => {
  const substrateApi = await getApi();
  const blogId = new BN(1);
  const api = new SubsocialApi({ substrateApi, ipfsApi: ipfsUrl, offchainUrl: offchainUrl} );
  const blog = await api.findBlog(blogId);
  console.log({ ...blog });
  expect(blog.struct.id.toString()).toBe(blogId.toString());
})

test('Find sharedPost from Substrate and IPFS', async () => {
  const substrateApi = await getApi();
  const postId = new BN(2);
  const api = new SubsocialApi({ substrateApi, ipfsApi: ipfsUrl, offchainUrl: offchainUrl} );
  const extPostData = await api.findPostWithExt(postId)
  console.log({ ...extPostData })
  expect(extPostData.post.struct.id.toString()).toBe(postId.toString());
})
