import {
  initChainSubstrateAnyNodesEdges,
  initChainEvmAnyNodesEdges,
  initChainSubstrateAllNodesEdges,
  initChainEvmAllNodesEdges,
  initChainAnyTypeNodesEdges,
  initChainResourceTypeNodes,
  initChainResourceValueNodes
} from './chainUtils'
import {
  initSocialAllNodesEdges,
  initSocialAnyNodesEdges,
  initSocialResourceTypeNodes,
  initSocialResourceValueNodes
} from './socialUtils'
import {
  throwWrongGraphNodeError,
  getFieldNameByValue,
  createNodeWithoutDuplicate
} from './common'

export default {
  chain: {
    initChainSubstrateAnyNodesEdges: initChainSubstrateAnyNodesEdges,
    initChainEvmAnyNodesEdges: initChainEvmAnyNodesEdges,
    initChainSubstrateAllNodesEdges: initChainSubstrateAllNodesEdges,
    initChainEvmAllNodesEdges: initChainEvmAllNodesEdges,
    initChainAnyTypeNodesEdges: initChainAnyTypeNodesEdges,
    initChainResourceTypeNodes: initChainResourceTypeNodes,
    initChainResourceValueNodes: initChainResourceValueNodes
  },
  social: {
    initSocialAllNodesEdges: initSocialAllNodesEdges,
    initSocialAnyNodesEdges: initSocialAnyNodesEdges,
    initSocialResourceTypeNodes: initSocialResourceTypeNodes,
    initSocialResourceValueNodes: initSocialResourceValueNodes
  },
  common: {
    throwWrongGraphNodeError: throwWrongGraphNodeError,
    getFieldNameByValue: getFieldNameByValue,
    createNodeWithoutDuplicate: createNodeWithoutDuplicate
  }
}
