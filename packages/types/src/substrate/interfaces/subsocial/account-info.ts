import {buildTypes} from "./utils";

const v0 = buildTypes({
    max: 9,
    types: {
        AccountInfo: "AccountInfoWithRefCountU8"
    }})

const v1 = buildTypes({
    min: 10,
    max: 12,
    types: {
        AccountInfo: "AccountInfoWithRefCount"
    }})

const v2 = buildTypes({
    min: 13,
    max: 14,
    types: {
        AccountInfo: "AccountInfoWithDualRefCount"
    }})

const v3 = buildTypes({
    min: 15,
    types: {
        AccountInfo: "AccountInfoWithTripleRefCount"
    }})

export default [ v0, v1, v2, v3 ]
