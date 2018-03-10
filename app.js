//app.js
/**
 * 接口服务
 */
const WebService = require("services/webservice.js")

/**
 * IM服务
 */
const chatLib = require("services/im/IMLib.js")
const IMLib = chatLib.IMLib
const IMLibStatus = chatLib.IMLibStatus
const Message = chatLib.Message
const MessageType = chatLib.MessageType
const ChatStore = require("utils/chatstore.js")
var im = new IMLib()

App({
  onLaunch: function () {
    var _that = this;
    // 登录微信小程序后台获取当前用户openid
    wx.login({
      success: res => {
        console.log()
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.hostUrl + "/login/getUserOpenId",
          data: { jsCode: res.code },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data.data.openid)
            _that.globalData.openId = res.data.data.openid;
            //使用openId登录webservice服务器
            WebService.loginWithOpenID(res.data.data.openid, {
              success: function (data) {
                _that.globalData.header.Cookie = 'JSESSIONID=' + data
                _that.globalData.header.JSESSIONID = data

                WebService.loadUserInfo(res.data.data.openid, function(){
                  var userInfo = _that.getLocalUserInfo()
                  _that.imLogin(userInfo.userName, userInfo.password, function (isSuccess) {
                    // if (!isSuccess) {//IM未登录成功
                    //   wx.redirectTo({
                    //     url: '/pages/login/login'
                    //   })
                    // }
                  }) 
                })
              },
              fail: function() {
                wx.redirectTo({
                  url: '/pages/login/login'
                })
              }
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          if (wx.canIUse('button.open-type.getUserInfo')) {
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      }
    })
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
    if (this.isFromHide){
      var userInfo = this.getLocalUserInfo()
      if (userInfo) {
        var userName = userInfo.userName
        var password = userInfo.password
        if (userName && password) {
          this.imLogin(userName, password)
        }
      }
    }
  },
  onHide: function () {
    this.isFromHide = true
    im.disconnect()
  },
  /**
   * IM登录
   * @params username IM用户名
   * @params password IM密码
   * @params callback 登录后回调  callback(isSuccess)
   */
  imLogin: function(username, password, callback) {
    im.connect(username, password, function (status) {
      if(callback){
        if (status == IMLibStatus.CONNECTED) {
          callback(true)
        } 
        // else {
        //   callback(false)
        // }
      }
      im.listen({
        onTextMessage: function (msg) {
          //存储消息
          ChatStore.saveMessage(msg)
          //通知收到消息，刷新界面
          if (getApp().imMessageListeners){
            for (var i = 0; i < getApp().imMessageListeners.length; i++){
              var listener = getApp().imMessageListeners[i]
              if(listener){
                listener(msg)
              }
            }
          }
          console.log(msg)
        }
      })
    })
  },
  /**
   * 设置收到IM消息的回调函数
   */
  setImMessageListener:function(imMessageListener) {
    this.imMessageListeners.push(imMessageListener)
  },
  /**
   * 删除IM消息监听函数
   */
  removeImMessageListener:function(imMessageListener) {
    var index = this.imMessageListeners.indexOf(imMessageListener)
    if(index >= 0){
      this.imMessageListeners.splice(index, 1)
    }
  },
  imMessageListeners: [],
  /**
   * 发送IM消息
   */
  sendImMessage:function(message) {
    //存储消息
    ChatStore.saveMessage(message)
    im.sendMessage(message)
  },
  /**
   * 发送文本消息
   * @params toUserName 目标用户
   * @params content 文本内容
   */
  sendTextMessage:function(toUserName, content) {
    var userInfo = this.getLocalUserInfo()
    var message = new Message(
      userInfo.userName, 
      userInfo.user.cName, 
      userInfo.user.avatarUrl,
      toUserName,
      MessageType.TEXT,
      content)
    im.sendMessage(message)
  },
  globalData: {
    userid: '',
    pwdid: '',
    openId: '',
    userInfo: null,
    header: { 
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 
      'Cookie': null,
      JSESSIONID: null 
    },
    hostUrl: 'https://weixin.anyuanhb.com/web-service',
    // hostUrl: 'https://localhost:8443/web-service',
    appId: 'wx42c2b2080fd58ff9',
    secret: 'a1eeab18ed1e785741946e3c29499a0c'
  },
  getLocalUserInfo: function() {
    var userInfo = wx.getStorageSync("USER_INFO")
    return userInfo
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
})