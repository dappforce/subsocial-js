import {buildTypes} from "./utils";

const v0 = buildTypes({
    types: {
        PostId: "u64",
        Post: {
            id: "PostId",
            created: "WhoAndWhen",
            updated: "Option<WhoAndWhen>",
            owner: "AccountId",
            extension: "PostExtension",
            spaceId: "Option<SpaceId>",
            content: "Content",
            hidden: "bool",
            repliesCount: "u16",
            hiddenRepliesCount: "u16",
            sharesCount: "u16",
            upvotesCount: "u16",
            downvotesCount: "u16",
            score: "i32",
        },
        PostUpdate: {
            spaceId: "Option<SpaceId>",
            content: "Option<Content>",
            hidden: "Option<bool>",
        },
        PostExtension: {
            _enum: {
                RegularPost: "Null",
                Comment: "Comment",
                SharedPost: "PostId",
            },
        },
        Comment: {
            parentId: "Option<PostId>",
            rootPostId: "PostId",
        },
    }})

export default [ v0 ]
