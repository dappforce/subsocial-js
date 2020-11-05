export function isPromise (val?: any): val is Promise<any> {
  return val && (val).then !== undefined;
}
