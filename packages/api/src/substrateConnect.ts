import { ApiPromise, WsProvider } from '@polkadot/api';
import { types } from '@subsocial/types/substrate/preparedTypes';
import { newLogger } from '@subsocial/utils';

const logger = newLogger('SubstrateConnection');

let api: ApiPromise;

export { api };

export class DfApi {

  protected static api: ApiPromise;

  protected static connected = false;

  public static connect = async (nodeUrl?: string): Promise<ApiPromise> => {
    const rpcEndpoint = nodeUrl || 'ws://127.0.0.1:9944/';
    const provider = new WsProvider(rpcEndpoint);

    logger.info(`Connecting to Substrate node at ${rpcEndpoint}...`);
    const api = await ApiPromise.create({ provider, types });
    await api.isReady
    DfApi.api = api
    DfApi.connected = true
    DfApi.logChainInfo()

    return api
  }

  public static disconnect = () => {
    const { api: localApi, connected } = DfApi;
    if (api !== undefined && localApi && localApi.isReady && connected) {
      try {
        localApi.disconnect();
        logger.info('Disconnected from Substrate node');
      } catch (err) {
        logger.error('Failed to disconnect from Substrate node:', err)
      } finally {
        DfApi.connected = false
      }
    }
  }

  /** Retrieve the chain & node information via RPC calls and log into console.  */
  protected static logChainInfo = async () => {
    const { system } = DfApi.api.rpc;

    const [ chain, nodeName, nodeVersion ] = await Promise.all(
      [ system.chain(), system.name(), system.version() ]);

    logger.info(`Connected to Substrate chain '${chain}' (${nodeName} v${nodeVersion})`)
  }
}

export const Api = DfApi

export default DfApi

/** Get the current open connection to Substrate node. */
export const getApi = async () => {
  if (!api) {
    api = await DfApi.connect()
  }
  return api
}
