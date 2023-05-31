import { ResourceParameters } from './types'
import { NodeHandlerParams, ResourceGraph } from './graph'
import utils from './utiils'

export class Resource {
  private ingestedData: null | string | ResourceParameters = null

  private resourceStructGraph: ResourceGraph = ResourceGraph.getInstance()

  private resourceParams: null | ResourceParameters = null

  private resourceIdSectionSeparator: string = '/'
  private resourceIdValueSeparator: string = ':'

  constructor(
    resourceParams: ResourceParameters,
    private exceptionIfFailed: boolean = false
  ) {
    this.parseMetadata(resourceParams)
  }

  public get ingestedResourceParams(): ResourceParameters | null {
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
        this.resourceParams![nodeAttr.keyName as keyof ResourceParameters] ===
          nodeName
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
        }${this.resourceParams![nodeAttr.keyName as keyof ResourceParameters]}`
        return this.resourceStructGraph.mapNodes(
          appendResIdParameter,
          nodeName,
          this.resourceParams
        )
      } else if (nodeAttr.keyName === 'resourceValue') {
        const paramVal =
          this.resourceParams!.resourceValue[
            nodeName as keyof ResourceParameters['resourceValue']
          ]

        if (!paramVal && nodeAttr.isRequired)
          utils.common.throwWrongGraphNodeError(nodeAttr.keyName)

        if (!paramVal && !nodeAttr.isRequired) return true

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

  private parseMetadata(rawParams: ResourceParameters) {
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
