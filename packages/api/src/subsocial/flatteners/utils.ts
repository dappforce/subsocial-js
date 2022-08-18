import {
  SpaceData as OldSpaceData,
  PostData as OldPostData,
  PostWithSomeDetails as OldPostWithSomeDetails,
  PostWithAllDetails as OldPostWithAllDetails,
} from '../types'

import {
  SpaceData,
  PostData,
  CommentData,
  PostWithAllDetails,
  PostWithSomeDetails,
  DerivedContent,
} from '../../types'

import { flattenPostStruct, flattenSpaceStruct } from '.'
import { summarizeMd } from '@subsocial/utils'
import { IpfsCommonContent, IpfsPostContent, IpfsSpaceContent } from '../../types/ipfs'

export function asCommentData (postData: PostData): CommentData {
  return postData as unknown as CommentData
}

export function convertToNewSpaceData (old: OldSpaceData): SpaceData {
  const struct = flattenSpaceStruct(old.struct)
  return { id: struct.id, struct, content: convertToDerivedContent(old.content!) }
}

export function convertToNewSpaceDataArray (old: OldSpaceData[]): SpaceData[] {
  return old.map(convertToNewSpaceData)
}

export function convertToNewPostData (old: OldPostData): PostData {
  const struct = flattenPostStruct(old.struct)
  return { id: struct.id, struct, content: convertToDerivedContent(old.content!) }
}

export function convertToNewPostDataArray (old: OldPostData[]): PostData[] {
  return old.map(convertToNewPostData)
}

export function convertToNewPostWithSomeDetailsArray (oldDataArr: OldPostWithSomeDetails[]): PostWithSomeDetails[] {
  return oldDataArr.map(x => {
    const post = convertToNewPostData(x.post)

    return {
      id: post.id,
      post,
      ext: x.ext && convertToNewPostWithSomeDetails(x.ext),
      space: x.space && convertToNewSpaceData(x.space),
    }
  })
}

export function convertToNewPostWithAllDetailsArray (oldDataArr: OldPostWithAllDetails[]): PostWithAllDetails[] {
  return convertToNewPostWithSomeDetailsArray(oldDataArr as OldPostWithAllDetails[]) as PostWithAllDetails[]
}

export function convertToNewPostWithSomeDetails (oldData?: OldPostWithSomeDetails): PostWithSomeDetails | undefined {
  return !oldData ? undefined : convertToNewPostWithSomeDetailsArray([ oldData ])[0]
}

export function convertToNewPostWithAllDetails (oldData?: OldPostWithAllDetails): PostWithAllDetails | undefined {
  return !oldData ? undefined : convertToNewPostWithAllDetailsArray([ oldData ])[0]
}

type SpaceOrPostData = PostData | SpaceData

export function isUnlisted (data?: SpaceOrPostData) {
  if (!data) return true

  const { struct, content } = data

  return struct.hidden || !content
}

export function isPublic (data?: SpaceOrPostData) {
  return !isUnlisted(data)
}

type MaybeSpaceContent = Pick<IpfsSpaceContent, 'about'>

type MaybePostContent = Pick<IpfsPostContent, 'body' | 'title'>

export function convertToDerivedContent
  <T extends IpfsCommonContent = IpfsCommonContent>
  (content?: T): DerivedContent<T> | undefined
{
  if (!content) return undefined

  const maybeSpace = (content as MaybeSpaceContent)
  const aboutPost = (content as MaybePostContent)
  const md = maybeSpace.about || aboutPost.body || aboutPost.title

  return {
    ...content,
    ...summarizeMd(md)
  }
}