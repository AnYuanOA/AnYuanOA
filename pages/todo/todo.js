// pages/todo/todo.js
const WebService = require("../../services/webservice.js")

if (typeof TodoType == "undefined") {
  var TodoType = {}
  TodoType.Todo = 1//待办
  TodoType.ToRead = 2//待阅
}

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastAppId: "", //待办列表分页参数，对应接口请求参数lastTime
    currentPage: 1, //待阅列表分页参数，从1开始
    showType: TodoType.Todo,
    userInfo: app.globalData.userInfo,
    todoList: null,
    toReadList: null
  },

  /**
   * 
   */
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => { // 用这种方法调用，this指向Page
        this.setData({
          winH: res.windowHeight
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    WebService.loadToDoList(
      that.data.lastAppId,
      {
        success: function (data) {
          if (data.wfList && data.wfList.length > 0) {
            that.setData({
              todoList: data.wfList,
              lastAppId: data.wfList[0].appID
            });
          }
        },
        fail: function (msg) {
          console.log(msg)
        }
      }
    )

    WebService.loadToReadList(
      1,
      {
        success: function (data) {
          if (data.waitList && data.waitList.length > 0) {
            that.setData({
              toReadList: data.waitList,
              currentPage: 2
            });
          }
        },
        fail: function (msg) {
          console.log(msg)
        }
      }
    )
  },

  /*
   * 点击待办
   */
  tapTodo: function (e) {
    if (this.data.showType != TodoType.Todo) {
      this.setData({
        showType: TodoType.Todo
      });
    }
  },

  tapToRead: function (e) {
    if (this.data.showType != TodoType.ToRead) {
      this.setData({
        showType: TodoType.ToRead
      });
    }
  },

  /**
   * 待办下拉刷新
   */
  todoPullDownRefresh: function () {
    wx.showLoading({
      title: '刷新中...',
      mask: true
    })
    var _that = this;
    WebService.loadToDoList(
      '',
      {
        success: function (data) {
          wx.hideLoading();
          if (data.wfList && data.wfList.length > 0) {
            _that.setData({
              todoList: data.wfList,
              lastAppId: data.wfList[data.wfList.length-1].appID
            });
          } else {
            _that.setData({
              todoList: [],
              lastAppId: ''
            });
          }
        },
        fail: function (msg) {
          console.log(msg)
        }
      }
    )
  },

  /**
   * 待办上拉加载更多
   */
  todoSearchScrollLower: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    var _that = this,
      _todoList = _that.data.todoList,
    _lastAppId = _that.data.lastAppId;
    WebService.loadToDoList(
      _lastAppId,
      {
        success: function (data) {
          wx.hideLoading();
          if (data.wfList && data.wfList.length > 0) {
            for (var i = 0, i = data.wfList.length; i < i; ++i) {
              _todoList.push(data.wfList[i]);
            }
            _that.setData({
              todoList: _todoList,
              lastAppId: data.wfList[data.wfList.length-1].appID
            })
          }
        },
        fail: function (msg) {
          console.log(msg)
        }
      }
    )
  },


  /**
   * 待阅下拉刷新
   */
  toReadPullDownRefresh: function () {
    wx.showLoading({
      title: '刷新中...',
      mask: true
    })
    var _that = this;
    WebService.loadToReadList(
      1,
      {
        success: function (data) {
          wx.hideLoading();
          if (data.waitList && data.waitList.length > 0) {
            _that.setData({
              toReadList: data.waitList,
              currentPage: 2
            });
          } else {
            _that.setData({
              toReadList: [],
              currentPage: 1
            });
          }
        },
        fail: function (msg) {
          console.log(msg)
        }
      }
    )
  },

  /**
   * 待阅上拉加载更多
   */
  toReadSearchScrollLower: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    var _that = this,
      _toReadList = _that.data.toReadList,
      _nextPage = _that.data.currentPage;
    WebService.loadToReadList(
      _nextPage,
      {
        success: function (data) {
          wx.hideLoading();
          if (data.waitList && data.waitList.length > 0) {
            for (var i = 0, i = data.waitList.length; i < i; ++i) {
              _toReadList.push(data.waitList[i]);
            }
            _that.setData({
              toReadList: _toReadList,
              currentPage: _nextPage*1 + 1
            });
          }
        },
        fail: function (msg) {
          console.log(msg)
        }
      }
    )
  }
})