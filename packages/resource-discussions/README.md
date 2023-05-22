# Subsocial helper for resource-discussions pallet by [DappForce](https://github.com/dappforce)

SocialResource is meant to make work with `resource-discussions` pallet easier. Main goals of this tool:
- convert resource parameters from object tree view to `resourceId` string;
- keep `resourceId` structure stable and fixed;
- validate resource parameters object;

Usage example:

```typescript
import { SocialResource, ResourceParameters } from '@subsocial/resource-discussions'

const resourceParams: ResourceParameters = {
  schema: 'chain',
  chainType: 'substrate',
  chainName: 'xsocial',
  resourceType: 'block',
  resourceValue: {
    blockNumber: '3219502'
  }
}

const resourceInstance = new SocialResource(resourceParams)

const resourceId = resourceInstance.toResourceId()
```

### Types and parameters
`ResourceParameters` object has sequentially conditional structure. It means, that parameter 
`schema` or specific combination of parameters `chema` and `chainType` influences 
to valid combination of further parameters. This flow is controlled by graph-based config structure
and TypeScript types. You can investigate all possible parameters combinations in package types.