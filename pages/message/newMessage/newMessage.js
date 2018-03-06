// pages/message/newMessage/newMessage.js
const chatLib = require("../../../services/im/IMLib.js")
var util = require('../../../utils/util.js');
const Message = chatLib.Message
const MessageType = chatLib.MessageType
const Chat = chatLib.Chat
const ChatStore = require("../../../utils/chatstore.js")

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

    app.setImMessageListener(this.onReceiveImMessage)

    var that = this

    var username = options.name.split(",")[0];
    var name = options.name.split(",")[1];
    var head = options.name.split(",")[2];
    var my = app.getLocalUserInfo().userName;

    console.log(username)
    console.log(name)
    console.log(head)
    
    if (head == null || head == "" || head == 'null'){
      head = '/images/login_head.jpg';
    }

    wx.setNavigationBarTitle({
      title: name
    })

    this.setData({
      imConnectStatus : wx.getStorageSync('im_connect_staus'),
      loginPwd : wx.getStorageSync('login_pwd'),
      mine: my,
      toUser : username,
      toUserCname: name,
      userInfo : app.globalData.userInfo,
      toUserHead : head,
      nowDate : util.formatDate(new Date()),
    })

    this.loadMessageList()
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
    app.removeImMessageListener(this.onReceiveImMessage)
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

  /**
   * 收到im消息
   */
  onReceiveImMessage: function(msg) {
    if(msg.toUserName == this.data.mine){
      this.loadMessageList()
    }
  },

  loadMessageList: function() {
    var messageList = ChatStore.getChatMessageListByTarget(this.data.toUser)
    this.setData({
      messageData: messageList
    })
  },

  bindMessage: function (e) {
    this.setData({
      userMessage: e.detail.value
    })
  },

  sendMessage: function (e) {

    if (!this.data.userMessage.trim()) return

    var that = this
    var nowTime = util.formatTime(new Date())  
    var userInfo = app.getLocalUserInfo()
    
    const msg = new Message(
      userInfo.userName,
      userInfo.user.cName,
      userInfo.avatarUrl,
      this.data.toUser,
      MessageType.TEXT,
      this.data.userMessage.trim());
    if(!this.data.messageData){
      this.data.messageData = []
    }
    this.data.messageData.unshift(msg)

    msg.toAvator = this.data.toUserHead
    msg.toName = this.data.toUserCname
    app.sendImMessage(msg)

    this.setData({
      messageData: this.data.messageData
    })
  }
})