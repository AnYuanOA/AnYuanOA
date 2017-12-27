// pages/workflow/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opinionInfo:{
      title:'意见',
      type:'input',
      placeholder:'请输入您的意见'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  // 输入框聚焦时触发
  handleZanFieldFocus({ componentId, detail }) { 
    console.log('input')
  },
  // 输入框失焦时触发
  handleZanFieldBlur({ componentId, detail }) {
    console.log('out')
   },
})