import { notDefined } from './defined';

export const isStr = (x: any): x is string =>
  typeof x === 'string';

export const isEmptyStr = (x: any): boolean =>
  notDefined(x) || (isStr(x) && x.trim().length === 0);

export const nonEmptyStr = (x?: any): x is string =>
  isStr(x) && x.trim().length > 0;

export const asString = (x: { toString: () => string }): string => {
  return typeof x === 'string' ? x : x?.toString()
}

export const asStringArray = (x: { toString: () => string }[]): string[] => {
  return x.map(asString)
}
