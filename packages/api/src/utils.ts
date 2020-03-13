export function getFirstOrUndefinded<T> (arr: T[] | undefined): T | undefined {
  return arr && arr.length > 0 ? arr[0] : undefined
}
