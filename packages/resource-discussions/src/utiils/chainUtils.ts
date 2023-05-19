import { NodeAttributes } from '../graph'
import Graph from 'graphology'
import { substrateChains, evmChains } from '../constants'
import { chainResourceTypes, chainResourceValues } from '../types'
import { createNodeWithoutDuplicate } from './common'

export function initChainResourceTypeNodes(graph: Graph<NodeAttributes>) {
  for (const resType in chainResourceTypes) {
    createNodeWithoutDuplicate(graph, resType, {
      keyName: 'resourceType'
    })
  }
}

export function initChainResourceValueNodes(graph: Graph<NodeAttributes>) {
  for (const resType in chainResourceValues) {
    createNodeWithoutDuplicate(graph, resType, {
      keyName: 'resourceValue'
    })
  }
}

export function initChainAnyTypeNodesEdges(graph: Graph<NodeAttributes>) {
  createNodeWithoutDuplicate(graph, '*_chainType', {
    keyName: 'chainType',
    anyChildNodeName: '*_chainType_*_chainName'
  })
  createNodeWithoutDuplicate(graph, '*_chainType_*_chainName', {
    keyName: 'chainName'
  })

  graph.addDirectedEdge('chain', '*_chainType')
  graph.addDirectedEdge('*_chainType', '*_chainType_*_chainName')

  graph.addDirectedEdge('*_chainType_*_chainName', chainResourceTypes.block)
  graph.addDirectedEdge('*_chainType_*_chainName', chainResourceTypes.tx)
  graph.addDirectedEdge('*_chainType_*_chainName', chainResourceTypes.token)
  graph.addDirectedEdge('*_chainType_*_chainName', chainResourceTypes.account)
}

export function initChainSubstrateAnyNodesEdges(graph: Graph<NodeAttributes>) {
  createNodeWithoutDuplicate(graph, '*_substrate_chainName', {
    keyName: 'chainName'
  })
  graph.addDirectedEdge('substrate', '*_substrate_chainName')
  graph.addDirectedEdge('*_substrate_chainName', chainResourceTypes.block)
  graph.addDirectedEdge('*_substrate_chainName', chainResourceTypes.tx)
  graph.addDirectedEdge('*_substrate_chainName', chainResourceTypes.token)
  graph.addDirectedEdge('*_substrate_chainName', chainResourceTypes.account)
}

export function initChainEvmAnyNodesEdges(graph: Graph<NodeAttributes>) {
  createNodeWithoutDuplicate(graph, '*_evm_chainName', {
    keyName: 'chainName'
  })
  graph.addDirectedEdge('evm', '*_evm_chainName')

  graph.addDirectedEdge('*_evm_chainName', chainResourceTypes.block)
  graph.addDirectedEdge('*_evm_chainName', chainResourceTypes.tx)
  graph.addDirectedEdge('*_evm_chainName', chainResourceTypes.token)
  graph.addDirectedEdge('*_evm_chainName', chainResourceTypes.account)
}

export function initChainSubstrateAllNodesEdges(graph: Graph<NodeAttributes>) {
  createNodeWithoutDuplicate(graph, 'substrate', {
    keyName: 'chainType',
    anyChildNodeName: '*_substrate_chainName'
  })
  substrateChains.forEach(chainName => {
    createNodeWithoutDuplicate(graph, chainName, {
      keyName: 'chainName'
    })

    graph.addDirectedEdge('substrate', chainName)

    graph.addDirectedEdge(chainName, chainResourceTypes.block)
    graph.addDirectedEdge(chainName, chainResourceTypes.tx)
    graph.addDirectedEdge(chainName, chainResourceTypes.token)
    graph.addDirectedEdge(chainName, chainResourceTypes.nft)
    graph.addDirectedEdge(chainName, chainResourceTypes.proposal)
    graph.addDirectedEdge(chainName, chainResourceTypes.market)
  })
}

export function initChainEvmAllNodesEdges(graph: Graph<NodeAttributes>) {
  createNodeWithoutDuplicate(graph, 'evm', {
    keyName: 'chainType',
    anyChildNodeName: '*_evm_chainName'
  })
  evmChains.forEach(chainName => {
    createNodeWithoutDuplicate(graph, chainName, {
      keyName: 'chainName'
    })

    graph.addDirectedEdge('evm', chainName)

    graph.addDirectedEdge(chainName, chainResourceTypes.block)
    graph.addDirectedEdge(chainName, chainResourceTypes.tx)
    graph.addDirectedEdge(chainName, chainResourceTypes.token)
    graph.addDirectedEdge(chainName, chainResourceTypes.nft)
  })
}
