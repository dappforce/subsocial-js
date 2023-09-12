import { IpfsPostContent, IpfsSpaceContent } from "@subsocial/api/types/ipfs";
import { SummarizedContent } from "@subsocial/api/types/dto";
import { TweetAttachmentV2, ReferencedTweetV2 } from "twitter-api-v2";
import { ContentExtensionData } from "./contentExtension";

export enum InReplyToKind {
  Post = "Post",
}

export type PostTweetDetailsIPFS = {
  id: string;
  created_at: string; // "2019-06-04T23:12:08.000Z"
  username: string;
  author_id: string;
  edit_history_tweet_ids: string[];
  conversation_id: string;
  in_reply_to_user_id: string;
  referenced_tweets: ReferencedTweetV2[];
  attachments: TweetAttachmentV2;
  lang: string; // BCP47 language tag e.g "en"
};

type SpaceContentWithInterests = {
  interests?: string[];
};

type SpaceContentWithAppId = {
  appId?: string;
};

type PostContentWithTweet = {
  tweet?: PostTweetDetailsIPFS;
};
type PostContentWithAppId = {
  appId?: string;
};
type PostContentWithExtensions = {
  extensions?: ContentExtensionData[];
};
type PostContentWithOptimisticId = {
  optimisticId?: string;
};

export type PostContentWithInReplyTo = {
  inReplyTo?: {
    id: string;
    kind: InReplyToKind;
  };
};

export type IpfsSpaceContentSummarized = IpfsSpaceContent &
  SummarizedContent &
  SpaceContentWithInterests &
  SpaceContentWithAppId;
export type IpfsPostContentSummarized = IpfsPostContent &
  SummarizedContent &
  PostContentWithTweet &
  PostContentWithAppId &
  PostContentWithExtensions &
  PostContentWithInReplyTo &
  PostContentWithOptimisticId;

export const ipfsContentSection = {
  post: "post",
  space: "space",
} as const;

export type IpfsContentSection = typeof ipfsContentSection;

export type IpfsContent<T extends keyof typeof ipfsContentSection> =
  T extends typeof ipfsContentSection.post
    ? IpfsPostContentSummarized
    : T extends typeof ipfsContentSection.space
    ? IpfsSpaceContentSummarized
    : never;

export const supportedIpfsContentMap = new Map<"post" | "space", Set<string>>([
  [
    "post",
    new Set<string>([
      "title",
      "image",
      "link",
      "format",
      "canonical",
      "body",
      "slug",
      "tags",
      "tweet",
      "extensions",
      "inReplyTo",
      "optimisticId",
    ]),
  ],
  [
    "space",
    new Set<string>([
      "name",
      "email",
      "about",
      "image",
      "tags",
      "links",
      "interests",
    ]),
  ],
]);
