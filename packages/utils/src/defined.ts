export const isDefined = (x: any): boolean =>
  !notDefined(x);

export const isDef = isDefined;

export const notDefined = (x: any): boolean =>
  x === null || typeof x === 'undefined';

export const notDef = notDefined;
