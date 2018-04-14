// pages/workflow/detail.js
const WebService = require("../../services/webservice.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noData: false,
    userInfo: null,
    pageType: null,
    appID: null,
    applyInfo: null,
    operation: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo,
      pageType: options.pageType,
      appID: options.appID,
      workflowName: options.workflowName
    })
    wx.request({
      url: app.globalData.hostUrl + '/workflow/getToDoDetail',
      header: app.globalData.header,
      data: {
        appID: options.appID,
        workflowName: options.workflowName
      },
      success: function (res) {
        // console.log(res.data)
        if (res.data.code == 200) {
          that.setData({
            applyInfo: res.data.data,
            operation: res.data.data.operation,
          })
        } else {
          that.setData({
            noData: true
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
   * 审批下一步
   */
  approvePass: function (event) {
    var that = this
    var buttonId = that.data.operation.appButton[event.currentTarget.dataset.index].buttonId
    wx.navigateTo({
      url: '/pages/workflow/selectEmp/selectEmp?appID=' + that.data.appID + '&buttonId=' + buttonId + '&workflowName=' + that.data.workflowName + '&currentStepId=' + that.data.operation.httAppDID + '&flowVersion=' + that.data.operation.flowVersion
    })
    // var that = this
    // wx.navigateTo({
    //   url: '/pages/workflow/selectEmp/selectEmp?appID=' + that.data.appID + '&buttonId=' + that.data.operation.appButton[1].buttonId + '&workflowName=' + that.data.workflowName + '&currentStepId=' + that.data.operation.httAppDID + '&flowVersion=' + that.data.operation.flowVersion
    // })
  },

  /**
   * 审批退回
   */
  approveReject: function () {
    var that = this
    if (that.data.operation.appButton[0].buttonId == 5){
      wx.navigateTo({
        url: '/pages/workflow/selectNode/selectNode?appID=' + that.data.appID + '&buttonId=' + that.data.operation.appButton[0].buttonId + '&workflowName=' + that.data.workflowName + '&flowVersion=' + that.data.operation.flowVersion
      })
    }else {//结束
      wx.navigateTo({
        url: '/pages/workflow/selectEmp/selectEmp?appID=' + that.data.appID + '&buttonId=' + that.data.operation.appButton[0].buttonId + '&workflowName=' + that.data.workflowName + '&currentStepId=' + that.data.operation.httAppDID + '&flowVersion=' + that.data.operation.flowVersion
      })
    }
  }
})