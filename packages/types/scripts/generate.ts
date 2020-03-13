import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import * as defaultDefinations from '@polkadot/types/interfaces/definitions';

import * as DfDefinations from '../src/interfaces/definitions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime, ...substrateDefinations } = defaultDefinations;

const definations = {
  '@polkadot/types/interfaces': substrateDefinations,
  '@subsocial/types/interfaces': DfDefinations
};

generateTsDef(definations, 'packages/types/src/interfaces', '@subsocial/types/interfaces');
generateInterfaceTypes(definations, 'packages/types/src/interfaceRegistry.ts');
