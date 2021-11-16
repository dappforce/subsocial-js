import accountInfo from './account-info'
import common from "./common";
import spaces from './spaces'
import posts from './posts'
import profiles from "./profiles";
import reactions from "./reactions";
import spacePermission from './space-permission'
import roles from "./roles";
import faucet from "./faucet";
import history from "./history";

const types = [
  accountInfo,
  common,
  spaces,
  posts,
  profiles,
  reactions,
  spacePermission,
  roles,
  faucet,
  history
].flat()

export default {
    types
}