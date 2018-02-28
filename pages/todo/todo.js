// pages/todo/todo.js
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
    lastAppId: null, //待办列表分页参数，对应接口请求参数lastTime
    currentPage: 1, //待阅列表分页参数，从1开始
    showType: TodoType.Todo,
    userInfo: app.globalData.userInfo,
    todoList: [
      {
        appId:'39948',
        appType: '休假申请',
        appTitle:'jinher休假申请（2017-11-29)',
        appUserName:'jinher',
        appBeginTime:'2018/2/26 14:48:58'
      },
      {
        appId: '40562',
        appType: '项目开工通知单',
        appTitle: '总产值流程测试201812',
        appUserName: 'jinher',
        appBeginTime: '2018/1/2 18:04:39'
      }
    ],
    toReadList: [
      {
        appId:'39948',
        obj_Title: '关于开展“质量在我心中，全面加强质量管理”有奖征文活动的通知',
        orderType: '发文办理流程',
        userName: '欧阳俊俊',
        orderId: '2017-12-28T09:31:24'
      },
      {
        appId: '38901',
        obj_Title: '关于发布《2017年管理评审报告》的通知',
        orderType: '发文办理流程',
        userName: '曾闪',
        orderId: '2017-12-19T11:49:46'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: app.globalData.hostUrl + '/workflow/getToDoList',
      header: app.globalData.header,
      success: function (res) {
        if (res.data.code == 500) {
          // wx.redirectTo({
          //   url: '/pages/noAccess/noAccess',
          // })
        } else {
          if (res.data.data <= 0) {
            that.setData({
              noData: true
            })
          } else {
            console.log(res.data.data)
            that.setData({
              depts: res.data.data
            })
          }
        }
      }
    })
    //加载待办及待阅数据
  },

  /*
   * 点击待办
   */
  tapTodo: function(e) {
    if (this.data.showType != TodoType.Todo){
      this.setData({
        showType: TodoType.Todo
      });
    }
  },

  tapToRead: function(e) {
    if (this.data.showType != TodoType.ToRead) {
      this.setData({
        showType: TodoType.ToRead
      });
    }
  }
})