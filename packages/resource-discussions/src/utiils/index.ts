import {
  initChainSubstrateAnyNodesEdges,
  initChainEvmAnyNodesEdges,
  initChainSubstrateAllNodesEdges,
  initChainEvmAllNodesEdges,
  initChainAnyTypeNodesEdges
} from './chainUtils'
import { initSocialAllNodesEdges, initSocialAnyNodesEdges } from './socialUtils'
import { throwWrongGraphNodeError, getFieldNameByValue } from './common'

export default {
  chain: {
    initChainSubstrateAnyNodesEdges: initChainSubstrateAnyNodesEdges,
    initChainEvmAnyNodesEdges: initChainEvmAnyNodesEdges,
    initChainSubstrateAllNodesEdges: initChainSubstrateAllNodesEdges,
    initChainEvmAllNodesEdges: initChainEvmAllNodesEdges,
    initChainAnyTypeNodesEdges: initChainAnyTypeNodesEdges
  },
  social: {
    initSocialAllNodesEdges: initSocialAllNodesEdges,
    initSocialAnyNodesEdges: initSocialAnyNodesEdges
  },
  common: {
    throwWrongGraphNodeError: throwWrongGraphNodeError,
    getFieldNameByValue: getFieldNameByValue
  }
}
