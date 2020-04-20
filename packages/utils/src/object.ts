export const isObj = <T> (x: any): x is T =>
  x !== null && typeof x === 'object';
