import type { OverrideVersionedType } from '@polkadot/types/types';

type BuildTypesProps = {
    min?: number,
    max?: number,
    types: Record<string, any>,
}

export const buildTypes = ({ min = 0, max = 16, types }: BuildTypesProps): OverrideVersionedType => {
  return {
    minmax: [min, max], types
  }
}