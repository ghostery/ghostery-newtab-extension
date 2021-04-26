import { WTM_CATEGORY_COLORS, describeArc } from '../utils/wtm-utils.js';

const { svg, html } = hybrids;

function formatBigNumber(num)  {
  const options = {
    'number': num,
    'billion': {
      'decimal': 1,
      'unit': 'B',
    },
    'million': {
      'decimal': 1,
      'unit': 'M',
    },
    'thousand': {
      'decimal': 1,
      'unit': 'K',
    },
  };
  let number = Math.abs(Number(options.number));

  // Nine zeros for Billions
  if (Number(number) >= 1.0e+9) {
    return (number / 1.0e+9).toFixed(options.billion.decimal) + `${options.billion.unit}`;
  }

  // Six zeros for Millions
  if (Number(number) >= 1.0e+6) {
    return (number / 1.0e+6).toFixed(options.million.decimal) + `${options.million.unit}`;
  }

  // Thrhee zeros for Thousands
  if (Number(number) >= 1.0e+3) {
    return (number / 1.0e+3).toFixed(options.thousand.decimal) + `${options.thousand.unit}`;
  }

  return number;
}

export default {
  chartData: null,

  render: ({ chartData }) => html`
    <style>
      .chart {
        position: relative;
        width: 84px;
        display: flex;
        flex-grow: 0;
        flex-shrink: 1;
      }

      .count {
        font-size: 15px;
        color: var(--header);
        font-weight: 600;
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
    <div class="chart">
      <svg
        id='circle'
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        width='100%'
        height='100%'
        viewBox='-20 -20 240 240'
      >
        <g
          fill='none'
          stroke-width='38'
          style="transform: translate(100px, 100px);"
        >
          ${html`${chartData.arcs.map((arc) => {
            const { d, length } = describeArc(0, 0, 100, arc.start, arc.end === 360 ? 359.9999 : arc.end);
            return svg`
              <path
                d="${d}"
                pathLength="${length}"
                style="stroke-dashoffset: 0; stroke-dasharray: 1000; stroke: ${WTM_CATEGORY_COLORS[arc.categoryId]};"
              >
                <title>${arc.count}</title>
              </path>
            `;
          })}`}
        </g>
      </svg>
      <span class="count">${formatBigNumber(chartData.sum)}</span>
    </div>
  `,
};