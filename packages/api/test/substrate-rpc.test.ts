import { SubsocialSubstrateRpc } from '../src/substrate-rpc'

test('Test get unlisted space', async () => {
  const rpc = new SubsocialSubstrateRpc({ rpcUrl: 'http://34.65.245.125:9933'})

  const spaces = await rpc.getUnlistedSpaces({ offset: 0, limit: 1000 })

  expect(spaces.length).toBe(1000)
})