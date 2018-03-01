// pages/message/newMessage/newMessage.js
const chatLib = require("../../../services/im/IMLib.js")
var util = require('../../../utils/util.js');  
const IMLib = chatLib.IMLib
const IMLibStatus = chatLib.IMLibStatus
const Message = chatLib.Message
const MessageType = chatLib.MessageType

const im = require('../../login/login.js').im;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    nowDate:'',
    userMessage : '',
    mine : '',
    toUser : '',
    imConnectStatus : '',
    loginPwd : '',
    toUserHead : '',
    messageData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this

    var username = options.name.split(",")[0];
    var name = options.name.split(",")[1];
    var head = options.name.split(",")[2];
    var my = wx.getStorageSync('login_act');
    
    if (head == null || head == "" || head == 'null'){
      head = '/images/login_head.jpg';
    }

    wx.setNavigationBarTitle({
      title: name
    })

    console.log(wx.getStorageSync(my + username));

    this.setData({
      imConnectStatus : wx.getStorageSync('im_connect_staus'),
      loginPwd : wx.getStorageSync('login_pwd'),
      mine: my,
      toUser : username,
      userInfo : app.globalData.userInfo,
      toUserHead : head,
      nowDate : util.formatDate(new Date()),
      messageData : wx.getStorageSync(my + username) || []
    })
    


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindMessage: function (e) {
    this.setData({
      userMessage: e.detail.value
    })
  },

  sendMessage: function (e) {

    if (!this.data.userMessage.trim()) return;

    var that = this;
    var nowTime = util.formatTime(new Date());  

    const msg = new Message(
      this.data.mine,
      this.data.toUser,
      nowTime,
      MessageType.TEXT,
      this.data.userMessage.trim());

    if (this.data.imConnectStatus == IMLibStatus.CONNECTED) {

      im.sendMessage(msg);

    } else {

      im.connect(this.data.mine, this.data.loginPwd, function (status) {
        if (status == IMLibStatus.CONNECTED) {
          im.sendMessage(msg)
        }
      })

    }

    var msgData = {
      user: this.data.mine,
      message: this.data.userMessage.trim(),
      date: nowTime.split(" ")[0],
      time: nowTime.split(" ")[1]
    }


    that.data.messageData.push(msgData)

    that.setData({
      messageData: that.data.messageData
    })

    console.log(this.data.mine + this.data.toUser);

    wx.setStorage({
      key: this.data.mine + this.data.toUser,
      data: that.data.messageData
    })

  }
})