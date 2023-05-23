import { ResourceParameters } from '../types'
import { NodeAttributes } from '../graph'
import Graph from 'graphology'

export function throwWrongGraphNodeError(resourceParamName: string): never {
  throw new Error(
    `Provided parameters for resource are invalid. Please, check field "${resourceParamName}".`
  )
}

export function getFieldNameByValue(
  value: string,
  src: ResourceParameters | null
): string {
  if (!src) return ''
  for (const fieldName in src) {
    if (src[fieldName as keyof ResourceParameters] === value) return fieldName
  }
  return 'unknown'
}

export function createNodeWithoutDuplicate(
  graph: Graph<NodeAttributes>,
  nodeName: string,
  nodeAttr: NodeAttributes
) {
  if (graph.findNode(node => node === nodeName)) return
  graph.addNode(nodeName, nodeAttr)
}
