import { UrlConfig } from './types'
import { NodeHandlerParams, SocialResourceGraph } from './graph'
import utils from './utiils'

export class SocialResource {
  private ingestedData: null | string | UrlConfig = null

  private resourceStructGraph: SocialResourceGraph =
    SocialResourceGraph.getInstance()

  private resourceParams: null | UrlConfig = null

  private resourceIdSectionSeparator: string = '/'
  private resourceIdValueSeparator: string = ':'

  constructor(
    resourceParams: UrlConfig,
    private exceptionIfFailed: boolean = false
  ) {
    this.parseMetadata(resourceParams)
  }

  public get ingestedResourceParams(): UrlConfig | null {
    return this.resourceParams
  }

  public toResourceId(): string {
    if (!this.resourceParams) {
      this.maybeException('SocialResource is missing ingested data.')
      return ''
    }
    let resourceId = `${this.resourceParams.schema}:${this.resourceIdSectionSeparator}`

    const appendResIdParameter = ({
      nodeName,
      nodeAttr,
      anyNodeName,
      anyValueFallbackCall = false
    }: NodeHandlerParams): boolean => {
      if (
        nodeAttr.keyName !== 'resourceValue' &&
        this.resourceParams![nodeAttr.keyName as keyof UrlConfig] === nodeName
      ) {
        resourceId += `${this.resourceIdSectionSeparator}${nodeAttr.keyName}${this.resourceIdValueSeparator}${nodeName}`
        return this.resourceStructGraph.mapNodes(
          appendResIdParameter,
          nodeName,
          this.resourceParams
        )
      } else if (
        nodeAttr.keyName !== 'resourceValue' &&
        anyValueFallbackCall &&
        anyNodeName === nodeName
      ) {
        resourceId += `${this.resourceIdSectionSeparator}${nodeAttr.keyName}${
          this.resourceIdValueSeparator
        }${this.resourceParams![nodeAttr.keyName as keyof UrlConfig]}`
        return this.resourceStructGraph.mapNodes(
          appendResIdParameter,
          nodeName,
          this.resourceParams
        )
      } else if (nodeAttr.keyName === 'resourceValue') {
        const paramVal =
          this.resourceParams!.resourceValue[
            nodeName as keyof UrlConfig['resourceValue']
          ]
        if (!paramVal) utils.common.throwWrongGraphNodeError(nodeAttr.keyName)
        resourceId += `${this.resourceIdSectionSeparator}${nodeName}${this.resourceIdValueSeparator}${paramVal}`

        return true
      }
      return false
    }

    this.resourceStructGraph.mapNodes(
      appendResIdParameter,
      this.resourceParams.schema,
      this.resourceParams
    )

    return resourceId
  }

  private parseMetadata(rawParams: UrlConfig) {
    this.ingestedData = rawParams
    this.resourceParams = rawParams
    return this
  }

  private maybeException(
    msg: string = 'Error has been occurred'
  ): void | never {
    if (!this.exceptionIfFailed) return
    throw new Error(msg)
  }
}
