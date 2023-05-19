import { UrlConfig } from '../types'

export function throwWrongGraphNodeError(resourceParamName: string): never {
  throw new Error(
    `Provided parameters for resource are invalid. Please, check field "${resourceParamName}".`
  )
}

export function getFieldNameByValue(
  value: string,
  src: UrlConfig | null
): string {
  if (!src) return ''
  for (const fieldName in src) {
    if (src[fieldName as keyof UrlConfig] === value) return fieldName
  }
  return 'unknown'
}
