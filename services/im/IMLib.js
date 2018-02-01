const StropheLib = require("./strophe.js")
const Strophe = StropheLib.Strophe

const BOSH_SERVICE = 'wss://101.37.171.186:7443/ws/'
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

      if (status == Strophe.Status.CONNECTED) {
        console.log("连接及时通讯服务器成功");
        //发送上线消息
        self.connection.send($pres());
        self.connection.addHandler(function (msg) {
          return self.handleMessage(msg)
        }, null, 'message', null, null, null);
      }
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
      msgTime: message.time,
      msgType: message.type+""
    }).cnode(Strophe.xmlElement('body', '', message.content))
    this.connection.send(msg)
  }

  /***
   * 处理消息
   */
  handleMessage(msg) {
    const to = msg.getAttribute('to')
    const from = msg.getAttribute('from')
    const type = msg.getAttribute('type')
    const msgTime = msg.getAttribute('msgTime')
    const msgType = parseInt(msg.getAttribute('msgType'))
    const elems = msg.getElementsByTagName('body')

    if (type == "chat" && elems.length > 0) {
      const body = elems[0]
      const content = Strophe.getText(body)
      const message = new Message(from, to, msgTime, msgType, content)
      if(msgType == MessageType.TEXT){
        if (this.callbacks.onTextMessage) {
          this.callbacks.onTextMessage(message)
        }
      }
    }
    return true
  }
}

/***
 * 消息
 * @property from    消息发送者ID
 * @property to      消息接收者ID
 * @property time    消息发送时间
 * @property type    MessageType 消息类型
 * @property content 消息内容
 */
class Message {
  constructor(from, to, time, type, content){
    this.from = from
    this.to = to
    this.time = time
    this.type = type
    this.content = content
    this.MessageType = MessageType
  }
}

module.exports = {
  IMLib: IMLib,
  Message: Message,
  IMLibStatus: Status,
  MessageType: MessageType
}
