//login.js
//获取应用实例
const chatLib = require("../../services/im/IMLib.js")
const WebService = require("../../services/webservice.js")
const app = getApp()

Page({
  data: {
    userInfo: null,
    userid_focus: false,
    passwd_focus: false,
    userid: null,
    passwd: null
  },
  onLoad: function () {
    var _that = this
    _that.setData({
      userInfo: app.globalData.userInfo,
      userid: app.globalData.userid,
      passwd: app.globalData.pwdid
    })
  },
  //登录跳转事件
  loginUser: function (e) {
    var that = this;
    if (!that.data.userid || !that.data.passwd) {
      app.showErrorModal('提醒', '账号及密码不能为空！');
      return false;
    }
    app.showLoadToast('登录中...');
    WebService.login({
      userName: that.data.userid,
      account: that.data.userid,
      openId: app.globalData.openId,
      password: that.data.passwd,
      chatNick: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl
    }, {
      success: function(data) {
        app.globalData.header.Cookie = 'JSESSIONID=' + data;
        app.globalData.header.JSESSIONID = data;
        //写入小程序登录态缓存
        wx.setStorage({
          key: 'login_jsession',
          data: data,
        })
        //写入用户登录信息到缓存
        wx.setStorage({
          key: 'login_act',
          data: that.data.userid,
        })
        wx.setStorage({
          key: 'login_pwd',
          data: that.data.passwd,
        })
        //连接IM服务
        app.imLogin(that.data.userid, that.data.passwd, function(isSuccess){
          // if(isSuccess){
            
          // }else {
          //   app.showErrorModal('提示', '登录失败')
          // }
        })
        //跳转
        wx.hideToast();
        wx.switchTab({
          url: '/pages/index/index'
        })
      },
      fail: function(msg) {
        wx.hideToast();
        app.showErrorModal('提示', msg)
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

