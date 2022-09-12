import { u8aToHex } from '@polkadot/util'
import { Keyring } from '@polkadot/keyring';

export const generateCrustAuthToken = (suri: string) => {
  const keyring = new Keyring();
  const pair = keyring.addFromUri(suri);

  // 1.3 get the signature of the addr
  const sigRaw = pair.sign(pair.address);
  const sig = u8aToHex(sigRaw);

  // 1.4 compile the sig to autHeader
  const authHeaderRaw = `sub-${pair.address}:${sig}`;
  return Buffer.from(authHeaderRaw).toString('base64');
}