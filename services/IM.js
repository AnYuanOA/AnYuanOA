import StropheJs from '../lib/strophe.js/strophe';
import uuid from "../lib/uuid/v4";//目前我只弄了V4
import moment from '../lib/moment/moment';
import * as wxUtils from '../utils/wxUtils';

const { Strophe, $iq, $build, $msg, $pres } = StropheJs;

Strophe.log = function (level, msg) {  
  if (level == Strophe.LogLevel.ERROR) {
    console.log(msg);
  }
};

const BOSH_SERVICE = 'wss://weixin.anyuanhb.com/ws/';
// const BOSH_SERVICE = 'wss://localhost:8443/ws/'
const domain = 'anyuan.im';
const suffix = `@` + domain;

//const MessageType = 

const ONLINE_PRESENCE = $pres().c("show").t("chat").up().c("status").t("我在线啊");

const con_options = {
  "ayCookie": {
    "domain": domain,
  }
}

/** 即时通讯Class */
class InstanceMsg {

  constructor() {
    this.callbackMap = new Map();
    this.connection = new Strophe.Connection(BOSH_SERVICE, con_options);
    this.status;
    // this.MessageType = MessageType;
    // this.callbacks = {};
  }

  //连接
  connect(username, pass) {
    let jid = username.trim().concat(suffix);
    this.connection.connect(jid, pass, _onConnect.bind(this));
  }

  //取消连接
  disconnect() {
    this.connection.disconnect();
  }
  //发送在线消息
  sendOnline() {
    this.connection.send(ONLINE_PRESENCE.tree());
  }
  
  //是否在线
  isConnected(){
    return this.Status == Strophe.Status.CONNECTED;
  }

  sendMessage(message) {
    const msg = $msg({
      'to': message.toJID,
      'type': message.chatType,
      'from': message.fromJID,

      'fromAvator': message.fromAvator,
      'fromCname': message.fromCname,
      'toCname': message.toCname,
      'msgTime': message.time,
      'msgType': message.msgType
    }).c('body', null, message.content);
    this.connection.send(msg.tree());
    saveMessage(message);//存储消息
  }

  registerCallback(f) {
    let id = uuid();
    this.callbackMap.set(id, f);
    return id;
  }

  cancelCallback(id) {
    this.callbackMap.delete(id);
  }


}
/** 消息Class */
export class Message {

  constructor(fromName, fromCname, fromAvator, toName, toCname, chatType, msgType, content, extra) {
    this.id = uuid();
    this.fromJID = fromName + suffix; //JID
    this.fromName = fromName;
    this.fromCname = fromCname;
    this.fromAvator = fromAvator;
    this.toJID = toName + suffix;
    this.toName = toName;
    this.toCname = toCname;
    this.type = chatType;
    this.content = content;
    this.time = new moment().format("YYYY-MM-DD HH:mm:ss");
    this.msgType = msgType;
    //额外的信息
    this.extra = {
      isPlay: extra.isPlay || false,
      imageWidth: extra.imageWidth || 0,
      imageHeight: extra.imageHeight || 0
    };
  }

  static MessageType = {
    TEXT: 1,  //文本
    IMAGE: 2, //图片
    VEDIO: 3, //视频
    VOICE: 4, //语音
    LINK: 5,  //链接
    FILE: 6   //文件
  }
}


/**
 * 聊天项
 * @property avator 聊天项图标(对方头像，群组头像，或其它系统消息类型图标)
 * @property name   聊天项名称(对象昵称，群组名称，或其它系统消息类型名称)
 * @property target 聊天对象id
 * @property lastTime 最后一条消息的时间
 * @property lastContent 最后一条消息内容
 * @property messages    聊天项包含的消息数组
 */
export class Chat {

  constructor(target, name, avator, lastTime, lastContent, messages, notReadCount) {
    this.target = target;
    this.name = name;
    this.avator = avator;
    this.lastTime = lastTime;
    this.lastContent = lastContent;
    this.messages = messages;
    this.notReadCount = notReadCount;//未读消息
    this.isChatting = false;
  }
}

//连接回调
function _onConnect(status) {
  //console.log(status);
  this.status = status;
  if (status == Strophe.Status.CONNECTING) {
    console.log("IM连接中！");
  }
  else if (status == Strophe.Status.CONNFAIL) {
    console.log("IM连接失败！");
  } else if (status == Strophe.Status.AUTHFAIL) {
    console.log("IM登录认证失败！");
  } else if (status == Strophe.Status.DISCONNECTED) {
    console.log("IM连接断开！");
  } else if (status == Strophe.Status.CONNECTED) {
    console.log("IM连接成功，可以开始聊天了！");

    //发送上线状态
    this.sendOnline();

    // 当接收到<message>节，调用onMessage回调函数
    this.connection.addHandler(_handleMessage.bind(this), null, 'message', null, null, null);

    //类似heart beat
    this.connection.addTimedHandler(60000, _heartBeat.bind(this));

  }
}

