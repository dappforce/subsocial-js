import { ApiPromise, HttpProvider, WsProvider } from '@polkadot/api'
import { formatBalance } from '@polkadot/util'
import '@subsocial/definitions/interfaces/types-lookup'
import '@subsocial/definitions/interfaces/augment-api'

let api: ApiPromise | undefined = undefined

/** Get the current open connection to Substrate node. */
export const getSubstrateApi = async (nodeUrl?: string) => {
  if (api) return api

  const rpcEndpoint = nodeUrl || 'ws://127.0.0.1:9944/'
  const provider = rpcEndpoint.startsWith('http')
    ? new HttpProvider(rpcEndpoint)
    : new WsProvider(rpcEndpoint)

  api = await ApiPromise.create({ provider })

  formatBalance.setDefaults({
    decimals: api.registry.chainDecimals,
    unit: api.registry.chainTokens
  })

  return api
}
