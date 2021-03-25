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

type NewSubsocialApiProps = Omit<SubsocialApiProps, 'substrateApi'> & {
  substrateNodeUrl: string
}

export const newSubsocialApi = async ({ substrateNodeUrl, ...props }: NewSubsocialApiProps) => {
  if (!subsocial && !isLoadingSubsocial) {
    isLoadingSubsocial = true
    const substrateApi = await getApi()
    subsocial = new SubsocialApi({ substrateApi, ...props })
    isLoadingSubsocial = false;

    (subsocial as any).api = substrateApi
  }
  return subsocial as Api
}

export const createResolveSubsocialApi = (context: NewSubsocialApiProps) => () => newSubsocialApi(context)