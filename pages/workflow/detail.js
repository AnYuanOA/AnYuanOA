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
      appID: options.appID
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
  approvePass: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定审批吗？',
      success: function (res) {
        if (res.confirm) {
          app.showLoadToast('提交中...');
          wx.request({
            url: app.globalData.hostUrl + '/workflow/processWorkflow',
            header: app.globalData.header,
            method: 'POST',
            data: {
              operationButton: JSON.stringify(that.data.operation.appButton[1]),
              workflowTitle: that.data.applyInfo.detail.workflowTitle,
              workflowName: that.data.applyInfo.detail.workflowTemplateID,
              oaSPID: that.data.applyInfo.detail.in_sp_id,
              appOId: that.data.applyInfo.detail.buzPKID,
              currentStepId: that.data.operation.httAppDID
            },
            success: function (res) {
              wx.hideToast();
              if (res.data.code == 200) {
                wx.navigateBack({
                  delta: 1
                })
                wx.showToast({
                  title: '审批成功'
                })
              } else {
                app.showErrorModal('提示', res.data.message)
              }
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  /**
   * 审批退回
   */
  approveReject: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定退回吗？',
      success: function (res) {
        if (res.confirm) {
          app.showLoadToast('提交中...');
          wx.request({
            url: app.globalData.hostUrl + '/workflow/processWorkflow',
            header: app.globalData.header,
            method: 'POST',
            data: {
              operationButton: JSON.stringify(that.data.operation.appButton[0]),
              workflowTitle: that.data.applyInfo.detail.workflowTitle,
              workflowName: that.data.applyInfo.detail.workflowTemplateID,
              oaSPID: that.data.applyInfo.detail.in_sp_id,
              appOId: that.data.applyInfo.detail.buzPKID,
              currentStepId: that.data.operation.httAppDID
            },
            success: function (res) {
              wx.hideToast();
              if (res.data.code == 200) {
                wx.navigateBack({
                  delta: 1
                })
                wx.showToast({
                  title: '退回成功'
                })
              } else {
                app.showErrorModal('提示', res.data.message)
              }
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  }
})