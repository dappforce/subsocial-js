export interface Keypair {
  publicKey: Uint8Array
  secretKey: Uint8Array
}

export interface Sealed {
  sealed: Uint8Array
  nonce: Uint8Array
}

export interface Encrypted {
  encrypted: Uint8Array
  nonce: Uint8Array
}
