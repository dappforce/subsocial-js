/* eslint-disable @typescript-eslint/camelcase */
import definitions from '@polkadot/types/interfaces/runtime/definitions';

export default {
  types: {
    ...definitions.types,
    Address: 'AccountId',
    LookupSource: 'AccountId'
  }
};
