import * as dfDefinations from './interfaces/definitions';

export const allDefinitions = {
  ...dfDefinations
};

export const types = Object.values(allDefinitions).map(({ types }) => types).reduce((all, types) => Object.assign(all, types), {});
