export type HttpRequestMethod = 'post' | 'get'

export type UseServerProps = {
  httpRequestMethod: HttpRequestMethod
}

export type SubsocialContext = {
  useServer?: UseServerProps
}

type CidAsStr = string

export type ContentResult<T> = Record<CidAsStr, T>