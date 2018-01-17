//login.js
//获取应用实例
const app = getApp()
const service = require("../../services/oldServerService.js")

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //登录跳转事件
  loginUser: function (e) {
    var that = this;
    if (!that.data.userid || !that.data.passwd) {
      app.showErrorModal('提醒', '工号及密码不能为空！');
      return false;
    }
    app.showLoadToast('登录中...');
    service.login({
      username: that.data.userid,
      password: that.data.passwd,
      succeed: function(){
        wx.hideToast();
        wx.redirectTo({
          url: '/pages/home/home',
        })
      },
      failed: function() {
        wx.hideToast();
        wx.showToast({
          title: '用户名或密码错误',
        })
      }
    })
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
  },
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    });
  }
})
