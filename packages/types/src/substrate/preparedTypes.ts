import * as dfDefinations from './interfaces/subsocial/definitions';

export const allDefinitions = {
  ...dfDefinations
};

export const types = Object.values(allDefinitions).map(({ types }) => types).reduce((all, types) => Object.assign(all, types), {});
