import allDefinitions from './interfaces/definitions';
import {OverrideBundleType, OverrideBundleDefinition} from "@polkadot/types/types";
import {isDef} from "@subsocial/utils";

export const specBundle: Record<string, OverrideBundleDefinition> = allDefinitions

export const typesBundle: OverrideBundleType = {
    spec: specBundle
}

export const types = Object.values(allDefinitions).flatMap(({ types }) => types).filter(isDef);