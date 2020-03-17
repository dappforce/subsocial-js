export type CommonContent = CommentContent | PostContent | BlogContent | ProfileContent | SharedPostContent;

export type Activity = {
  id: number,
  account: string,
  event: string,
  following_id: string,
  blog_id: string,
  post_id: string,
  comment_id: string,
  date: Date,
  agg_count: number
};

export type BlogContent = {
  name: string;
  desc: string;
  image: string;
  tags: string[];
};

export type SharedPostContent = {
  body: string
};

export type PostContent = SharedPostContent & {
  title: string;
  image: string;
  tags: string[];
};

export type CommentContent = {
  body: string;
};

export type ProfileContent = {
  fullname: string;
  avatar: string;
  email: string;
  personal_site: string;
  about: string;
  facebook: string;
  twitter: string;
  linkedIn: string;
  github: string;
  instagram: string;
};
