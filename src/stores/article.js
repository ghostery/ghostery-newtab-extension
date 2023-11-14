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

const API_URL = 'https://newsletter.ghostery.com';
const TTL = 1000 * 60 * 60 * 24; // 1 day

export default {
  id: true,
  title: '',
  description: '',
  url: '',
  image_url: '',
  hostname: ({ url }) => new URL(url).hostname,
  [store.connect]: {
    cache: true,
    async list() {
      let { articles } = await browser.storage.session.get('articles');

      if (!articles || articles.ttl < Date.now()) {
        const {
          data: [newsletter],
        } = await fetch(`${API_URL}/newsletters.json`, {
          credentials: 'omit',
        }).then((res) => res.json());

        const { data, included } = await fetch(
          `${API_URL}/newsletters/${newsletter.attributes.name}.json`,
          { credentials: 'omit' },
        ).then((res) => res.json());

        articles = {
          items: data.relationships.contents.data.map(
            ({ id }) => included.find((item) => item.id === id).attributes,
          ),
          ttl: Date.now() + TTL,
        };

        browser.storage.session.set({ articles });
      }

      return articles.items;
    },
  },
};
