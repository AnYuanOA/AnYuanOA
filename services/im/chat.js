const chatLib = require("./IMLib.js")
const IMLib = chatLib.IMLib
const IMLibStatus = chatLib.IMLibStatus
const Message = chatLib.Message
const MessageType = chatLib.MessageType

const im = new IMLib()
im.listen({
  onTextMessage: function (msg) {
    console.log(msg)
  }
})
im.connect("test01", "123456", function (status) {
  if (status == IMLibStatus.CONNECTED) {
    const msg = new Message("test01@10.0.9.201", "test02@10.0.9.201", "2018-01-21 22:03:32", MessageType.TEXT, "呵呵呵")
    im.sendMessage(msg)
  }
})