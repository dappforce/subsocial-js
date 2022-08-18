import { ApiPromise, WsProvider } from '@polkadot/api';
import { newLogger } from '@subsocial/utils';
import { formatBalance } from '@polkadot/util';

const logger = newLogger('SubstrateConnection');

let api: ApiPromise | undefined = undefined

/** Get the current open connection to Substrate node. */
export const getSubstrateApi = async (nodeUrl?: string) => {
  if (api) return api

  const rpcEndpoint = nodeUrl || 'ws://127.0.0.1:9944/';
  const provider = new WsProvider(rpcEndpoint);

  logger.info(`Connecting to Substrate node at ${rpcEndpoint}...`);
  api = await ApiPromise.create({ provider })

  formatBalance.setDefaults({
    decimals: api.registry.chainDecimals,
    unit: api.registry.chainTokens
  });

  return api
}
