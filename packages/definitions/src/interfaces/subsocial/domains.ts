import { buildTypes } from './utils';

const v0 = buildTypes({
  types: {
    EntityId: {
      _enum: {
        Outer: 'Text',
        Account: 'AccountId',
        Space: 'SpaceId',
        Post: 'PostId'
      }
    },
    Domain: {
      tld: 'Text',
      nested: 'Text'
    },
    DomainMeta: {
      created: 'WhoAndWhen',
      updated: 'Option<WhoAndWhen>',
      owner: 'AccountId',
      expiresAt: 'BlockNumber',
      soldFor: 'Balance',
      content: 'Content',
      innerValue: 'Option<EntityId>',
      outerValue: 'Option<Text>'
    }
  }
})

export default [v0]
