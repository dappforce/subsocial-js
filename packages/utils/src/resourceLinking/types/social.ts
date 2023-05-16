export type SocialApp = 'twitter' | 'youtube'
type SocialResourceType = 'post' | 'profile'

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

export type SocialSchemaConfig = { schema: 'social' } & {
  app: SocialApp
} & SocialResourceTypeValue
