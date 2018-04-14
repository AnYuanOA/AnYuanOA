// pages/apply/selectEmp/selectEmp.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selEmps:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: app.globalData.hostUrl + '/workflow/getAcceptUserList',
      header: app.globalData.header,
      data:{
        buttonId:'6',
        workflowName:'IHRM_AttendanceLeave',
        currentStepId:null
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          selEmps: res.data.data.acceptUserInfo
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

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})