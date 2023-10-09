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
  render: () =>
    html`
      <template
        layout="
          row center padding:1:2 gap height:5
          ::font:button-s ::text-transform:uppercase
        "
      >
        <slot></slot>
      </template>
    `.css`
      :host {
        background: var(--color-white);
        border: 1px solid var(--color-white);
        border-radius: 24px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
        color: var(--color-gray-700);
      }

      @media (hover: hover) {
        :host(:hover) {
          color: var(--color-primary-700);
          border-color: var(--color-black-alpha-40);
        }
      }
    `,
};
