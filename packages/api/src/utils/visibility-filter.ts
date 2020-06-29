import { Space, Post } from '@subsocial/types/substrate/interfaces'

export type VisibilityFilter = 'onlyVisible' | 'onlyHidden' | undefined

type VisibilityFilterStruct = Space | Post

const isHidden = (struct: VisibilityFilterStruct) => struct.hidden.valueOf()
const isVisible = (struct: VisibilityFilterStruct) => !isHidden(struct)

export function visibilityFilter<T extends Space | Post> (structs: T[], filter: VisibilityFilter): T[] {

  switch (filter) {
    case 'onlyVisible': return structs.filter(isVisible)
    case 'onlyHidden': return structs.filter(isHidden)
    default: return structs
  }

}
