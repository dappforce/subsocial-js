import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import * as defaultDefinitions from '@polkadot/types/interfaces/definitions';

import * as DfDefinitions from '../src/substrate/interfaces/definitions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime, ...substrateDefinations } = defaultDefinitions;

const definitions = {
  '@polkadot/types/interfaces': substrateDefinations,
  '@subsocial/types/substrate/interfaces': DfDefinitions
};

generateTsDef(definitions, 'packages/types/src/substrate/interfaces', '@subsocial/types/substrate/interfaces');
generateInterfaceTypes(definitions, 'packages/types/src/substrate/interfaceRegistry.ts');
