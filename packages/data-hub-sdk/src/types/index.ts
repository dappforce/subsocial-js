import {
  socialEventName,
  SocialEventNameEnum,
  SocialOnChainEventData,
  SocialOnChainEventDataApiInput,
} from "./event";
import {
  SocialCallData,
  SocialCallDataApiInput,
  socialCallName,
  SocialCallNameEnum,
} from "./call";
import { IpfsContent, ipfsContentSection, IpfsContentSection } from "./ipfs";

export * from "./event";
export * from "./call";
export * from "./ipfs";
export * from "./common";
export * from "./contentExtension";
export * from "./subscription";

export enum SocialEventDataType {
  persistent = "persistent",
  optimistic = "optimistic",
  offChain = "offChain",
}

export type SocialEventData =
  | ({ dataType: SocialEventDataType.optimistic } & {
      callData: SocialCallData<keyof typeof socialCallName>;
      content?: Partial<IpfsContent<keyof typeof ipfsContentSection>>;
    })
  | ({ dataType: SocialEventDataType.persistent } & {
      eventData: SocialOnChainEventData<keyof typeof socialEventName> | null;
      callData: SocialCallData<keyof typeof socialCallName>;
    })
  | ({ dataType: SocialEventDataType.offChain } & {
      callData: SocialCallData<keyof typeof socialCallName>;
      content?: Partial<IpfsContent<keyof typeof ipfsContentSection>>;
    });

export type SocialEventDataApiInput =
  | ({ dataType: SocialEventDataType.optimistic } & {
      callData: SocialCallDataApiInput<keyof typeof socialCallName>;
      content?: string;
    })
  | ({ dataType: SocialEventDataType.persistent } & {
      eventData: SocialOnChainEventDataApiInput<
        keyof typeof socialEventName
      > | null;
      callData: SocialCallDataApiInput<keyof typeof socialCallName>;
    })
  | ({ dataType: SocialEventDataType.offChain } & {
      callData: SocialCallDataApiInput<keyof typeof socialCallName>;
      content?: string;
    });

export type SocialEventDataGeneric<
  T extends SocialEventDataType,
  C extends keyof SocialCallNameEnum,
  E extends keyof SocialEventNameEnum
> = T extends SocialEventDataType.optimistic
  ? {
      dataType: SocialEventDataType.optimistic;
      callData: SocialCallData<C>;
      content?: Partial<IpfsContent<keyof typeof ipfsContentSection>>;
    }
  : T extends SocialEventDataType.persistent
  ? {
      dataType: SocialEventDataType.persistent;
      eventData: SocialOnChainEventData<E> | null;
      callData: SocialCallData<C>;
    }
  : T extends SocialEventDataType.offChain
  ? {
      dataType: SocialEventDataType.offChain;
      callData: SocialCallData<C>;
      content?: Partial<IpfsContent<keyof typeof ipfsContentSection>>;
    }
  : never;
