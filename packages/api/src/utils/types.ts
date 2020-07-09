import { AnyPostId, AnySpaceId } from '@subsocial/types'

export type Visibility = 'onlyVisible' | 'onlyHidden'

export type VisibilityFilter = {
  visibility?: Visibility
}

export type PostDetailsOpts = FilterByVisibility & {
  withSpace?: boolean
  withOwner?: boolean
}

type IdsFilter<Id> = {
  ids: Id[]
}

type IdFilter<Id> = {
  id: Id
}

export type FindStructs<Id> = IdsFilter<Id> & FilterByVisibility
export type FindStruct<Id> = IdFilter<Id> & FilterByVisibility

export type FindPostsQuery = FindDataByIds<AnyPostId>
export type FindSpacesQuery = FindDataByIds<AnySpaceId>
export type FindPostQuery = FindDataById<AnyPostId>
export type FindSpaceQuery = FindDataById<AnySpaceId>

export type FindPostsWithDetailsQuery = FindPostsQuery & PostDetailsOpts
export type FindPostWithDetailsQuery = FindPostQuery & PostDetailsOpts
