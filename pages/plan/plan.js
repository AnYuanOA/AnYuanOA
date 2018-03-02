// pages/plan/plan.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noData: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.hostUrl + '/plan/reportPlan',
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
            var windowWidth = 320;
            try {
              var resSync = wx.getSystemInfoSync();
              windowWidth = resSync.windowWidth;
            } catch (e) {
              console.error('getSystemInfoSync failed!');
            }
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
              series: [{
                name: '年度计划',
                data: res.data.NJH
              }, {
                name: '季度计划',
                data: 0
              }, {
                name: '月度计划',
                data: res.data.YJH
              }, {
                name: '周计划',
                data: res.data.ZWC
              }],
              width: windowWidth,
              height: 210,
              dataLabel: true,
            });
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

  openQuartDetail:function(){
    wx.showToast({
      title: '暂无季度计划'
    })
  }
})