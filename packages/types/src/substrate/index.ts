import * as InterfaceTypes from './interfaceRegistry';
import definitions from './interfaces/subsocial/definitions';
export { InterfaceTypes };
export const types = definitions.types;
export { types as registryTypes } from './preparedTypes'
export { registerSubsocialTypes } from './register'
export * from './interfaces/utils'
export type PalletName = 'permissions' | 'posts' | 'profile-follows' | 'profiles' | 'reactions' | 'scores' | 'space-follows' | 'space-ownership' | 'spaces' | 'utils'
