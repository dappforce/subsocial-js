import { getApi } from '../src/substrateConnect';
import { SubsocialSubstrateApi } from '../src/substrate';
import BN from 'bn.js';

test('Run test', async () => {
  const api = await getApi();
  const substrate = new SubsocialSubstrateApi(api);
  const blog = await substrate.findBlog(new BN(1))
  console.log(blog);
});
