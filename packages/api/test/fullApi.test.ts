import { getApi } from '../src/substrateConnect';
import { SubsocialApi } from '../src/fullApi';
import BN from 'bn.js';
import { BlogData } from '@subsocial/types';

const ipfsUrl = '/ip4/127.0.0.1/tcp/5002/http';

test('Find blog from Substrate and Ipfs', async () => {
  const substrarteApi = await getApi();
  const blogId = new BN(1);
  const api = new SubsocialApi(substrarteApi, ipfsUrl);
  const blog = await api.findBlog(blogId);
  console.log({ ...blog });
  expect(blog).toBeInstanceOf(BlogData);
})
