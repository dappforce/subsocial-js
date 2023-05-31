import { describe, expect, test } from '@jest/globals'
import { naclDecrypt, naclEncrypt } from '../../nacl'

describe('naclDecrypt', (): void => {
  test('decrypts a encrypted message', (): void => {
    const secret = new Uint8Array(32)
    const message = new Uint8Array([1, 2, 3, 4, 5, 4, 3, 2, 1])
    const { encrypted, nonce } = naclEncrypt(message, secret)

    expect(naclDecrypt(encrypted, nonce, secret)).toEqual(message)
  })

  test('returns null on invalid', (): void => {
    expect(
      naclDecrypt(new Uint8Array(), new Uint8Array(24), new Uint8Array(32))
    ).toEqual(null)
  })
})