//接受到消息的回调
function _handleMessage(msg) {
  //console.log(Strophe.serialize(msg));
  //获取<message/>属性
  const _to = msg.getAttribute('to');
  const _from = msg.getAttribute('from')
  const _type = msg.getAttribute('type');//聊天类型 本场景下基本是chat

  const _fromAvator = msg.getAttribute('fromAvator');
  const _fromCname = msg.getAttribute('fromCname');
  const _toCname = msg.getAttribute('toCname');
  const _msgTime = msg.getAttribute('msgTime');
  const _msgType = parseInt(msg.getAttribute('msgType')) || Message.MessageType.TEXT;
  //获取消息主体
  const _body = msg.getElementsByTagName('body');
  if (_type === 'chat' && _body.length > 0) {
    let content = Strophe.getText(_body[0]);
    let $from = Strophe.getNodeFromJid(_from);
    let $to = Strophe.getNodeFromJid(_to);

    let msg = new Message($from, _fromCname, _fromAvator, $to, _toCname, _type, _msgType, content, {});
    saveMessage(msg);//存储消息

    for (var [key, value] of this.callbackMap) {
      value();
    }
  }

  return true;
}

//心跳
function _heartBeat() {
  if (this.status == Strophe.Status.CONNECTED) {
    this.sendOnline();
    return true;
  } else
    return false;
}

//STORE 存储消息 本地储存

//聊天Chat包含messages
function saveMessage(message) {
  //获取已缓存的消息列表
  let chatList = getStoreChatList();
  //查找message对应的chat,如果没有则新建chat
  let chat = getChatOfMessage(chatList, message);
  //将message存储在chat消息数组中的第一位
  chat.messages.unshift(message);
  //将重新处理后的chat对象存储在本地聊天列表的第一位
  chatList.unshift(chat);
  storeChatList(chatList);
}


function getChatOfMessage(chatList, msg) {

  const currentUsername = wxUtils.getLocalUserInfo().userName;
  let newChat = null;
  for (let chat of chatList) {
    let $from = msg.fromName;//谁发起的
    let $to = msg.toName;//发给谁

    //无论对方发还是你发
    if (chat.target === $from || chat.target === $to) {
      newChat = chat;
      newChat.lastTime = msg.time;
      newChat.lastContent = getPreviewContent(msg);
      chatList.splice(chatList.indexOf(chat), 1);//从当前列表删除chat
      console.log(chat);
      console.log($from)
      if (chat.target == $from && !chat.isChatting) {
        newChat.notReadCount = newChat.notReadCount + 1;
      }
      break;
    }
  }
  //如果不存在
  if (!newChat) {
    let _content = getPreviewContent(msg);
    if (msg.fromName == currentUsername) {
      newChat = new Chat(msg.toName, msg.toCname, msg.toAvator, msg.time, _content, [], 0);
    } else {
      newChat = new Chat(msg.fromName, msg.fromCname, msg.fromAvator, msg.time, _content, [], 1);
    }
  }
  return newChat;
}

/**
 * 根据对象账号获取聊天项消息列表
 * @params target 聊天对象用户名
 */
function getChatByTarget(target) {
  //获取已缓存的消息列表
  const chatList = getStoreChatList();
  let _chat = null;
  for (let chat of chatList) {
    if (chat.target == target) {
      _chat = chat;
      break
    }
  }
  return _chat;
}

/**
 * 存储聊天列表
 */
function storeChatList(chatList) {
  const currentUsername = wxUtils.getLocalUserInfo().userName;
  const key = "chat_list_" + currentUsername;
  wx.setStorageSync(key, chatList);
}

/**获取本人的聊天记录 */
function getStoreChatList() {
  const currentUsername = wxUtils.getLocalUserInfo().userName;
  const key = "chat_list_" + currentUsername;
  return wx.getStorageSync(key) || [];
}


/**
 * 获取消息内容缩略显示文本
 */
function getPreviewContent(message) {
  var content = message.content;
  if (message.msgType == Message.MessageType.IMAGE) {
    content = "[图片]";
  } else if (message.msgType == Message.MessageType.VOICE) {
    content = "[语音]";
  } else if (message.msgType == Message.MessageType.FILE) {
    content = "[文件]";
  } else if (message.msgType == Message.MessageType.VEDIO) {
    content = "[视频]";
  } else if (message.msgType == Message.MessageType.LINK) {
    content = "[链接]";
  }
  return content;
}
//导出列表
export const im = new InstanceMsg();
export const imUtils = {
  getStoreChatList: getStoreChatList,
  storeChatList: storeChatList,
  getChatByTarget: getChatByTarget,
}

let inModule = typeof module === "object";
if (typeof global === "object") {
  global.im = im;
}