import { Null, Enum, Option, Text } from '@polkadot/types';
import { Content as IContent } from '../interfaces';
import { nonEmptyStr } from '@subsocial/utils'
import registry from '../registry';
import { IpfsCid } from '../..';

export type None = null
export type Raw = string
export type IPFS = string
export type Hyper = string

export type ContentEnum =
  None |
  Raw |
  IPFS |
  Hyper

export type ContentEnumValue =
  { None: None } |
  { Raw: Raw } |
  { IPFS: IPFS } |
  { Hyper: Hyper};

const createIpfsContent = (value: IpfsCid) => ({ IPFS: value })
const createNoneContent = () => ({ None: null })
const createContent = (value?: IpfsContentValue) => nonEmptyStr(value)
  ? createIpfsContent(value)
  : createNoneContent()

type IpfsContentValue = IpfsCid | null

export function IpfsContent (value?: IpfsContentValue) {
  return createContent(value)
}

export function OptionIpfsContent (value?: IpfsContentValue) {
  return value ? createIpfsContent(value) : null
}
