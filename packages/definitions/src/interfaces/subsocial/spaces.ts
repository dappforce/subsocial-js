import {buildTypes} from "./utils";

const v0 = buildTypes({ types: {
        Space: {
            id: "SpaceId",
            created: "WhoAndWhen",
            updated: "bool",
            owner: "AccountId",
            parent_id: "Option<SpaceId>",
            content: "Content",
            hidden: "bool",
            permissions: "Option<SpacePermissions>",
        },
        SpaceUpdate: {
            parent_id: "Option<Option<SpaceId>>",
            content: "Option<Content>",
            hidden: "Option<bool>",
            permissions: "Option<Option<SpacePermissions>>",
        },
        SpaceId: "u64",
        SpaceOwners: {
            created: "WhoAndWhen",
            space_id: "SpaceId",
            owners: "Vec<AccountId>",
            threshold: "u16",
            changes_count: "u16",
        },
    }})

const v1 = buildTypes({
    min: 15,
    types: {
        SpacesSettings: {
            handles_enabled: "bool"
        },
    }
})

export default [ v0, v1 ]
