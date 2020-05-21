import { Blog, Post, SocialAccount, Profile } from '../substrate/interfaces';
import { CommonContent, BlogContent, PostContent, CommentContent, ProfileContent } from '../offchain'
import { CommonStruct } from '../substrate';

export type CommonData<S extends CommonStruct, C extends CommonContent> = {
  struct: S
  content?: C
}

export type BlogData = CommonData<Blog, BlogContent>
export type PostData = CommonData<Post, PostContent>
export type CommentData = CommonData<Post, CommentContent>
export type ProfileData = CommonData<SocialAccount, ProfileContent> & {
  profile?: Profile
}

export type AnySubsocialData = BlogData | PostData | CommentData | ProfileData;

export type PostWithSomeDetails = {
  post: PostData
  ext?: Exclude<PostWithSomeDetails, 'ext'>
  owner?: ProfileData
  blog?: BlogData
}

export type PostWithOwner = Exclude<PostWithSomeDetails, 'owner'> & {
  owner: ProfileData
}

export type PostWithBlog = Exclude<PostWithSomeDetails, 'blog'> & {
  blog: BlogData
}

export type PostWithAllDetails = PostWithOwner & PostWithBlog

// TODO replace this type with 'PostWithAllDetails' everywhere
export type ExtendedPostData = {
  post: PostData
  ext?: PostData
  owner: ProfileData
  blog: BlogData
}
