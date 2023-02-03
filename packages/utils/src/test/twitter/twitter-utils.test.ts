import { describe, expect, test } from '@jest/globals'
import { parseTwitterTextToMarkdown } from '../../twitter'

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
  outputHashtag: `Polkadot is the new [#Web3](https://twitter.com/hashtag/Web3) ecosystem.`,
  inputNoWhiteSpace: '123#sofun test#Subsocial',
  inputJustHashtag: '#Subsocial',
  outputJustHashtag: '[#Subsocial](https://twitter.com/hashtag/Subsocial)',
  inputHashtagInFirstLetter: '#Subsocial is a blockchain',
  outputHashtagInFirstLetter: '[#Subsocial](https://twitter.com/hashtag/Subsocial) is a blockchain',
  inputHashtagWithPunctuation: '#it’sfun',
  outputHashtagWithPunctuation: '#it',
  inputUsername: '@SubsocialChain is a decentralised social finance platform.',
  outputUsername:
    '[@SubsocialChain](https://twitter.com/SubsocialChain) is a decentralised social finance platform.',
  inputUsernameWithCharPrefix: '123@TwitterSupport',
  inputLink: 'Polkaverse link https://polkaverse.com google.com',
  outputLink: 'Polkaverse link [https://polkaverse.com](https://polkaverse.com) [google.com](http://google.com)',
  inputMultipleLink:
    'Polkaverse https://polkaverse.com and google here https://google.com',
  outputMultipleLink:
    'Polkaverse [https://polkaverse.com](https://polkaverse.com) and google here [https://google.com](https://google.com)',
  inputAllFormat:
    'Polkaverse tag #Polkaverse with link https://polkaverse.com#test to @SubsocialChain with link https://polkaverse.com#test@subsocial and https://google.com . and link https://polkaverse.com.@SubsocialChain https://polkaverse.com.#test',
  outputAllFormat:
    'Polkaverse tag [#Polkaverse](https://twitter.com/hashtag/Polkaverse) with link [https://polkaverse.com#test](https://polkaverse.com#test) to [@SubsocialChain](https://twitter.com/SubsocialChain) with link [https://polkaverse.com#test@subsocial](https://polkaverse.com#test@subsocial) and [https://google.com](https://google.com) . and link [https://polkaverse.com](https://polkaverse.com).@SubsocialChain [https://polkaverse.com](https://polkaverse.com).#test',
}

describe('Hashtag parser', () => {
  test('should return a defined value when given a non-empty string', () => {
    expect(parseTwitterTextToMarkdown(mocks.longTweet)).toBeDefined()
  })

  test('should return a string when given a non-empty string', () => {
    expect(typeof parseTwitterTextToMarkdown(mocks.longTweet)).toBe('string')
  })

  test('should return markdown-formatted string when given a string with hashtag', () => {
    expect(parseTwitterTextToMarkdown(mocks.inputHashtag)).toMatch(
      mocks.outputHashtag
    )
  })

  test('should work for text with just hashtag', () => {
    expect(parseTwitterTextToMarkdown(mocks.inputJustHashtag)).toMatch(
      mocks.outputJustHashtag
    )
  })

  test('should work for text that begins with hashtag', () => {
    expect(parseTwitterTextToMarkdown(mocks.inputHashtagInFirstLetter)).toMatch(
      mocks.outputHashtagInFirstLetter
    )
  })

  test('should not work for letters or numbers in front of the # symbol', () => {
    expect(parseTwitterTextToMarkdown(mocks.inputNoWhiteSpace)).toMatch(
      mocks.inputNoWhiteSpace
    )
  })

  test('should cut words in hashtag if punctuation is present', () => {
    expect(
      parseTwitterTextToMarkdown(mocks.inputHashtagWithPunctuation)
    ).toMatch(mocks.outputHashtagWithPunctuation)
  })
})

describe('Username parser', () => {
  test('should return a defined value when given a non-empty string', () => {
    expect(parseTwitterTextToMarkdown(mocks.longTweet)).toBeDefined()
  })

  test('should return a string when given a non-empty string', () => {
    expect(typeof parseTwitterTextToMarkdown(mocks.longTweet)).toBe('string')
  })

  test('should return markdown-formatted string when given a string with @ symbol', () => {
    expect(parseTwitterTextToMarkdown(mocks.inputUsername)).toMatch(
      mocks.outputUsername
    )
  })

  test('should return the same string if usernames preceeded with characters', () => {
    expect(
      parseTwitterTextToMarkdown(mocks.inputUsernameWithCharPrefix)
    ).toMatch(mocks.inputUsernameWithCharPrefix)
  })
})

describe('Link Parser', () => {
  test('should return markdown-formatted links', () => {
    expect(
      parseTwitterTextToMarkdown(
        mocks.inputLink
      )
    ).toMatch(mocks.outputLink)
  })

  test('should be able to parse multiple links', () => {
    expect(
      parseTwitterTextToMarkdown(
        mocks.inputMultipleLink
      )
    ).toMatch(mocks.outputMultipleLink)
  })
})

describe('All Format Parser', () => {
  test('should return a defined value when given a non-empty string', () => {
    expect(parseTwitterTextToMarkdown(mocks.longTweet)).toBeDefined()
  })

  test('should return a string when given a non-empty string', () => {
    expect(typeof parseTwitterTextToMarkdown(mocks.longTweet)).toBe(
      'string'
    )
  })

  test('should return markdown-formatted strings for usernames and hashtags', () => {
    expect(
      parseTwitterTextToMarkdown(
        mocks.inputHashtag + ' ' + mocks.inputUsername
      )
    ).toMatch(mocks.outputHashtag + ' ' +  mocks.outputUsername)
  })

  test('should return markdown-formatted strings for usernames and hashtags and links', () => {
    expect(
      parseTwitterTextToMarkdown(
        mocks.inputAllFormat
      )
    ).toMatch(mocks.outputAllFormat)
  })
})
