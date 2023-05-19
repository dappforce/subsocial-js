import Graph from 'graphology'
import utils from './utiils'
import { UrlConfig } from './types'

export type NodeAttributes = {
  keyName: string
  anyChildNodeName?: string
}

export type NodeHandlerParams = {
  nodeName: string
  nodeAttr: NodeAttributes
  anyNodeName?: string
  anyValueFallbackCall: boolean
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
    callback: (params: NodeHandlerParams) => boolean,
    nodeName: string = 'rootNode',
    resourceParams: UrlConfig | null
  ): boolean {
    let isMatched = false
    let outboundNeighbors = []
    let parentNodeAttrs: NodeAttributes = {
      keyName: '',
      anyChildNodeName: ''
    }

    try {
      outboundNeighbors = this.resourceGraph.outboundNeighbors(nodeName)
      parentNodeAttrs = this.resourceGraph.getNodeAttributes(nodeName)
    } catch (e) {
      if (parentNodeAttrs.keyName)
        return utils.common.throwWrongGraphNodeError(parentNodeAttrs.keyName)
      return utils.common.throwWrongGraphNodeError(
        utils.common.getFieldNameByValue(nodeName, resourceParams)
      )
    }

    for (const neighbor of outboundNeighbors) {
      const loopMatch = callback({
        nodeName: neighbor,
        nodeAttr: this.resourceGraph.getNodeAttributes(neighbor),
        anyValueFallbackCall: false
      })
      isMatched = loopMatch ? loopMatch : isMatched
    }

    if (!isMatched) {
      try {
        return callback({
          nodeName: parentNodeAttrs.anyChildNodeName ?? '',
          nodeAttr: this.resourceGraph.getNodeAttributes(
            parentNodeAttrs.anyChildNodeName ?? ''
          ),
          anyNodeName: parentNodeAttrs.anyChildNodeName,
          anyValueFallbackCall: true
        })
      } catch (e) {
        const nodeNeighborKeyName = this.resourceGraph.getNodeAttributes(
          outboundNeighbors[0]
        ).keyName
        return utils.common.throwWrongGraphNodeError(nodeNeighborKeyName)
      }
    }
    return isMatched
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
      keyName: 'schema',
      anyChildNodeName: '*_chainType'
    })
    this.graph.addNode('social', {
      keyName: 'schema',
      anyChildNodeName: '*_social_app'
    })

    /**
     * Set Chain Type
     */

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
     * === Set Edges ===
     */

    /**
     * Social
     */
    this.graph.addDirectedEdge('rootNode', 'social')
    utils.social.initSocialAllNodesEdges(this.graph)
    utils.social.initSocialAnyNodesEdges(this.graph)
    this.graph.addDirectedEdge('post', 'id')
    this.graph.addDirectedEdge('profile', 'id')

    /**
     * Chain
     */

    utils.chain.initChainSubstrateAllNodesEdges(this.graph)
    utils.chain.initChainEvmAllNodesEdges(this.graph)
    utils.chain.initChainSubstrateAnyNodesEdges(this.graph)
    utils.chain.initChainEvmAnyNodesEdges(this.graph)
    utils.chain.initChainAnyTypeNodesEdges(this.graph)

    this.graph.addDirectedEdge('rootNode', 'chain')
    this.graph.addDirectedEdge('chain', 'evm')
    this.graph.addDirectedEdge('chain', 'substrate')

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
