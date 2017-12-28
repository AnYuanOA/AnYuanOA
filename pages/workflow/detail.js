// pages/workflow/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opinionInfo:{
      title:"意见",
      type:"input",
      placeholder:"请输入您的意见"
    },
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    }else{
      var that = this;
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          that.setData({
            userInfo: userInfo
          })
          app.globalData.userInfo = userInfo;
        }
      })
    }
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
    this.setData({
      opinionInfo: {
        title: '意见',
        type: 'input',
        placeholder: '请输入您的意见'
      }
    })
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
   * 审批通过 
   */
  approvePass: function() {
    console.log("审批通过")
  },

  /**
   * 审批退回
   */
  approveReject: function() {
    console.log("审批退回")
  },

  // 输入框聚焦时触发
  handleZanFieldFocus({ componentId, detail }) { 
    console.log('input')
  },
  // 输入框失焦时触发
  handleZanFieldBlur({ componentId, detail }) {
    console.log('out')
   },
})