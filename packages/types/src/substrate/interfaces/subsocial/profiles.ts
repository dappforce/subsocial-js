import {buildTypes} from "./utils";

const v0 = buildTypes({
    types: {
        SocialAccount: {
            followers_count: "u32",
            following_accounts_count: "u16",
            following_spaces_count: "u16",
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
