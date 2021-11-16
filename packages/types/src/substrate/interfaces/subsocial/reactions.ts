import {buildTypes} from "./utils";

const v0 = buildTypes({
    types: {
        ReactionId: "u64",
        ReactionKind: {
            _enum: ["Upvote", "Downvote"],
        },
        Reaction: {
            id: "ReactionId",
            created: "WhoAndWhen",
            updated: "Option<WhoAndWhen>",
            kind: "ReactionKind",
        },
    }})

export default [ v0 ]
