import { RemarkContentProps, SocialRemarkMessageAction } from './types';
import { addressFromAnyToFormatted } from './utils';

export function decorateRemarkContentValue(
  action: SocialRemarkMessageAction,
  propName: RemarkContentProps,
  value: string
) {
  switch (action) {
    case 'DMN_REG': {
      switch (propName) {
        case 'target': {
          return addressFromAnyToFormatted(value, 28);
          break;
        }
        default:
          return value;
      }
      break;
    }
    case 'DMN_REG_OK': {
      switch (propName) {
        case 'target': {
          return addressFromAnyToFormatted(value, 28);
          break;
        }
        default:
          return value;
      }
      break;
    }
    case 'DMN_REG_REFUND': {
      switch (propName) {
        case 'target': {
          return addressFromAnyToFormatted(value, 28);
          break;
        }
        default:
          return value;
      }
      break;
    }
    default:
      return value;
  }
}
