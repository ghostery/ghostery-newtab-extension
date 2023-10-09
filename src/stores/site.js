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
  id: true,
  title: '',
  url: '',
  favicon: '',
  [store.connect]: {
    async list(type) {
      switch (type) {
        case 'top': {
          if (__PLATFORM__ === 'chrome') return browser.topSites.get();

          const userTopSites = await browser.topSites.get({
            includeFavicon: true,
          });

          const newtabSites = [
            ...(await browser.topSites.get({
              newtab: true,
              includeFavicon: true,
            })),
          ].filter(({ url }) => !userTopSites.some((s) => s.url === url));

          return [...userTopSites, ...newtabSites].slice(0, 8);
        }
        default:
          throw Error(`Unknown site list type: ${type}`);
      }
    },
  },
};
