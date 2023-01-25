const BASE_TWITTER_URL = "https://twitter.com"

export const parseHashtag = (text: string) => {
  const result = text.replace(
    /(\s#)(\w+[a-zA-Z0-9]+)/g,
    ` [#$2](${BASE_TWITTER_URL}/hashtag/$2?src=hashtag_click)`
  )

  return result
}

export const parseUsername = (text: string) => {
  const result = text.replace(
    /(?<!\w)@([a-zA-Z0-9_]+){1,15}/g,
    `[@$1](${BASE_TWITTER_URL}/$1)`
  )

  return result
}

export const parseTextToMarkdown = (text: string) => {
  const hashtagParsed = parseHashtag(text)
  const markdownWithLinks = parseUsername(hashtagParsed)

  return markdownWithLinks
}

export const createTwitterURL = (username: string, tweetId: string) => {
    return `${BASE_TWITTER_URL}/${username}/status/${tweetId}`
}
