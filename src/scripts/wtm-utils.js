// source https://github.com/cliqz/index-freshness/blob/1c3b30572ecd35b445149651cce9f41bf74f0bfb/services/eagle/serving/src/components/trackers/chart.js
// source https://github.com/cliqz/index-freshness/blob/17279d451e7909fecdb5471870b31267e86379c7/services/eagle/serving/src/components/trackers/TrackersChart.jsx#L107

const WTM_CATEGORY_COLORS = {
  advertising: '#cb55cd',
  audio_video_player: '#ef671e',
  cdn: '#43b7c5',
  customer_interaction: '#fdc257',
  essential: '#fc9734',
  misc: '#ecafc2',
  site_analytics: '#87d7ef',
  social_media: '#388ee8',
  hosting: '#e8e8e8',
  pornvertising: '#fb5b8b',
  extensions: '#e2e781',
  comments: '#b0a8ff',
  unknown: '#959595',
  default: '#ffffff30',
  no_tracker: '#94c59e',
};

const EXPECTED_CATEGORIES = [
  {
    id: 'advertising',
    name: 'Advertising',
  },
  {
    id: 'site_analytics',
    name: 'Site Analytics',
  },
  {
    id: 'cdn',
    name: 'Cdn',
  },
  {
    id: 'audio_video_player',
    name: 'Audio Video Player',
  },
  {
    id: 'misc',
    name: 'Misc',
  },
  {
    id: 'essential',
    name: 'Essential',
  },
  {
    id: 'social_media',
    name: 'Social Media',
  },
  {
    id: 'hosting',
    name: 'Hosting',
  },
  {
    id: 'customer_interaction',
    name: 'Customer Interaction',
  },
  {
    id: 'pornvertising',
    name: 'Pornvertising',
  },
  {
    id: 'extensions',
    name: 'Extensions',
  },
  {
    id: 'comments',
    name: 'Comments',
  },
  {
    id: 'unknown',
    name: 'Unknown',
  },
];

function fromTrackersToChartData(allTrackers) {
  const expectedCategories = new Set(EXPECTED_CATEGORIES.map(c => c.id));
  const numTotal = {};
  allTrackers
    .filter(t => expectedCategories.has(t.cat))
    .forEach(t => {
      if (numTotal[t.cat] === undefined) {
        numTotal[t.cat] = 0;
      }
      numTotal[t.cat] += 1;
    });
  const trackers = EXPECTED_CATEGORIES
    .map(c => ({
      ...c,
      numTotal: numTotal[c.id],
    }))
    .filter(c => c.numTotal);

  if (!trackers.length) {
    return {
      sum: 0,
      arcs: [
        { start: 0, end: 360, categoryId: 'default' }
      ],
    };
  }

  const arcs = [];
  let startAngle = 0;

  const sum = trackers
    .map((tracker) => tracker.numTotal)
    .reduce((a, b) => a + b, 0);

  if (sum === 0) {
    return {
      sum,
      arcs,
    };
  }

  for (let i = 0; i < trackers.length; i += 1) {
    const endAngle = startAngle + (trackers[i].numTotal * 360) / sum;

    arcs.push({
      start: startAngle,
      end: endAngle,
      categoryId: trackers[i].id,
      categoryName: trackers[i].name,
      count: trackers[i].numTotal,
    });

    startAngle = endAngle;
  }

  return {
    sum,
    arcs,
  };
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);
  const length = endAngle - startAngle;

  const largeArcFlag = length <= 180 ? '0' : '1';

  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    1,
    end.x,
    end.y,
  ].join(' ');

  return { d, length };
}

export {
  fromTrackersToChartData,
  describeArc,
  WTM_CATEGORY_COLORS,
}
