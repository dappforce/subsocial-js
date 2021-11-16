import {buildTypes} from "./utils";

const spacePermissionEnum = [
    "ManageRoles",
    "RepresentSpaceInternally",
    "RepresentSpaceExternally",
    "UpdateSpace",
    "CreateSubspaces",
    "UpdateOwnSubspaces",
    "DeleteOwnSubspaces",
    "HideOwnSubspaces",
    "UpdateAnySubspace",
    "DeleteAnySubspace",
    "HideAnySubspace",
    "CreatePosts",
    "UpdateOwnPosts",
    "DeleteOwnPosts",
    "HideOwnPosts",
    "UpdateAnyPost",
    "DeleteAnyPost",
    "HideAnyPost",
    "CreateComments",
    "UpdateOwnComments",
    "DeleteOwnComments",
    "HideOwnComments",
    "HideAnyComment",
    "Upvote",
    "Downvote",
    "Share",
    "OverrideSubspacePermissions",
    "OverridePostPermissions",
    "SuggestEntityStatus",
    "UpdateEntityStatus",
    "UpdateSpaceSettings",
]

const v0 = buildTypes({
    types: {
        SpacePermissionSet: "BTreeSet<SpacePermission>",
        SpacePermission: {
            _enum: spacePermissionEnum,
        },
        SpacePermissions: {
            none: "Option<SpacePermissionSet>",
            everyone: "Option<SpacePermissionSet>",
            follower: "Option<SpacePermissionSet>",
            space_owner: "Option<SpacePermissionSet>",
        },
        SpacePermissionsContext: {
            space_id: "SpaceId",
            is_space_owner: "bool",
            is_space_follower: "bool",
            space_perms: "Option<SpacePermissions>",
        },
    }})

export default [ v0 ]
