import { UrlConfig } from './types'

export class SocialResource {
  private ingestedData: null | string | UrlConfig = null

  private resourceParams: null | UrlConfig = null

  constructor(private exceptionIfFailed: boolean = false) {}

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
    // TODO add ingested data validation
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

    for (const paramName in this.resourceParams) {
      if (paramName === 'schema') continue
      if (paramName !== 'resourceValue') {
        resId += `/${paramName}:${
          this.resourceParams[paramName as keyof UrlConfig]
        }`
      } else {
        for (const valProp in this.resourceParams.resourceValue) {
          resId += `/${valProp}:${
            this.resourceParams.resourceValue[
              valProp as keyof UrlConfig['resourceValue']
            ]
          }`
        }
      }
    }
    return resId
  }
}
