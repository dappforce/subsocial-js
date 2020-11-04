import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import * as defaultDefinitions from '@polkadot/types/interfaces/definitions';

import * as DfDefinitions from '@subsocial/types/src/substrate/interfaces/definitions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const definitions = {
  '@polkadot/types/interfaces': defaultDefinitions,
  '@subsocial/types/substrate/interfaces': DfDefinitions
};

generateTsDef(definitions, 'packages/types/src/substrate/interfaces', '@subsocial/types/substrate/interfaces');
generateInterfaceTypes(definitions, 'packages/types/src/substrate/interfaceRegistry.ts');
