// pages/mine/mine.js
const app = getApp()
const WebService = require("../../services/webservice.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    selfUser: null,
    oldSelfUser:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })
    wx.request({
      url: app.globalData.hostUrl + '/user/getSelfUser',
      data: {
        openId: app.globalData.openId
      },
      header: app.globalData.header,
      success: function (res) {
        if (res.data.code == 500) {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        } else {
          if (!res.data.data) {
            that.setData({
              noData: true
            })
          } else {
            that.setData({
              selfUser: res.data.data
            })
          }
        }
      }
    })
    wx.request({
      url: app.globalData.hostUrl + '/user/getOldOAUserInfo',
      header: app.globalData.header,
      success: function (res) {
        if (res.data.code == 500) {
          wx.redirectTo({
            url: '/pages/noAccess/noAccess',
          })
        } else {
          that.setData({
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

  /**
   * 用户点击解除绑定
   */
  openclearmodal: function () {
    wx.showModal({
      title: '提示',
      content: '解除账号绑定同时将清除聊天记录等缓存，是否确认解除绑定？',
      success: function (res) {
        if (res.confirm) {
          app.showLoadToast('处理中...')
          WebService.logoutWithOpenId(app.globalData.openId, {
            success: function(){
              wx.hideToast()
              wx.clearStorage();
              wx.redirectTo({
                url: '/pages/login/login',
              })
            },
            fail: function(msg) {
              wx.hideToast()
              app.showErrorModal('提示', msg)
            }
          })
        }
      }
    })
  }
})