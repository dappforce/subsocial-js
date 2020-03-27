import { notDefined } from './defined';

export const isStr = (x: any): boolean =>
  typeof x === 'string';

export const isEmptyStr = (x: any): boolean =>
  notDefined(x) || (isStr(x) && x.trim().length === 0);

export const nonEmptyStr = (x?: any) =>
  isStr(x) && x.trim().length > 0;
