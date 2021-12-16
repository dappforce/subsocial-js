/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { SpaceId } from '@subsocial/definitions/interfaces';
import { IpfsContent, OptionEntity } from '.';

export type PostUpdateType = {
  spaceId?: SpaceId | string;
  content?: IpfsContent;
  hidden?: boolean
};

export const PostUpdate = ({ spaceId, content, hidden }: PostUpdateType) => {

  return {
    spaceId: OptionEntity(spaceId),
    content: OptionEntity(content),
    hidden: OptionEntity(hidden)
  }
}