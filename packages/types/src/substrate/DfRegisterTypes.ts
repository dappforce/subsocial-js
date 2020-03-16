import * as dfDefinations from './interfaces/subsocial/definitions';
import { registry } from '@polkadot/react-api';

export const allDefinitions = {
  ...dfDefinations
};

export const types = Object.values(allDefinitions).map(({ types }) => types).reduce((all, types) => Object.assign(all, types), {});

export const registerSubsocialTypes = (): void => {
  try {
    registry.register(types);
  } catch (err) {
    console.error('Failed to register custom types of blogs module', err);
  }
};

export default registerSubsocialTypes;
