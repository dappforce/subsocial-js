import * as dfDefinitions from './interfaces/definitions';

export const allDefinitions = {
  ...dfDefinitions
};

export const types = Object.values(allDefinitions).map(({ types }) => types).reduce((all, types) => Object.assign(all, types), {});
