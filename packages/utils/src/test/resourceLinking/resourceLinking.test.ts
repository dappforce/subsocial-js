import { describe, expect, test } from '@jest/globals'

import { SocialResource } from '../../resourceLinking'

describe('Resource Linking Unit', () => {
  test('SocialResource should ingest Metadata and build ResourceId', () => {
    const resource: SocialResource = new SocialResource(
      true
    ).ingest.resourceParams({
      schema: 'chain',
      chainType: 'substrate',
      chainName: 'zeitgeist',
      resourceType: 'market',
      resourceValue: {
        accountAddress: '3tPeACp24szE4MTpvP9LDBR11kAVc8NnjCE2JxLHz2dpvopu'
      }
    })

    const resourceNft: SocialResource = new SocialResource(
      true
    ).ingest.resourceParams({
      schema: 'chain',
      chainType: 'substrate',
      chainName: 'astar',
      resourceType: 'nft',
      resourceValue: {
        collectionId: '0x78764g2873y2g8giui27',
        nftId: '87364'
      }
    })

    const resourceTweet: SocialResource = new SocialResource(
      true
    ).ingest.resourceParams({
      schema: 'social',
      app: 'twitter',
      resourceType: 'profile',
      resourceValue: {
        id: '98938u459928734982734937653987'
      }
    })

    expect(resource.build.resourceId()).toEqual(
      'chain://chainName:zeitgeist/chainType:substrate/resourceType:market/accountAddress:3tPeACp24szE4MTpvP9LDBR11kAVc8NnjCE2JxLHz2dpvopu'
    )
    expect(resourceNft.build.resourceId()).toEqual(
      'chain://chainName:astar/chainType:substrate/resourceType:nft/collectionId:0x78764g2873y2g8giui27/nftId:87364'
    )
    expect(resourceTweet.build.resourceId()).toEqual(
      'social://app:twitter/resourceType:profile/id:98938u459928734982734937653987'
    )
  })

  test('SocialResource should ingest Resource Params and return params with sorted fields', () => {
    const resourceUnsorted: SocialResource = new SocialResource(
      true
    ).ingest.resourceParams({
      schema: 'chain',
      chainType: 'substrate',
      resourceValue: {
        nftId: '123',
        collectionId: '0x78764g2873y2g8giui27/nftId:87364'
      },
      chainName: 'astar',
      resourceType: 'nft'
    })

    expect(resourceUnsorted.ingestedResourceParams).toEqual({
      chainName: 'astar',
      chainType: 'substrate',
      resourceType: 'nft',
      resourceValue: {
        collectionId: '0x78764g2873y2g8giui27/nftId:87364',
        nftId: '123'
      },
      schema: 'chain'
    })
  })
})
