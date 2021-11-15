import { decodeAddress, encodeAddress, isAddress } from '@polkadot/util-crypto'

export const toSubsocialAddress = (address?: string) => {
  if (!address || !isAddress(address)) return undefined

  return encodeAddress(decodeAddress(address), 28)
}