import { getApi } from '../src/substrateConnect';
import { SubsocialApi } from '../src/fullApi';
import BN from 'bn.js';
import { BlogData } from '@subsocial/types/src';

const ipfsUrl = '/ip4/127.0.0.1/tcp/5001/http';

test('Find blog from Substrate and IPFS', async () => {
  const substrarteApi = await getApi();
  const blogId = new BN(1);
  const api = new SubsocialApi(substrarteApi, ipfsUrl);
  const blog = await api.findBlog(blogId);
  console.log({ ...blog });
  expect(blog).toBeInstanceOf(BlogData);
})
