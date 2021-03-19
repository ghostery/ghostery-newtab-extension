import PrivacyStats from './models/privacy-stats.js';
import { fromTrackersToChartData } from './wtm-utils.js';

const { html, store } = hybrids;

function togglePopup(host) {
  host.showPopup = !host.showPopup;
}

function closePopup(host) {
  host.showPopup = false;
}

export default {
  privacyStats: store(PrivacyStats),

  chartData: ({ privacyStats }) => {
    const { arcs, sum } = fromTrackersToChartData(store.ready(privacyStats) ? privacyStats.trackers : []);
    return { arcs, sum };
  },

  showPopup: false,

  render: ({ chartData, showPopup }) => html`
    <style>
      .wtm-widget {
        position: relative;
      }
      wtm-chart {
        cursor: pointer;
      }
    </style>
    <div class="wtm-widget">
      <wtm-chart chartData=${chartData} onclick="${togglePopup}"></wtm-chart>
      ${showPopup && html`
        <wtm-popup chartData=${chartData} onhide="${closePopup}"></wtm-popup>
      `}
    </div>
  `,
}