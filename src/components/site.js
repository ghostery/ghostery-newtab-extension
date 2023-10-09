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

import { html } from 'hybrids';

export default {
  site: undefined,
  render: ({ site }) => html`
    <template
      layout="column items:center gap width:76px padding:1:1:0.5"
      layout@992px="width:105px"
      layout1280px="width:112px"
    >
      <div id="img" layout="row center size:6 ::color:gray-900 ::font:label-xl">
        ${site.favicon
          ? html`<img src="${site.favicon}" layout="block size:4" />`
          : site.title.slice(0, 1).toUpperCase()}
      </div>
      <span layout="block:center self:stretch ::font:body-s">
        ${site.title}
      </span>
    </template>
  `.css`
    :host {
      color: var(--color-white);
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    :host(:hover) {
      background: var(--color-white-alpha-20);
      text-decoration: underline;
    }

    #img {
      background: var(--color-white);
      border-radius: 8px;
    }

    img {
      border-radius: 4px;
      overflow: hidden;
    }

    span {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  `,
};
