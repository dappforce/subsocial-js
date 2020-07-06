import CID from 'cids';
import * as IPFS from './ipfs.types';
import { IpfsHash } from '../substrate/interfaces';

export { CID };

export type CommonContent = CommentContent | PostContent | SpaceContent | ProfileContent | SharedPostContent;

export type Activity = {
  id: number,
  account: string,
  event: string,
  following_id: string,
  space_id: string,
  post_id: string,
  comment_id: string,
  date: Date,
  agg_count: number
};

type FilterByTags = {
  data: string[]
}

type Url = {
  data: string
}

type NavTabContent = FilterByTags | Url

type ContentType = 'by-tag' | 'url'

export type NavTab = {
  id: number
  type: ContentType
  content: NavTabContent
  title: string
  description: string
  hidden: boolean
}

export type SpaceContent = {
  name: string;
  desc: string;
  image: string;
  tags: string[];
  navTabs?: NavTab[];
};

export type SharedPostContent = {
  body: string
};

export type PostContent = SharedPostContent & {
  title: string;
  image: string;
  tags: string[];
  canonical: string;
};

export type CommentContent = {
  body: string;
};

export type ProfileContent = {
  fullname: string;
  avatar: string;
  email: string;
  personalSite: string;
  about: string;
  facebook: string;
  twitter: string;
  medium: string;
  linkedIn: string;
  github: string;
  instagram: string;
};

export type IpfsCid = string | CID | IpfsHash;

export type IpfsApi = IPFS.FilesAPI & {
  pin: {
    rm: (hash?: string) => any,
    ls: (hash?: string) => any
  },
  repo: IPFS.RepoAPI
};
