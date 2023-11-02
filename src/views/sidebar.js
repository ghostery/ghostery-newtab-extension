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

import { html, router, store } from 'hybrids';

import Settings from '../stores/settings.js';
import User from '../stores/user.js';

function toggle(property) {
  return ({ settings }) => {
    store.set(settings, { [property]: !settings[property] });
  };
}

export default {
  [router.connect]: { dialog: true },
  user: store(User),
  settings: store(Settings),
  content: ({ settings, user }) => html`
    <template layout="block">
      <gh-sidebar>
        <gh-action slot="backdrop" href="${router.backUrl()}"></gh-action>
        <div layout="row content:flex-end padding:2">
          <gh-action href="${router.backUrl()}">
            <gh-icon-button type="settings" icon="close"></gh-icon-button>
          </gh-action>
        </div>

        <hr />

        <div layout="column gap margin:1:1.5" layout@768px="margin:1:2.5">
          <div layout="column gap">
            <gh-action
              href="https://${store.ready(user)
                ? 'account'
                : 'signon'}.ghostery.com"
            >
              <gh-sidebar-item icon="user">
                ${(store.ready(user) && user.name) || html`Sign in`}
              </gh-sidebar-item>
            </gh-action>
            <gh-action href="https://www.ghostery.com/support/">
              <gh-sidebar-item icon="feedback">Share feedback</gh-sidebar-item>
            </gh-action>
          </div>
        </div>

        <hr />

        <div layout="column gap margin:1:1.5" layout@768px="margin:1:2.5">
          <gh-action onclick="${toggle('searchbar')}">
            <gh-sidebar-item>
              Show Search Bar
              <gh-toggle
                slot="suffix"
                value="${settings.searchbar}"
              ></gh-toggle>
            </gh-sidebar-item>
          </gh-action>
          <gh-action onclick="${toggle('stats')}">
            <gh-sidebar-item>
              Show Ghostery Stats
              <gh-toggle slot="suffix" value="${settings.stats}"></gh-toggle>
            </gh-sidebar-item>
          </gh-action>
          <gh-action onclick="${toggle('sites')}">
            <gh-sidebar-item>
              Show Top Sites
              <gh-toggle slot="suffix" value="${settings.sites}"></gh-toggle>
            </gh-sidebar-item>
          </gh-action>
          <gh-action onclick="${toggle('privacyDigest')}">
            <gh-sidebar-item>
              Show Privacy Digest
              <gh-toggle
                slot="suffix"
                value="${settings.privacyDigest}"
              ></gh-toggle>
            </gh-sidebar-item>
          </gh-action>
        </div>

        <hr />

        <div layout="column gap margin:1:1.5" layout@768px="margin:1:2.5">
          <gh-action href="about:preferences">
            <gh-sidebar-item icon="settings">More settings</gh-sidebar-item>
          </gh-action>
        </div>
      </gh-sidebar>
    </template>
  `,
};
