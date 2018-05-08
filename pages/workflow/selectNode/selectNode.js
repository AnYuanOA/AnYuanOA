// pages/workflow/selectNode/selectNode.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyInfo: null,
    operation: null,
    nodeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      workflowName: options.workflowName,
      appID: options.appID,
      flowVersion: options.flowVersion,
      buttonId: options.buttonId,
      appContent: options.appContent
    })
    wx.request({
      url: app.globalData.hostUrl + '/workflow/getToDoDetail',
      header: app.globalData.header,
      data: {
        appID: options.appID,
        workflowName: options.workflowName,
        flowVersion: options.flowVersion
      },
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            applyInfo: res.data.data,
            operation: res.data.data.operation,
          })
        }
      }
    })
    wx.request({
      url: app.globalData.hostUrl + '/workflow/getStepList',
      header: app.globalData.header,
      data: {
        buttonId: options.buttonId,
        workflowName: options.workflowName,
        appID: options.appID,
        flowVersion: options.flowVersion
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          nodeList: res.data.data
        })
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
    var id = e.currentTarget.id
    var list = this.data.nodeList;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].nextStepID == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      nodeList: list
    });
  },

  handReBack: function (e) {
    var tmp = e.currentTarget.id
    var tmpArr = tmp.split("@")
    var appFieldName = tmpArr[0]
    var targetStepID = tmpArr[1]
    console.log(appFieldName)
    console.log(targetStepID)
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定退回至该节点吗？',
      success: function (res) {
        if (res.confirm) {
          app.showLoadToast('处理中...');
          wx.request({
            url: app.globalData.hostUrl + '/workflow/processWorkflow',
            header: app.globalData.header,
            method: 'POST',
            data: {
              operationButton: JSON.stringify(that.data.operation.appButton[0]),
              workflowTitle: that.data.applyInfo.detail.workflowTitle,
              workflowName: that.data.workflowName,
              oaSPID: that.data.applyInfo.detail.in_sp_id,
              appOId: that.data.applyInfo.detail.buzPKID,
              currentStepId: that.data.operation.httAppDID,
              appFieldName: appFieldName,
              flowVersion: that.data.flowVersion,
              targetStepID: targetStepID,
              appContent: that.data.appContent
            },
            success: function (res) {
              wx.hideToast();
              if (res.data.code == 200) {
                wx.reLaunch({
                  url: '/pages/todo/todo',
                })
                wx.showToast({
                  title: '处理成功'
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