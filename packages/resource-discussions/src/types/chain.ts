export const config = {
  name: 'chain',
  supportedChainNames: {
    substrate: [
      'subsocial',
      'xsocial',
      'soonsocial',
      'polkadot',
      'kusama',
      'astar',
      'zeitgeist'
    ] as const,
    evm: [
      /// Eth
      '1'
    ] as const
  }
}

export const chainResourceTypes = {
  block: 'block',
  tx: 'tx',
  token: 'token',
  account: 'account',
  proposal: 'proposal',
  market: 'market',
  nft: 'nft'
} as const

export const chainResourceValues = {
  blockNumber: 'blockNumber',
  txHash: 'txHash',
  tokenAddress: 'tokenAddress',
  accountAddress: 'accountAddress',
  collectionId: 'collectionId',
  nftId: 'nftId',
  id: 'id'
} as const

export type BlockNumber = string
export type TxHash = string
export type TokenAddress = string
export type AccountAddress = string
export type CollectionId = string
export type NftId = string
export type Id = string

type ChainResourceType =
  | 'block'
  | 'tx'
  | 'token'
  | 'account'
  | 'proposal'
  | 'market'
  | 'nft'

export type ChainResourceValue<R extends ChainResourceType> = R extends 'block'
  ? { blockNumber: BlockNumber }
  : R extends 'tx'
  ? { txHash: TxHash }
  : R extends 'token'
  ? { tokenAddress: TokenAddress }
  : R extends 'account'
  ? { accountAddress: AccountAddress }
  : R extends 'proposal'
  ? { id: Id }
  : R extends 'market'
  ? { id: Id }
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
      chainName: typeof config.supportedChainNames.substrate | string
    } & SubstrateChainResourceTypeValue)
  | ({
      chainType: 'evm'
      chainName: typeof config.supportedChainNames.evm | string
    } & EvmChainResourceTypeValue)
  | ({
      chainType: string
      chainName: string
    } & AnyChainResourceTypeValue)
)
