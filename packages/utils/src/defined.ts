export const notDefined = <T>(x?: T): x is undefined =>
  x === null || typeof x === 'undefined';

export const notDef = notDefined;

export const isDefined = <T>(x?: T): x is T =>
  !notDefined(x);

export const isDef = isDefined;
