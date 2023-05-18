export type BlockNumber = string
export type TxHash = string
export type TokenAddress = string
export type AccountAddress = string
export type CollectionId = string
export type NftId = string

type ChainResourceType =
  | 'block'
  | 'tx'
  | 'token'
  | 'account'
  | 'proposal'
  | 'market'
  | 'nft'
type SocialResourceType = 'post' | 'profile'

export type ChainResourceValue<R extends ChainResourceType> = R extends 'block'
  ? { blockNumber: BlockNumber }
  : R extends 'tx'
  ? { txHash: TxHash }
  : R extends 'token'
  ? { tokenAddress: TokenAddress }
  : R extends 'account'
  ? { accountAddress: AccountAddress }
  : R extends 'proposal'
  ? { accountAddress: AccountAddress }
  : R extends 'market'
  ? { accountAddress: AccountAddress }
  : R extends 'account' | 'proposal' | 'market'
  ? { accountAddress: AccountAddress }
  : R extends 'nft'
  ? { collectionId: CollectionId; nftId?: NftId }
  : never

type ChainBlockResourceType = {
  resourceType: 'block'
  resourceValue: ChainResourceValue<'block'>
}

type ChainTxResourceType = {
  resourceType: 'tx'
  resourceValue: ChainResourceValue<'tx'>
}

type ChainTokenResourceType = {
  resourceType: 'token'
  resourceValue: ChainResourceValue<'token'>
}

type ChainAccountResourceType = {
  resourceType: 'account'
  resourceValue: ChainResourceValue<'account'>
}

type ChainProposalResourceType = {
  resourceType: 'proposal'
  resourceValue: ChainResourceValue<'proposal'>
}
type ChainMarkerResourceType = {
  resourceType: 'market'
  resourceValue: ChainResourceValue<'market'>
}

type ChainNftResourceType = {
  resourceType: 'nft'
  resourceValue: ChainResourceValue<'nft'>
}

type ChainResourceTypeValueBase =
  | ChainBlockResourceType
  | ChainNftResourceType
  | ChainTxResourceType
  | ChainTokenResourceType
  | ChainAccountResourceType

type SubstrateChainResourceTypeValue =
  | ChainResourceTypeValueBase
  | ChainMarkerResourceType
  | ChainProposalResourceType

type AnyChainResourceTypeValueBase =
  | ChainResourceTypeValueBase
  | ChainMarkerResourceType
  | ChainProposalResourceType

type EvmChainResourceTypeValue = ChainResourceTypeValueBase
type AnyChainResourceTypeValue =
  | ChainBlockResourceType
  | ChainTxResourceType
  | ChainTokenResourceType
  | ChainAccountResourceType

export type ChainSchemaConfig = {
  schema: 'chain'
} & (
  | ({
      chainType: 'substrate'
      chainName: string
    } & SubstrateChainResourceTypeValue)
  | ({
      chainType: 'evm'
      chainName: string
    } & EvmChainResourceTypeValue)
  | ({
      chainType: string
      chainName: string
    } & AnyChainResourceTypeValue)
)
