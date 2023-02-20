/* eslint-disable @typescript-eslint/no-var-requires */
import { isEmptyStr } from './string'

const remark = require('remark')
const strip = require('strip-markdown')
const html = require('remark-html')
const remarkGfm = require('remark-gfm')
// const squeezeParagraphs = require('remark-squeeze-paragraphs')

type ProccesMdFn = (md?: string) => string

const processMdToText: ProccesMdFn = remark()
  .use(strip)
  // .use(squeezeParagraphs) // <-- doesn't work very well: leaves couple sequential new lines
  .processSync

export const buildMdToEntity = (processMd: ProccesMdFn)=> 
  (md?: string) => {
    if (isEmptyStr(md)) return md

    return String(processMd(md) as string)
      // strip-markdown renders URLs as:
      // http&#x3A;//hello.com
      // so we need to fix this issue
      .replace(/&#x3A;/g, ':')
  }

/** Convert text in markdown format to plain text */
export const mdToText = buildMdToEntity(processMdToText)

const processMdToHtml = remark()
  .use(remarkGfm)
  .use(html)
  .processSync

/** Convert text in markdown format to html text */
export const mdToHtml = buildMdToEntity(processMdToHtml)