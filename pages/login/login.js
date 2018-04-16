//login.js
import { im } from '../../services/IM';
import * as newWebservice from '../../services/newWebservice';


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
  loginUser(e) {
    let that = this;
    if (!this.data.userid || !this.data.passwd) {
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
      wx.hideToast();
      app.showErrorModal('提示', error.message);
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
  },

  confirmInput: function (e) {
    if (e.currentTarget.id === 'passwd') {
      this.loginUser();
    } else if (e.currentTarget.id === 'userid' && this.data.userid && this.data.passwd) {
      this.loginUser();
    }
  }

})

