import Graph from 'graphology'
import { evmChains, substrateChains } from './constants'

export type NodeAttributes = {
  keyName: string
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
      keyName: ''
    })
    /**
     * Set schema
     */
    this.graph.addNode('chain', {
      keyName: 'schema'
    })
    this.graph.addNode('social', {
      keyName: 'schema'
    })

    /**
     * Set Chain Type
     */
    this.graph.addNode('evm', {
      keyName: 'chainType'
    })
    this.graph.addNode('substrate', {
      keyName: 'chainType'
    })

    /**
     * Set Resource Type
     */
    this.graph.addNode('post', {
      keyName: 'resourceType'
    })
    this.graph.addNode('profile', {
      keyName: 'resourceType'
    })
    this.graph.addNode('account', {
      keyName: 'resourceType'
    })
    this.graph.addNode('block', {
      keyName: 'resourceType'
    })
    this.graph.addNode('tx', {
      keyName: 'resourceType'
    })
    this.graph.addNode('token', {
      keyName: 'resourceType'
    })
    this.graph.addNode('nft', {
      keyName: 'resourceType'
    })
    this.graph.addNode('proposal', {
      keyName: 'resourceType'
    })
    this.graph.addNode('market', {
      keyName: 'resourceType'
    })

    /**
     * Set Resource Value
     */

    this.graph.addNode('blockNumber', {
      keyName: 'resourceValue'
    })
    this.graph.addNode('txHash', {
      keyName: 'resourceValue'
    })
    this.graph.addNode('tokenAddress', {
      keyName: 'resourceValue'
    })
    this.graph.addNode('accountAddress', {
      keyName: 'resourceValue'
    })
    this.graph.addNode('collectionId', {
      keyName: 'resourceValue'
    })
    this.graph.addNode('nftId', {
      keyName: 'resourceValue'
    })
    this.graph.addNode('id', {
      keyName: 'resourceValue'
    })

    /**
     * ==== Set Chain Name and Chain Edges ====
     */

    /**
     * Set Edges
     */

    this.graph.addDirectedEdge('rootNode', 'social')
    this.graph.addDirectedEdge('social', 'post')
    this.graph.addDirectedEdge('social', 'profile')
    this.graph.addDirectedEdge('post', 'id')
    this.graph.addDirectedEdge('profile', 'id')

    this.graph.addDirectedEdge('rootNode', 'chain')
    this.graph.addDirectedEdge('chain', 'evm')
    this.graph.addDirectedEdge('chain', 'substrate')

    substrateChains.forEach(chainName => {
      this.resourceGraph.addNode(chainName, {
        keyName: 'chainName'
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
        keyName: 'chainName'
      })
      this.resourceGraph.addDirectedEdge('evm', chainName)

      this.resourceGraph.addDirectedEdge(chainName, 'block')
      this.resourceGraph.addDirectedEdge(chainName, 'tx')
      this.resourceGraph.addDirectedEdge(chainName, 'token')
      this.resourceGraph.addDirectedEdge(chainName, 'nft')
    })

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
