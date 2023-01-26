import { describe, expect, test } from "@jest/globals"
import { twitterParser } from '../../twitter'

const mocks = {
  longTweet: `Super GM #Dotsama 
    Super GM #Web3 
    
    The 🌍 is YOURS!
    OWN IT!
    
    YOU CAN, achieve everything you think of!
    If YOU 👀 it in YOUR mind, YOU CAN, hold it in YOUR 🤲
    
    ⌚ is YOURS!
    Spend it how YOU choose!
    Just spend it wisely driving towards the dream YOU visualise!
    
    Let's go!
    
    🥂🚀`,
  inputHashtag: `Polkadot is the new #Web3 ecosystem.`,
  outputHashtag: `Polkadot is the new [#Web3](https://twitter.com/hashtag/Web3?src=hashtag_click) ecosystem.`,
  inputHashtagDigitOnly: "First thing #1, second thing #2, third thing #3",
  inputNoWhiteSpace: "123#sofun",
  inputHashtagWithPunctuation: "#it’sfun",
  outputHashtagWithPunctuation: "#it",
  inputUsername: "@SubsocialChain is a decentralised social finance platform.",
  outputUsername:
    "[@SubsocialChain](https://twitter.com/SubsocialChain) is a decentralised social finance platform.",
  inputUsernameWithCharPrefix: "123@TwitterSupport",
}

describe("Hashtag parser", () => {
  test("should return a defined value when given a non-empty string", () => {
    expect(twitterParser.parseHashtag(mocks.longTweet)).toBeDefined()
  })

  test("should return a string when given a non-empty string", () => {
    expect(typeof twitterParser.parseHashtag(mocks.longTweet)).toBe("string")
  })

  test("should return markdown-formatted string when given a string with hashtag", () => {
    expect(twitterParser.parseHashtag(mocks.inputHashtag)).toMatch(mocks.outputHashtag)
  })

  test("should not parse the hashtag if it is followed by digits only", () => {
    expect(twitterParser.parseHashtag(mocks.inputHashtagDigitOnly)).toMatch(mocks.inputHashtagDigitOnly)
  })

  test("should not work for letters or numbers in front of the # symbol", () => {
    expect(twitterParser.parseHashtag(mocks.inputNoWhiteSpace)).toMatch(mocks.inputNoWhiteSpace)
  })

  test("should cut words in hashtag if punctuation is present", () => {
    expect(twitterParser.parseHashtag(mocks.inputHashtagWithPunctuation)).toMatch(
      mocks.outputHashtagWithPunctuation,
    )
  })
})

describe("Username parser", () => {
  test("should return a defined value when given a non-empty string", () => {
    expect(twitterParser.parseUsername(mocks.longTweet)).toBeDefined()
  })

  test("should return a string when given a non-empty string", () => {
    expect(typeof twitterParser.parseUsername(mocks.longTweet)).toBe("string")
  })

  test("should return markdown-formatted string when given a string with @ symbol", () => {
    expect(twitterParser.parseUsername(mocks.inputUsername)).toMatch(mocks.outputUsername)
  })

  test("should return the same string if usernames preceeded with characters", () => {
    expect(twitterParser.parseUsername(mocks.inputUsernameWithCharPrefix)).toMatch(
      mocks.inputUsernameWithCharPrefix,
    )
  })
})

describe("Markdown parser", () => {
  test("should return a defined value when given a non-empty string", () => {
    expect(twitterParser.parseTextToMarkdown(mocks.longTweet)).toBeDefined()
  })

  test("should return a string when given a non-empty string", () => {
    expect(typeof twitterParser.parseTextToMarkdown(mocks.longTweet)).toBe("string")
  })

  test("should return markdown-formatted strings for usernames and hashtags", () => {
    expect(twitterParser.parseTextToMarkdown(mocks.inputHashtag + mocks.inputUsername)).toMatch(
      mocks.outputHashtag + mocks.outputUsername,
    )
  })
})