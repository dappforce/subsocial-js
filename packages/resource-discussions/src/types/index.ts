import { ChainSchemaConfig } from './chain'
import { SocialSchemaConfig } from './social'
export { chainResourceTypes, chainResourceValues } from './chain'
export { socialResourceTypes, socialResourceValues } from './social'

export type UrlConfig = ChainSchemaConfig | SocialSchemaConfig
