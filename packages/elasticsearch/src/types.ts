export type ElasticIndexTypes =
  'all' |
  'profiles' |
  'spaces' |
  'posts'

export type ElasticIndexName =
  'subsocial_profiles' |
  'subsocial_spaces' |
  'subsocial_posts'

export type IElasticIndex = Record<string, ElasticIndexName>

export const ElasticIndex: IElasticIndex = {
  profiles: 'subsocial_profiles',
  spaces: 'subsocial_spaces',
  posts: 'subsocial_posts',
}

export const AllElasticIndexes: ElasticIndexName[] = [
  ElasticIndex.profiles,
  ElasticIndex.spaces,
  ElasticIndex.posts
]

export const ElasticFields = {
  space: {
    name: 'name',
    handle: 'handle',
    about: 'about',
    tags: 'tags',
  },
  post: {
    title: 'title',
    body: 'body',
    tags: 'tags',
  },
  comment: {
    body: 'body',
  },
  profile: {
    name: 'name',
    about: 'about',
  },
}

export type ElasticQueryParams = {
  indexes?: ElasticIndexTypes[]
  q?: string
  tags?: string[]
  limit?: number
  offset?: number
}

export type ElasticSpaceDoc = {
  name?: string;
  handle?: string;
  about?: string;
  tags?: string[];
}

export type ElasticPostDoc = {
  spaceId?: string;
  title?: string;
  body?: string;
  tags?: string[];
}