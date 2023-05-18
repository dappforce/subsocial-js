import {
  initChainSubstrateAnyNodesEdges,
  initChainEvmAnyNodesEdges,
  initChainSubstrateAllNodesEdges,
  initChainEvmAllNodesEdges,
  initChainAnyTypeNodesEdges
} from './chainUtils'
import { initSocialAllNodesEdges, initSocialAnyNodesEdges } from './socialUtils'

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
  }
}
