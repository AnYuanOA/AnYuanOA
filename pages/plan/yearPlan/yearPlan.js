// pages/plan/planDetail/planDetail.js
// var util = require('../../../utils/util.js');
var app = getApp();
var now = new Date();
var year = now.getFullYear();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: year,
    planData: [],
    pageNo: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    _that.setData({
      planData: [],
      pageNo: 1
    })
    var empNo = options.empNo;
    var requestUrl = app.globalData.hostUrl +"/plan/ayxzYearPlan";
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
        // console.log(res.data);
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
    var empNo = app.globalData.userInfo.userid;
    var requestUrl = app.globalData.hostUrl + "/plan/ayxzYearPlan";
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        empNo: empNo,
        year: _year,
        pageNo: Number(_pageNo) + 1,
        pageSize: 10
      },
      success: function (res) {
        wx.hideLoading();
        // console.log(res.data);
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
    var _that = this
    _that.setData({
      year: e.detail.value
    })
    wx.showLoading({
      title: '',
      mask: true
    })
    var empNo = app.globalData.userInfo.userid;
    var requestUrl = app.globalData.hostUrl + "/plan/ayxzYearPlan";
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        empNo: empNo,
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