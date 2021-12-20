/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { SpacePermissions } from '@subsocial/definitions/interfaces';
import { IpfsContent, OptionEntity } from '.';

export type SpaceUpdateType = {
  handle?: string;
  content?: string;
  hidden?: boolean;
  permissions?: SpacePermissions;
};

export function SpaceUpdate ({ handle, content, hidden, permissions }: SpaceUpdateType) {
  return {
    handle: OptionEntity(handle),
    content: OptionEntity(content),
    hidden: OptionEntity(hidden),
    permissions: OptionEntity(permissions)
  }
}
