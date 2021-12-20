/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { SpaceId } from '@subsocial/definitions/interfaces';
import { OptionEntity, OptionIpfsContent } from '.';

export type PostUpdateType = {
  spaceId?: SpaceId | string;
  content?: string;
  hidden?: boolean
};

export function PostUpdate ({ spaceId, content, hidden }: PostUpdateType) {
  return {
    spaceId: OptionEntity(spaceId),
    content: OptionIpfsContent(content),
    hidden: OptionEntity(hidden)
  }
}