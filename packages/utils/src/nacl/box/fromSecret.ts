import nacl from 'tweetnacl'
import type { Keypair } from '../types'

/**
 * @name naclBoxPairFromSecret
 * @summary Creates a new public/secret box keypair from a secret.
 * @description
 * Returns a object containing a box `publicKey` & `secretKey` generated from the supplied secret.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclBoxPairFromSecret } from '@subsocial/utils';
 *
 * naclBoxPairFromSecret(...); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export function naclBoxPairFromSecret(secret: Uint8Array): Keypair {
  return nacl.box.keyPair.fromSecretKey(secret.slice(0, 32))
}
