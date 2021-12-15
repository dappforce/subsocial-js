import {buildTypes} from "./utils";

const v0 = buildTypes({
    types: {
        RoleId: "u64",
        Role: {
            created: "WhoAndWhen",
            updated: "Option<WhoAndWhen>",
            id: "RoleId",
            space_id: "SpaceId",
            disabled: "bool",
            expires_at: "Option<BlockNumber>",
            content: "Content",
            permissions: "SpacePermissionSet",
        },
        RoleUpdate: {
            disabled: "Option<bool>",
            content: "Option<Content>",
            permissions: "Option<SpacePermissionSet>",
        },
    }})

export default [ v0 ]
