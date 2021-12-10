import {buildTypes} from "./utils";

const v0 = buildTypes({ types: {
        Space: {
            id: "SpaceId",
            created: "WhoAndWhen",
            updated: "Option<WhoAndWhen>",
            owner: "AccountId",
            parentId: "Option<SpaceId>",
            handle: "Option<Text>",
            content: "Content",
            hidden: "bool",
            postsCount: "u32",
            hiddenPostsCount: "u32",
            followersCount: "u32",
            score: "i32",
            permissions: "Option<SpacePermissions>",
        },
        SpaceUpdate: {
            parentId: "Option<Option<SpaceId>>",
            handle: "Option<Option<Text>>",
            content: "Option<Content>",
            hidden: "Option<bool>",
            permissions: "Option<Option<SpacePermissions>>",
        },
        SpaceId: "u64",
        SpaceOwners: {
            created: "WhoAndWhen",
            spaceId: "SpaceId",
            owners: "Vec<AccountId>",
            threshold: "u16",
            changesCount: "u16",
        },
    }})

const v1 = buildTypes({
    min: 15,
    types: {
        SpacesSettings: {
            handlesEnabled: "bool"
        },
    }
})

export default [ v0, v1 ]
