// our local stuff
import * as definitions from './interfaces/definitions';
export const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {}); 
export { typesBundle } from './interfaces/subsocial/definitions'
