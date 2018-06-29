// pages/plan/planDetail/planDetail.js
// var util = require('../../../utils/util.js');
var app = getApp();
var now = new Date();
var year = now.getFullYear();
var startYear = Number(year) - 5;
var endYear = Number(year) + 5;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startYear: startYear,
    endYear: endYear,
    year: year,
    planData: [],
    pageNo: 1,
    empNo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var empNo = options.empNo;
    var _that = this;
    _that.setData({
      planData: [],
      pageNo: 1,
      empNo: empNo
    })
    var requestUrl = app.globalData.hostUrl + "/plan/ayxzYearPlan";
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        empNo: empNo,
        year: year,
        pageNo: 1,
        pageSize: 10
      },
      success: function (res) {
        if (res.data.code == 200) {
          _that.setData({
            planData: res.data.data
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
    //上拉触底时加载更多
    wx.showLoading({
      title: '',
      mask: true
    })
    var _that = this;
    var _year = _that.data.year;
    var _pageNo = _that.data.pageNo;
    var _planData = _that.data.planData;
    var _empNo = _that.data.empNo;
    var requestUrl = app.globalData.hostUrl + "/plan/ayxzYearPlan";
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        empNo: _empNo,
        year: _year,
        pageNo: Number(_pageNo) + 1,
        pageSize: 10
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 200 && res.data.data && res.data.data.length > 0) {
          var _newData = res.data.data;
          _that.setData({
            pageNo: Number(_pageNo) + 1
          })
          for (var i = 0, i_len = _newData.length; i < i_len; ++i) {
            _planData.splice(_planData.length, 0, _newData[i])
          }
          _that.setData({
            planData: _planData
          })
        } else {
          wx.showToast({
            title: '无更多记录！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 展示详情
  slideDetail: function (e) {
    var id = e.currentTarget.id,
      list = this.data.planData;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].opId == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      planData: list
    });
  },

  /**
   * 监听年选择器
   */
  listenerYearPick: function (e) {
    console.log(e.detail.value);
    var _that = this
    _that.setData({
      year: e.detail.value
    })
    wx.showLoading({
      title: '',
      mask: true
    })
    var _empNo = _that.data.empNo;
    var requestUrl = app.globalData.hostUrl + "/plan/ayxzYearPlan";
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        empNo: _empNo,
        year: e.detail.value,
        pageNo: 1,
        pageSize: 10
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          _that.setData({
            planData: res.data.data,
            pageNo: 1
          })
        }
      }
    })
  }
})