// pages/emp/emp.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    list: [
      {
        id: '1',
        name: '张三',
        zw:'董事长'
      }, {
        id: '2',
        name: '王五',
        zw: '主任'
      }, {
        id: '3',
        name: '招式',
        zw: '副主任'
      }, {
        id: '4',
        name: '马云',
        zw: '干事'
      }, {
        id: '5',
        name: '马化腾',
        zw: '职员'
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
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
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  call: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../call/call?id=' + id
    })
  }
})