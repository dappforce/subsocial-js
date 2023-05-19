import { UrlConfig } from './types'
import { NodeAttributes, NodeHandlerParams, SocialResourceGraph } from './graph'
import utils from './utiils'

export class SocialResource {
  private ingestedData: null | string | UrlConfig = null

  private resourceStructGraph: SocialResourceGraph =
    SocialResourceGraph.getInstance()

  private resourceParams: null | UrlConfig = null

  constructor(private exceptionIfFailed: boolean = false) {}

  public get ingestedResourceParams(): UrlConfig | null {
    return this.resourceParams
  }

  public get ingest(): {
    resourceParams: (rawParams: UrlConfig) => SocialResource
  } {
    return {
      resourceParams: this.parseMetadata.bind(this)
    }
  }

  public get build(): {
    resourceId: () => string
  } {
    return {
      resourceId: this.buildResourceId.bind(this)
    }
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

  buildResourceId(): string {
    if (!this.resourceParams) {
      this.maybeException('Social Resource is missing ingested data.')
      return ''
    }
    let resId = `${this.resourceParams.schema}:/`

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
        resId += `/${nodeAttr.keyName}:${nodeName}`
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
        resId += `/${nodeAttr.keyName}:${
          this.resourceParams![nodeAttr.keyName as keyof UrlConfig]
        }`
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
        resId += `/${nodeName}:${paramVal}`

        return true
      }
      return false
    }

    this.resourceStructGraph.mapNodes(
      appendResIdParameter,
      this.resourceParams.schema,
      this.resourceParams
    )

    return resId
  }
}
