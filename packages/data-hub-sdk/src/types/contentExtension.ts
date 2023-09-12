export const ContentExtensionId = {
  "subsocial-donations": "subsocial-donations",
  "subsocial-evm-nft": "subsocial-evm-nft",
  "subsocial-image": "subsocial-image",
  "subsocial-secret-box": "subsocial-secret-box",
  "subsocial-decoded-promo": "subsocial-decoded-promo",
  "subsocial-pinned-posts": "subsocial-pinned-posts",
} as const;

type DonationsProperties = {
  chain: string;
  from: string;
  to: string;
  token: string;
  amount: string;
  decimals: number;
  txHash: string;
};
type EvmNftProperties = {
  chain: string;
  collectionId: string;
  nftId: string;
  url: string;
};
type ImageProperties = {
  image: string;
};
type SecretBoxProperties = {
  message: string;
  nonce: string;
  recipient: string;
};
type PinnedPostsProperties = {
  ids: string[];
};

export type ContentExtensionData =
  | ({
      id: (typeof ContentExtensionId)["subsocial-donations"];
    } & {
      properties: DonationsProperties;
    })
  | ({
      id: (typeof ContentExtensionId)["subsocial-evm-nft"];
    } & {
      properties: EvmNftProperties;
    })
  | ({
      id: (typeof ContentExtensionId)["subsocial-image"];
    } & {
      properties: ImageProperties;
    })
  | ({
      id: (typeof ContentExtensionId)["subsocial-secret-box"];
    } & {
      properties: SecretBoxProperties;
    })
  | ({
      id: (typeof ContentExtensionId)["subsocial-decoded-promo"];
    } & {
      properties: SecretBoxProperties;
    })
  | ({
      id: (typeof ContentExtensionId)["subsocial-pinned-posts"];
    } & {
      properties: PinnedPostsProperties;
    });

export type ExtensionPropertiesAll = Partial<
  DonationsProperties &
    EvmNftProperties &
    ImageProperties &
    SecretBoxProperties &
    PinnedPostsProperties
>;
