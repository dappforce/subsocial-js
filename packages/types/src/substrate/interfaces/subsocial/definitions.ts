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
import score from './score'
import system from './system'

const types = [
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
  moderation
].flat()

export default {
    types
}