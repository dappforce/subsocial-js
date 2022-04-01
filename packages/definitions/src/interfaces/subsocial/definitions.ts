import accountInfo from './account-info'
import common from './common';
import spaces from './spaces'
import posts from './posts'
import profiles from './profiles';
import reactions from './reactions';
import spacePermission from './space-permission'
import roles from './roles';
import faucet from './faucet';
import history from './history';
import moderation from './moderation';
import system from './system'
import { OverrideVersionedType } from '@polkadot/types/types';
import score from './score'

const convertToCamelCase = (obj: Record<string, any>) => {
  return JSON.parse(JSON.stringify(obj)
    .split('_')
    .map((x, i) => 
      i === 0
      ? x
      : x.charAt(0).toUpperCase() + x.slice(1))
    .join('')
    .replace(/Enum/g, '_enum'))
}

const v14Types = {
  minmax: [17, undefined],
  types: {}
} as OverrideVersionedType

export const types = [
  accountInfo,
  common,
  spaces,
  score,
  system,
  posts,
  profiles,
  reactions,
  spacePermission,
  roles,
  faucet,
  history,
  moderation,
  v14Types
].flat()

export const typesBundle = {
  spec: {
    subsocial: {
      types
    }
  }
}

export default {
    types: types.map(convertToCamelCase).map(({ types }) => types).reduce((all, types) => Object.assign(all, types))
}