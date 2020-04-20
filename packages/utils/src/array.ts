export const nonEmptyArr = <T> (x: any | T[]): x is T[] =>
  Array.isArray(x) && x.length > 0

export const isEmptyArray = <T> (x: any | T[]): boolean =>
  !Array.isArray(x) || (Array.isArray(x) && x.length === 0)

export function getFirstOrDefault<T> (arr?: T[], default_?: T): T | undefined {
  return nonEmptyArr(arr) ? arr[0] : default_
}

export function getFirstOrUndefined<T> (arr?: T[]): T | undefined {
  return getFirstOrDefault(arr, undefined)
}
