import { nonEmptyStr } from './string'
import slugify from '@sindresorhus/slugify'
import { summarize } from './summarize'
import memoize from 'lodash/memoize'

const MAX_SLUG_LENGTH = 60
const SLUG_SEPARATOR = '-'

export type HasTitleOrBody = {
  title?: string,
  body: string
}

export const createPostSlug = memoize((postId: string, content?: HasTitleOrBody) => {
  let slug: string = '' + postId

  if (content) {
    const { title, body } = content
    const titleOrBody = nonEmptyStr(title) ? title : body
    const summary = summarize(titleOrBody, { limit: MAX_SLUG_LENGTH, omission: '' })
    const slugifiedSummary = slugify(summary, { separator: SLUG_SEPARATOR })
    
    if (nonEmptyStr(slugifiedSummary)) {
      slug = slugifiedSummary + '-' + slug
    }
  }

  return slug
})

export const getPostIdFromSlug = (slug: string): string | undefined => {
  return slug.split(SLUG_SEPARATOR).pop()
}
