// pages/plan/planDetail/planDetail.js
// var util = require('../../../utils/util.js');
var app = getApp();
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var d1 = new Date();
var d2 = new Date();
d2.setMonth(0);
d2.setDate(1);
var rq = d1 - d2;
var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
var s2 = Math.ceil(s1 / 7);
var week = s2;
var weekArray = new Array();
for (var j = 1; j <= 52; j++) {
  var aryStr = '第' + j + '周';
  weekArray.push(aryStr);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickIdx: week - 1,
    weekArray: weekArray,
    format_week: '第' + week + '周',
    nowWeek: week,
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
    var empNo = app.globalData.userInfo.userid;
    var requestUrl = app.globalData.hostUrl +"/plan/ayxzWeekPlan";
    // var empNo = "jinher";
    // var requestUrl = "http://localhost:8080/web-service/plan/ayxzWeekPlan";
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        empNo: empNo,
        year: year,
        week: week,
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
    var _week = _that.data.nowWeek;
    var _pageNo = _that.data.pageNo;
    var _planData = _that.data.planData;
    var empNo = app.globalData.userInfo.userid;
    var requestUrl = app.globalData.hostUrl + "/plan/ayxzWeekPlan";
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        empNo: empNo,
        year: year,
        week: _week,
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
   * 监听选择周下拉框
   */
  listenerWeekPick: function (e) {
    var _that = this;
    var _idx = e.detail.value;
    var _ary = _that.data.weekArray;
    _that.setData({
      pickIdx: _idx,
      format_week: _ary[e.detail.value],
      nowWeek: Number(_idx) + 1
    });
    wx.showLoading({
      title: '',
      mask: true
    })
    var empNo = app.globalData.userInfo.userid;
    var requestUrl = app.globalData.hostUrl + "/plan/ayxzWeekPlan";
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        empNo: empNo,
        year: year,
        week: Number(_idx) + 1,
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