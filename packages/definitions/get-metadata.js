const { WsProvider, ApiPromise } = require("@polkadot/api");
const { writeFileSync } = require("fs");
const {exit} = require("process");

const getApi = async () => {
    const provider = new WsProvider("wss://para.subsocial.network");

    await new ApiPromise({ provider }).isReady

    const result = await provider.send("state_getMetadata", [])

    writeFileSync('subsocial.json', JSON.stringify({ jsonrpc: "2.0", result }))

    exit()
};

getApi();
