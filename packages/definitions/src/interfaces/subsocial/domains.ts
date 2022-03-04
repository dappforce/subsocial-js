import { buildTypes } from './utils';

const v0 = buildTypes({
  types: {
    DomainMeta: {
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      owner: 'AccountId',
      expiresAt: 'BlockNumber',
      soldFor: 'Balance',
      content: 'Content',
      outerValue: 'Option<Text>',
      domainDeposit: 'Balance',
      outerValueDeposit: 'Balance'
    }
  }
})

export default [v0]
