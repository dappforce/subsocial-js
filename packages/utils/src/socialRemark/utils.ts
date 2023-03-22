import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';

export function addressFromAnyToFormatted(addressAny: string, prefix: number) {
  const publicKey = decodeAddress(addressAny);
  return encodeAddress(publicKey, prefix);
}