// Copyright 2017-2020 @polkadot/react-hooks authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ApiProps } from '@subsocial/react-api/types';

import { useContext } from 'react';
import { ApiContext } from '@subsocial/react-api';

export default function useApi (): ApiProps {
  return useContext(ApiContext);
}
