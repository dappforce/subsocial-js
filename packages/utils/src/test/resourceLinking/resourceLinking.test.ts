import { describe, expect, test } from '@jest/globals'

import { SocialResource } from '../../resourceLinking'

describe('Resource Linking Unit', () => {
  test('SocialResource should ingest Metadata and build URL', () => {
    const resourceNft: SocialResource = new SocialResource(
      true
    ).ingest.metaData({
      schema: 'chain',
      config: {
        chainType: 'substrate',
        chainName: 'astar',
        resourceType: 'nft',
        resourceValue: { collectionId: '111', nftId: '2' }
      }
    })

    const resourceBlock: SocialResource = new SocialResource(
      true
    ).ingest.metaData({
      schema: 'chain',
      config: {
        chainType: 'substrate',
        chainName: 'astar',
        resourceType: 'block',
        resourceValue: { blockNumber: '123' }
      }
    })

    expect(resourceNft.build.url('https://grill.chat/1004')).toEqual(
      'https://grill.chat/1004?resourceLocation=chain&chainType=substrate&chainName=astar&resourceType=nft&resourceValue=111'
    )
    expect(resourceBlock.build.url('https://grill.chat/1004')).toEqual(
      'https://grill.chat/1004?resourceLocation=chain&chainType=substrate&chainName=astar&resourceType=block&resourceValue=123'
    )
  })

  test('SocialResource should ingest Metadata and build ResourceId', () => {
    const resource: SocialResource = new SocialResource(true).ingest.metaData({
      schema: 'chain',
      config: {
        chainType: 'substrate',
        chainName: 'astar',
        resourceType: 'block',
        resourceValue: { blockNumber: '100555' }
      }
    })
    const resourceNft: SocialResource = new SocialResource(
      true
    ).ingest.metaData({
      schema: 'chain',
      config: {
        chainType: 'substrate',
        chainName: 'astar',
        resourceType: 'nft',
        resourceValue: { collectionId: '0x78764g2873y2g8giui27' }
      }
    })

    const resourceTweet: SocialResource = new SocialResource(
      true
    ).ingest.metaData({
      schema: 'twitter',
      config: {
        resourceType: 'tweet',
        resourceValue: {
          id: '98938u459928734982734937653987'
        }
      }
    })
    const resourceCid: SocialResource = new SocialResource(
      true
    ).ingest.metaData({
      schema: 'ipfs',
      config: {
        resourceType: 'cid',
        resourceValue: {
          id: 'bafyn79sydvng8n6dfnv87yb8s67dtb8sd7tbfv'
        }
      }
    })

    expect(resource.build.resourceId()).toEqual(
      'chain://substrate:astar/block:100555'
    )
    expect(resourceNft.build.resourceId()).toEqual(
      'chain://substrate:astar/nft:0x78764g2873y2g8giui27'
    )
    expect(resourceTweet.build.resourceId()).toEqual(
      'twitter://tweet:98938u459928734982734937653987'
    )
    expect(resourceCid.build.resourceId()).toEqual(
      'ipfs://cid:bafyn79sydvng8n6dfnv87yb8s67dtb8sd7tbfv'
    )
  })

  test('SocialResource should ingest URL and build ResourceId', () => {
    const resourceBlock: SocialResource = new SocialResource(true).ingest.url(
      'https://rmrk.gril.chat?resourceLocation=chain&chainType=substrate&chainName=astar&resourceType=block&resourceValue=123'
    )
    const resourceTweet: SocialResource = new SocialResource(true).ingest.url(
      'https://rmrk.gril.chat?resourceLocation=twitter&resourceType=tweet&resourceValue=98938u459928734982734937653987'
    )
    const resourceCid: SocialResource = new SocialResource(true).ingest.url(
      'https://rmrk.gril.chat?resourceLocation=ipfs&resourceType=cid&resourceValue=bafyn79sydvng8n6dfnv87yb8s67dtb8sd7tbfv'
    )

    expect(resourceBlock.build.resourceId()).toEqual(
      'chain://substrate:astar/block:123'
    )

    expect(resourceTweet.build.resourceId()).toEqual(
      'twitter://tweet:98938u459928734982734937653987'
    )

    expect(resourceCid.build.resourceId()).toEqual(
      'ipfs://cid:bafyn79sydvng8n6dfnv87yb8s67dtb8sd7tbfv'
    )
  })
})
