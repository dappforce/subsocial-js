import { ApiPromise, WsProvider } from '@polkadot/api';
import { newLogger } from '@subsocial/utils';
import registry from '@subsocial/types/substrate/registry';
import { formatBalance } from '@polkadot/util';
import { typesBundle, types } from '@subsocial/types'
import rpc from '@polkadot/types/interfaces/jsonrpc'
import { ChainProperties } from '@polkadot/types/interfaces'
import { Text, U32 } from '@polkadot/types';

const DEFAULT_DECIMALS = [ 12 ]
const DEFAULT_TOKEN = [ 'SMN' ]

const logger = newLogger('SubstrateConnection');

let api: ApiPromise;

export class SubstrateConnect {

  protected static api: ApiPromise;

  protected static connected = false;

  public static connect = async (nodeUrl?: string, metadata?: Record<string, string>): Promise<ApiPromise> => {
    const rpcEndpoint = nodeUrl || 'ws://127.0.0.1:9944/';
    const provider = new WsProvider(rpcEndpoint);

    logger.info(`Connecting to Substrate node at ${rpcEndpoint}...`);
    const api = new ApiPromise({ provider, typesBundle, types, rpc: { ...rpc }, metadata })
    await api.isReady
    SubstrateConnect.api = api
    SubstrateConnect.connected = true
    SubstrateConnect.logChainInfo()

    const properties = await api.rpc.system.properties() as ChainProperties

    const tokenSymbol = properties.tokenSymbol.unwrapOr(undefined)?.map((x: Text) => x.toString()) || DEFAULT_TOKEN;
    const tokenDecimals = properties.tokenDecimals.unwrapOr(undefined)?.map((x: U32) => x.toNumber()) || DEFAULT_DECIMALS;

    registry.setChainProperties(properties)

    formatBalance.setDefaults({
      decimals: tokenDecimals,
      unit: tokenSymbol
    });

    return api
  }

  public static disconnect = () => {
    const { api: localApi, connected } = SubstrateConnect;
    if (api !== undefined && localApi && localApi.isReady && connected) {
      try {
        localApi.disconnect();
        logger.info('Disconnected from Substrate node');
      } catch (err) {
        logger.error('Failed to disconnect from Substrate node:', err)
      } finally {
        SubstrateConnect.connected = false
      }
    }
  }

  /** Retrieve the chain & node information via RPC calls and log into console.  */
  protected static logChainInfo = async () => {
    const { system } = SubstrateConnect.api.rpc;

    const [ chain, nodeName, nodeVersion ] = await Promise.all(
      [ system.chain(), system.name(), system.version() ]);

    logger.info(`Connected to Substrate chain '${chain}' (${nodeName} v${nodeVersion})`)
  }
}

export const Api = SubstrateConnect

export default SubstrateConnect

/** Get the current open connection to Substrate node. */
export const getApi = async (url: string) => {
  return api || await SubstrateConnect.connect(url)
}
