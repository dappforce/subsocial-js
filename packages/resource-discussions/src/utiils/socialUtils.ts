import { NodeAttributes } from '../graph'
import Graph from 'graphology'
import { socialApps } from '../constants'
import { socialResourceTypes, socialResourceValues } from '../types'
import { createNodeWithoutDuplicate } from './common'

export function initSocialResourceTypeNodes(graph: Graph<NodeAttributes>) {
  for (const resType in socialResourceTypes) {
    createNodeWithoutDuplicate(graph, resType, {
      keyName: 'resourceType'
    })
  }
}
export function initSocialResourceValueNodes(graph: Graph<NodeAttributes>) {
  for (const resType in socialResourceValues) {
    createNodeWithoutDuplicate(graph, resType, {
      keyName: 'resourceValue'
    })
  }
}

export function initSocialAllNodesEdges(graph: Graph<NodeAttributes>) {
  socialApps.forEach(appName => {
    createNodeWithoutDuplicate(graph, appName, {
      keyName: 'app'
    })
    graph.addDirectedEdge('social', appName)
    for (const resType in socialResourceTypes) {
      graph.addDirectedEdge(appName, resType)
    }
  })
}

export function initSocialAnyNodesEdges(graph: Graph<NodeAttributes>) {
  createNodeWithoutDuplicate(graph, '*_social_app', {
    keyName: 'app'
  })
  graph.addDirectedEdge('social', '*_social_app')

  for (const resType in socialResourceTypes) {
    graph.addDirectedEdge('*_social_app', resType)
  }
}
