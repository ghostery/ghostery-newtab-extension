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
  value: false,
  render: ({ value }) => html`
    <template
      layout="row items:center gap padding:0.5 margin:0 ::color:white"
      layout[value]="::color:primary-500"
    >
      <div id="toggle" layout="block relative size:36px:20px">
        <span layout="block size:2 absolute top left margin:2px"></span>
      </div>
      <div
        type="label-m"
        layout="::font:label-m ::text-transform:uppercase width::36px"
      >
        ${value ? html`On` : html`Off`}
      </div>
    </template>
  `.css`
      #toggle {
        background: var(--color-gray-500);
        border-radius: 12px;
        transition: color 0.2s;
      }

      :host([value]) #toggle {
        background: var(--color-primary-500);
      }

      #toggle span {
        background: var(--color-white);
        border-radius: 8px;
        transition: left 0.2s;
      }

      :host([value]) #toggle span {
        left: calc(100% - 20px);
      }
    `,
};
