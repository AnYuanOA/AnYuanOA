//login.js
import { im } from '../../services/IM';
const { newWebservice } = global;
const chatLib = require("../../services/im/IMLib.js")
const WebService = require("../../services/webservice.js")
//获取应用实例
const app = getApp();

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
      //userInfo: app.globalData.userInfo,
      userid: app.globalData.userid,
      passwd: app.globalData.pwdid
    })
  },
  //登录跳转事件
  loginUser(e) {
    var that = this;
    if (!that.data.userid || !that.data.passwd) {
      app.showErrorModal('提醒', '账号及密码不能为空！');
      return false;
    }
    app.showLoadToast('登录中...');

    let params = {
      userName: that.data.userid,
      account: that.data.userid,
      openId: app.globalData.openId,
      password: that.data.passwd,
      chatNick: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl
    };

    newWebservice.ayLogin(params).then(res => {
      let data = res.data;
      app.globalData.header.Cookie = 'JSESSIONID=' + data;
      app.globalData.header.JSESSIONID = data;
      return newWebservice.loadUserInfo(params.openId);
    }).then(res => {
      
      //写入用户登录信息到缓存
      wx.setStorage({
        key: 'login_act',
        data: that.data.userid,
      });
      wx.setStorage({
        key: 'login_pwd',
        data: that.data.passwd,
      });

      wx.hideToast();
      wx.switchTab({
        url: '/pages/index/index'
      });

      im.connect(that.data.userid, that.data.passwd);

    }).catch(error => {
      console.log(error)
      wx.hideToast();
      app.showErrorModal('提示', error.data.message);
    });
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

