import {buildTypes} from "./utils";

const v0 = buildTypes({
    types: {
        FaucetSettings: {
            period: "Option<BlockNumber>",
            periodLimit: "Balance",
        },
        FaucetSettingsUpdate: {
            period: "Option<Option<BlockNumber>>",
            periodLimit: "Option<Balance>",
        },
        Faucet: {
            enabled: "bool",
            period: "BlockNumber",
            periodLimit: "Balance",
            dripLimit: "Balance",

            nextPeriodAt: "BlockNumber",
            drippedInCurrentPeriod: "Balance",
        },

        FaucetUpdate: {
            enabled: "Option<bool>",
            period: "Option<BlockNumber>",
            periodLimit: "Option<Balance>",
            dripLimit: "Option<Balance>",
        },
    }})

export default [ v0 ]
