import {ReactionKind} from "./common";

export const socialEventName = {
  PostCreated: "PostCreated",
  PostDeleted: "PostDeleted",
  PostUpdated: "PostUpdated",
  PostShared: "PostShared",
  PostMoved: "PostMoved",
  PostFollowed: "PostFollowed",
  PostUnfollowed: "PostUnfollowed",
  PostReactionCreated: "PostReactionCreated",
  PostReactionUpdated: "PostReactionUpdated",
  PostReactionDeleted: "PostReactionDeleted",
  SpaceCreated: "SpaceCreated",
  SpaceUpdated: "SpaceUpdated",
  SpaceFollowed: "SpaceFollowed",
  SpaceUnfollowed: "SpaceUnfollowed",
  SpaceOwnershipTransferAccepted: "SpaceOwnershipTransferAccepted",
  SpaceOwnershipTransferCreated: "SpaceOwnershipTransferCreated",
  AccountFollowed: "AccountFollowed",
  AccountUnfollowed: "AccountUnfollowed",
  ProfileUpdated: "ProfileUpdated",
  ExtensionDonationCreated: "ExtensionDonationCreated",
  ExtensionEvmNftShared: "ExtensionEvmNftShared",
  ExtensionImageCreated: "ExtensionImageCreated",
  ExtensionSecretBoxCreated: "ExtensionSecretBoxCreated",
  CommentCreated: "CommentCreated",
  CommentDeleted: "CommentDeleted",
  CommentUpdated: "CommentUpdated",
  CommentShared: "CommentShared",
  CommentReactionCreated: "CommentReactionCreated",
  CommentReactionUpdated: "CommentReactionUpdated",
  CommentReactionDeleted: "CommentReactionDeleted",
  CommentReplyCreated: "CommentReplyCreated",
  CommentReplyDeleted: "CommentReplyDeleted",
  CommentReplyUpdated: "CommentReplyUpdated",
  CommentReplyShared: "CommentReplyShared",
  CommentReplyReactionCreated: "CommentReplyReactionCreated",
  CommentReplyReactionUpdated: "CommentReplyReactionUpdated",
  CommentReplyReactionDeleted: "CommentReplyReactionDeleted",
  UserNameRegistered: "UserNameRegistered",
  UserNameUpdated: "UserNameUpdated",
  EvmAddressUnlinkedFromAccount: "EvmAddressUnlinkedFromAccount",
  EvmAddressLinkedToAccount: "EvmAddressLinkedToAccount",
} as const;

export type SocialEventNameEnum = typeof socialEventName;

export interface PostCreatedEventParsedParams {
  accountId: string;
  postId: string;
}

export interface PostUpdatedEventParsedParams {
  accountId: string;
  postId: string;
}

export interface PostMovedEventParsedParams {
  accountId: string;
  postId: string;
  fromSpace: string | null | undefined;
  toSpace: string | null | undefined;
}

export interface PostFollowedEventParsedParams {
  followerId: string;
  postId: string;
}

export interface PostUnfollowedEventParsedParams {
  followerId: string;
  postId: string;
}

export interface SpaceCreatedEventParsedParams {
  accountId: string;
  spaceId: string;
}

export interface SpaceUpdatedEventParsedParams {
  accountId: string;
  spaceId: string;
}

export interface PostReactionCreatedEventParsedParams {
  accountId: string;
  postId: string;
  reactionId: string;
  reactionKind: ReactionKind;
}

export interface PostReactionUpdatedEventParsedParams {
  accountId: string;
  postId: string;
  reactionId: string;
  newReactionKind: ReactionKind;
}

export interface PostReactionDeletedEventParsedParams {
  accountId: string;
  postId: string;
  reactionId: string;
  reactionKind: ReactionKind;
}

export interface ProfileUpdatedEventParsedParams {
  accountId: string;
  spaceId: string | null | undefined;
}

export interface SpaceFollowedEventParsedParams {
  followerId: string;
  spaceId: string;
}

export interface SpaceUnfollowedEventParsedParams {
  followerId: string;
  spaceId: string;
}

