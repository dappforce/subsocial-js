import BN from "bn.js"

type EntityId = string

export type AnyId = EntityId | BN

export function idToBn (id: AnyId): BN {
  return BN.isBN(id) ? id : new BN(id)
}

export function idsToBns (ids: AnyId[]): BN[] {
  return ids.map(idToBn)
}

export function bnToId (bnId: BN): EntityId {
  return bnId.toString()
}

export function bnsToIds (bnIds: BN[]): EntityId[] {
  return bnIds.map(bnToId)
}