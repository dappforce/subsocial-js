import { ChainSchemaParameters } from './chain'
import { SocialSchemaParameters } from './social'
export { chainResourceTypes, chainResourceValues } from './chain'
export { socialResourceTypes, socialResourceValues } from './social'

export type ResourceParameters = ChainSchemaParameters | SocialSchemaParameters