export interface SpaceOwnershipTransferCreatedEventParsedParams {
  currentOwnerId: string;
  newOwnerId: string;
  spaceId: string;
}

export interface SpaceOwnershipTransferAcceptedEventParsedParams {
  accountId: string;
  spaceId: string;
}

export interface AccountFollowedEventParsedParams {
  followerId: string;
  accountId: string;
}

export interface AccountUnfollowedEventParsedParams {
  followerId: string;
  accountId: string;
}

export interface DomainRegisteredEventParsedParams {
  accountId: string;
  domain: Uint8Array;
  recipientId?: string;
}

export interface DomainMetaUpdatedEventParsedParams {
  accountId: string;
  domain: Uint8Array;
}

export interface EvmAddressLinkedToAccountEventParsedParams {
  substrateAccountId: string;
  ethereumAccountId: string;
}

export interface EvmAddressUnlinkedFromAccountEventParsedParams {
  substrateAccountId: string;
  ethereumAccountId: string;
}

export type SocialOnChainEventDataParams<
  E extends keyof typeof socialEventName
> = E extends (typeof socialEventName)["PostCreated"]
  ? PostCreatedEventParsedParams
  : E extends (typeof socialEventName)["PostUpdated"]
  ? PostUpdatedEventParsedParams
  : E extends (typeof socialEventName)["PostMoved"]
  ? PostMovedEventParsedParams
  : E extends (typeof socialEventName)["PostFollowed"]
  ? PostFollowedEventParsedParams
  : E extends (typeof socialEventName)["PostUnfollowed"]
  ? PostUnfollowedEventParsedParams
  : E extends (typeof socialEventName)["SpaceUpdated"]
  ? SpaceUpdatedEventParsedParams
  : E extends (typeof socialEventName)["SpaceCreated"]
  ? SpaceCreatedEventParsedParams
  : E extends (typeof socialEventName)["PostReactionCreated"]
  ? PostReactionCreatedEventParsedParams
  : E extends (typeof socialEventName)["PostReactionUpdated"]
  ? PostReactionUpdatedEventParsedParams
  : E extends (typeof socialEventName)["PostReactionDeleted"]
  ? PostReactionDeletedEventParsedParams
  : E extends (typeof socialEventName)["ProfileUpdated"]
  ? ProfileUpdatedEventParsedParams
  : E extends (typeof socialEventName)["SpaceFollowed"]
  ? SpaceFollowedEventParsedParams
  : E extends (typeof socialEventName)["SpaceUnfollowed"]
  ? SpaceUnfollowedEventParsedParams
  : E extends (typeof socialEventName)["SpaceOwnershipTransferCreated"]
  ? SpaceOwnershipTransferCreatedEventParsedParams
  : E extends (typeof socialEventName)["SpaceOwnershipTransferAccepted"]
  ? SpaceOwnershipTransferAcceptedEventParsedParams
  : E extends (typeof socialEventName)["AccountFollowed"]
  ? AccountFollowedEventParsedParams
  : E extends (typeof socialEventName)["AccountUnfollowed"]
  ? AccountUnfollowedEventParsedParams
  : E extends (typeof socialEventName)["UserNameRegistered"]
  ? DomainRegisteredEventParsedParams
  : E extends (typeof socialEventName)["UserNameUpdated"]
  ? DomainMetaUpdatedEventParsedParams
  : E extends (typeof socialEventName)["EvmAddressLinkedToAccount"]
  ? EvmAddressLinkedToAccountEventParsedParams
  : E extends (typeof socialEventName)["EvmAddressUnlinkedFromAccount"]
  ? EvmAddressUnlinkedFromAccountEventParsedParams
  : never;

export type SocialOnChainEventMetadata = {
  indexInBlock: number;
  blockNumber: number;
  blockHash: string;
  timestamp: string;
};

export type SocialOnChainEventData<E extends keyof typeof socialEventName> = {
  name: E;
  metadata: SocialOnChainEventMetadata;
  params: SocialOnChainEventDataParams<E>;
};

export type SocialOnChainEventDataApiInput<
  E extends keyof typeof socialEventName
> = {
  name: E;
  metadata: string;
  params: string;
};
