import { ApiPromise } from '@polkadot/api'
import { SubsocialApiProps, SubsocialApi } from '../api'
import { getApi } from './substrateConnect'
let subsocial!: SubsocialApi
let isLoadingSubsocial = false

/**
 * Create a new or return existing connection to Subsocial API
 * (includes Substrate and IPFS connections).
 */

type Api = SubsocialApi & {
  api: ApiPromise
}

export const newSubsocialApi = async (context: SubsocialApiProps) => {
  if (!subsocial && !isLoadingSubsocial) {
    isLoadingSubsocial = true
    const api = await getApi()
    subsocial = new SubsocialApi(context)
    isLoadingSubsocial = false;

    (subsocial as any).api = api
  }
  return subsocial as Api
}

export const createResolveSubsocialApi = (context: SubsocialApiProps) => () => newSubsocialApi(context)