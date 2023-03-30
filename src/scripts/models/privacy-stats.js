import { store } from '../../libs/hybrids/index.js';

import { getDashboardStats } from '../utils/gbe.js';



export default {
  trackers: [{ cat: "", name: "" }],
  adsBlocked: 0,
  trackersBlocked: 0,
  timeSaved: 0,
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
      } = await getDashboardStats();
      const dataPointsAnonymized = cookiesBlocked + fingerprintsRemoved;
      return {
        adsBlocked,
        trackersBlocked,
        timeSaved,
        dataPointsAnonymized,
        trackers: trackersDetailed,
      };
    }
  }
};
