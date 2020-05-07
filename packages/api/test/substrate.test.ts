import { getApi } from '../src/substrateConnect';
import { SubsocialSubstrateApi } from '../src/substrate';
import BN from 'bn.js';
import { SubsocialIpfsApi } from '../src/ipfs';

let blogHash: string | undefined;
const ipfs = new SubsocialIpfsApi({
  ipfsNodeUrl: 'http://localhost:8080',
  ipfsClusterUrl: 'http://localhost:9094',
  offchainUrl: 'http:localhost:3001'
});

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
