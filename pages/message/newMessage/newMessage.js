// pages/message/newMessage/newMessage.js
// const ChatStore = require("../../../utils/chatstore.js");
// const chatLib = require("../../../services/im/IMLib.js");
// const util = require('../../../utils/util.js');
// const Message = chatLib.Message;
// const MessageType = chatLib.MessageType;
// const Chat = chatLib.Chat;

import dayjs from '../../../lib/dayjs/dayjs.min.js';
import * as wxUtils from '../../../utils/wxUtils';
import { imUtils, Message } from '../../../services/IM';
import * as newWebservice from '../../../services/newWebservice';


/** added by yandixuan **/
const { im, regeneratorRuntime, } = global;
const MessageType = Message.MessageType;

const app = getApp();


//界面消息类型 文本||语音
const messageWay = {
  TEXT: `text`,
  VOICE: `voice`
};
//录音管理||播放管理
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
const wxWindowInfo = wxUtils.getWindowInfo();

const recordsOptions = {
  duration: 600000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'mp3'
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    handleRef: [],
    localUserInfo: null,
    nowDate: '',
    mine: '',
    toUser: '',
    toUserHead: '',
    messageData: [],
    messageWay: messageWay.TEXT
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let that = this;

    //及时通讯监听
    let id = im.registerCallback(function () {
      that.loadMessageList();
    });

    //app.setImMessageListener(this.onReceiveImMessage)

    //绑定语音播放监听函数
    innerAudioContext.onPlay(() => {
      console.log('开始播放');
    });
    innerAudioContext.onError(res => {
      console.log(res.errMsg)
      console.log(res.errCode)
    });
    innerAudioContext.onEnded(res => {
      restVoice(this.data.messageData, this)
    });
    innerAudioContext.onStop(res => {
      restVoice(this.data.messageData, this)
    });

    //录音监听函数
    recorderManager.onStart(() => {
      console.log('recorder start');
    });
    recorderManager.onResume(() => {
      console.log('recorder resume');
    });
    recorderManager.onPause(() => {
      console.log('recorder pause');
    });
    recorderManager.onStop((res) => {
      let { tempFilePath } = res
      newWebservice.uploadFile(tempFilePath).then(res => {
        let src = JSON.parse(res.data).src;
        let extra = { isPlay: false };
        let msg = assembleMessage(that, MessageType.VOICE, src, extra);
        im.sendMessage(msg);
        that.setData({
          messageData: that.data.messageData
        });
      }).catch(error => {
        console.log(error);
      });

    });


    /** ========== 加载页面所需数据 ===========**/
    const _name = options.name.split(",");

    var to_username = _name[0];
    var to_userCname = _name[1];
    var head = _name[2];
    const localUserInfo = wxUtils.getLocalUserInfo();
    var my = localUserInfo.userName;

    if (head == null || head == "" || head == 'null') {
      head = '/images/login_head.jpg';
    }

    wx.setNavigationBarTitle({
      title: to_userCname
    });

    const _handleRef = this.data.handleRef;
    _handleRef.push(id);

    this.setData({
      handleRef: _handleRef,
      mine: my,
      toUser: to_username,
      toUserCname: to_userCname,
      localUserInfo: localUserInfo,
      toUserHead: head,
      nowDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      messageWay: messageWay.TEXT
    });
    this.loadMessageList();
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
    for (let id of this.data.handleRef) {
      im.cancelCallback(id);
    }
    let _chatlist = imUtils.getStoreChatList();
    let _chat = imUtils.getChatByTarget(this.data.toUser);

    for (let chat of _chatlist) {
      if (_chat && chat.target == _chat.target) {
        chat.isChatting = false;
        imUtils.storeChatList(_chatlist);
      }
    }
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

  //载入聊天消息
  loadMessageList() {
    let chat = imUtils.getChatByTarget(this.data.toUser);
    let messageList = [];
    if (chat) {
      messageList = chat.messages;
    }
    this.setData({
      messageData: messageList
    });
  },

  //表单clean
  cleanInput(e) {

  },

  //input 输入绑定页面数据
  bindMessage: function (e) {
    this.setData({
      userMessage: e.detail.value
    })
  },

  //文本消息发送
  sendMessage: function (e) {
    if (!this.data.userMessage.trim()) return
    var that = this
    let extra = {};
    let msg = assembleMessage(that, MessageType.TEXT, this.data.userMessage.trim(), extra);
    im.sendMessage(msg);
    this.setData({
      messageData: this.data.messageData
    });
  },

  //改变聊天类型：语音|文字
  changeType: function (e) {
    for (let i in messageWay) {
      if (messageWay[i] == this.data.messageWay) {
        continue;
      } else {
        this.setData({ messageWay: messageWay[i] });
        break;
      }
    }
  },
  //开始按时
  touchStart: function (e) {
    app.showLoadToast('正在发送', 1500);
    recorderManager.start(recordsOptions);
  },

  //结束按时
  touchEnd: function (e) {
    recorderManager.stop();
  },

  //点击播放语音
  palyVoice(e) {
    let msg = e.currentTarget.dataset.msg;
    let msgs = e.currentTarget.dataset.msgs;
    console.log(msg.content)
    innerAudioContext.src = msg.content;
    restVoice(msgs, this);
    updateVoice(msg, msgs, this);
    innerAudioContext.play();
  },

  //发送图片
  async sendImage(e) {
    let that = this;
    //包裹代码块 防止捕获不到异常
    try {
      let filePaths = await wxUtils.chooseImg();
      let res = await newWebservice.uploadFile(filePaths[0]);
      let imageSrc = JSON.parse(res.data).src;
      let info = await wxUtils.getIamgeInfo(imageSrc);
      let afterSize = wxUtils.imageUtil(info, wxWindowInfo);//分析大小

      let extra = {
        isPlay: false,
        imageWidth: afterSize.imageWidth,
        imageHeight: afterSize.imageHeight,
      }
      let msg = assembleMessage(that, MessageType.IMAGE, imageSrc, extra);
      im.sendMessage(msg);
      that.setData({
        messageData: that.data.messageData
      });
    } catch (error) {
      console.log(error);
    }
  }
});

/**重置声音效果 */
function restVoice(msgs, that) {
  for (let i = 0; i < msgs.length; i++) {
    msgs[i].extra.isPlay = false;
  }
  that.setData({
    messageData: msgs
  });
}
/**更新声音效果 */
function updateVoice(msg, msgs, that) {
  for (let j = 0; j < msgs.length; j++) {
    if (Object.values(msgs[j]).indexOf(msg.id) > -1) {
      msgs[j].extra.isPlay = true;
      that.setData({
        messageData: msgs
      });
      break;
    }
  }
}
/** 组装消息数据 */
function assembleMessage(that, msgType, content, extra) {
  const userInfo = wxUtils.getLocalUserInfo();
  //Message ss = new Message(obj.fromName, obj.fromCname, obj.fromAvator, obj.toName, obj.chatType, obj.msgType, obj.content, obj.extra);
  const msg = new Message(userInfo.userName, userInfo.user.cName, userInfo.avatarUrl, that.data.toUser, that.data.toUserCname, 'chat', msgType, content, extra);
  if (!that.data.messageData) {
    that.data.messageData = []
  }
  that.data.messageData.unshift(msg);
  msg.toAvator = that.data.toUserHead;
  //msg.toCName = that.data.toUserCname;
  return msg;
}

