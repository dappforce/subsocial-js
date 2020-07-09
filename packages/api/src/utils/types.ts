import { AnyPostId, AnySpaceId } from '@subsocial/types'

export type Visibility = 'onlyVisible' | 'onlyHidden'

export type VisibilityFilter = {
  visibility?: Visibility
}

export type PostDetailsOpts = VisibilityFilter & {
  withSpace?: boolean
  withOwner?: boolean
}

type IdsFilter<Id> = {
  ids: Id[]
}

type IdFilter<Id> = {
  id: Id
}

export type FindStructs<Id> = IdsFilter<Id> & VisibilityFilter
export type FindStruct<Id> = IdFilter<Id> & VisibilityFilter

export type FindPostsQuery = FindStructs<AnyPostId>
export type FindSpacesQuery = FindStructs<AnySpaceId>
export type FindPostQuery = FindStruct<AnyPostId>
export type FindSpaceQuery = FindStruct<AnySpaceId>

export type FindPostsWithDetailsQuery = FindPostsQuery & PostDetailsOpts
export type FindPostWithDetailsQuery = FindPostQuery & PostDetailsOpts
