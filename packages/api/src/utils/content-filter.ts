import { CommonContent } from '@subsocial/types'
import { ContentFilter } from './types'

type HasContent = {
  content?: CommonContent
}

type Props<T> = ContentFilter & {
  structs: T[],
}

export const isContent = (struct?: HasContent) => struct && struct.content

export function contentFilter<T extends HasContent> ({ structs, withContentOnly }: Props<T>): T[] {

  if (withContentOnly) {
    return structs.filter(isContent)
  }

  return structs
}
