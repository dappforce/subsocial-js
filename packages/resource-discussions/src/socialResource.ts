import { UrlConfig } from './types'
import { NodeAttributes, SocialResourceGraph } from './graph'

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

  // buildResourceId(): string {
  //   if (!this.resourceParams) {
  //     this.maybeException('Social Resource is missing ingested data.')
  //     return ''
  //   }
  //   const { schema, resourceValue, ...other } = this.resourceParams
  //   let resId = `${schema}:/`
  //
  //   for (const paramName in other) {
  //     resId += `/${paramName}:${
  //       other[paramName as keyof Omit<UrlConfig, 'schema' | 'resourceValue'>]
  //     }`
  //   }
  //   for (const valProp in resourceValue) {
  //     resId += `/${valProp}:${
  //       resourceValue[valProp as keyof UrlConfig['resourceValue']]
  //     }`
  //   }
  //   return resId
  // }

  buildResourceId(): string {
    if (!this.resourceParams) {
      this.maybeException('Social Resource is missing ingested data.')
      return ''
    }
    let resId = `${this.resourceParams.schema}:/`

    const appendResIdParameter = (
      nodeName: string,
      nodeAttr: NodeAttributes
    ) => {
      if (
        nodeAttr.keyName !== 'resourceValue' &&
        this.resourceParams![nodeAttr.keyName as keyof UrlConfig] === nodeName
      ) {
        resId += `/${nodeAttr.keyName}:${nodeName}`

        this.resourceStructGraph.mapNodes(appendResIdParameter, nodeName)
      } else if (nodeAttr.keyName === 'resourceValue') {
        resId += `/${nodeAttr.keyName}:${
          this.resourceParams!.resourceValue[
            nodeName as keyof UrlConfig['resourceValue']
          ]
        }`
      }
    }

    this.resourceStructGraph.mapNodes(
      appendResIdParameter,
      this.resourceParams.schema
    )

    return resId
  }
}
