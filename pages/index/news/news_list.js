// pages/index/news/news_list.js
const service = require("../../../services/oldServerService.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerHeight: 300
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = wx.getSystemInfoSync()
    console.log(res.model)
    console.log(res.pixelRatio)
    console.log(res.windowWidth)
    console.log(res.windowHeight)
    console.log(res.language)
    console.log(res.version)
    console.log(res.platform)

    service.getTodoList({
      success: function (todoList){
        console.log(todoList)
      },
      fail: function (msg) {
        wx.showToast({
          title: msg
        })
      }
    })
  },

  toLogin: function () {
    // wx.redirectTo({
    //   url: '/pages/login/login'
    // })
    service.login({
      username: "ceshi1",
      password: "000000",
      succeed: function (res) {

      },
      failed: function (res) {

      }
    })
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