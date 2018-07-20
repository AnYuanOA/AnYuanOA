// pages/plan/planDetail/planDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opId: null,
    opType: null,
    planDetail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var opId = options.opId;
    var opType = options.opType;
    var that = this
    that.setData({
      opId: opId,
      opType: opType
    })
    var requestUrl = app.globalData.hostUrl + '/plan/ayxzGetPlanWorkDetail';
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        opId: opId,
        opType: opType
      },
      success: function(res) {
        if (res.data.code == 200) {
          that.setData({
            planDetail: res.data.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 工作进度输入框输入事件
   */
  detailMemoInput: function(e) {
    var _that = this;
    var _inputValue = e.detail.value;
    var _planDetail = _that.data.planDetail;
    _planDetail.memo = _inputValue;
    this.setData({
      planDetail: _planDetail
    });
  },

  /**
   * 提交
   */
  submitPlanDetail: function() {
    wx.showModal({
      title: '提示',
      content: '是否确定提交修改？',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中...',
            mask: true
          })
          wx.request({
            url: app.globalData.hostUrl + "/plan/ayxzUpdateSelfWork",
            header: app.globalData.header,
            data: this.data.planDetail,
            success: function(res) {
              wx.hideLoading();
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 1000
              })
              if (res.data.code == 200) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})