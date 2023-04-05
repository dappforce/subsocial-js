import { Keyring } from '@polkadot/api'
import { hexToU8a, stringToU8a, u8aToHex, u8aToString } from '@polkadot/util'
import { keccakAsU8a, naclDecrypt, naclEncrypt } from '@polkadot/util-crypto'
import { toSubsocialAddress } from '../accounts'

class SignerKeyringManager {
  private readonly keyring: Keyring

  constructor() {
    this.keyring = new Keyring({ type: 'sr25519' })
  }

  private generateSalt() {
    // has to be 32 bytes, otherwise naclEncrypt will throw an error
    const SALT_LENGTH = 32
    const arr = new Uint8Array(SALT_LENGTH)
    const arrayResult = crypto.getRandomValues(arr)

    return arrayResult
  }

  private generateSecret(password: string, inputSaltStr?: string) {
    const salt = inputSaltStr ? hexToU8a(inputSaltStr) : this.generateSalt()
    const saltStr = u8aToHex(salt)
    const secret = keccakAsU8a(saltStr + password)

    return {
      saltStr,
      secret,
    }
  }

  private generateNonce() {
    const HEX_CONSTANT = '0x80001f'
    return Buffer.from(HEX_CONSTANT.padEnd(24, '\0'))
  }

  public async generateAccount(seed: string) {
    const { sr25519PairFromSeed, mnemonicToMiniSecret } = await import('@polkadot/util-crypto')

    const miniSecret = mnemonicToMiniSecret(seed)
    const { publicKey: publicKeyBuffer } = sr25519PairFromSeed(miniSecret)

    const publicKey = u8aToHex(publicKeyBuffer)
    const secretKey = u8aToHex(miniSecret)

    return { publicAddress: toSubsocialAddress(publicKey)!, secretKey }
  }

  public encryptKey(key: string, password: string) {
    const messagePreEncryption = stringToU8a(key)

    const { saltStr, secret } = this.generateSecret(password)

    // use a static nonce
    const NONCE = this.generateNonce()

    const { encrypted } = naclEncrypt(messagePreEncryption, secret, NONCE)

    const encryptedMessage = u8aToHex(encrypted)

    return { encryptedMessage, saltStr }
  }

  public decryptKey(encryptedMessage: string, saltStr: string, password: string) {
    const { secret } = this.generateSecret(password, saltStr)
    const message = hexToU8a(encryptedMessage)
    const NONCE = this.generateNonce()

    const decrypted = naclDecrypt(message, NONCE, secret)

    return u8aToString(decrypted)
  }

  public generateKeypairBySecret(secret: string) {
    const keypair = this.keyring.addFromUri(secret, {}, 'sr25519')
    return keypair
  }
}

export default SignerKeyringManager