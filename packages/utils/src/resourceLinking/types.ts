export type BlockNumber = string
export type TxHash = string
export type TokenAddress = string
export type AccountAddress = string
export type CollectionId = string
export type NftId = string

export type Schema = 'chain' | 'twitter' | 'ipfs'
export type ChainType = 'evm' | 'substrate'
export type ChainResourceType =
  | 'block'
  | 'tx'
  | 'token'
  | 'account'
  | 'nft'
  | 'proposal'
  | 'market'
export type TwitterResourceType = 'user' | 'tweet'
export type IpfsResourceType = 'cid'

export type ResourceTypeMap = {
  chain: ChainResourceType
  twitter: TwitterResourceType
  ipfs: IpfsResourceType
}

export type ChainResourceValueMap = {
  block: { blockNumber: BlockNumber }
  tx: { txHash: TxHash }
  token: { tokenAddress: TokenAddress }
  account: { accountAddress: AccountAddress }
  proposal: { accountAddress: AccountAddress }
  market: { accountAddress: AccountAddress }
  nft: { collectionId: CollectionId; nftId?: NftId }
}

export type TwitterResourceValueMap = {
  user: { id: string } // TODO naming should be reviewed
  tweet: { id: string }
}

export type IpfsResourceValueMap = {
  cid: { id: string } // TODO naming should be reviewed
}

export type ChainSchemaConfig<Rt extends keyof ChainResourceValueMap> = {
  chainType: ChainType
  chainName: string
  resourceType: Rt
  resourceValue: ChainResourceValueMap[Rt]
}

export type TwitterSchemaConfig<Rt extends keyof TwitterResourceValueMap> = {
  resourceType: Rt
  resourceValue: TwitterResourceValueMap[Rt]
}

export type IpfsSchemaConfig<Rt extends keyof IpfsResourceValueMap> = {
  resourceType: Rt
  resourceValue: IpfsResourceValueMap[Rt]
}

export type SchemaConfig<
  S extends Schema,
  Rt extends ResourceTypeMap[S]
> = S extends 'chain'
  ? ChainSchemaConfig<Rt>
  : S extends 'twitter'
  ? TwitterSchemaConfig<Rt>
  : S extends 'ipfs'
  ? IpfsSchemaConfig<Rt>
  : never

export type UrlConfig<
  S extends Schema = any,
  Rt extends ResourceTypeMap[S] = any
> = {
  schema: S
  config: SchemaConfig<S, Rt>
}
