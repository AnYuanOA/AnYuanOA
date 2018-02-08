// pages/apply/carApply/carApply.js
var date = new Date();
//年  
var Y = date.getFullYear();
//月  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//日  
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
var now = Y + '-' + M + '-' + D;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showType: 1,
    attltArray: ['事假', '病假', '年假', '产假', '调休假'],
    attltIndex: 0,
    restStartDate: now,
    startType: ['上午', '下午'],
    startIndex: 0,
    restEndDate: now,
    endType: ['上午', '下午'],
    endIndex: 0,
    isOverTime: ['否', '是'],
    isOverTimeIdx: 0,
    items: [
      { name: '市内', checked: true },
      { name: '市外', checked: false }
    ]
  },

  /**
   * 监听休假类型picker选择器
   */
  listenerPickerSelectedAttlt: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      attltIndex: e.detail.value
    });
  },

  /**
   * 监听开始日期picker选择器
   */
  listenerDatePickerSelectedStartDate: function (e) {
    this.setData({
      restStartDate: e.detail.value
    })
  },

  listenerPickerSelectedStartType: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      startIndex: e.detail.value
    });
  },


  /**
   * 监听结束日期picker选择器
   */
  listenerDatePickerSelectedEndDate: function (e) {
    this.setData({
      restEndDate: e.detail.value
    })
  },

  listenerDatePickerSelectedEndType: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      endIndex: e.detail.value
    });
  },


  listenerPickerSelectedIsOverTime: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      isOverTimeIdx: e.detail.value
    });
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

  /**
   * tab页签切换
   */
  tabSwitchDay: function (e) {
    if (this.data.showType != 1) {
      this.setData({
        showType: 1
      });
    }
  },
  tabSwitchCar: function (e) {
    if (this.data.showType != 2) {
      this.setData({
        showType: 2
      });
    }
  }
})