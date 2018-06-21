//logs.js
import dayjs from '../../lib/dayjs/dayjs.min.js';

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return dayjs();
      })
    })
  }
})
