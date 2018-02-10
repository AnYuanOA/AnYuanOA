//app.js
App({
  onLaunch: function () {
    var _that = this;
    // 登录微信小程序后台获取当前用户openid
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + _that.globalData.appId + '&secret=' + _that.globalData.secret + '&js_code=' + res.code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            _that.globalData.openId = res.data.openid;
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
  globalData: {
    userid: '',
    pwdid: '',
    openId: '',
    userInfo: null,
    header: { 'Cookie': null },
    hostUrl: 'http://localhost:8080/web-service',
    appId: 'wx9b93f178992ef513',
    secret: 'b7fc5c9a38fb6252ca149a11e4efe43b'
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