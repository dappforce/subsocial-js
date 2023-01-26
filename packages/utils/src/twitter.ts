import { TweetPostContent } from './types/twitter'

const BASE_TWITTER_URL = "https://twitter.com"

const parseHashtags = (text: string) => {
  const result = text.replace(
    /(\s#)(\w+[a-zA-Z0-9]+)/g,
    ` [#$2](${BASE_TWITTER_URL}/hashtag/$2?src=hashtag_click)`
  )

  return result
}

const parseUsernames = (text: string) => {
  const result = text.replace(
    /(?<!\w)@([a-zA-Z0-9_]+){1,15}/g,
    `[@$1](${BASE_TWITTER_URL}/$1)`
  )

  return result
}

const parseTextToMarkdown = (text: string) => {
  const hashtagsParsed = parseHashtags(text)
  const markdownWithLinks = parseUsernames(hashtagsParsed)

  return markdownWithLinks
}

export const twitterParser = {
  parseHashtags,
  parseUsernames,
  parseTextToMarkdown,
}

export const createTwitterURL = (tweet: TweetPostContent) => {
    return `${BASE_TWITTER_URL}/${tweet.username}/status/${tweet.id}`
}
