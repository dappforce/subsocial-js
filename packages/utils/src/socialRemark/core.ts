import {
  REMARK_CONTENT_VERSION_ACTION_MAP,
  RemarkContentProps,
  SocialRemarkMessage,
  SocialRemarkMessageAction, SocialRemarkMessageDestination,
  SocialRemarkMessageProtocolName,
  SocialRemarkMessageVersion,
  SubSclSource
} from './types'
import { SocialRemarkConfig, SocialRemarkConfigData } from './config'
import { decorateRemarkContentValue } from './decorators'

export class SocialRemark {
  private maybeRemarkMsg: unknown

  /**
   * Set global config for all new SocialRemark instances
   * @param data: SocialRemarkConfigData
   */
  static setConfig(data: SocialRemarkConfigData) {
    SocialRemarkConfig.getInstance().setConfig(data)
  }

  private msgParsed: SocialRemarkMessage<
    SocialRemarkMessageAction,
    boolean
  > | null = null

  private protNames: Set<SocialRemarkMessageProtocolName> = new Set(
    SocialRemarkConfig.getInstance().config.protNames
  )

  private versions: Set<SocialRemarkMessageVersion> = new Set(
    SocialRemarkConfig.getInstance().config.versions
  )

  private destinations: Set<SocialRemarkMessageDestination> = new Set(
    SocialRemarkConfig.getInstance().config.destinations
  )

  private actions: Set<SocialRemarkMessageAction> = new Set(
    SocialRemarkConfig.getInstance().config.actions
  )


  private msgDelimiter: string = '::'

  /**
   * Get SocialRemark full data, if it's available. Otherwise, go throw error.
   */
  public get source():
    | SocialRemarkMessage<SocialRemarkMessageAction, boolean>
    | never {
    if (!this.msgParsed) throw new Error('Message is not available.')
    return this.msgParsed!
  }

  /**
   * Get SocialRemark instance source content, if it's valid and available.
   */
  public get content() {
    return this.msgParsed && this.msgParsed.valid
      ? this.msgParsed.content
      : null
  }

  /**
   * Get SocialRemark instance version, if it's valid and available.
   */
  public get version() {
    return this.msgParsed ? this.msgParsed.version : null
  }

  /**
   * Is SocialRemark valid.
   */
  public get isValidMessage(): boolean {
    return !!this.msgParsed && this.msgParsed.valid
  }

  /**
   * Convert bytes to string.
   * @param src: unknown
   */
  static bytesToString(src: unknown): string {
    if (!src || !Buffer.isBuffer(src)) return ''
    return Buffer.from(src).toString('utf-8')
  }

  /**
   * Create SocialRemark from raw string remark message.
   * @param maybeRemarkMsg: unknown
   */
  public fromMessage(maybeRemarkMsg: unknown): SocialRemark {
    this.maybeRemarkMsg = maybeRemarkMsg
    this.parseMsg(maybeRemarkMsg)
    return this
  }

  /**
   * Create SocialRemark from source map.
   * @param rmrkSrc: SubSclSource<SocialRemarkMessageAction>
   */
  public fromSource(
    rmrkSrc: SubSclSource<SocialRemarkMessageAction>
  ): SocialRemark {
    this.isRemarkSourceValid(rmrkSrc)

    try {
      this.msgParsed = {
        ...rmrkSrc,
        valid: true
      }
      const contentPropsMap =
        // @ts-ignore
        REMARK_CONTENT_VERSION_ACTION_MAP[rmrkSrc.version][rmrkSrc.action]
      for (const contentPropName in contentPropsMap) {
        // @ts-ignore
        this.msgParsed.content[contentPropName] = decorateRemarkContentValue(
          this.msgParsed.action,
          contentPropName as RemarkContentProps,
          // @ts-ignore
          rmrkSrc.content[contentPropName]
        )
      }
    } catch (e) {
      console.log(e)
      throw new Error('Error has been occurred during remark message creation.')
    }
    return this
  }

