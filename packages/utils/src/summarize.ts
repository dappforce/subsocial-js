import { isEmptyStr } from './string'
import truncate from 'lodash.truncate'
import { mdToText } from './md'

const DEFAULT_SUMMARY_LEN = 300

const SEPARATOR = /[.,:;!?()[\]{}\s]+/

type SummarizeOpt = {
  limit?: number,
  omission?: string;
}

/** Shorten a plain text up to `limit` chars. Split by separators. */
export const summarize = (
  text: string,
  opts: SummarizeOpt = {}
): string => {
  if (isEmptyStr(text)) return ''

  text = (text as string).trim()

  const {
    limit = DEFAULT_SUMMARY_LEN,
    omission = '...'
  } = opts

  return text.length <= limit
    ? text
    : truncate(text, {
      length: limit,
      separator: SEPARATOR,
      omission
    })
}

export const summarizeMd = (
  md: string,
  opts: SummarizeOpt = {}
) => {
  const text = mdToText(md)?.trim() || ''
  const summary = summarize(text, opts)
  const isShowMore = text.length > summary.length

  return {
    summary,
    isShowMore
  }
}
