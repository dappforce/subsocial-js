import Graph from 'graphology'
import utils from './utiils'
import {
  chainResourceTypes,
  chainResourceValues,
  socialResourceTypes,
  socialResourceValues,
  ResourceParameters
} from './types'

export type NodeAttributes = {
  keyName:
    | 'schema'
    | 'chainType'
    | 'chainName'
    | 'resourceType'
    | 'resourceValue'
    | 'app'
    | ''
  isRequired?: boolean
  anyChildNodeName?: string
}

export type NodeHandlerParams = {
  nodeName: string
  nodeAttr: NodeAttributes
  anyNodeName?: string
  anyValueFallbackCall: boolean
}

export class ResourceGraph {
  private static instance: ResourceGraph
  public graph: Graph<NodeAttributes> | null = null

  constructor() {
    this.initGraph()
  }

  static getInstance(): ResourceGraph {
    if (!ResourceGraph.instance) {
      ResourceGraph.instance = new ResourceGraph()
    }
    return ResourceGraph.instance
  }

  get resourceGraph(): Graph<NodeAttributes> {
    if (this.graph) return this.graph
    this.initGraph()
    return this.graph!
  }

  mapNodes(
    callback: (params: NodeHandlerParams) => boolean,
    nodeName: string = 'rootNode',
    resourceParams: ResourceParameters | null
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
      if (parentNodeAttrs.anyChildNodeName) {
        return callback({
          nodeName: parentNodeAttrs.anyChildNodeName,
          nodeAttr: this.resourceGraph.getNodeAttributes(
            parentNodeAttrs.anyChildNodeName
          ),
          anyNodeName: parentNodeAttrs.anyChildNodeName,
          anyValueFallbackCall: true
        })
      }

      const nodeNeighborKeyName = this.resourceGraph.getNodeAttributes(
        outboundNeighbors[0]
      ).keyName
      utils.common.throwWrongGraphNodeError(nodeNeighborKeyName)
    }
    return isMatched
  }

  private initGraph() {
    this.graph = new Graph({ type: 'directed' })

    /**
     * ====================
     * === Create nodes ===
     * ====================
     */
    utils.common.createNodeWithoutDuplicate(this.graph, 'rootNode', {
      keyName: ''
    })
    utils.common.createNodeWithoutDuplicate(this.graph, 'chain', {
      keyName: 'schema',
      anyChildNodeName: '*_chainType'
    })
    utils.common.createNodeWithoutDuplicate(this.graph, 'social', {
      keyName: 'schema',
      anyChildNodeName: '*_social_app'
    })

    utils.chain.initChainResourceTypeNodes(this.graph)
    utils.chain.initChainResourceValueNodes(this.graph)

    utils.social.initSocialResourceTypeNodes(this.graph)
    utils.social.initSocialResourceValueNodes(this.graph)

    /**
     * ====================
     * === Create Edges ===
     * ====================
     */

    /**
     * Social
     */
    this.graph.addDirectedEdge('rootNode', 'social')
    utils.social.initSocialAllNodesEdges(this.graph)
    utils.social.initSocialAnyNodesEdges(this.graph)

    /**
     * Resource values for social resource types
     */
    this.graph.addDirectedEdge(
      socialResourceTypes.post,
      socialResourceValues.id
    )
    this.graph.addDirectedEdge(
      socialResourceTypes.profile,
      socialResourceValues.id
    )

    /**
     * Chain
     */

    utils.chain.initChainSubstrateAllNodesEdges(this.graph)
    utils.chain.initChainEvmAllNodesEdges(this.graph)
    utils.chain.initChainAnyTypeNodesEdges(this.graph)

    this.graph.addDirectedEdge('rootNode', 'chain')

    this.graph.addDirectedEdge('chain', 'evm')
    this.graph.addDirectedEdge('chain', 'substrate')

    /**
     * Resource values for chain resource types
     */
    this.graph.addDirectedEdge(
      chainResourceTypes.block,
      chainResourceValues.blockNumber
    )
    this.graph.addDirectedEdge(
      chainResourceTypes.tx,
      chainResourceValues.txHash
    )
    this.graph.addDirectedEdge(
      chainResourceTypes.token,
      chainResourceValues.tokenAddress
    )
    this.graph.addDirectedEdge(
      chainResourceTypes.nft,
      chainResourceValues.collectionId
    )
    this.graph.addDirectedEdge(
      chainResourceTypes.nft,
      chainResourceValues.nftId
    )
    this.graph.addDirectedEdge(
      chainResourceTypes.nft,
      chainResourceValues.standard
    )
    this.graph.addDirectedEdge(
      chainResourceTypes.proposal,
      chainResourceValues.id
    )
    this.graph.addDirectedEdge(
      chainResourceTypes.market,
      chainResourceValues.id
    )

    return this
  }
}
