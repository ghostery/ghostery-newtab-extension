const { store } = hybrids

const Tracker = {
  cat: "",
  name: "",
};

const PrivacyStats = {
  trackers: [Tracker],
  adsBlocked: 0,
  trackersBlocked: 0,
  timeSaved: '',
  dataPointsAnonymized: 0,

  [store.connect] : {
    async get() {
      const {
        adsBlocked,
        trackersBlocked,
        timeSaved,
        cookiesBlocked,
        fingerprintsRemoved,
        trackersDetailed,
      } = await browser.runtime.sendMessage('firefox@ghostery.com', { name: 'getDashboardStats' });
      const dataPointsAnonymized = cookiesBlocked + fingerprintsRemoved;
      return {
        adsBlocked,
        trackersBlocked,
        timeSaved: formatTime(timeSaved),
        dataPointsAnonymized,
        trackers: trackersDetailed,
      };
    }
  }
};

const parseTime = (ms) => {
  const s = Math.floor(ms / 1000);
  return {
    h: Math.floor(s / 3600),
    m: Math.floor(s / 60) % 60,
    s: s % 60,
  };
};

const formatTime = (ms) => {
  if (!ms) { return `0 s`; }

  const time = parseTime(ms);
  let res = '';

  res = time.h > 0 ? `${time.h} h` : '';
  res += time.m > 0 ? ` ${time.m} m` : '';
  if (res === '') {
    res = `${time.s} s`;
  }
  return res.trim();
};

export default PrivacyStats;