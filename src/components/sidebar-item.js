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
  icon: '',
  render: ({ icon }) =>
    html`<template layout="row gap:2 items:center padding:1.5">
      ${icon && html`<gh-icon name="${icon}" layout="::color:white"></gh-icon>`}
      <div layout="grow ::font:body-l ::color:white">
        <slot></slot>
      </div>
      <slot name="suffix"></slot>
    </template>`.css`
      :host {
        border-radius: 8px;
        transition: background-color 0.2s;
      }

      @media (hover: hover) {
        :host(:hover) {
          background: var(--color-gray-800);
        }
      }
    `,
};
