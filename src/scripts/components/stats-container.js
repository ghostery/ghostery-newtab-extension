import { define, html, store } from '../../libs/hybrids/index.js';
import PrivacyStats from '../models/privacy-stats.js';
import { formatTime } from '../utils/time.js';

export default define({
  tag: 'stats-container',
  stats: store(PrivacyStats),
  content: ({ stats }) => html`
    <template layout="block">
      ${store.ready(stats) && html`
        <tab-group id="privacy-stats" hidden>
          ${!!stats.adsBlocked && html`
            <tab-item>
              <stats-box
                i18n="stats_ads_blocked"
                value="${stats.adsBlocked}"
              ></stats-box>
            </tab-item>
          `}
          ${!!stats.trackersBlocked && html`
            <tab-item>
              <stats-box
                i18n="stats_trackers_blocked"
                value="${stats.trackersBlocked}"
              ></stats-box>
            </tab-item>
          `}
          ${!!stats.timeSaved && html`
            <tab-item>
              <stats-box
                i18n="stats_time_saved"
                value="${formatTime(stats.timeSaved)}"
              ></stats-box>
            </tab-item>
          `}
          ${!!stats.dataPointsAnonymized && html`
            <tab-item>
              <stats-box
                i18n="stats_data_anonymized"
                value="${stats.dataPointsAnonymized}"
              ></stats-box>
            </tab-item>
          `}
        </tab-group>
      `}
    </template>
  `,
})
