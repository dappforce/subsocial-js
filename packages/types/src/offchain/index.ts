import CID from 'cids'
import { IpfsCid as RuntimeIpfsCid } from '@subsocial/definitions/interfaces'

export { CID }

export type CommonContent =
  CommentContent |
  PostContent |
  SpaceContent |
  ProfileContent |
  SharedPostContent

export type Activity = {
  account: string
  block_number: string
  event_index: number
  event: EventsName
  /** Account id. */
  following_id?: string
  space_id?: string
  post_id?: string
  comment_id?: string,
  /* Balance */
  amount?: string,
  /** Date of this activity. Example: "2020-12-03T19:22:36.000Z" */
  date: string
  aggregated: boolean
  agg_count: number
}

export type NamedLink = {
  name: string
  url?: string
}

type ContentFormat = {
  format?: 'md' | 'html'
}

export type SpaceContent = ContentFormat & {
  name: string
  about: string
  image: string
  email: string
  tags: string[]
  links: string[] | NamedLink[]
}

type CommonPostContent = ContentFormat & {
  body: string
}

export type SharedPostContent = CommonPostContent

export type SubstrareProposal = {
  kind: 'SubstrateProposal'
  network: 'Kusama' | 'Polkadot'
  proposalIndex: number
}

export type MetaItem = SubstrareProposal

export type PostContent = CommonPostContent & {
  title: string
  image: string
  tags: string[]
  canonical: string
  link?: string
  meta?: MetaItem[]
}

export type CommentContent = CommonPostContent

export type ProfileContent = {
  name: string
  avatar: string
  about: string
}

export type IpfsCid = string | CID | RuntimeIpfsCid

export type EventsName =
  'AccountFollowed' |
  'SpaceFollowed' |
  'SpaceCreated' |
  'CommentCreated' |
  'CommentReplyCreated' |
  'PostCreated' |
  'PostShared' |
  'CommentShared' |
  'PostReactionCreated' |
  'CommentReactionCreated'

export type Counts = {
  postsCount: number
  commentsCount: number
  reactionsCount: number
  followsCount: number
  spacesCount: number
  activitiesCount: number
}
