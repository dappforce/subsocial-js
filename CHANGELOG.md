# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 0.8.3 - 2023-03-09
### Added
- add HTTP support for connecting to Substrate node

## 0.8.2 - 2023-03-02
### Added
- add adminClient for IPFS instance for better management of IPFS

## 0.8.1 - 2023-02-17
### Added
- Add flatten function for reactions
- Add `findReaction` and `findReactions` to top-level API (wrappers around `api.blockchain.findReaction` and `api.blockchain.findReactions`)
- Add new type `ReactionStruct`
- Add new attribute `username` for Space in Elastic Index type
- Add typedoc for `@subsocial/utils` package

### Changed
- Change the return type of ids in `api.blockchain` functions to string
- Change argument of `createTwitterURL` to accept object with only required properties
- Make `api.blockchain.getReactionIdsByAccount` private, because its same as `api.blockchain.getPostReactionIdsByAccount`

### Deprecated
- Make `api.base` deprecated. All the functionality provided by it are all implemented in the top-level API. e.g. `api.base.findPost` <=> `api.findPost`
- Deprecate `handle` attribute in Elastic Space type. Use newly added field `username` instead

### Removed
- Remove `profiles` from elastic index types

### Fixed
- Fix behavior of `simpleFormatBalance` `currency` argument not working

## 0.7.13 - 2023-02-13
### Added
- add `get-metadata.js` for definitions, for fast updating types after chain upgrades
- support `createSpaceAsProfile` in definitions

## 0.7.12 - 2023-02-03
### Added
- add `parseTwitterToMarkdown` and `createTwitterURL` to `@subsocial/utils`, for support parsing Twitter posts to Markdown and creating Twitter saved content provided by [Post4ever](https://post4ever.app)

## 0.7.10 - 2022-12-03
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
- add `filters` arg for `find(Space|Post)Structs` methods in Subsocial API
- add methods to `SubsocialApi`:
  - findSpaces
  - findPosts
  - findProfileSpaces
