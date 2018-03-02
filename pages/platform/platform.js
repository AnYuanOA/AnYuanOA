// pages/platform/platform.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsTypes: null,
    bgItems: [
      {
        title: '动态看板',
        navigator: '/pages/board/board',
        icon: '/images/platform/icon_kanban.png',
        bgcolor: '#00cc00'
      },
      {
        title: '计划查看',
        navigator: '/pages/plan/plan',
        icon: '/images/platform/icon_jihua.png',
        bgcolor: '#fe4466'
      },
      // {
      //   title: '任务',
      //   navigator: '../apply/dayApply/dayApply',
      //   icon: '/images/platform/icon_renwu.png',
      //   bgcolor: '#00cc00'
      // },
      // {
      //   title: '事项',
      //   navigator: '/pages/apply/apply',
      //   icon: '/images/platform/icon_shixiang.png',
      //   bgcolor: '#ec89ec'
      // }
    ],
    lcItems: [{
      title: '流程申请',
      navigator: '/pages/apply/newApply/newApply',
      icon: '/images/platform/icon_shenqing.png',
      bgcolor: '#f1c232'
    },
    {
      title: '待办待阅',
      navigator: '/pages/todo/todo',
      icon: '/images/platform/icon_shenpi.png',
      bgcolor: '#6d9eeb'
    }
      // ,
      // {
      //   title: '报销',
      //   navigator: '/pages/feeApp/feeApp',
      //   icon: '/images/platform/icon_baoxiao.png',
      //   bgcolor: '#4bbdfa'
      // }
    ],
    gjItems: [{
      title: '点子墙',
      navigator: '../todo/todo',
      icon: '/images/platform/icon_dianzi.png',
      bgcolor: '#54adf4'
    },
    {
      title: '日历',
      navigator: '../plan/plan',
      icon: '/images/platform/icon_rili.png',
      bgcolor: '#ffa3a3'
    }, {
      title: '计时器',
      navigator: '../todo/todo',
      icon: '/images/platform/icon_jishiqi.png',
      bgcolor: '#f1c232'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.hostUrl + '/news/getMessageTypeList',
      header: app.globalData.header,
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            newsTypes: res.data.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})