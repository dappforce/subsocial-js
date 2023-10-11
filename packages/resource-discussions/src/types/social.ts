import { socialApps } from '../constants'

type SocialResourceType = 'post' | 'profile' | 'space'

export const socialResourceTypes = {
  post: 'post',
  profile: 'profile',
  space: 'space'
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
  : R extends 'space'
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
type SocialSpaceResourceType = {
  resourceType: 'space'
  resourceValue: SocialResourceValue<'space'>
}

type SocialResourceTypeValue =
  | SocialPostResourceType
  | SocialProfileResourceType
  | SocialSpaceResourceType

export type SocialSchemaParameters = { schema: 'social' } & {
  app: (typeof socialApps)[number] | string
} & SocialResourceTypeValue
