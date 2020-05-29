import { getApi } from '../src/substrateConnect';
import { SubsocialApi } from '../src/fullApi';
import BN from 'bn.js';

// NOTE: To run this test pack you need to have Substrate node, IPFS node
// and Offchain app running at locally the next URLs:

const ipfsNodeUrl = 'http://localhost:8080'
const offchainUrl = 'http://localhost:3001'

test('Find a space in Substrate and IPFS', async () => {
  const substrateApi = await getApi();
  const spaceId = new BN(1);
  const api = new SubsocialApi({ substrateApi, ipfsNodeUrl, offchainUrl });
  const space = await api.findSpace(spaceId);
  console.log('Found space:', { ...space });
  expect(space.struct.id.toString()).toBe(spaceId.toString());
})

test('Find a shared post in Substrate and IPFS', async () => {
  const substrateApi = await getApi();
  const postId = new BN(2);
  const api = new SubsocialApi({ substrateApi, ipfsNodeUrl, offchainUrl });
  const extPostData = await api.findPostWithAllDetails(postId)
  console.log('Found a PostData of extension:', { ...extPostData })
  expect(extPostData.post.struct.id.toString()).toBe(postId.toString());
})
