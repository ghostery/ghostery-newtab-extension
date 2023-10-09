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
import { labels, labelsKeys } from '../utils/trackers.js';

export default {
  trackersBlocked: 0,
  trackersModified: 0,
  trackersDetailed: [
    {
      id: true,
      name: '',
      cat: '',
    },
  ],

  categories: ({ trackersDetailed }) =>
    trackersDetailed
      .map(({ cat }) => (labels[cat] ? cat : 'unidentified'))
      .sort((a, b) => labelsKeys.indexOf(a) - labelsKeys.indexOf(b)),

  groupedCategories: ({ categories }) => {
    return Object.entries(
      categories.reduce((acc, key) => {
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {}),
    );
  },

  [store.connect]: async () => {
    return await browser.runtime.sendMessage('firefox@ghostery.com', {
      name: 'getDashboardStats',
    });
  },
};
