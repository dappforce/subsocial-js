/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Struct } from '@polkadot/types';
import registry from '../registry';
import { OptionText } from './utils';
import { OptionContent } from './content';

export type ProfileUpdateType = {
  handle: OptionText;
  content: OptionContent;
};

export class ProfileUpdate extends Struct {
  constructor (value?: ProfileUpdateType) {
    super(
      registry,
      {
        handle: 'Option<Text>',
        content: 'Option<Content>'
      },
      value
    );
  }

  get content (): OptionContent {
    return this.get('content') as OptionContent;
  }

  get handle (): OptionText {
    return this.get('handle') as OptionText;
  }

  set content (value: OptionContent) {
    this.set('content', value);
  }

  set handle (value: OptionText) {
    this.set('handle', value);
  }
}
