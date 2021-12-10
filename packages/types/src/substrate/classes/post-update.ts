/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Option, Struct, bool } from '@polkadot/types';
import { SpaceId } from '@subsocial/definitions/interfaces';
import registry from '../registry';
import { OptionContent } from './content';
// TODO add permissions
export type PostUpdateType = {
  space_id: Option<SpaceId>;
  content: OptionContent;
  hidden: Option<bool>
};

export class PostUpdate extends Struct {
  constructor (value?: PostUpdateType) {
    super(
      registry,
      {
        spaceId: 'Option<u64>',
        content: 'Option<Content>',
        hidden: 'Option<bool>'
      },
      value
    );
  }

  get content (): OptionContent {
    return this.get('content') as OptionContent;
  }

  set content (value: OptionContent) {
    this.set('content', value);
  }
}
