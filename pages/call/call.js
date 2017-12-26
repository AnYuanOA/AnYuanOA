

// 获取全局应用程序实例对象
const app = getApp();

if (typeof seekCall == "undefined") {
  var seekCall = {}
  seekCall.notRead = 1//未阅
  seekCall.collect = 2//收藏
  seekCall.sent = 3//已发
  seekCall.received = 4//已收
}

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "message",
  /**
   * 页面的初始数据
   */

  data: {
    showType: seekCall.notRead


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },


  //以下为自定义点击事件

  tap_notRead: function (e) {

    if (this.data.seekCall != seekCall.notRead) {
      this.setData({
        showType: seekCall.notRead
      });
    }


  },

  tap_collect: function (e) {
    if (this.data.seekCall != seekCall.collect) {
      this.setData({
        showType: seekCall.collect

      });
    }

  },

  tap_sent: function (e) {
    if (this.data.seekCall != seekCall.sent) {
      this.setData({
        showType: seekCall.sent
      });
    }

  },

  tap_received: function (e) {
    if (this.data.seekCall != seekCall.received) {
      this.setData({
        showType: seekCall.received
      });
    }
  },


  tap_forward: function (e) {

    wx.navigateTo({
      url: '../callEdit/callEdit'
    })


  },

})

