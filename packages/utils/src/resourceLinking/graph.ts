import Graph from 'graphology'
import { evmChains, substrateChains } from './constants'

export type NodeAttributes = {
  configName: string
  configParentName?: string
  urlKeyName: string
  resourceIdPairValue?: boolean
  valueDecodeDecorator?: () => string
  valueEncodeDecorator?: () => string
}

export class SocialResourceGraph {
  private static instance: SocialResourceGraph
  public graph: Graph<NodeAttributes> | null = null

  constructor() {
    this.initGraph()
  }

  static getInstance(): SocialResourceGraph {
    if (!SocialResourceGraph.instance) {
      SocialResourceGraph.instance = new SocialResourceGraph()
    }
    return SocialResourceGraph.instance
  }

  get resourceGraph(): Graph<NodeAttributes> {
    if (this.graph) return this.graph
    this.initGraph()
    return this.graph!
  }

  mapNodes(
    callback: (nodeName: string, attr: NodeAttributes) => void,
    nodeName: string = 'rootNode'
  ) {
    this.resourceGraph.mapOutboundNeighbors(nodeName, callback)
  }

  private initGraph() {
    this.graph = new Graph({ type: 'directed' })

    this.graph.addNode('rootNode', {
      configName: '',
      urlKeyName: ''
    })
    /**
     * Set schema
     */
    this.graph.addNode('chain', {
      configName: 'schema',
      urlKeyName: 'resourceLocation'
    })
    this.graph.addNode('ipfs', {
      configName: 'schema',
      urlKeyName: 'resourceLocation'
    })
    this.graph.addNode('twitter', {
      configName: 'schema',
      urlKeyName: 'resourceLocation'
    })

    /**
     * Set Chain Type
     */
    this.graph.addNode('evm', {
      configName: 'chainType',
      configParentName: 'config',
      urlKeyName: 'chainType'
    })
    this.graph.addNode('substrate', {
      configName: 'chainType',
      configParentName: 'config',
      urlKeyName: 'chainType'
    })

    /**
     * Set Resource Type
     */
    this.graph.addNode('cid', {
      configName: 'resourceType',
      configParentName: 'config',
      urlKeyName: 'resourceType'
    })
    this.graph.addNode('tweet', {
      configName: 'resourceType',
      configParentName: 'config',
      urlKeyName: 'resourceType'
    })
    this.graph.addNode('user', {
      configName: 'resourceType',
      configParentName: 'config',
      urlKeyName: 'resourceType'
    })
    this.graph.addNode('account', {
      configName: 'resourceType',
      configParentName: 'config',
      urlKeyName: 'resourceType'
    })
    this.graph.addNode('block', {
      configName: 'resourceType',
      configParentName: 'config',
      urlKeyName: 'resourceType'
    })
    this.graph.addNode('tx', {
      configName: 'resourceType',
      configParentName: 'config',
      urlKeyName: 'resourceType'
    })
    this.graph.addNode('token', {
      configName: 'resourceType',
      configParentName: 'config',
      urlKeyName: 'resourceType'
    })
    this.graph.addNode('nft', {
      configName: 'resourceType',
      configParentName: 'config',
      urlKeyName: 'resourceType'
    })
    // this.graph.addNode('ntfToken', {
    //   configName: 'resourceSubType',
    //   configParentName: 'config',
    //   urlKeyName: 'resourceSubType'
    // })
    this.graph.addNode('proposal', {
      configName: 'resourceType',
      configParentName: 'config',
      urlKeyName: 'resourceType'
    })
    this.graph.addNode('market', {
      configName: 'resourceType',
      configParentName: 'config',
      urlKeyName: 'resourceType'
    })

    /**
     * Set Resource Value
     */

    this.graph.addNode('blockNumber', {
      configName: 'resourceValue',
      configParentName: 'config',
      urlKeyName: 'resourceValue',
      resourceIdPairValue: true
    })
    this.graph.addNode('txHash', {
      configName: 'resourceValue',
      configParentName: 'config',
      urlKeyName: 'resourceValue',
      resourceIdPairValue: true
    })
    this.graph.addNode('tokenAddress', {
      configName: 'resourceValue',
      configParentName: 'config',
      urlKeyName: 'resourceValue',
      resourceIdPairValue: true
    })
    this.graph.addNode('accountAddress', {
      configName: 'resourceValue',
      configParentName: 'config',
      urlKeyName: 'resourceValue',
      resourceIdPairValue: true
    })
    this.graph.addNode('collectionId', {
      configName: 'resourceValue',
      configParentName: 'config',
      urlKeyName: 'resourceValue',
      resourceIdPairValue: true
    })
    this.graph.addNode('nftId', {
      configName: 'resourceValue',
      configParentName: 'config',
      urlKeyName: 'resourceValue',
      resourceIdPairValue: true
    })
    this.graph.addNode('id', {
      configName: 'resourceValue',
      configParentName: 'config',
      urlKeyName: 'resourceValue',
      resourceIdPairValue: true
    })

    /**
     * Set Chain Name and Chain Edges
     */

    /**
     * Set Edges
     */

    this.graph.addDirectedEdge('rootNode', 'ipfs')
    this.graph.addDirectedEdge('ipfs', 'cid')
    this.graph.addDirectedEdge('cid', 'id')

    this.graph.addDirectedEdge('rootNode', 'twitter')
    this.graph.addDirectedEdge('twitter', 'user')
    this.graph.addDirectedEdge('twitter', 'tweet')
    this.graph.addDirectedEdge('user', 'id')
    this.graph.addDirectedEdge('tweet', 'id')

    this.graph.addDirectedEdge('rootNode', 'chain')
    this.graph.addDirectedEdge('chain', 'evm')
    this.graph.addDirectedEdge('chain', 'substrate')

    substrateChains.forEach(chainName => {
      this.resourceGraph.addNode(chainName, {
        configName: 'chainName',
        configParentName: 'config',
        urlKeyName: 'chainName',
        resourceIdPairValue: true
      })
      this.resourceGraph.addDirectedEdge('substrate', chainName)

      this.resourceGraph.addDirectedEdge(chainName, 'block')
      this.resourceGraph.addDirectedEdge(chainName, 'tx')
      this.resourceGraph.addDirectedEdge(chainName, 'token')
      this.resourceGraph.addDirectedEdge(chainName, 'nft')
      this.resourceGraph.addDirectedEdge(chainName, 'proposal')
      this.resourceGraph.addDirectedEdge(chainName, 'market')
    })

    evmChains.forEach(chainName => {
      this.resourceGraph.addNode(chainName, {
        configName: 'chainName',
        configParentName: 'config',
        urlKeyName: 'chainName',
        resourceIdPairValue: true
      })
      this.resourceGraph.addDirectedEdge('evm', chainName)

      this.resourceGraph.addDirectedEdge(chainName, 'block')
      this.resourceGraph.addDirectedEdge(chainName, 'tx')
      this.resourceGraph.addDirectedEdge(chainName, 'token')
      this.resourceGraph.addDirectedEdge(chainName, 'nft')
    })

    // this.graph.addDirectedEdge('nft', 'ntfToken')

    this.graph.addDirectedEdge('block', 'blockNumber')
    this.graph.addDirectedEdge('tx', 'txHash')
    this.graph.addDirectedEdge('token', 'tokenAddress')
    this.graph.addDirectedEdge('nft', 'collectionId')
    this.graph.addDirectedEdge('nft', 'nftId')
    this.graph.addDirectedEdge('proposal', 'accountAddress')
    this.graph.addDirectedEdge('market', 'accountAddress')

    return this
  }
}
