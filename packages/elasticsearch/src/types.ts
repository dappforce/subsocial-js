export type ElasticIndexTypes =
  'all' |
  'spaces' |
  'posts'

export type ElasticIndexName =
  'subsocial_spaces' |
  'subsocial_posts'

export type IElasticIndex = Record<string, ElasticIndexName>

export const ElasticIndex: IElasticIndex = {
  spaces: 'subsocial_spaces',
  posts: 'subsocial_posts',
}

export const AllElasticIndexes: ElasticIndexName[] = [
  ElasticIndex.spaces,
  ElasticIndex.posts
]

export const ElasticFields = {
  space: {
    name: 'name',
    /** @deprecated use `username` instead */
    handle: 'handle',
    about: 'about',
    tags: 'tags',
    username: 'username'
  },
  post: {
    title: 'title',
    body: 'body',
    tags: 'tags',
  },
  comment: {
    body: 'body',
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
  /** @deprecated use `username` instead */
  handle?: string;
  username?: string;
  about?: string;
  tags?: string[];
}

export type ElasticPostDoc = {
  spaceId?: string;
  title?: string;
  body?: string;
  tags?: string[];
}