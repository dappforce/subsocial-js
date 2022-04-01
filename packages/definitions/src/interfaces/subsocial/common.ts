import {buildTypes} from "./utils";

const v0 = buildTypes({
    types: {
        IpfsCid: "Text",
        WhoAndWhen: {
            account: "AccountId",
            block: "BlockNumber",
            time: "Moment",
        },
        User: {
            _enum: {
                Account: "AccountId",
                Space: "SpaceId",
            },
        },
        Content: {
            _enum: {
                None: "Null",
                Raw: "Text",
                IPFS: "Text",
                Hyper: "Text",
            },
        },
    }})

export default [ v0 ]
