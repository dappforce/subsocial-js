import {buildTypes} from "./utils";

const v0 = buildTypes({
    types: {
        SpaceHistoryRecord: {
            edited: "WhoAndWhen",
            old_data: "SpaceUpdate",
        },
        PostHistoryRecord: {
            edited: "WhoAndWhen",
            old_data: "PostUpdate",
        },
        ProfileHistoryRecord: {
            edited: "WhoAndWhen",
            old_data: "ProfileUpdate",
        },
    }})

export default [ v0 ]
