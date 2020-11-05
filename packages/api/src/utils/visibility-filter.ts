import { Space, Post } from '@subsocial/types/substrate/interfaces'
import { Visibility } from './types'

type StructWithHidden = Space | Post

export const isHidden = (struct?: StructWithHidden) => !struct || struct.hidden.valueOf()
export const isVisible = (struct?: StructWithHidden): struct is StructWithHidden => !isHidden(struct)

export const isEmptyContent = (struct?: StructWithHidden) => !struct || struct.content.isNone || struct.content.isNull

export const isUnlisted = (struct?: StructWithHidden) => isHidden(struct) || isEmptyContent(struct)
export const isPublic = (struct?: StructWithHidden): struct is StructWithHidden => !isUnlisted(struct)

export function VisibilityFilter<T extends StructWithHidden> (structs: T[], filter?: Visibility): T[] {

  switch (filter) {
    case 'onlyVisible': return structs.filter(isVisible)
    case 'onlyHidden': return structs.filter(isHidden)
    case 'onlyPublic': return structs.filter(isPublic)
    case 'onlyUnlisted': return structs.filter(isUnlisted)
    default: return structs
  }

}
