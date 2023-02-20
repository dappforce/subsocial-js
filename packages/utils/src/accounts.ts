import { decodeAddress, encodeAddress, isAddress } from '@polkadot/util-crypto'

/**
 * Convert any substrate address format into subsocial address format
 * 
 * See {@link https://docs.subsocial.network/docs/develop/sdk/subsocial-utils#accounts} for more details
 */
export const toSubsocialAddress = (address?: string) => {
  if (!address || !isAddress(address)) return undefined

  return encodeAddress(decodeAddress(address), 28)
}