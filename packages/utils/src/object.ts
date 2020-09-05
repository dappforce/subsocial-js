import isEmpty from 'lodash.isempty';

export const isObj = <T> (x: any): x is T =>
  x !== null && typeof x === 'object';

export const notObj = <T>(x: any): boolean => !isObj(x)

export const isEmptyObj = <T>(x?: T): boolean => notObj(x) || isEmpty(x)

export const notEmptyObj = <T>(x?: T): x is T => !isEmptyObj(x)
