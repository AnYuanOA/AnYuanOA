import "lib/core-js/core.js";//增加ES7 Object方法特性
import 'lib/moment/moment';//time utils
import regeneratorRuntime from "lib/regenerator-runtime/runtime";
import * as wxUtils from 'utils/wxUtils';//wx方法基本封装成promise
import * as WebService from 'services/newWebservice';//安源新平台接口服务
import { im } from 'services/IM';

App({

  async onLaunch() {
    var _that = this;//bind this to _that

    try {
      //获取微信用户授权信息
      const wxSetting = await wxUtils.getWxSetting();
      if (wxSetting.authSetting['scope.userInfo'] === false) {
        wx.showModal({
          content: '检测到您没打开用户信息权限，打开可使用完整功能。',
          confirmText: "确认",
          cancelText: "取消",
          success: function (res) {
            if (res.confirm) {
              wx.openSetting();
            }
          }
        });
      }

      let res = await wxUtils.wxGetUserInfo();
      this.globalData.userInfo = res.userInfo;

      // 登录微信小程序后台获取当前用户openid
      const wxLoginInfo = await wxUtils.wxLogin();//微信登录拿到JSCODE

      const serverInfo = await WebService.sendJsCode(wxLoginInfo.code);//JSCODE拿到openid

      const openId = serverInfo.data.openid;

      _that.globalData.openId = openId;

      const ayLoginBack = await WebService.loginWithOpenID(openId);//用openid登录

      _that.globalData.header.Cookie = 'JSESSIONID=' + ayLoginBack.data;
      _that.globalData.header.JSESSIONID = ayLoginBack.data;

      const userInfo = await WebService.loadUserInfo(openId);//根据openid去服务器取用户的信息
    } catch (error) {
      console.log(error.message);
      wx.redirectTo({
        url: '/pages/login/login'
      });
    }
    //获取缓存
    wx.getStorage({
      key: 'login_act',
      success: function (res) {
        _that.globalData.userid = res.data;
      }
    })
    wx.getStorage({
      key: 'login_pwd',
      success: function (res) {
        _that.globalData.pwdid = res.data;
      }
    })
  },

  onShow: function (options) {
    //检查登录状态，若已登录则检查IM连接状态，IM未连接的需要重新连接
    let userInfo = wxUtils.getLocalUserInfo();
    if (userInfo) {
      let userName = userInfo.userName;
      let password = userInfo.password;
      if (!im.isConnected() && userName && password) {
        im.connect(userName, password);
      }
    }

  },

  onHide: function () {
    this.isFromHide = true;
    //im.disconnect();
  },

  globalData: {
    userid: '',
    pwdid: '',
    openId: '',
    userInfo: null,//微信USER
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'cache-control': 'no-cache',
      'Cookie': null,
      JSESSIONID: null
    },
    // hostUrl: 'https://weixin.anyuanhb.com/web-service',
    hostUrl: 'http://192.168.0.107:8080/web-service',
    appId: 'wx42c2b2080fd58ff9',
    secret: 'a1eeab18ed1e785741946e3c29499a0c'
  },

  showErrorModal: function (title, content) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },

  showLoadToast: function (title, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      mask: true,
      duration: duration || 10000
    });
  }

});