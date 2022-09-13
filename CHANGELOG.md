# Change Log

## [Unreleased] - 2022-09-13
 
We have done really huge update of our SDK. Get feedback of our early 
 
### Added
- definitions for Subsocial Parachain Node
- new methods for IPFS instance:
  - saveContentToIpfs
  - pinContent
  - unpinContent
- support custom headers for IPFS node:
  - setWriteHeaders
  - setPinHeaders
- add high level getter for:
  - `api.base` - get base no-serialized data from blockchain and IPFS
  - `api.blockchain` - get no-serialized data only from blockchain
  - `api.ipfs` - get IPFS instance
  - `api.substrateApi` - get ApiPromise instance
- add methods to `blockchain` instance for getting data from roles storages from blockchain:
  - getAccountsWithAnyRoleInSpace
  - getSpaceIdsWithRolesByAccount
  - getSpacePermissionsByAccount
- add method to `blockchain` instance for getting counter of storage:
  - postsCountBySpaceId
  - sharesCountByPostId
  - repliesCountByPostId
  - accountFollowersCountByAccountId
  - accountsFollowedCountByAccount
 
### Changed
- remove @subsocial/types package and combine it with @subsocial/api
- reorganize imports for @subsocial/api
- rename `FlatSubsocialApi` to `SubsocialApi`
- set `api.subsocial` as deprecated
  