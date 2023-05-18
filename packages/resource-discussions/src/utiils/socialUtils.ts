import { NodeAttributes } from '../graph'
import Graph from 'graphology'
import { socialApps } from '../constants'

export function initSocialAllNodesEdges(graph: Graph<NodeAttributes>) {
  socialApps.forEach(appName => {
    graph.addNode(appName, {
      keyName: 'app'
    })
    graph.addDirectedEdge('social', appName)
    graph.addDirectedEdge(appName, 'profile')
    graph.addDirectedEdge(appName, 'post')
  })
}

export function initSocialAnyNodesEdges(graph: Graph<NodeAttributes>) {
  graph.addNode('*_social_app', {
    keyName: 'app'
  })
  graph.addDirectedEdge('social', '*_social_app')

  graph.addDirectedEdge('*_social_app', 'profile')
  graph.addDirectedEdge('*_social_app', 'post')
}
