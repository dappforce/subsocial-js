import { getApi } from '../src/substrateConnect';
import { SubsocialSubstrateApi } from '../src/substrate';
import BN from 'bn.js';
import { SubsocialIpfsApi } from '../src/ipfs';

let spaceHash: string | undefined;
const ipfs = new SubsocialIpfsApi({
  ipfsNodeUrl: 'http://localhost:8080',
  offchainUrl: 'http:localhost:3001'
});

test('Get a space from Substrate', async () => {
  const api = await getApi();
  const spaceId = new BN(1);
  const substrate = new SubsocialSubstrateApi(api);
  const space = await substrate.findSpace(spaceId)
  spaceHash = space?.ipfs_hash.toString();
  expect(typeof space !== 'undefined').toBe(true)
});

test('Get a space from IPFS', async () => {
  const space = spaceHash && await ipfs.findSpace(spaceHash)
  console.log(space);
  expect(typeof space).toBe('object')
});
