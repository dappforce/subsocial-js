import { AnyPostId, AnySpaceId } from "../subsocial/types"

/** 
 * The four visible state filters correspond to the next conditions:
 * 
 * - `onlyVisible` – The `hidden` field on corresponding Substrate struct (e.g. `Space` or `Post`) is `false`.
 * - `onlyHidden` – The `hidden` field on corresponding Substrate struct (e.g. `Space` or `Post`) is `true`.
 * - `onlyPublic` – The `hidden` field on corresponding Substrate struct (e.g. `Space` or `Post`) is `false` 
 * and there is a corresponding JSON file on IPFS.
 * - `onlyUnlisted` – Either the `hidden` field on corresponding Substrate struct (e.g. `Space` or `Post`) is `true` 
 * or there is a no corresponding JSON file on IPFS.
 */
export type Visibility = 'onlyVisible' | 'onlyHidden' | 'onlyPublic' | 'onlyUnlisted'

export type VisibilityFilter = {
  visibility?: Visibility
}

export type ContentFilter = {
  withContentOnly?: boolean
}

export type Filters = VisibilityFilter & ContentFilter

export type PostDetailsOpts = VisibilityFilter & {
  withSpace?: boolean
  withOwner?: boolean
}

/**
 * Properties:
 * - `id` - Id of desired struct.
 * - `visibility` - Filter for visible state of the struct (see {@link Visibility}).
 */
export type FindStruct<Id> = {
  id: Id
} & Filters

/**
 * Properties:
 * - `ids` - An array of ids of desired structs.
 * - `visibility` - Filter for visible state of the structs (see {@link Visibility}).
 */
export type FindStructs<Id> = {
  ids: Id[]
} & Filters

export type FindPostsQuery = FindStructs<AnyPostId>
export type FindSpacesQuery = FindStructs<AnySpaceId>
export type FindPostQuery = FindStruct<AnyPostId>
export type FindSpaceQuery = FindStruct<AnySpaceId>

export type FindPostsWithDetailsQuery = FindPostsQuery & PostDetailsOpts
export type FindPostWithDetailsQuery = FindPostQuery & PostDetailsOpts
