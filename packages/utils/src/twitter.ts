import { TweetPostContent } from './types/twitter'

const BASE_TWITTER_URL = 'https://twitter.com'

const parseHashtag = (text: string) => {
  const result = text.replace(
    /(\s#)(\w+[a-zA-Z0-9]+)/g,
    ` [#$2](${BASE_TWITTER_URL}/hashtag/$2?src=hashtag_click)`
  )

  return result
}

const parseUsername = (text: string) => {
  const result = text.replace(
    /(?<!\w)@([a-zA-Z0-9_]+){1,15}/g,
    `[@$1](${BASE_TWITTER_URL}/$1)`
  )

  return result
}

const parseLink = (text: string) => {
  const urlRegex =
    /\b(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*))\b/g
  return text.replace(urlRegex, '<$1>')
}

const parseTextToMarkdown = (text: string) => {
  const hashtagParsed = parseHashtag(text)
  const usernameParsed = parseUsername(hashtagParsed)
  const linksParsed = parseLink(usernameParsed)

  return linksParsed
}

export const twitterParser = {
  parseLink,
  parseHashtag,
  parseUsername,
  parseTextToMarkdown,
}

export const createTwitterURL = (tweet: TweetPostContent) => {
  return `${BASE_TWITTER_URL}/${tweet.username}/status/${tweet.id}`
}
