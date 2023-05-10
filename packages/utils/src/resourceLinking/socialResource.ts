import { ResourceTypeMap, UrlConfig, Schema } from './types'
import { NodeAttributes, SocialResourceGraph } from './graph'
import { urlHref } from './constants'

export class SocialResource {
  private ingestedDataType: null | 'meta' | 'url' = null

  private resourceStructGraph: SocialResourceGraph =
    SocialResourceGraph.getInstance()

  private ingestedData: null | string | UrlConfig = null

  private resourceMetaData: null | UrlConfig = null

  private isIngestedDataValid: boolean = true
  private isMetaDataValid: boolean = true

  constructor(private exceptionIfFailed: boolean = false) {}

  public get ingest(): {
    url: (rqwUrl: string) => SocialResource
    metaData: <S extends Schema, Rt extends ResourceTypeMap[S]>(
      rawMetaData: UrlConfig<S, Rt>
    ) => SocialResource
  } {
    return {
      url: this.parseUrl.bind(this),
      metaData: this.parseMetadata.bind(this)
    }
  }

  public get build(): {
    url: () => string
    resourceId: () => string
  } {
    return {
      url: this.buildUrl.bind(this),
      resourceId: this.buildResourceId.bind(this)
    }
  }

  public get isValid(): boolean {
    return this.isIngestedDataValid && this.isMetaDataValid
  }

  private parseUrl(rawUrl: string): SocialResource {
    this.ingestedDataType = 'url'
    this.ingestedData = rawUrl

    let parsedUrl: URL | null = null
    let params: URLSearchParams | null = null

    try {
      parsedUrl = new URL(rawUrl)
      params = new URLSearchParams(parsedUrl.search)
    } catch (e) {
      this.maybeException('URL structure is invalid.')
      this.isIngestedDataValid = false
      return this
    }

    if (!params && !parsedUrl) {
      this.maybeException('URL structure is invalid.')
      this.isIngestedDataValid = false
      return this
    }

    const config: Record<
      string,
      string | Record<string, string | Record<string, string>>
    > = {}

    const setVal = (nodeName: string, nodeAttr: NodeAttributes) => {
      if (
        params!.has(nodeAttr.urlKeyName) &&
        nodeAttr.urlKeyName !== 'resourceValue' &&
        nodeName === params!.get(nodeAttr.urlKeyName)
      ) {
        if (nodeAttr.configParentName) {
          if (!config[nodeAttr.configParentName])
            config[nodeAttr.configParentName] = {}
          // @ts-ignore
          config[nodeAttr.configParentName][nodeAttr.configName] =
            params!.get(nodeAttr.urlKeyName) ?? ''
        } else {
          config[nodeAttr.configName] = params!.get(nodeAttr.urlKeyName) ?? ''
        }
        this.resourceStructGraph.mapNodes(setVal, nodeName)
      } else if (
        params!.has(nodeAttr.urlKeyName) &&
        nodeAttr.urlKeyName === 'resourceValue'
      ) {
        if (nodeAttr.configParentName) {
          if (!config[nodeAttr.configParentName])
            config[nodeAttr.configParentName] = {}
          // @ts-ignore
          config[nodeAttr.configParentName][nodeAttr.configName] = {
            [nodeName]: params!.get(nodeAttr.urlKeyName) ?? ''
          }
        } else {
          config[nodeAttr.configName] = {
            [nodeName]: params!.get(nodeAttr.urlKeyName) ?? ''
          }
        }
      }
    }

    this.resourceStructGraph.mapNodes(setVal)

    // TODO add ingested data validation

    this.resourceMetaData = config as UrlConfig
    return this
  }

  private parseMetadata<S extends Schema, Rt extends ResourceTypeMap[S]>(
    rawMetaData: UrlConfig<S, Rt>
  ) {
    this.ingestedDataType = 'meta'
    this.ingestedData = rawMetaData
    // TODO add ingested data validation
    this.resourceMetaData = rawMetaData
    return this
  }

  private maybeException(
    msg: string = 'Error has been occurred'
  ): void | never {
    if (!this.exceptionIfFailed) return
    throw new Error(msg)
  }

  buildUrl(): string {
    if (!this.resourceMetaData) {
      this.maybeException('Social Resource is missing ingested data.')
      this.isIngestedDataValid = false
      return ''
    }
    let url = `${urlHref}?resourceLocation=${this.resourceMetaData.schema}`

    const appendUrlParameter = (nodeName: string, nodeAttr: NodeAttributes) => {
      if (
        nodeAttr.configName !== 'resourceValue' &&
        this.resourceMetaData!.config[
          nodeAttr.configName as keyof UrlConfig['config']
        ] === nodeName
      ) {
        url += `&${nodeAttr.urlKeyName}=${nodeName}`
        this.resourceStructGraph.mapNodes(appendUrlParameter, nodeName)
      } else if (nodeAttr.configName === 'resourceValue') {
        url += `&${nodeAttr.urlKeyName}=${
          this.resourceMetaData!.config.resourceValue[nodeName]
        }`
      }
    }

    this.resourceStructGraph.mapNodes(
      appendUrlParameter,
      this.resourceMetaData.schema
    )

    return url
  }
  buildResourceId(): string {
    if (!this.resourceMetaData) {
      this.maybeException('Social Resource is missing ingested data.')
      this.isIngestedDataValid = false
      return ''
    }
    let resId = `${this.resourceMetaData.schema}:/`

    const appendResIdParameter = (
      nodeName: string,
      nodeAttr: NodeAttributes
    ) => {
      if (
        nodeAttr.configName !== 'resourceValue' &&
        this.resourceMetaData!.config[
          nodeAttr.configName as keyof UrlConfig['config']
        ] === nodeName
      ) {
        if (!nodeAttr.resourceIdPairValue) {
          resId += `/${nodeName}`
        } else {
          resId += `:${nodeName}`
        }
        this.resourceStructGraph.mapNodes(appendResIdParameter, nodeName)
      } else if (nodeAttr.configName === 'resourceValue') {
        resId += `:${this.resourceMetaData!.config.resourceValue[nodeName]}`
      }
    }

    this.resourceStructGraph.mapNodes(
      appendResIdParameter,
      this.resourceMetaData.schema
    )

    return resId
  }

  // static getConfigFromRegistry<P extends Project>(project: P, details: RegistryConfigDetails<P>){
  //
  // }
}
