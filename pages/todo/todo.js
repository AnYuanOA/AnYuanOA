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
              todoList: data.wfList
            });
          }
        },
        fail: function (msg) {
          console.log(msg)
        }
      }
    )

    WebService.loadToReadList(
      that.data.currentPage,
      {
        success: function (data) {
          if (data.waitList && data.waitList.length > 0) {
            that.setData({
              toReadList: data.waitList
            });
          }

        },
        fail: function (msg) {
          console.log(msg)
        }
      }
    )
    // wx.request({
    //   url: app.globalData.hostUrl + '/workflow/getToDoList',
    //   header: app.globalData.header,
    //   success: function (res) {
    //     if (res.data.code == 500) {
    //       // wx.redirectTo({
    //       //   url: '/pages/noAccess/noAccess',
    //       // })
    //     } else {
    //       if (res.data.data <= 0) {
    //         that.setData({
    //           noData: true
    //         })
    //       } else {
    //         console.log(res.data.data)
    //         that.setData({
    //           depts: res.data.data
    //         })
    //       }
    //     }
    //   }
    // })
    //加载待办及待阅数据
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
              todoList: data.wfList
            });
          } else {
            _that.setData({
              todoList: []
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
      _todoList = _that.data.todoList;
    WebService.loadToDoList(
      _todoList[_todoList.length - 1].appID,
      {
        success: function (data) {
          wx.hideLoading();
          if (data.wfList && data.wfList.length > 0) {
            var _wfList = data.wfList
            for (var i = 0, i = _wfList.length; i < i; ++i) {
              _todoList.splice(_todoList.length, 0, _wfList[i])
            }
            _that.setData({
              todoList: _todoList
            })
          } else {
            _that.setData({
              lastAppId: ''
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
            console.log(data.waitList)
            _that.setData({
              toReadList: data.waitList
            });
          } else {
            _that.setData({
              toReadList: []
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
      _nowPage = _that.data.currentPage;
    WebService.loadToReadList(
      _nowPage + 1,
      {
        success: function (data) {
          wx.hideLoading();
          if (data.waitList && data.waitList.length > 0) {
            var _waitList = data.waitList
            for (var i = 0, i = _waitList.length; i < i; ++i) {
              _toReadList.splice(_toReadList.length, 0, _waitList[i])
            }
            _that.setData({
              toReadList: _toReadList,
              currentPage: _nowPage + 1
            });
          } else {
            _that.setData({
              currentPage: _nowPage
            })
          }
        },
        fail: function (msg) {
          console.log(msg)
        }
      }
    )
  }
})