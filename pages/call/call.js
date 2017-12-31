

// 获取全局应用程序实例对象
const app = getApp();

if (typeof seekCall == "undefined") {
  var seekCall = {}
  seekCall.notRead = 1//未阅
  seekCall.collect = 2//收藏
  seekCall.sent = 3//已发
  seekCall.received = 4//已收
}

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "message",
  /**
   * 页面的初始数据
   */

  data: {
    showType: seekCall.notRead,
    list: [
      {
        id: '1',
        sendUser: '张三',
        comment: '流程：测试流程已通过，请注意查收！！！！',
        sendDate: '2017/01/01 21:21:21',

      }, {
        id: '2',
        sendUser: '李四',
        comment: '流程：测试流程已通过，请注意查收！！！！',
        sendDate: '2017/01/01 21:21:21',

      }, {
        id: '3',
        sendUser: '赵武，测试111',
        comment: '流程：测试流程已通过，请注意查收！！！！',
        sendDate: '2017/01/01 21:21:21',

      }
    ],
    actionSheetHidden: true,
    actionSheetItems: ['item1', 'item2', 'item3']
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      var that = this;
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          that.setData({
            userInfo: userInfo
          })
          app.globalData.userInfo = userInfo;
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },


  //以下为自定义点击事件

  tap_notRead: function (e) {

    if (this.data.seekCall != seekCall.notRead) {
      this.setData({
        showType: seekCall.notRead
      });
    }


  },

  tap_collect: function (e) {
    if (this.data.seekCall != seekCall.collect) {
      this.setData({
        showType: seekCall.collect

      });
    }

  },

  tap_sent: function (e) {
    if (this.data.seekCall != seekCall.sent) {
      this.setData({
        showType: seekCall.sent
      });
    }

  },

  tap_received: function (e) {
    if (this.data.seekCall != seekCall.received) {
      this.setData({
        showType: seekCall.received
      });
    }
  },

  actioncnt: function () {
    wx.showActionSheet({
      itemList: ['转发', '回复',  '已阅'],
      success: function (res) {
        
        if (res.tapIndex == 0){
          wx.navigateTo({
            url: '../callEdit/callEdit'
          })
        }

        if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../callEdit/callEdit'
          })
        }

        if (res.tapIndex == 2) {
          wx.showToast({
            title: '已阅',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  keepcnt: function () {
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 2000
    })
  },

  deletecnt: function () {
    wx.showModal({
      title: '提示',
      content: '是否删除该寻呼！',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },  

addCall: function (e) {

  wx.navigateTo({
    url: '../callEdit/callEdit'
  })   

  },


})

