export { registry } from './registry'
export type PalletName = 
  | 'permissions'
  | 'posts'
  | 'profileFollows'
  | 'profiles'
  | 'reactions'
  | 'roles'
  | 'scores'
  | 'spaceFollows'
  | 'spaceOwnership'
  | 'spaces'
  | 'utils'

export * as classes from './classes'
export * from './rpc'

export { types, typesBundle } from '@subsocial/definitions/index'