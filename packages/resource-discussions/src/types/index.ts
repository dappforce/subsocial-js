import { ChainSchemaConfig } from './chain'
import { SocialSchemaConfig } from './social'
export type Schema = 'chain' | 'social'
export type SocialApp = 'twitter' | 'youtube'

export type UrlConfig = ChainSchemaConfig | SocialSchemaConfig
