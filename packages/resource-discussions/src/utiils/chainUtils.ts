import { NodeAttributes } from '../graph'
import Graph from 'graphology'
import { substrateChains, evmChains } from '../constants'

export function initChainAnyTypeNodesEdges(graph: Graph<NodeAttributes>) {
  graph.addNode('*_chainType', {
    keyName: 'chainType',
    anyChildNodeName: '*_chainType_*_chainName'
  })
  graph.addNode('*_chainType_*_chainName', {
    keyName: 'chainName'
  })

  graph.addDirectedEdge('chain', '*_chainType')
  graph.addDirectedEdge('*_chainType', '*_chainType_*_chainName')

  graph.addDirectedEdge('*_chainType_*_chainName', 'block')
  graph.addDirectedEdge('*_chainType_*_chainName', 'tx')
  graph.addDirectedEdge('*_chainType_*_chainName', 'token')
}

export function initChainSubstrateAnyNodesEdges(graph: Graph<NodeAttributes>) {
  graph.addNode('*_substrate_chainName', {
    keyName: 'chainName'
  })
  graph.addDirectedEdge('substrate', '*_substrate_chainName')
  graph.addDirectedEdge('*_substrate_chainName', 'block')
  graph.addDirectedEdge('*_substrate_chainName', 'tx')
  graph.addDirectedEdge('*_substrate_chainName', 'token')
}

export function initChainEvmAnyNodesEdges(graph: Graph<NodeAttributes>) {
  graph.addNode('*_evm_chainName', {
    keyName: 'chainName'
  })
  graph.addDirectedEdge('evm', '*_evm_chainName')

  graph.addDirectedEdge('*_evm_chainName', 'block')
  graph.addDirectedEdge('*_evm_chainName', 'tx')
  graph.addDirectedEdge('*_evm_chainName', 'token')
}

export function initChainSubstrateAllNodesEdges(graph: Graph<NodeAttributes>) {
  graph.addNode('substrate', {
    keyName: 'chainType',
    anyChildNodeName: '*_substrate_chainName'
  })
  substrateChains.forEach(chainName => {
    graph.addNode(chainName, {
      keyName: 'chainName'
    })

    graph.addDirectedEdge('substrate', chainName)

    graph.addDirectedEdge(chainName, 'block')
    graph.addDirectedEdge(chainName, 'tx')
    graph.addDirectedEdge(chainName, 'token')
    graph.addDirectedEdge(chainName, 'nft')
    graph.addDirectedEdge(chainName, 'proposal')
    graph.addDirectedEdge(chainName, 'market')
  })
}

export function initChainEvmAllNodesEdges(graph: Graph<NodeAttributes>) {
  graph.addNode('evm', {
    keyName: 'chainType',
    anyChildNodeName: '*_evm_chainName'
  })
  evmChains.forEach(chainName => {
    graph.addNode(chainName, {
      keyName: 'chainName'
    })

    graph.addDirectedEdge('evm', chainName)

    graph.addDirectedEdge(chainName, 'block')
    graph.addDirectedEdge(chainName, 'tx')
    graph.addDirectedEdge(chainName, 'token')
    graph.addDirectedEdge(chainName, 'nft')
  })
}
