import { define, html, store } from '../../libs/hybrids/index.js';

import PrivacyStats from '../models/privacy-stats.js';
import { fromTrackersToChartData } from '../utils/wtm-utils.js';

function togglePopup(host) {
  if (host.chartData.sum === 0) {
    return;
  }
  host.showPopup = !host.showPopup;
}

function closePopup(host) {
  host.showPopup = false;
}

export default define({
  tag: 'wtm-widget',
  privacyStats: store(PrivacyStats),

  chartData: ({ privacyStats }) => {
    const { arcs, sum } = fromTrackersToChartData(store.ready(privacyStats) ? privacyStats.trackers : []);
    return { arcs, sum };
  },

  showPopup: false,

  render: ({ chartData, showPopup }) => html`
    <div class="wtm-widget">
      <wtm-chart chartData=${chartData} onclick="${togglePopup}"></wtm-chart>
      ${showPopup && html`
        <wtm-popup chartData=${chartData} onhide="${closePopup}"></wtm-popup>
      `}
    </div>
  `.css`
    .wtm-widget {
      position: relative;
    }
    wtm-chart {
      --header: white;
      cursor: ${chartData.sum > 0 ? 'pointer' : 'auto'};
    }
  `,
});
