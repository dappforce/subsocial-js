/* eslint-disable @typescript-eslint/camelcase */
import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
  types: {
    ...definitions.types,
    Weight: 'u32' // TODO Delete this hack with Weight after we move to Substrate >= alpha 6
  }
};
