import { getApi } from '../src/substrateConnect';
import { SubsocialSubstrateApi } from '../src/substrate';
import BN from 'bn.js';
import { SubsocialIpfsApi } from '../src/ipfs';

let blogHash: string | undefined;
const ipfs = new SubsocialIpfsApi('/ip4/127.0.0.1/tcp/5002/http');

test('Get a blog from Substrate', async () => {
  const api = await getApi();
  const blogId = new BN(1);
  const substrate = new SubsocialSubstrateApi(api);
  const blog = await substrate.findBlog(blogId)
  blogHash = blog?.ipfs_hash.toString();
  expect(typeof blog !== 'undefined').toBe(true)
});

test('Get a blog from IPFS', async () => {
  const blog = blogHash && await ipfs.findBlog(blogHash)
  console.log(blog);
  expect(typeof blog).toBe('object')
});
