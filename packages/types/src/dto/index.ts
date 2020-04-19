import { CommonStruct, Blog, Post, Comment, SocialAccount, Profile } from '../substrate/interfaces';
import { CommonContent, BlogContent, PostContent, CommentContent, ProfileContent } from '../offchain'

export type CommonData<S extends CommonStruct, C extends CommonContent> = {
  struct: S,
  content?: C
}

export type BlogData = CommonData<Blog, BlogContent>
export type PostData = CommonData<Post, PostContent>
export type CommentData = CommonData<Comment, CommentContent>
export type ProfileData = CommonData<SocialAccount, ProfileContent> & {
  profile?: Profile,
}

export type ExtendedPostData = {
  post: PostData,
  ext?: PostData
}
