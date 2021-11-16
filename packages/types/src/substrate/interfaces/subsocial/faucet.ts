import {buildTypes} from "./utils";

const v0 = buildTypes({
    types: {
        FaucetSettings: {
            period: "Option<BlockNumber>",
            period_limit: "Balance",
        },
        FaucetSettingsUpdate: {
            period: "Option<Option<BlockNumber>>",
            period_limit: "Option<Balance>",
        },
        Faucet: {
            enabled: "bool",
            period: "BlockNumber",
            period_limit: "Balance",
            drip_limit: "Balance",

            next_period_at: "BlockNumber",
            dripped_in_current_period: "Balance",
        },

        FaucetUpdate: {
            enabled: "Option<bool>",
            period: "Option<BlockNumber>",
            period_limit: "Option<Balance>",
            drip_limit: "Option<Balance>",
        },
    }})

export default [ v0 ]
