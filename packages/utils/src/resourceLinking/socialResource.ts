import { UrlConfig } from './types'
import sortKeys from 'sort-keys'

export class SocialResource {
  private ingestedData: null | string | UrlConfig = null

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
    this.resourceParams = sortKeys(rawParams, { deep: true })
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
    const { schema, resourceValue, ...other } = this.resourceParams
    let resId = `${schema}:/`

    for (const paramName in other) {
      resId += `/${paramName}:${
        other[paramName as keyof Omit<UrlConfig, 'schema' | 'resourceValue'>]
      }`
    }
    for (const valProp in resourceValue) {
      resId += `/${valProp}:${
        resourceValue[valProp as keyof UrlConfig['resourceValue']]
      }`
    }
    return resId
  }
}
