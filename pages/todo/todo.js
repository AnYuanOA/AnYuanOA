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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    WebService.loadToDoList(
      that.data.lastAppId,
      {
        success: function (data) {
          that.setData({
            todoList: data.wfList
          });
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
          that.setData({
            toReadList: data.waitList
          });
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
  }
})