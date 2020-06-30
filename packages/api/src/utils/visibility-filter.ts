import { Space, Post } from '@subsocial/types/substrate/interfaces'
import { Visibility } from './types'

type VisibilityStruct = Space | Post

const isHidden = (struct: VisibilityStruct) => struct.hidden.valueOf()
const isVisible = (struct: VisibilityStruct) => !isHidden(struct)

export function filterByVisibility<T extends Space | Post> (structs: T[], filter: Visibility): T[] {

  switch (filter) {
    case 'onlyVisible': return structs.filter(isVisible)
    case 'onlyHidden': return structs.filter(isHidden)
    default: return structs
  }

}
