import { define, html, store } from '../../libs/hybrids/index.js';

import PrivacyStats from '../models/privacy-stats.js';

export default define({
  tag: 'stats-box',
  i18n: '',
  value: {
    set(host, value) {
      if (typeof value === 'number') {
        value = new Intl.NumberFormat().format(value);
      }
      return value;
    }
  },
  render: ({ i18n, value }) => html`
    <div class="box">
      <main>
        <h3>${browser.i18n.getMessage('stats_header')}</h3>
        <span id="ads-blocked">${value}</span>
        <label>${i18n && browser.i18n.getMessage(i18n)}</label>
      </main>
      <wtm-widget />
    </div>
  `.css`
    :host {
      display: block;
    }

    .box {
      color: white;
      background:  linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.11) 100%);
      border-radius: 18px;
      padding: 20px 48px;
      margin-top: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 84px;
    }

    .box h3 {
      text-transform: uppercase;
      font-size: 13px;
      margin: 0;
      font-weight: normal;
      margin-bottom: 7px;
    }

    .box label {
      font-size: 19px;
      font-weight:  600;
      padding-bottom: 7px;
      line-height: 1.1;
    }

    .box span {
      font-size: 19px;
      font-weight: 600;
      margin-right: 3px;
      line-height: 1.1;
    }

    wtm-widget {
      padding-left: 15px;
    }
  `,
});

