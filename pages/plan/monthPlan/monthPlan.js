// pages/plan/planDetail/planDetail.js

import dayjs from '../../../lib/dayjs/dayjs.min.js';

var app = getApp();
const format_month = dayjs().format('YYYY-MM');
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    format_month: format_month,
    planData: [],
    pageNo: 1,
    empNo: null,
    opnos: [{
      key: 'OP00',
      value: '全部类别'
    }],
    selIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var empNo = options.empNo;
    var _that = this;
    _that.setData({
      planData: [],
      pageNo: 1,
      empNo: empNo
    })
    var requestUrl = app.globalData.hostUrl + "/plan/ayxzMonthPlan";
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        empNo: empNo,
        year: year,
        month: month,
        opno: null,
        pageNo: 1,
        pageSize: 10
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            planData: res.data.data
          })
        }
      }
    })
    //初始化工作类别
    wx.request({
      url: app.globalData.hostUrl + "/plan/ayxzConverDiction",
      header: app.globalData.header,
      data: {
        type: 'OPNO'
      },
      success: function(res) {
        if (res.data.code == 200) {
          if (res.data.data.length > 0) {
            var _opnos = res.data.data;
            _opnos.splice(0, 0, {
              key: 'OP00',
              value: '全部类别'
            });
            _that.setData({
              opnos: _opnos
            })
          } else {
            _that.setData({
              opnos: {
                key: 'OP00',
                value: '全部类别'
              }
            })
          }
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
    //上拉触底时加载更多
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    var _that = this;
    var _pageNo = _that.data.pageNo;
    var _planData = _that.data.planData;
    var _format_month = _that.data.format_month;
    var _newYear = _format_month.substr(0, 4);
    var _newMonth = Number(_format_month.substr(5, 2));
    var _empNo = _that.data.empNo;
    var requestUrl = app.globalData.hostUrl + "/plan/ayxzMonthPlan";
    var _opnos = _that.data.opnos,
      _selIndex = _that.data.selIndex,
      _opNo = _opnos[_selIndex].key,
      paramOpNo = (_opNo == 'OP00' ? null : _opNo);
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        empNo: _empNo,
        year: _newYear,
        month: _newMonth,
        opNo: paramOpNo,
        pageNo: Number(_pageNo) + 1,
        pageSize: 10
      },
      success: function(res) {
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
  onShareAppMessage: function() {

  },

  // 展示详情
  slideDetail: function(e) {
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
   * 监听月份选择器
   */
  listenerMonthPick: function(e) {
    var _that = this
    _that.setData({
      format_month: e.detail.value
    })
    var _newYear = e.detail.value.substr(0, 4);
    var _newMonth = Number(e.detail.value.substr(5, 2));
    var _opnos = _that.data.opnos,
      _selIndex = _that.data.selIndex,
      _opNo = _opnos[_selIndex].key,
      paramOpNo = (_opNo == 'OP00' ? null : _opNo);
    wx.showLoading({
      title: '',
      mask: true
    })
    var _empNo = _that.data.empNo;
    var requestUrl = app.globalData.hostUrl + "/plan/ayxzMonthPlan";
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        empNo: _empNo,
        year: _newYear,
        month: _newMonth,
        opNo: paramOpNo,
        pageNo: 1,
        pageSize: 10
      },
      success: function(res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          _that.setData({
            planData: res.data.data,
            pageNo: 1
          })
        }
      }
    })
  },

  /**
   * 工作类别选择事件
   */
  listenerOpPick: function(e) {
    var _that = this;
    var _opnos = _that.data.opnos;
    var _planData = _that.data.planData;
    var _idx = e.detail.value;
    var _format_month = _that.data.format_month;
    var _newYear = _format_month.substr(0, 4);
    var _newMonth = Number(_format_month.substr(5, 2));
    _that.setData({
      selIndex: _idx
    })
    var _selOpNo = _opnos[_idx].key;
    var paramOpNo = _selOpNo == 'OP00' ? null : _selOpNo;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    var requestUrl = app.globalData.hostUrl + "/plan/ayxzMonthPlan";
    wx.request({
      url: requestUrl,
      header: app.globalData.header,
      data: {
        empNo: _that.data.empNo,
        year: _newYear,
        month: _newMonth,
        opNo: paramOpNo,
        pageNo: 1,
        pageSize: 10
      },
      success: function(res) {
        wx.hideLoading();
        if (res.data.code == 200) {
          _that.setData({
            planData: res.data.data,
            pageNo: 1
          })
        }
      }
    })
  },

  /**
   * 进入修改进度详情页面
   */
  goToUpdateView: function(e) {
    var _opId = e.currentTarget.dataset.opid;
    var _opType = e.currentTarget.dataset.optype;
    wx.navigateTo({
      url: "/pages/plan/planDetail/planDetail?opId=" + _opId + "&opType=" + _opType
    })
  }
})