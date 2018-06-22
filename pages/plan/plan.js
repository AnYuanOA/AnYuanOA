// pages/plan/plan.js
var app = getApp();
var pieChart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noData: false,
    oldSelfUser: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that=this;
    wx.request({
      url: app.globalData.hostUrl + '/user/getOldOAUserInfo',
      header: app.globalData.header,
      success: function (res) {
        if (res.data.code == 200) {
          _that.setData({
            oldSelfUser: res.data.data
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

  },

  gotoPlanDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    var empNo = e.currentTarget.dataset.empno;
    var pageUrl = null;
    switch (index) {
      case "1":
        pageUrl = "/pages/plan/yearPlan/yearPlan?empNo=" + empNo;
        break;
      case "2":
        pageUrl = "/pages/plan/monthPlan/monthPlan?empNo=" + empNo;
        break;
      case "3":
        pageUrl = "/pages/plan/weekPlan/weekPlan?empNo=" + empNo;
        break;
      case "4":
        pageUrl = "/pages/plan/selfWork/selfWork?empNo=" + empNo;
      default:
        break
    }
    wx.navigateTo({
      url: pageUrl
    })
  }
})