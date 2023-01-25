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

//Ref: https://github.com/PLhery/node-twitter-api-v2/blob/master/src/types/v2/tweet.definition.v2.ts
interface ReferencedTweetV2 {
  type: 'retweeted' | 'quoted' | 'replied_to'
  id: string
}

interface TweetAttachmentV2 {
  media_keys?: string[]
  poll_ids?: string[]
}

export type TweetPostContent = {
  id: string
  edit_history_tweet_ids: string[]
  username: string
  created_at?: string
  author_id?: string
  conversation_id?: string
  in_reply_to_user_id?: string
  referenced_tweets?: ReferencedTweetV2[]
  attachments?: TweetAttachmentV2
  lang?: string
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
  tweet?: TweetPostContent
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

export type ImportCandidate =
  | ToFile
  | ToDirectory
  | ToContent

export interface ToFile {
  path?: string
  content: ToContent
}

export interface ToDirectory {
  path: string
  content?: undefined
}

/**
 * File content in arbitrary (supported) representation. It is used in input
 * positions and is usually normalized to `Blob` in browser contexts and
 * `AsyncIterable<Uint8Array>` in node.
 */
export type ToContent =
  | string
  | InstanceType<typeof String>
  | ArrayBufferView
  | ArrayBuffer
  | Blob
  | ReadableStream<Uint8Array>