  /**
   * Encode SocialRemark source to remark string.
   */
  public toMessage(): string {
    if (!this.isValidMessage)
      throw new Error('Remark is not valid for build message.')

    const msg: string[] = []
    msg.push(this.source.protName)
    msg.push(this.source.version)
    msg.push(this.source.destination)
    msg.push(this.source.action)

    try {
      const contentPropsMap =
        // @ts-ignore
        REMARK_CONTENT_VERSION_ACTION_MAP[this.source.version][
          this.source.action
        ]
      for (const contentPropName in contentPropsMap) {
        // @ts-ignore
        msg[contentPropsMap[contentPropName]] = decorateRemarkContentValue(
          this.source.action,
          contentPropName as RemarkContentProps,
          // @ts-ignore
          this.source.content[contentPropName]
        )
      }
    } catch (e) {
      console.log(e)
      throw new Error('Error has been occurred during remark message creation.')
    }

    //TODO add validations
    return msg.join(this.msgDelimiter)
  }

  /**
   * ====== Private functionality ======
   */

  private parseMsg(srcMsg: unknown): void {
    if (!srcMsg || typeof srcMsg !== 'string') return

    const chunkedMsg = (
      Buffer.isBuffer(srcMsg) ? SocialRemark.bytesToString(srcMsg) : srcMsg
    ).split(this.msgDelimiter)

    if (
      !chunkedMsg ||
      chunkedMsg.length === 0 ||
      !this.isValidProtName(chunkedMsg[0]) ||
      !this.isValidVersion(chunkedMsg[1]) ||
      !this.isValidDestination(chunkedMsg[2]) ||
      !this.isValidAction(chunkedMsg[3])
    )
      return

    this.msgParsed = {
      protName: chunkedMsg[0] as SocialRemarkMessageProtocolName,
      version: chunkedMsg[1] as SocialRemarkMessageVersion,
      destination: chunkedMsg[2] as SocialRemarkMessageDestination,
      action: chunkedMsg[3] as SocialRemarkMessageAction,
      valid: false,
      content: null
    }

    try {
      const contentPropsMap: Record<RemarkContentProps, number> =
        // @ts-ignore
        REMARK_CONTENT_VERSION_ACTION_MAP[this.msgParsed.version][
          this.msgParsed.action
        ]

      for (const contentPropName in contentPropsMap) {
        // @ts-ignore
        if (!this.msgParsed.content) this.msgParsed.content = {}
        // @ts-ignore
        this.msgParsed.content[contentPropName] = decorateRemarkContentValue(
          this.msgParsed.action,
          contentPropName as RemarkContentProps,
          // @ts-ignore
          chunkedMsg[contentPropsMap[contentPropName]]
        )
      }

      this.msgParsed.valid = true
    } catch (e) {
      console.log(e)
    }
  }

  private isValidProtName(src: string): boolean {
    return !!(src && this.protNames.has(src as SocialRemarkMessageProtocolName))
  }
  private isValidVersion(src: string): boolean {
    return !!(src && this.versions.has(src as SocialRemarkMessageVersion))
  }
  private isValidDestination(src: string): boolean {
    return !!(src && this.destinations.has(src as SocialRemarkMessageDestination))
  }
  private isValidAction(src: string): boolean {
    return !!(src && this.actions.has(src as SocialRemarkMessageAction))
  }

  private isRemarkSourceValid(
    rmrkSrc: SubSclSource<SocialRemarkMessageAction>
  ): boolean | never {
    if (!rmrkSrc)
      throw new Error(
        'Remark source is invalid - source has not been provided.'
      )

    if (!this.isValidProtName(rmrkSrc.protName))
      throw new Error(
        `Remark source is invalid - protocol name "${
          rmrkSrc.protName
        }" has been provided but expected - "${[...this.protNames.keys()].join(
          ' || '
        )}"`
      )

    if (!this.isValidVersion(rmrkSrc.version))
      throw new Error(
        `Remark source is invalid - protocol version "${
          rmrkSrc.version
        }" has been provided but expected - "${[...this.versions.keys()].join(
          ' || '
        )}"`
      )

    if (!this.isValidDestination(rmrkSrc.destination))
      throw new Error(
        `Remark source is invalid - destination "${
          rmrkSrc.destination
        }" has been provided but expected - "${[...this.destinations.keys()].join(
          ' || '
        )}"`
      )

    if (!this.isValidAction(rmrkSrc.action))
      throw new Error(
        `Remark source is invalid - action "${
          rmrkSrc.action
        }" has been provided but expected - "${[...this.actions.keys()].join(
          ' || '
        )}"`
      )

    return true
  }
}
