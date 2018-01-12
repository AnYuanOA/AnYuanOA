// pages/organize/organize.js
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
        name: '领导层',
      }, {
        id: '2',
        name: '安全事业部',
      }, {
        id: '3',
        name: '环境事业部',
      }, {
        id: '4',
        name: '综合管理部',
      }, {
        id: '5',
        name: '市场部',
      }
      
    ],
    searchList: [
      {
        id: '1',
        name: '张三',
      }, {
        id: '2',
        name: '王五',
      }, {
        id: '3',
        name: '赵三四',
      }, {
        id: '4',
        name: '综合管理部',
      }, {
        id: '5',
        name: '市场部',
      }

    ]
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
  emp: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../emp/emp?id=' + id
    }) 
  }
})