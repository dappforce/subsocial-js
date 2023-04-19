export type DomainRegisterPayContent = {
  domainName: string;
  target: string;
  token: string;
  opId: string;
};
export type DomainRegisterCompletedContent = {
  domainName: string;
  target: string;
  token: string;
  opId: string;
};

export type DomainRegisterRefundContent = {
  domainName: string;
  target: string;
  token: string;
  opId: string;
};

export type EnergyGeneratePayContent = {
  energyAmount: string;
  target: string;
  token: string;
  opId: string;
};
export type EnergyGenerateCompletedContent = {
  energyAmount: string;
  target: string;
  token: string;
  opId: string;
};

export type EnergyGenerateRefundContent = {
  energyAmount: string;
  target: string;
  token: string;
  opId: string;
};

export type RemarkContentProps =
  | keyof DomainRegisterPayContent
  | keyof DomainRegisterCompletedContent
  | keyof DomainRegisterRefundContent
  | keyof EnergyGeneratePayContent
  | keyof EnergyGenerateCompletedContent
  | keyof EnergyGenerateRefundContent;

export type SocialRemarkMessageVersion = '0.1';
export type SocialRemarkMessageDestination = '1' | '2' | '3';
export type SocialRemarkMessageAction =
  | 'DMN_REG'
  | 'DMN_REG_OK'
  | 'DMN_REG_REFUND'
  | 'DMN_REG_REFUND_OK'
  | 'NRG_GEN'
  | 'NRG_GEN_OK'
  | 'NRG_GEN_REFUND'
  | 'NRG_GEN_REFUND_OK';

export type SocialRemarkMessageProtocolName =
  | 'social'
  | string;

export enum SocialRemarkDestChainsNameId {
  subsocial = '1',
  xsocial = '2',
  soonsocial = '3',
}

export type SocialRemarkMessageContent<
  A extends SocialRemarkMessageAction | string
> = A extends 'DMN_REG'
  ? DomainRegisterPayContent
  : A extends 'DMN_REG_OK'
  ? DomainRegisterCompletedContent
  : A extends 'DMN_REG_REFUND' | 'DMN_REG_REFUND_OK'
  ? DomainRegisterRefundContent
  : A extends 'NRG_GEN'
  ? EnergyGeneratePayContent
  : A extends 'NRG_GEN_OK'
  ? EnergyGenerateCompletedContent
  : A extends 'NRG_GEN_REFUND' | 'NRG_GEN_REFUND_OK'
  ? EnergyGenerateRefundContent
  : never;

export type SocialRemarkMessage<
  A extends SocialRemarkMessageAction | string = '',
  V extends true | false = false
> = {
  protName: SocialRemarkMessageProtocolName;
  version: SocialRemarkMessageVersion;
  destination: SocialRemarkMessageDestination;
  action: A;
  valid: V; // TODO make this prop optional
  content: V extends true ? SocialRemarkMessageContent<A> : null;
};

export type SubSclSource<A extends SocialRemarkMessageAction | string = ''> =
  Omit<SocialRemarkMessage<A, true>, 'valid'>;

type VersionActionPropsMap = Record<
  SocialRemarkMessageVersion,
  | Record<'DMN_REG', Record<keyof DomainRegisterPayContent, number>>
  | Record<'DMN_REG_OK', Record<keyof DomainRegisterCompletedContent, number>>
  | Record<'DMN_REG_REFUND', Record<keyof DomainRegisterRefundContent, number>>
  | Record<'DMN_REG_REFUND_OK', Record<keyof DomainRegisterRefundContent, number>>
  | Record<'NRG_GEN', Record<keyof EnergyGeneratePayContent, number>>
  | Record<'NRG_GEN_OK', Record<keyof EnergyGenerateCompletedContent, number>>
  | Record<'NRG_GEN_REFUND', Record<keyof EnergyGenerateRefundContent, number>>
  | Record<'NRG_GEN_REFUND_OK', Record<keyof EnergyGenerateRefundContent, number>>
>;

export const REMARK_CONTENT_VERSION_ACTION_MAP: VersionActionPropsMap = {
  '0.1': {
    DMN_REG: {
      opId: 4,
      target: 5,
      domainName: 6,
      token: 7
    },
    DMN_REG_OK: {
      opId: 4,
      target: 5,
      domainName: 6,
      token: 7
    },
    DMN_REG_REFUND: {
      opId: 4,
      target: 5,
      domainName: 6,
      token: 7
    },
    DMN_REG_REFUND_OK: {
      opId: 4,
      target: 5,
      domainName: 6,
      token: 7
    },
    NRG_GEN: {
      opId: 4,
      target: 5,
      energyAmount: 6,
      token: 7
    },
    NRG_GEN_OK: {
      opId: 4,
      target: 5,
      energyAmount: 6,
      token: 7
    },
    NRG_GEN_REFUND: {
      opId: 4,
      target: 5,
      energyAmount: 6,
      token: 7
    },
    NRG_GEN_REFUND_OK: {
      opId: 4,
      target: 5,
      energyAmount: 6,
      token: 7
    }
  }
};
