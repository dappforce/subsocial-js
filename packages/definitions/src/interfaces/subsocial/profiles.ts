import {buildTypes} from "./utils";

const v0 = buildTypes({
    types: {
        SocialAccount: {
            followersCount: "u32",
            followingAccountsCount: "u16",
            followingSpacesCount: "u16",
            reputation: "u32",
            profile: "Option<Profile>",
        },
        Profile: {
            created: "WhoAndWhen",
            updated: "Option<WhoAndWhen>",
            content: "Content",
        },
        ProfileUpdate: {
            content: "Option<Content>",
        },
    }})

export default [ v0 ]
