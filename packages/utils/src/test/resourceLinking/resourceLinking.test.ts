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
      resourceValue: { accountAddress: '0x78764g2873y2g8giui27/nftId:87364' }
    })
    const resourceNft: SocialResource = new SocialResource(
      true
    ).ingest.resourceParams({
      schema: 'chain',
      chainType: 'substrate',
      chainName: 'astar',
      resourceType: 'nft',
      resourceValue: {
        collectionId: '0x78764g2873y2g8giui27/nftId:87364'
      }
    })

    const resourceTweet: SocialResource = new SocialResource(
      true
    ).ingest.resourceParams({
      schema: 'social',
      app: 'twitter',
      resourceType: 'post',
      resourceValue: {
        id: '98938u459928734982734937653987'
      }
    })

    expect(resource.build.resourceId()).toEqual(
      'chain://chainType:substrate/chainName:zeitgeist/resourceType:market/accountAddress:0x78764g2873y2g8giui27/nftId:87364'
    )
    expect(resourceNft.build.resourceId()).toEqual(
      'chain://chainType:substrate/chainName:astar/resourceType:nft/collectionId:0x78764g2873y2g8giui27/nftId:87364'
    )
    expect(resourceTweet.build.resourceId()).toEqual(
      'social://app:twitter/resourceType:post/id:98938u459928734982734937653987'
    )
  })
})
