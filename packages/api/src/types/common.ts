export type HttpRequestMethod = 'post' | 'get'

export type UseServerProps = {
  httpRequestMethod: HttpRequestMethod
}

export type SubsocialContext = {
  useServer?: UseServerProps
}

type CidAsStr = string

export type ContentResult<T> = Record<CidAsStr, T>

export type PalletName = 
  | 'domains'
  | 'permissions'
  | 'posts'
  | 'accountFollows'
  | 'profiles'
  | 'reactions'
  | 'roles'
  | 'scores'
  | 'spaceFollows'
  | 'spaceOwnership'
  | 'spaces'
  | 'utils'

export type EventsName =
  'AccountFollowed' |
  'SpaceFollowed' |
  'SpaceCreated' |
  'CommentCreated' |
  'CommentReplyCreated' |
  'PostCreated' |
  'PostShared' |
  'CommentShared' |
  'PostReactionCreated' |
  'CommentReactionCreated'
