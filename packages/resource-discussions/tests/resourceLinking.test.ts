import { describe, expect, test } from '@jest/globals'

import { SocialResource } from '../src'

describe('Resource Linking Unit', () => {
  test('SocialResource should ingest parameters and build ResourceId', () => {
    const resource: SocialResource = new SocialResource({
      schema: 'chain',
      chainType: 'substrate',
      chainName: 'zeitgeist',
      resourceType: 'market',
      resourceValue: {
        id: '3tPeACp24szE4MTpvP9LDBR11kAVc8NnjCE2JxLHz2dpvopu'
      }
    })

    const resourceNft: SocialResource = new SocialResource({
      schema: 'chain',
      chainType: 'substrate',
      chainName: 'astar',
      resourceType: 'nft',
      resourceValue: {
        collectionId: '0xCdEF95b8581612fFB7c3980bC6b563503755ad72',
        nftId: '87364',
        nftProtocol: 'v2'
      }
    })

    const resourceTweet: SocialResource = new SocialResource({
      schema: 'social',
      app: 'twitter',
      resourceType: 'profile',
      resourceValue: {
        id: '98938u459928734982734937653987'
      }
    })

    const resourceAnyChainType: SocialResource = new SocialResource({
      schema: 'chain',
      chainType: 'bitcoin',
      chainName: 'onebit',
      resourceType: 'block',
      resourceValue: {
        blockNumber: '111111'
      }
    })

    const resourceAnySocialType: SocialResource = new SocialResource({
      schema: 'social',
      app: 'medium',
      resourceType: 'post',
      resourceValue: {
        id: '457659675796'
      }
    })

    expect(resource.toResourceId()).toEqual(
      'chain://chainType:substrate/chainName:zeitgeist/resourceType:market/id:3tPeACp24szE4MTpvP9LDBR11kAVc8NnjCE2JxLHz2dpvopu'
    )
    expect(resourceNft.toResourceId()).toEqual(
      'chain://chainType:substrate/chainName:astar/resourceType:nft/collectionId:0xCdEF95b8581612fFB7c3980bC6b563503755ad72/nftId:87364/nftProtocol:v2'
    )
    expect(resourceTweet.toResourceId()).toEqual(
      'social://app:twitter/resourceType:profile/id:98938u459928734982734937653987'
    )

    expect(resourceAnyChainType.toResourceId()).toEqual(
      'chain://chainType:bitcoin/chainName:onebit/resourceType:block/blockNumber:111111'
    )
    expect(resourceAnySocialType.toResourceId()).toEqual(
      'social://app:medium/resourceType:post/id:457659675796'
    )
  })

  test('SocialResource should ingest invalid params (not resourceValue) and throw Error.', () => {
    const resourceInvalidResourceValue: SocialResource = new SocialResource(
      // @ts-ignore
      {
        schema: 'chain',
        chainType: 'bitcoin',
        chainName: 'onebit',
        resourceType: 'nft',
        resourceValue: {
          collectionId: '111111'
        }
      }
    )

    expect(() => resourceInvalidResourceValue.toResourceId()).toThrow(
      'Provided parameters for resource are invalid. Please, check field "resourceType".'
    )
  })
  test('SocialResource should ingest invalid params (resourceValue) and throw Error.', () => {
    const resourceInvalidResourceValue: SocialResource = new SocialResource({
      schema: 'chain',
      chainType: 'evm',
      chainName: '1',
      resourceType: 'nft',
      resourceValue: {
        // @ts-ignore
        point: '111111'
      }
    })

    expect(() => resourceInvalidResourceValue.toResourceId()).toThrow(
      'Provided parameters for resource are invalid. Please, check field "resourceValue".'
    )
  })
  test('SocialResource should ingest invalid schema parameter and throw Error.', () => {
    const resourceInvalidResourceValue: SocialResource = new SocialResource({
      // @ts-ignore
      schema: 'radio',
      chainType: 'substrate',
      chainName: 'kusama',
      resourceType: 'nft',
      resourceValue: {
        collectionId: '111111'
      }
    })

    expect(() => resourceInvalidResourceValue.toResourceId()).toThrow(
      'Provided parameters for resource are invalid. Please, check field "schema".'
    )
  })

  test('SocialResource should ingest parameters without "schema" field and throw Error.', () => {
    const resourceInvalidResourceValue: SocialResource = new SocialResource({
      // @ts-ignore
      section: 'internet',
      chainType: 'substrate',
      chainName: 'kusama',
      resourceType: 'nft',
      resourceValue: {
        collectionId: '111111'
      }
    })

    expect(() => resourceInvalidResourceValue.toResourceId()).toThrow(
      'Provided parameters for resource are invalid. Please, check field "schema".'
    )
  })
})
