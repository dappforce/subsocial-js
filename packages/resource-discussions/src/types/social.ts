import { socialApps } from '../constants'

type SocialResourceType = 'post' | 'profile'

export const socialResourceTypes = {
  post: 'post',
  profile: 'profile'
} as const

export const socialResourceValueRequiredState = {
  id: true
}

export const socialResourceValues = {
  id: 'id'
} as const

export type SocialResourceValue<R extends SocialResourceType> = R extends 'post'
  ? { id: string }
  : R extends 'profile'
  ? { id: string }
  : never

type SocialPostResourceType = {
  resourceType: 'post'
  resourceValue: SocialResourceValue<'post'>
}
type SocialProfileResourceType = {
  resourceType: 'profile'
  resourceValue: SocialResourceValue<'profile'>
}

type SocialResourceTypeValue =
  | SocialPostResourceType
  | SocialProfileResourceType

export type SocialSchemaParameters = { schema: 'social' } & {
  app: (typeof socialApps)[number] | string
} & SocialResourceTypeValue
