import { Space, Post } from '@subsocial/types/substrate/interfaces'
import { Visibility } from './types'

type StructWithHidden = Space | Post

const isHidden = (struct?: StructWithHidden) => !struct || struct.hidden.valueOf()
export const isVisible = (struct?: StructWithHidden) => !isHidden(struct)

export function VisibilityFilter<T extends StructWithHidden> (structs: T[], filter?: Visibility): T[] {

  switch (filter) {
    case 'onlyVisible': return structs.filter(isVisible)
    case 'onlyHidden': return structs.filter(isHidden)
    default: return structs
  }

}
