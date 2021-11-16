import {buildTypes} from "./utils";

const v0 = buildTypes({
    max: 12,
    types: {
        AccountInfo: "AccountInfoWithRefCount"
    }})

const v1 = buildTypes({
    min: 13,
    max: 14,
    types: {
        AccountInfo: "AccountInfoWithDualRefCount"
    }})

const v2 = buildTypes({
    min: 15,
    types: {
        AccountInfo: "AccountInfoWithTripleRefCount"
    }})

export default [ v0, v1, v2 ]
