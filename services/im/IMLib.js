const StropheLib = require("./strophe.js")
const Strophe = StropheLib.Strophe

const BOSH_SERVICE = 'wss://weixin.anyuanhb.com:7443/ws/'
const domain = 'anyuan.im'
const suffix = '@'+domain

const $build = StropheLib.$build
const $iq = StropheLib.$iq
const $msg = StropheLib.$msg
const $pres = StropheLib.$pres

// console.log(StropheLib)

/***
 * IM连接状态
 */
const Status = {
  ERROR: 0,
  CONNECTING: 1,
  CONNFAIL: 2,
  AUTHENTICATING: 3,
  AUTHFAIL: 4,
  CONNECTED: 5,
  DISCONNECTED: 6,
  DISCONNECTING: 7,
  ATTACHED: 8,
  REDIRECT: 9,
  CONNTIMEOUT: 10
}

const MessageType = {
  TEXT: 1,  //文本
  IMAGE: 2, //图片
  VEDIO: 3, //视频
  VOICE: 4, //语音
  LINK: 5,  //链接
  FILE: 6   //文件
}

class IMLib {
  constructor(){
    this.connection = new Strophe.Connection(BOSH_SERVICE)
    this.Status = Status
    this.MessageType = MessageType
    this.callbacks = {}
  }

  connect(username, password, callback) {
    var self = this
    this.connection.connect(username + "" + suffix, password, function (status) {
      if (callback) {
        callback(status)
      }
      this.username = username

      if (status == Strophe.Status.CONNECTED) {
        console.log("连接及时通讯服务器成功");
        //发送上线消息
        self.connection.send($pres());
        self.connection.addHandler(function (msg) {
          return self.handleMessage(msg)
        }, null, 'message', null, null, null);
      }
      console.log(status)
    })
  }

  disconnect() {
    this.connection.disconnect()
  }

  /***
   * 增加消息处理回调
   * @params onTextMessage  收到文本消息
   * @params onImageMessage 收到图片消息
   * @params onVedioMessage 收到视频消息
   * @params onVoiceMessage 收到语音消息
   * @params onLinkMessage  收到互联网链接消息
   * @params onFileMessage  收到文件传输消息
   */
  listen(callbacks) {
    this.callbacks = callbacks
  }

  /***
   * 发送消息
   * @params msg typeof Message
   */
  sendMessage(message) {
    const msg = $msg({
      type: "chat",
      to: message.to,
      from: message.from,
      fromAvator:message.fromAvator,
      fromName:message.fromName,
      msgTime: message.time,
      msgType: message.type+""
    }).cnode(Strophe.xmlElement('body', '', message.content))
    this.connection.send(msg)
  }

  /***
   * 处理消息
   */
  handleMessage(msg) {
    console.log(msg)
    const to = msg.getAttribute('to')
    const from = msg.getAttribute('from')
    const fromAvator = msg.getAttribute('fromAvator')
    const fromName = msg.getAttribute('fromName')
    const type = msg.getAttribute('type')
    const msgTime = msg.getAttribute('msgTime')
    const msgType = parseInt(msg.getAttribute('msgType'))
    const elems = msg.getElementsByTagName('body')

    if (type == "chat" && elems.length > 0) {
      const body = elems[0]
      const content = Strophe.getText(body)
      const message = new Message(from, fromName, fromAvator, to, msgTime, msgType, content)
      // if(msgType == MessageType.TEXT){
        if (this.callbacks.onTextMessage) {
          this.callbacks.onTextMessage(message)
        }
      // }
    }
    return true
  }
}

/***
 * 消息
 * @property from    消息发送者ID
 * @property fromName 消息发送者昵称
 * @property fromAvator 消息发送者头像
 * @property to      消息接收者ID
 * @property time    消息发送时间
 * @property type    MessageType 消息类型
 * @property content 消息内容
 */
class Message {
  constructor(from, fromName, fromAvator, to, type, content){
    this.from = from + suffix 
    this.fromUserName = from
    this.fromName = fromName
    this.fromAvator = fromAvator
    this.to = to + suffix
    this.toUserName = to
    this.time = getNowFormatDate()
    this.type = type
    this.content = content
    this.MessageType = MessageType
  }
}

function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
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
class Chat {
  constructor(avator, name, target, lastTime, lastContent, messages) {
    this.avator = avator
    this.name = name
    this.target = target
    this.lastTime = lastTime
    this.lastContent = lastContent
    this.messages = messages
  }
}

/**
 * const msg = new Message("test01@10.0.9.201", "test02@10.0.9.201", "2018-01-21 22:03:32", MessageType.TEXT, "呵呵呵")
        im.sendMessage(msg)
 */

module.exports = {
  IMLib: IMLib,
  Message: Message,
  IMLibStatus: Status,
  MessageType: MessageType,
  Chat: Chat
}
