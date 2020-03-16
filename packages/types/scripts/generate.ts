import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import * as defaultDefinations from '@polkadot/types/interfaces/definitions';

import * as DfDefinations from '../src/substrate/interfaces/definitions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime, ...substrateDefinations } = defaultDefinations;

const definations = {
  '@polkadot/types/interfaces': substrateDefinations,
  '@subsocial/types/substrate/interfaces': DfDefinations
};

generateTsDef(definations, 'packages/types/src/substrate/interfaces', '@subsocial/types/substrate/interfaces');
generateInterfaceTypes(definations, 'packages/types/src/substrate/interfaceRegistry.ts');
