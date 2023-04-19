import {
  SocialRemarkMessageAction,
  SocialRemarkMessageProtocolName,
  SocialRemarkMessageVersion,
  SocialRemarkMessageDestination,
} from './types'

export type SocialRemarkConfigData = {
  protNames?: Array<SocialRemarkMessageProtocolName>
  actions?: SocialRemarkMessageAction[]
  versions?: SocialRemarkMessageVersion[]
  destinations?: SocialRemarkMessageDestination[]
}

/**
 * SocialRemark config which will be used as global config for all
 * SocialRemark instances
 */
export class SocialRemarkConfig {
  private static instance: SocialRemarkConfig

  private conf: Required<SocialRemarkConfigData> = {
    protNames: [],
    actions: [
      'DMN_REG',
      'DMN_REG_OK',
      'DMN_REG_REFUND',
      'DMN_REG_REFUND_OK',
      'NRG_GEN',
      'NRG_GEN_OK',
      'NRG_GEN_REFUND',
      'NRG_GEN_REFUND_OK'
    ],
    versions: ['0.1'],
    destinations: ['1', '2', '3']
  }

  static getInstance(): SocialRemarkConfig {
    if (!SocialRemarkConfig.instance) {
      SocialRemarkConfig.instance = new SocialRemarkConfig()
    }
    return SocialRemarkConfig.instance
  }

  public get config() {
    return this.conf
  }

  public setConfig(data: SocialRemarkConfigData) {
    this.conf = {
      ...this.conf,
      ...data
    }
  }
}
