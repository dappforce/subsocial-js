import {buildTypes} from "./utils";

const v0 = buildTypes({
    types: {
        SpaceHistoryRecord: {
            edited: "WhoAndWhen",
            oldData: "SpaceUpdate",
        },
        PostHistoryRecord: {
            edited: "WhoAndWhen",
            oldData: "PostUpdate",
        },
        ProfileHistoryRecord: {
            edited: "WhoAndWhen",
            oldData: "ProfileUpdate",
        },
    }})

export default [ v0 ]
