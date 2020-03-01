import { ApiPromise, WsProvider } from '@polkadot/api';
import { registerSubsocialTypes } from './DfRegisterTypes';

let api: ApiPromise | undefined

export { api };
export class SubstrateApi {
  protected api!: ApiPromise;

  protected сonnected = false;

  public setup = async () => {
    await this.connectToApi();
    api = this.api;
    this.сonnected = true;
    return this.api;
  }

  public destroy = () => {
    const { api, сonnected } = this;
    if (api && сonnected) {
      api.disconnect();
      console.log('Disconnected from Substrate API.');
    }
  }

  private connectToApi = async () => {
    const rpcEndpoint = process.env.SUBSTRATE_URL || 'ws://127.0.0.1:9944/';
    const provider = new WsProvider(rpcEndpoint);

    // Register types before creating the API:
    registerSubsocialTypes();

    // Create the API and wait until ready:
    console.log(`Connecting to Substrate API at ${rpcEndpoint}`);
    this.api = await ApiPromise.create({ provider });

    // Retrieve the chain & node information information via rpc calls
    const system = this.api.rpc.system;

    const [ chain, nodeName, nodeVersion ] = await Promise.all(
      [ system.chain(), system.name(), system.version() ]);

    console.log(`Connected to chain '${chain}' (${nodeName} v${nodeVersion})`);
  }
}

export const Api = new SubstrateApi();
export default Api;
