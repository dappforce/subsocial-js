/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Struct } from '@polkadot/types';
import registry from '../registry';
import { OptionText } from './utils';
import { OptionContent } from './content';

export type ProfileUpdateType = {
  content: OptionContent;
};

export class ProfileUpdate extends Struct {
  constructor (value?: ProfileUpdateType) {
    super(
      registry,
      {
        content: 'Option<Content>'
      },
      value
    );
  }

  set content (value: OptionContent) {
    this.set('content', value);
  }

  set handle (value: OptionText) {
    this.set('handle', value);
  }
}
