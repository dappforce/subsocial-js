/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Option, Struct, bool } from '@polkadot/types';
import registry from '../registry';
import { OptionOptionText } from './utils';
import { OptionContent } from './content';
import { SpacePermissions } from '@subsocial/definitions/interfaces';

// TODO add permissions

export type SpaceUpdateType = {
  handle: OptionOptionText;
  content: OptionContent;
  hidden: Option<bool>;
  permissions: Option<Option<SpacePermissions>>;
};

export class SpaceUpdate extends Struct {
  constructor (value?: SpaceUpdateType) {
    super(
      registry,
      {
        handle: 'Option<Option<Text>>' as any,
        content: 'Option<Content>',
        hidden: 'Option<bool>',
        permissions: 'Option<Option<SpacePermissions>>' as any
      },
      value
    );
  }

  get handle (): OptionOptionText {
    return this.get('handle') as OptionOptionText;
  }

  set handle (value: OptionOptionText) {
    this.set('handle', value);
  }

  get content (): OptionContent {
    return this.get('content') as OptionContent;
  }

  set content (value: OptionContent) {
    this.set('content', value);
  }

  get hidden (): bool {
    return this.get('hidden') as bool;
  }

  get permissions (): Option<Option<SpacePermissions>> {
    return this.get('permissions') as Option<Option<SpacePermissions>>;
  }
}
