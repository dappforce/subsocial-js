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
import domains from './domains'

const specTypesArray = [
  accountInfo,
  common,
  spaces,
  // score,
  system,
  posts,
  profiles,
  reactions,
  spacePermission,
  roles,
  faucet,
  history,
  moderation,
  domains
].flat()

export const typesBundle = {
  spec: {
    subsocial: {
      types: specTypesArray
    }
  }
}

export default {
    types: specTypesArray.map(({ types }) => types).reduce((all, types) => Object.assign(all, types))
}