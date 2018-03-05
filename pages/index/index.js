// pages/index/index.js
const ChatStore = require("../../utils/chatstore.js")
const chatLib = require("../../services/im/IMLib.js")
const Chat = chatLib.Chat

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatList: null,//聊天列表
    newsChat: null,//新闻中心聊天项
    toReadChat: null,//待阅聊天项
    toDoChat: null//待办聊天项
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setImMessageListener(this.onReceiveImMessage)
    this.loadSystemChat()
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
    this.loadChatList()
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
   * 加载本地聊天信息
   */
  loadChatList: function() {
    var chatList = ChatStore.getChatList()
    if(!chatList){
      chatList = []
    }
    //插入系统消息聊天项
    // chatList.unshift(this.data.newsChat)
    chatList.unshift(this.data.toReadChat)
    chatList.unshift(this.data.toDoChat)

    this.setData({
      chatList: chatList
    })
  },

  loadSystemChat: function() {
    //添加新闻中心
    var newsChat = new Chat("/images/icon_index_news.jpg",
      "新闻中心", "", "", "科研院所和高校是基础研究的主力军，其最关键的因素是科研人员。")
    //添加待阅
    var toReadChat = new Chat("/images/icon_index_cc.png",
      "我的待阅", "", "", "春节放假方案已通过审批，请及时查阅最新休假方案。")
    toReadChat.url = "/pages/todo/todo"
    //添加待办
    var toDoChat = new Chat("/images/icon_index_todo.png",
      "我的待办", "", "", "王洋的请假流程待审批，请及时处理！")
    toDoChat.url = "/pages/todo/todo"
    this.setData({
      newsChat: newsChat,
      toReadChat: toReadChat,
      toDoChat: toDoChat
    })
  },

  /**
   * 收到IM消息
   */
  onReceiveImMessage: function() {
    //查询本地消息，刷新界面
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})