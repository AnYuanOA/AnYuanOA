const chatLib = require("../services/im/IMLib.js")
const Message = chatLib.Message
const MessageType = chatLib.MessageType
const Chat = chatLib.Chat

/**
 * IM相关功能工具类
 */

/**
 * 保存消息
 * @params message Message对象
 */
function saveMessage(message) {
  var userInfo = getApp().getLocalUserInfo()
  if(userInfo){
    var currentUsername = userInfo.userName
    //本地聊天列表存储key
    const key = "chat_list_" + currentUsername
    //获取已缓存的消息列表
    var chatList = wx.getStorageSync(key)
    if (!chatList) {
      chatList = []
    }
    //查找message对应的chat,如果没有则新建chat
    var chat = getChatOfMessage(chatList, message)
    //将message存储在chat消息数组中的第一位
    chat.messages.unshift(message)
    //将重新处理后的chat对象存储在本地聊天列表的第一位
    chatList.unshift(chat)
    wx.setStorageSync(key, chatList)
  }
}

/**
 * 获取message对应的chat对象，如果chatList中存在，则取chatList中的，若不存在，则新建
 */
function getChatOfMessage(chatList, message) {
  var currentUsername = getApp().getLocalUserInfo().userName
  var theChat = null;

  for(var i=0; i<chatList.length; i++){
    var chat = chatList[i];
    var from = null
    var to = null
    var fromArray = message.from.split("@")
    if(fromArray.length > 0){
      from = fromArray[0]
    }
    var toArray = message.to.split("@")
    if(toArray.length > 0){
      to = toArray[0]
    }
    if (chat.target==from || chat.target==to){
      theChat = chat
      //如果消息不是自己发送出去的，则更新聊天信息
      if(currentUsername != from){
        theChat.avator = message.fromAvator
        theChat.name = message.fromName
      }
      theChat.lastTime = message.time
      theChat.lastContent = getPreviewContent(message)
      chatList.splice(i, 1)
      break
    }
  }

  if(!theChat){
    theChat = new Chat()
    var fromArray = message.from.split("@")
    if(fromArray.length > 0){
      var from = fromArray[0]
      if(from == currentUsername){
        var toArray = message.to.split("@")
        if(toArray.length > 0){
          var to = toArray[0]
          theChat.target = to
          theChat.avator = message.toAvator
          theChat.name = message.toName
        }
      }else{
        theChat.avator = message.fromAvator
        theChat.name = message.fromName
        theChat.target = message.from
      }

      theChat.lastTime = message.time
      theChat.lastContent = getPreviewContent(message)
      theChat.messages = []
    }
  }
  return theChat
}

/**
 * 获取消息内容缩略显示文本
 */
function getPreviewContent(message) {
  var content = message.content
  if (message.type == MessageType.IMAGE){
    content = "[图片]"
  } else if(message.type == MessageType.VOICE){
    content = "[语音]"
  } else if(message.type == MessageType.FILE){
    content = "[文件]"
  } else if(message.type == MessageType.VEDIO){
    content = "[视频]"
  } else if(message.type == MessageType.LINK){
    content = "[链接]"
  }
  return content
}

/**
 * 获取聊天列表
 */
function getChatList() {
  var currentUsername = getApp().getLocalUserInfo().userName
  //本地聊天列表存储key
  const key = "chat_list_" + currentUsername
  //获取已缓存的消息列表
  var chatList = wx.getStorageSync(key)
  return chatList
}

/**
 * 根据对象账号获取聊天项消息列表
 * @params target 聊天对象用户名
 */
function getChatMessageListByTarget(target) {
  var currentUsername = getApp().getLocalUserInfo().userName
  //本地聊天列表存储key
  const key = "chat_list_" + currentUsername
  //获取已缓存的消息列表
  var chatList = wx.getStorageSync(key)
  var messageList = null
  for(var i=0; i<chatList.length; i++){
    var chat = chatList[i]
    if(chat.target == target){
      messageList = chat.messages
      break
    }
  }
  return messageList
}

module.exports = {
  saveMessage: saveMessage,
  getChatList: getChatList,
  getChatMessageListByTarget: getChatMessageListByTarget
}