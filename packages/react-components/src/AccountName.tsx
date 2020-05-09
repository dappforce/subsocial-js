// Copyright 2017-2020 @polkadot/react-query authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { BareProps } from '@subsocial/react-api/types';
import { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';

import React from 'react';
import styled from 'styled-components';

interface Props extends BareProps {
  children?: React.ReactNode;
  defaultName?: string;
  label?: React.ReactNode;
  noLookup?: boolean;
  onClick?: () => void;
  override?: React.ReactNode;
  // this is used by app-account/addresses to toggle editing
  toggle?: boolean;
  value: AccountId | AccountIndex | Address | string | Uint8Array | null | undefined;
}

function AccountName (): React.ReactElement<Props> | null {
  return null;
}

export default React.memo(styled(AccountName)`
  .via-identity {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
    width: 100%;

    .name {
      font-weight: normal !important;
      filter: grayscale(100%);
      opacity: 0.6;
      text-transform: uppercase;

      &.isAddress {
        font-family: monospace;
        text-transform: none;
      }

      &.isGood,
      &.isLocal {
        opacity: 1;
      }

      .sub {
        font-size: 0.75rem;
        opacity: 0.75;
      }
    }

    div.name {
      display: inline-block;
    }

    > * {
      line-height: 1em;
      vertical-align: middle;
    }
  }
`);
