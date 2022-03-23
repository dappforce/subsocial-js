import { ApiPromise, WsProvider } from '@polkadot/api';
import { newLogger } from '@subsocial/utils';
import registry from '@subsocial/types/substrate/registry';
import { formatBalance } from '@polkadot/util';
import { typesBundle } from '@subsocial/types'
import { ChainProperties } from '@polkadot/types/interfaces'
import { Text, U32 } from '@polkadot/types';

const logger = newLogger('SubstrateConnection');

let api: ApiPromise | undefined = undefined

/** Get the current open connection to Substrate node. */
export const getSubstrateApi = async (nodeUrl?: string) => {
  if (api) return api

  const rpcEndpoint = nodeUrl || 'ws://127.0.0.1:9944/';
  const provider = new WsProvider(rpcEndpoint);

  logger.info(`Connecting to Substrate node at ${rpcEndpoint}...`);
  api = new ApiPromise({ provider, typesBundle })
  await api.isReady

  const properties = await api.rpc.system.properties() as ChainProperties
  const tokenSymbol = properties.tokenSymbol.unwrapOr(undefined)?.map((x: Text) => x.toString());
  const tokenDecimals = properties.tokenDecimals.unwrapOr(undefined)?.map((x: U32) => x.toNumber());

  registry.setChainProperties(properties)

  formatBalance.setDefaults({
    decimals: tokenDecimals,
    unit: tokenSymbol
  });

  return api
}
