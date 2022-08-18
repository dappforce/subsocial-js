import { ApiPromise } from '@polkadot/api'
import { SubsocialApi } from '../subsocial'
import { BasicSubsocialApi } from '../subsocial/basic'
import { SubsocialApiProps } from '../subsocial/inner'
import { getSubstrateApi } from './substrate'

let subsocial!: SubsocialApi 
let basicSubsocial!: BasicSubsocialApi
let isLoadingSubsocial = false

type NewSubsocialApiProps = Omit<SubsocialApiProps, 'substrateApi'> & {
  substrateNodeUrl: string,
  substrateApi?: ApiPromise
}

/**
 * Create a new or return existing connection to Subsocial API
 * (includes Substrate and IPFS connections).
 */
export const newBasicSubsocialApi = async ({ substrateNodeUrl, substrateApi: initApi, ...props }: NewSubsocialApiProps) => {
  if (!subsocial && !isLoadingSubsocial) {
    isLoadingSubsocial = true
    const substrateApi = initApi || await getSubstrateApi(substrateNodeUrl)
    basicSubsocial = new BasicSubsocialApi({ substrateApi, ...props })
    isLoadingSubsocial = false;
  }
  return basicSubsocial
}

/**
 * Create a new or return existing connection to Flat Subsocial API
 * (with wrapper which return flat structs).
 */
export const newSubsocialApi = async (props: NewSubsocialApiProps) => {
  if (subsocial) return subsocial

  basicSubsocial = await newBasicSubsocialApi(props)
  subsocial = new SubsocialApi(basicSubsocial)
  return subsocial
}