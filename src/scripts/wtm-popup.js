import ChartData from './models/chart-data.js';
import { WTM_CATEGORY_COLORS } from './wtm-utils.js';


const { html, dispatch } = hybrids;

function hide(host) {
  dispatch(host, "hide");
}

const closeIcon = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
`;

export default {
  chartData: ChartData,

  render: ({ chartData }) => html`
    <div class="wtm-popup" >
      <div class="wrapper">
        <div class="header">
          <h3>Total tracking entities</h3>
          <a class="close" onclick="${hide}">${closeIcon}</a>
        </div>
        <p class="domain">Grouped by categories</p>
        <div class="details">
          <wtm-chart chartData=${chartData}></wtm-chart>
          <div class="legend">
            <ul>
              ${chartData.arcs.map(arc => html`
                <li>
                  <span class="color" style="${{ "background-color": WTM_CATEGORY_COLORS[arc.categoryId] }}"></span>
                  <span class="category">${arc.categoryName}</span>
                  <span class="count">${arc.count}</span>
                </li>
              `)}
            </ul>
          </div>
        </div>

        <div class="report">
          <a href="https://whotracks.me/" target="_blank">Statistical report ›</a>
        </div>
      </div>

    </div>
    <style>
      .wtm-popup {
        position: absolute;
        left: calc(350px / -2 + 50%);
        bottom: calc(100% + 15px);
        z-index: 1;
      }

      .wtm-popup::before {
        content: '';
        position: absolute;
        left: calc(50% - 8px);
        bottom: -5px;
        display: inline-block;
        width: 16px;
        height: 16px;
        background-color: var(--footer-background);;
        transform: rotate(45deg);
      }

      .wtm-popup .wrapper {
        background-color: var(--footer-background);
        border-radius: 14px;
        width: 350px;
        -webkit-box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.15);
        box-shadow: 0px 10px 15px 0px rgba(0,0,0,0.15);
      }

      .wtm-popup:target {
        display: block;
      }

      .wtm-popup .header {
        color: white;
        margin: 0;
        padding: 15px 20px 0 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      .wtm-popup .header h3 {
        display: flex;
        flex-grow: 1;
        margin: 0;
        padding: 0;
        font-size: 20px;
        font-weight: 500;
      }

      .wtm-popup .header .close:hover {
        color: white;
      }

      .wtm-popup .header .close {
        text-decoration: none;
        color: #8185AA;
        width: 14px;
        height: 14px;
        cursor: pointer;
      }

      .wtm-popup .domain {
        display: inline-block;
        margin: 0;
        padding: 0 20px;
        font-style: normal;
        background: linear-gradient(to right, #72b643, var(--link));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .wtm-popup .details {
        padding: 20px;
        display: flex;
        flex-direction: row;
      }

      .wtm-popup .legend {
        display: flex;
        flex-grow: 1;
      }

      .wtm-popup .legend ul {
        margin: 0;
        padding: 0;
        width: 100%;
      }

      .wtm-popup .legend li {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: center;
        font-size: 11.5px;
        font-weight: 500;
        color: #8A9297;
        margin: 5px 0;
      }

      .wtm-popup .legend li .color {
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: red;
        border-radius: 6px;
        margin-right: 5px;
      }

      .wtm-popup .legend li .category {
        flex-grow: 0;
        white-space: nowrap;
        flex-shrink: 1;
      }

      .wtm-popup .legend li .count {
        color: white;
        margin-left: 5px;
      }

      wtm-chart {
        position: relative;
        width: 140px;
        margin-right: 30px;
        display: flex;
        flex-grow: 0;
        flex-shrink: 1;
      }

      .wtm-popup .report {
        border-top: 1px solid #454545;
        padding: 15px 20px;
      }

      .wtm-popup .report a {
        text-decoration: none;
        color: var(--link);
        font-size: 16px;
      }

      .wtm-popup .report a:visited {
        color: var(--link);
      }
    </style>
  `,
}