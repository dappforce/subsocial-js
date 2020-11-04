/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Null, Enum, Option, Text } from '@polkadot/types';
import { Content as IContent } from '../interfaces';
import { nonEmptyStr } from '@subsocial/utils/src/string'
import registry from '../registry';
import { IpfsCid } from '../..';

export class None extends Null {}
export class Raw extends Text {}
export class IPFS extends Text {}
export class Hyper extends Text {}

export type ContentEnum =
  None |
  Raw |
  IPFS |
  Hyper

type ContentEnumValue =
  { None: None } |
  { Raw: Raw } |
  { IPFS: IPFS } |
  { Hyper: Hyper};

export class Content extends Enum implements IContent {
  constructor (value?: ContentEnumValue) {
    super(
      registry,
      {
        None,
        Raw,
        IPFS,
        Hyper
      }, value);
  }

  get isNone (): boolean {
    return this.type === 'None'
  }

  get isRaw (): boolean {
    return this.type === 'Raw'
  }

  get isIpfs (): boolean {
    return this.type === 'IPFS'
  }

  get isHyper (): boolean {
    return this.type === 'Hyper'
  }

  get asHyper (): Hyper {
    return this.value as Hyper;
  }

  get asRaw (): Raw {
    return this.value as Raw;
  }

  get asIpfs (): IPFS {
    return this.value as IPFS
  }
}

const createIpfsContent = (value: IpfsCid) => ({ IPFS: new Text(registry, value) })
const createNoneContent = () => ({ None: new Null(registry) })
const createContent = (value?: IpfsContentValue) => nonEmptyStr(value)
  ? createIpfsContent(value)
  : createNoneContent()

type IpfsContentValue = IpfsCid | null

export class OptionContent extends Option<Content> {
  constructor (value: ContentEnumValue | Null) {
    super(registry, 'Option<Content>', value)
  }
}

export class OptionIpfsContent extends OptionContent {
  constructor (value?: IpfsContentValue) {
    super(value ? createIpfsContent(value) : new Null(registry))
  }
}

export class IpfsContent extends Content {
  constructor (value?: IpfsContentValue) {
    super(createContent(value))
  }
}
