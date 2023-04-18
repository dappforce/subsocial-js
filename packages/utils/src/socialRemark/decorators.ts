import { RemarkContentProps, SocialRemarkMessageAction } from './types'
import { addressFromAnyToFormatted } from './utils'

const handlersMap: Map<
  SocialRemarkMessageAction,
  Map<RemarkContentProps, (val: string) => unknown>
> = new Map([
  [
    'DMN_REG',
    new Map([['target', value => addressFromAnyToFormatted(value, 28)]])
  ],
  [
    'DMN_REG_OK',
    new Map([['target', value => addressFromAnyToFormatted(value, 28)]])
  ],
  [
    'DMN_REG_REFUND',
    new Map([['target', value => addressFromAnyToFormatted(value, 28)]])
  ]
])

export function decorateRemarkContentValue(
  action: SocialRemarkMessageAction,
  propName: RemarkContentProps,
  value: string
) {
  if (handlersMap.has(action) && handlersMap.get(action)!.has(propName))
    return handlersMap.get(action)!.get(propName)!(value)

  return value
}
