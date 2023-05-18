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
      'chain://chainType:substrate/chainName:zeitgeist/resourceType:market/resourceValue:3tPeACp24szE4MTpvP9LDBR11kAVc8NnjCE2JxLHz2dpvopu'
    )
    expect(resourceNft.build.resourceId()).toEqual(
      'chain://chainType:substrate/chainName:astar/resourceType:nft/resourceValue:0x78764g2873y2g8giui27/resourceValue:87364'
    )
    expect(resourceTweet.build.resourceId()).toEqual(
      'social://resourceType:profile/resourceValue:98938u459928734982734937653987'
    )
  })
})
