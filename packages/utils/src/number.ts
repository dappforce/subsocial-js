export const isNum = (x: any): boolean =>
  typeof x === 'number';

export const parseNumStr = (num: string): number | undefined => {
  try {
    return parseInt(num, undefined);
  } catch (err) {
    return undefined;
  }
};
