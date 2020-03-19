import { ApiPromise, WsProvider } from '@polkadot/api';
import { types } from '@subsocial/types/substrate/preparedTypes';

let api: ApiPromise;

export { api };
export class DfApi {

  protected static api: ApiPromise;

  protected static connected = false;

  public static connect = async (url?: string): Promise<ApiPromise> => {
    const rpcEndpoint = url || 'ws://127.0.0.1:9944/';
    const provider = new WsProvider(rpcEndpoint);

    // Create the API and wait until ready:
    console.log(`Connecting to Substrate API at ${rpcEndpoint}`);
    DfApi.api = await ApiPromise.create({ provider, types });
    DfApi.connected = true

    return DfApi.api
  }

  public static disconnect = () => {
    const { api: localApi, connected } = DfApi;
    if (api !== undefined && localApi && localApi.isReady && connected) {
      try {
        localApi.disconnect();
        console.log('Disconnected from Substrate API.');
      } catch (err) {
        console.log('Failed to disconnect from Substrate. Error:', err)
      } finally {
        DfApi.connected = false
      }
    }
  }

  /** Retrieve the chain & node information via RPC calls and log into console.  */
  protected static logChainInfo = async () => {
    const system = DfApi.api.rpc.system;

    const [ chain, nodeName, nodeVersion ] = await Promise.all(
      [ system.chain(), system.name(), system.version() ]);

    console.log(`Connected to Substrate chain '${chain}' (${nodeName} v${nodeVersion})`)
  }
}

export const Api = DfApi;
export default DfApi;

const MAX_CONN_TIME_SECS = 10

export const getApi = async () => {
  if (api) {
    console.log('Get Substrate API: SSR api');
    return api;
  } else {
    console.log('Get Substrate API: DfApi.setup()');
    api = await DfApi.connect();
    setTimeout(() => {
      DfApi.disconnect()
    }, MAX_CONN_TIME_SECS * 1000);
    return api;
  }
}
