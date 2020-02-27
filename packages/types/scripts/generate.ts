import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import * as defaultDefinations from '@polkadot/types/interfaces/definitions';

import * as ormlDefinations from '../src/interfaces/definitions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime, deprecated, ...substrateDefinations } = defaultDefinations;

const definations = {
  '@polkadot/types/interfaces': substrateDefinations,
  '@dappforce/types/interfaces': ormlDefinations
};

generateTsDef(definations, 'packages/types/src/interfaces', '@dappforce/types/interfaces');
generateInterfaceTypes(definations, 'packages/types/src/interfaceRegistry.ts');

function from () {
  return 1;
}

from();
