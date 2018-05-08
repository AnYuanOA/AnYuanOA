// pages/apply/selectEmp/selectEmp.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyInfo: null,
    operation: null,
    selEmps: null,
    selectedAppFieldName: null,
    pickAry: ['文书员', '测试', 'AAAA'],
    pickidx: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      flowVersion: options.flowVersion,
      buttonId: options.buttonId,
      appID: options.appID,
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
            operation: res.data.data.operation
          })
        }
      }
    })
    if (that.data.buttonId != 9) {
      wx.request({
        url: app.globalData.hostUrl + '/workflow/getAcceptUserList',
        header: app.globalData.header,
        data: {
          buttonId: options.buttonId,
          workflowName: options.workflowName,
          currentStepId: options.currentStepId,
          flowVersion: options.flowVersion,
          isNewFlag: 0,
          appID: that.data.appID
        },
        success: function (res) {
          that.setData({
            selEmps: res.data.data.acceptUserInfo,
            selStep: res.data.data
          })
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

  radioChange: function (e) {
    var that = this
    var currentAppFieldName = e.detail.value
    that.setData({
      selectedAppFieldName: e.detail.value
    })
    // console.log('radio发生change事件，value值为：', e.detail.value)
  },

  handSubbmit: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定提交吗？',
      success: function (res) {
        if (res.confirm) {
          app.showLoadToast('处理中...');
          var button = null;
          for(var i=0; i<that.data.operation.appButton.length; i++){
            var btn = that.data.operation.appButton[i]
            if(btn.buttonId == that.data.buttonId){
              button = btn
              break
            }
          }
          wx.request({
            url: app.globalData.hostUrl + '/workflow/processWorkflow',
            header: app.globalData.header,
            method: 'POST',
            data: {
              operationButton: JSON.stringify(button),
              workflowTitle: that.data.applyInfo.detail.workflowTitle,
              workflowName: that.data.applyInfo.detail.workflowTemplateID,
              oaSPID: that.data.applyInfo.detail.in_sp_id,
              appOId: that.data.applyInfo.detail.buzPKID,
              currentStepId: that.data.operation.httAppDID,
              appFieldName: that.data.selectedAppFieldName,
              flowVersion: that.data.flowVersion,
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
  },
  listenerPickerSelected: function () {

  }
})