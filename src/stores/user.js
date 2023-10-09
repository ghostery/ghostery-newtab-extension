/**
 * Ghostery Browser Extension
 * https://www.ghostery.com/
 *
 * Copyright 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0
 */

import { store } from 'hybrids';

export default {
  user: '',
  firstName: '',
  lastName: '',
  email: '',
  scopes: [String],
  contributor: ({ scopes }) => !!scopes.length,
  name: ({ firstName, lastName }) =>
    [firstName, lastName].filter((s) => s).join(' '),
  [store.connect]: {
    get: async () => {
      return await browser.runtime.sendMessage('firefox@ghostery.com', {
        name: 'getUser',
      });
    },
  },
};
