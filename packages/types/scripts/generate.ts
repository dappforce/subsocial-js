import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import * as defaultDefinitions from '@polkadot/types/interfaces/definitions';

import subsocialSpec from '@subsocial/types/src/substrate/interfaces/definitions';
import {ModuleTypes} from "@polkadot/typegen/util";

const subsocialDefinitions: Record<string, ModuleTypes> = {
  subsocial: {
    types: subsocialSpec.subsocial.types.map(({ types }) => types).reduce((all, types) => Object.assign(all, types), {})
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const definitions = {
  '@polkadot/types/interfaces': defaultDefinitions,
  '@subsocial/types/substrate/interfaces': subsocialDefinitions
};

generateTsDef(definitions, 'packages/types/src/substrate/interfaces', '@subsocial/types/substrate/interfaces');
generateInterfaceTypes(definitions, 'packages/types/src/substrate/interfaceRegistry.ts');
