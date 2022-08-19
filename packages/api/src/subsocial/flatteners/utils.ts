import {
  SpaceData,
  PostData,
  CommentData,
  PostWithAllDetails,
  PostWithSomeDetails,
  DerivedContent,
  RawSpaceData,
  RawPostData,
  RawPostWithSomeDetails,
  RawPostWithAllDetails,
} from '../../types'

import { flattenPostStruct, flattenSpaceStruct } from '.'
import { summarizeMd } from '@subsocial/utils'
import { IpfsCommonContent, IpfsPostContent, IpfsSpaceContent } from '../../types/ipfs'

export function asCommentData (postData: PostData): CommentData {
  return postData as unknown as CommentData
}

export function convertToNewSpaceData (Raw: RawSpaceData): SpaceData {
  const struct = flattenSpaceStruct(Raw.struct)
  return { id: struct.id, struct, content: convertToDerivedContent(Raw.content!) }
}

export function convertToNewSpaceDataArray (Raw: RawSpaceData[]): SpaceData[] {
  return Raw.map(convertToNewSpaceData)
}

export function convertToNewPostData (Raw: RawPostData): PostData {
  const struct = flattenPostStruct(Raw.struct)
  return { id: struct.id, struct, content: convertToDerivedContent(Raw.content!) }
}

export function convertToNewPostDataArray (Raw: RawPostData[]): PostData[] {
  return Raw.map(convertToNewPostData)
}

export function convertToNewPostWithSomeDetailsArray (RawDataArr: RawPostWithSomeDetails[]): PostWithSomeDetails[] {
  return RawDataArr.map(x => {
    const post = convertToNewPostData(x.post)

    return {
      id: post.id,
      post,
      ext: x.ext && convertToNewPostWithSomeDetails(x.ext),
      space: x.space && convertToNewSpaceData(x.space),
    }
  })
}

export function convertToNewPostWithAllDetailsArray (RawDataArr: RawPostWithAllDetails[]): PostWithAllDetails[] {
  return convertToNewPostWithSomeDetailsArray(RawDataArr as RawPostWithAllDetails[]) as PostWithAllDetails[]
}

export function convertToNewPostWithSomeDetails (RawData?: RawPostWithSomeDetails): PostWithSomeDetails | undefined {
  return !RawData ? undefined : convertToNewPostWithSomeDetailsArray([ RawData ])[0]
}

export function convertToNewPostWithAllDetails (RawData?: RawPostWithAllDetails): PostWithAllDetails | undefined {
  return !RawData ? undefined : convertToNewPostWithAllDetailsArray([ RawData ])[0]
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