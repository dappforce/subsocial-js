# SocialRemark

SocialRemark protocol is designed to process cross-chain actions.

## SocialRemark message format

- Domain Registration
  `prot_name::version::action::op_id::target::domain_name::token`
- Energy Generation
  `prot_name::version::action::op_id::target::energy_amount::token`

Remark message has 2 parts:
- core part (is the same for all messages): `prot_name::version::action`
- content part (depends on actions):
  - `op_id::target::domain_name::token`
  - `op_id::target::energy_amount::token`

Core part options:
- `prot_name` - protocol name (default valid value `social` but can be configured but `.setConfig()` method)
- `version` - protocol version (current available version `0.1`)
- `action` - message action (available actions: `DMN_REG`, `DMN_REG_OK`, `DMN_REG_REFUND`, `NRG_GEN`, `NRG_GEN_OK`, `NRG_GEN_REFUND`)

Content options:
- `op_id` - unique operation identified. Should be the same for all actions of one operation (the same `op_id` value for `DMN_REG` , `DMN_REG_OK` , `DMN_REG_REFUND` of A single domain registration flow. Necessary for relating actions with each other.)
- `target` - recipient of domain or energy _(address in any SS58 format, SocialRemark instance will convert it to SubSocial format underhood (prefix: 28))_
- `domain_name` - domain name purchased by target
- `energy_amount` - amount of energy purchased by target
- `token` - used token for purchase process

Dummy example of SocialRemark message:

```
social::0.1::DMN_REG::0x44d8d9f1bc70e45eb773731f9ffc5d3646df56497c40cdfff37c8ceb71fa2-2104480009442407::3t5NA8UKsGzrCDMfp8XMEBghiYthWGXGsHbjtJY45NUJDY5P::somenewdomain.sub::DOT
```

## Usage examples:

```typescript
import { SocialRemark, SubSclSource } from '@subsocial-js/utils'
import { randomAsNumber } from '@polkadot/util-crypto'

/**
 * Set custom protocol name(s), which will be recognized as valid protocol name.
 * Default value - `social` (IMPORTANT - not recommended to use default value
 * for development or testing purposes).
 */
SocialRemark.setConfig({ protNames: ['social_custom'] })

const remarkSource: SubSclSource<'DMN_REG'> = {
  protName: 'social_custom',
  action: 'DMN_REG',
  version: '0.1',
  content: {
    opId: `${randomAsNumber()}`,
    domainName: `somenewdomain.sub`,
    target: '3t5NA8UKsGzrCDMfp8XMEBghiYthWGXGsHbjtJY45NUJDY5P',
    token: 'ROC'
  }
}

/**
 * Create SocialRemark instance for further usage by calling instance methods.
 */
const socialRemarkInstance: SocialRemark = new SocialRemark().fromSource(
  remarkSource
)

/**
 * Get compiled string remark message for sending to blockchain
 */
const socialRemarkMessageStr: string = socialRemarkInstance.toMessage()

/**
 * Parse string social remark message and create SocialRemark instance.
 */
const socialRemarkParsed: SocialRemark = new SocialRemark().fromMessage(
  socialRemarkMessageStr
)

/**
 * Check if remark message is valid SocialRemarl message.
 */
if (!remark.isValidMessage) throw new Error('SocialRemar message is not valid.')
```
