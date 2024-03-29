import nacl from 'tweetnacl'

import { randomAsU8a } from '@polkadot/util-crypto'
import { Sealed } from './types'

/**
 * @name naclSeal
 * @summary Seals a message using the sender's encrypting secretKey, receiver's public key, and nonce
 * @description
 * Returns an encrypted message which can be open only by receiver's secretKey. If the `nonce` was not supplied, a random value is generated.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclSeal } from '@subsocial/utils';
 *
 * naclSeal([...], [...], [...], [...]); // => [...]
 * ```
 */
export function naclSeal(
  message: Uint8Array,
  senderBoxSecret: Uint8Array,
  receiverBoxPublic: Uint8Array,
  nonce: Uint8Array = randomAsU8a(24)
): Sealed {
  return {
    nonce,
    sealed: nacl.box(message, nonce, receiverBoxPublic, senderBoxSecret)
  }
}
