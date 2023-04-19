# SocialRemark

The SocialRemark protocol is designed to process cross-chain actions.

## SocialRemark message format

- Domain Registration
  `prot_name::version::destination::action::op_id::target::domain_name::token`
- Energy Generation
  `prot_name::version::destination::action::op_id::target::energy_amount::token`

A Remark message has 2 parts:
- the core part (which is the same for all messages): `prot_name::version::action`
- the content part (which depends on the action):
  - `op_id::target::domain_name::token`
  - `op_id::target::energy_amount::token`

Core part options:
- `prot_name` - The protocol name which must be configured with the `.setConfig()` method
- `version` - The protocol version (the current available version is `0.1`)
- `destination` - The chain which will be used for cross-chain actions. User can use predefined chain IDs which are
    exposed in SocialRemark utility library.
- `action` - The message action (available actions: `DMN_REG`, `DMN_REG_OK`, `DMN_REG_REFUND`, `DMN_REG_REFUND_OK`, `NRG_GEN`, `NRG_GEN_OK`, `NRG_GEN_REFUND`, `NRG_GEN_REFUND_OK`)

Content options:
- `op_id` - A unique operation identifier that is used to build a relationship between Domain Registration actions, in order to associate a particular `DMN_REG_OK` or `DMN_REG_REFUND_OK` to the corresponding `DMN_REG`.
- `target` - The owner of a new domain or receiver of energy _(this can be an address in any SS58 format, the SocialRemark instance will convert it to Subsocial's format under the hood (prefix: 28))_
- `domain_name` - The domain name purchased by the target
- `energy_amount` - The amount of energy purchased by the target
- `token` - The type of token (for example, SUB, DOT, or KSM) used in the purchase process

Here is a dummy example of a SocialRemark message:

```
social::0.1::1::DMN_REG::0x44d8d9f1bc70e45eb773731f9ffc5d3646df56497c40cdfff37c8ceb71fa2-2104480009442407::3t5NA8UKsGzrCDMfp8XMEBghiYthWGXGsHbjtJY45NUJDY5P::somenewdomain.sub::DOT
```

## Usage examples:

```typescript
import { SocialRemark, SubSclSource } from '@subsocial-js/utils'
import { randomAsNumber } from '@polkadot/util-crypto'

/**
 * Set a custom protocol name(s), which will be recognized as a valid protocol name.
 * The default value is `social` (IMPORTANT - it is not recommended to use the default value
 * for development or testing purposes).
 */
SocialRemark.setConfig({ protNames: ['social_custom'] })

const remarkSource: SubSclSource<'DMN_REG'> = {
  protName: 'social_custom',
  version: '0.1',
  action: 'DMN_REG',
  destination: 1,
  content: {
    opId: `${randomAsNumber()}`,
    domainName: `somenewdomain.sub`,
    target: '3t5NA8UKsGzrCDMfp8XMEBghiYthWGXGsHbjtJY45NUJDY5P',
    token: 'ROC'
  }
}

/**
 * Creates a SocialRemark instance for further usage by calling the instance methods.
 */
const socialRemarkInstance: SocialRemark = new SocialRemark().fromSource(
  remarkSource
)

/**
 * Gets a compiled string remark message for sending to the blockchain.
 */
const socialRemarkMessageStr: string = socialRemarkInstance.toMessage()

/**
 * Parses the string social remark message and create a SocialRemark instance.
 */
const socialRemarkParsed: SocialRemark = new SocialRemark().fromMessage(
  socialRemarkMessageStr
)

/**
 * Checks if a remark message is a valid SocialRemark message.
 */
if (!remark.isValidMessage) throw new Error('SocialRemark message is not valid.')
```
