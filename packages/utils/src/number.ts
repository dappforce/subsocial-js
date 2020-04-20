export const isNum = (x: any | number): x is number =>
  typeof x === 'number';

export const parseNumStr = (num: string): number | undefined => {
  try {
    return parseInt(num);
  } catch (err) {
    return undefined;
  }
};
