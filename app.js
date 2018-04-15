//以下全是全局的服务 通过global解构在各个页面获得你所需的模块
require("lib/core-js/core.js")//增加ES7 Object方法特性
import 'lib/moment/moment';//time utils
import regeneratorRuntime from "lib/regenerator-runtime/runtime";
import * as wxUtils from 'utils/wxUtils';//wx方法基本封装成promise
import * as WebService from 'services/newWebservice';//安源新平台接口服务
import { im } from 'services/IM';
/**
 * IM服务
 */

// const chatLib = require("services/im/IMLib.js")
// const IMLib = chatLib.IMLib
// const IMLibStatus = chatLib.IMLibStatus
// const Message = chatLib.Message
// const MessageType = chatLib.MessageType
// const ChatStore = require("utils/chatstore.js")
// var im = new IMLib();

App({

  async onLaunch() {
    var _that = this;//bind this to _that

    const settings = await wxUtils.getWxSetting();
    if (settings.authSetting['scope.userInfo'] || wx.canIUse('button.open-type.getUserInfo')) {
      let res = await wxUtils.wxGetUserInfo();
      this.globalData.userInfo = res.userInfo;
    }


    try {
      // 登录微信小程序后台获取当前用户openid
      const wxLoginInfo = await wxUtils.wxLogin();
      console.log(wxLoginInfo);   
      const serverInfo = await WebService.sendJsCode(wxLoginInfo.code);
      console.log(serverInfo);   
      const openId = serverInfo.data.data.openid;
      // console.log(3);   
      _that.globalData.openId = openId;
      // console.log(4);
      const ayLoginBack = await WebService.loginWithOpenID(openId);
      // console.log(4);
      // console.log(ayLoginBack);
      // _that.globalData.header.Cookie = 'JSESSIONID=' + ayLoginBack.data.data;
      // _that.globalData.header.JSESSIONID = ayLoginBack.data.data;
      const userInfo = await WebService.loadUserInfo(openId);

      
      console.log(111);

    } catch (error) {
      console.log(error);
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
    wx.getStorage({
      key: 'login_jsession',
      success: function (res) {
        _that.globalData.header.Cookie = 'JSESSIONID=' + res.data;
      },
    })
  },

  onShow: function (options) {
    //检查登录状态，若已登录则检查IM连接状态，IM未连接的需要重新连接

    if (this.isFromHide) {
      let userInfo = wxUtils.getLocalUserInfo();
      if (userInfo) {
        let userName = userInfo.userName;
        let password = userInfo.password;
        if (im.status != 5 && userName && password) {
          im.connect(userName, password);
        }
      }
    }
  },

  onHide: function () {
    this.isFromHide = true;
    // im.disconnect();
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
    hostUrl: 'https://weixin.anyuanhb.com/web-service',
    // hostUrl: 'http://192.168.0.107:8080/web-service',
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