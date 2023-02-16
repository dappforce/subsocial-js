import { TweetPostContent } from './types/twitter'
import Autolinker from 'autolinker'

const BASE_TWITTER_URL = 'https://twitter.com'

export const parseTwitterTextToMarkdown = (text: string) => {
  const parsed = Autolinker.link(text, {
    mention: 'twitter',
    hashtag: 'twitter',
    stripPrefix: false,
    phone: false,
    email: false,
    sanitizeHtml: true,
    replaceFn: function (match) {
      const href = match.getAnchorHref()
      const text = match.getAnchorText()

      return `[${text}](${href})`
    },
  })

  return parsed
}

export const createTwitterURL = (tweet: { username: string; id: string }) => {
  return `${BASE_TWITTER_URL}/${tweet.username}/status/${tweet.id}`
}
