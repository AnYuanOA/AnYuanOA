// pages/plan/planDetail/planDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planType:null,
    planData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      planType: options.type
    })
    var requestUrl=null
    switch (options.type) {
      case "1":
        requestUrl = app.globalData.hostUrl + '/plan/ayxzYearPlan';
        break;
      case "2":
        requestUrl = app.globalData.hostUrl + '/plan/ayxzMonthPlan';
        break;
      case "3":
        requestUrl = app.globalData.hostUrl + '/plan/ayxzWeekPlan';
        break;
      case "4":
        requestUrl = app.globalData.hostUrl + '/plan/ayxzSelfWork';
      default:
        break
    }
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      success: function (res) {
        if (res.data.code == 500) {
          wx.redirectTo({
            url: '/pages/noAccess/noAccess',
          })
        } else {
          if (res.data.data <= 0) {
            that.setData({
              noData: true
            })
          } else {
            that.setData({
              planData: res.data.data
            })
          }
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

  },

  // 展示详情
  slideDetail: function (e) {
    var id = e.currentTarget.id,
    list = this.data.planData;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].op05Id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      planData: list
    });
  }
})