import { SocialAccount, Profile, BlockNumber, Moment, WhoAndWhen } from '@subsocial/types/src/substrate/interfaces/';
import BN from 'bn.js';
import { u32, Text } from '@polkadot/types';
import { ProfileContent, ProfileData } from '@subsocial/types/src';
import { mockAccountAlice, mockAccountBob } from './AccountMocks';
import aliceAvatar from './avatars/alice';
import bobAvatar from './avatars/bob';

export const mockSocialAccountAlice = {
  reputation: new BN(100) as u32,
  followers_count: new BN(23) as u32,
  following_spaces_count: new BN(15) as u32,
  following_accounts_count: new BN(122) as u32
} as SocialAccount

export const mockProfileAlice = {
  username: 'alice' as unknown as Text,
  created: {
    account: mockAccountAlice,
    block: new BN(12345) as BlockNumber,
    time: new BN(1586523823996) as Moment
  } as WhoAndWhen,
} as Profile

export const mockContentAlice = {
  about: 'About of Alice',
  fullname: 'Alice Allison',
  avatar: aliceAvatar
} as ProfileContent

export const mockProfileDataAlice = {
  struct: mockSocialAccountAlice,
  profile: mockProfileAlice,
  content: mockContentAlice
} as ProfileData

export const mockSocialAccountBob = {
  reputation: new BN(100) as u32,
  followers_count: new BN(23) as u32,
  following_spaces_count: new BN(15) as u32,
  following_accounts_count: new BN(122) as u32
} as SocialAccount

export const mockProfileBob = {
  username: 'bobby' as unknown as Text,
  created: {
    account: mockAccountBob,
    block: new BN(12345) as BlockNumber,
    time: new BN(1586523823996) as Moment
  } as WhoAndWhen,
} as Profile

export const mockContentBob = {
  about: 'About of Bob',
  fullname: 'Bob Bobster',
  avatar: bobAvatar
} as ProfileContent

export const mockProfileDataBob = {
  struct: mockSocialAccountBob,
  profile: mockProfileBob,
  content: mockContentBob
} as ProfileData

export const profilesData: ProfileData[] = [
  mockProfileDataAlice,
  mockProfileDataBob
]
