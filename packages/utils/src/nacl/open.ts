import nacl from 'tweetnacl'

/**
 * @name naclOpen
 * @summary Opens a message using the receiver's secretKey and nonce
 * @description
 * Returns a message sealed by the sender, using the receiver's `secret` and `nonce`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclOpen } from '@subsocial/utils';
 *
 * naclOpen([...], [...], [...]); // => [...]
 * ```
 */
export function naclOpen(
  sealed: Uint8Array,
  nonce: Uint8Array,
  senderBoxPublic: Uint8Array,
  receiverBoxSecret: Uint8Array
): Uint8Array | null {
  return (
    nacl.box.open(sealed, nonce, senderBoxPublic, receiverBoxSecret) || null
  )
}
