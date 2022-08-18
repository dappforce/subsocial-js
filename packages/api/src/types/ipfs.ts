import { CID } from 'ipfs-http-client'
import { IpfsCid as RuntimeIpfsCid } from '@subsocial/definitions/interfaces'

export type IpfsCommonContent =
  IpfsCommentContent |
  IpfsPostContent |
  IpfsSpaceContent |
  IpfsSharedPostContent

export type NamedLink = {
  name: string
  url?: string
}

export type IpfsSpaceContent = {
  name: string
  about: string
  image: string
  email: string
  tags: string[]
  links: string[] | NamedLink[]
}

type CommonPostContent = {
  body: string
}

export type IpfsSharedPostContent = CommonPostContent

export type IpfsPostContent = CommonPostContent & {
  title: string
  image: string
  tags: string[]
  canonical: string
  link?: string
}

export type IpfsCommentContent = CommonPostContent

export type IpfsCid = string | CID | RuntimeIpfsCid

export type Counts = {
  postsCount: number
  commentsCount: number
  reactionsCount: number
  followsCount: number
  spacesCount: number
  activitiesCount: number
}
