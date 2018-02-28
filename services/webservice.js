/**
 * WebServiceCallback {
 *  success:function(data){
 *    data为服务端返回数据中的data字段
 *  },
 *  fail:function(msg){
 *    msg服务端返回msg
 *  }
 * }
 */
/**
 * 本地存储sessionID key
 */
const SESSIONID_KEY = "JSESSIONID"

const BASE_URL = "http://localhost:8080/web-service"
/**
 * 使用用户名密码登录并绑定openID
 */
const LOGIN_URL = "/login/loginAnyuanUser"
/**
 * 使用openID登录
 */
const LOGIN_OPENID_URL = "/login/loginWithOpenID"
/**
 * 获取待办列表
 */
const GET_TODO_LIST_URL = "/workflow/getToDoList"
/**
 * 获取待阅列表
 */
const GET_TOREAD_LIST_URL = "/workflow/getToReadList"
/**
 * 获取待办详情
 */
const GET_TODO_DETAIL_URL = "/workflow/getToDoDetail"
/**
 * 获取请假类型列表
 */
const GET_RESTTYPELIST_URL = "/workflow/getRestTypeList"
/**
 * 获取用车类型列表
 */
const GET_USINGTYPELIST_URL = "/workflow/getUsingTypeList";
/**
 * 提交请假申请
 */
const SUBMIT_LEAVE_URL = "/workflow/submitLeave";
/**
 * 提交用车申请
 */
const SUBMIT_USCAR_URL = "/workflow/submitUsingCar";
/**
 * 办理流程
 */
const PROCESS_WORKFLOW_URL = "/workflow/processWorkflow";

/**
 * 发起网络请求
 * params: {
 *  url:网络请求地址
 *  params:请求参数
 *  success:请求成功回调
 *  fail:请求失败回调
 * }
 */
function request(params) {
  const sessionId = wx.getStorageSync(SESSIONID_KEY)
  wx.request({
    url: BASE_URL + params.url,
    data: params.params,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'JSESSIONID': sessionId
    },
    success: function (res) {
      if(params.success){
        params.success(res)
      }
    },
    fail: function () {
      if (params.fail) {
        params.fail()
      }
    }
  })
}

/**
 * 登录
 * @params params {
 *  userName: 用户名,
    account: 用户名,
    openId: 微信openID,
    password: 密码,
    chatNick: 微信昵称,
    avatarUrl: 微信头像
 * }
 * @params callback WebServiceCallback
 */
function login(params, callback) {
  request({
    url: LOGIN_URL,
    params: params,
    success: function(res){
      if (res.data.code == 200) {
        wx.setStorage({
          key: SESSIONID_KEY,
          data: res.data.data,
        })
        if (callback.success) {
          callback.success(res.data.data)
        }
      } else {
        if (callback.fail) {
          callback.fail(res.data.message)
        }
      }
    },
    fail: function(){
      if (callback.fail) {
        callback.fail("网络请求失败")
      }
    }
  })
}

/**
 * 使用openID登录
 * @params openID 微信openID
 * @params callback WebServiceCallback
 */
function loginWithOpenID(openID, callback) {
  request({
    url: LOGIN_OPENID_URL,
    params: {
      openId: openID
    },
    success: function(res) {
      if (res.data.code == 200) {
        wx.setStorage({
          key: SESSIONID_KEY,
          data: res.data.data,
        })
        if (callback.success) {
          callback.success(res.data.data)
        }
      } else {
        if (callback.fail) {
          callback.fail(res.data.message)
        }
      }
    },
    fail: function() {
      if (callback.fail) {
        callback.fail("网络请求失败")
      }
    }
  })
}

/**
 * 获取待办列表
 * @params lastTime 可为空，上一页最后一项的APPID
 * @params callback WebServiceCallback
 */
function loadToDoList(lastTime, callback) {
  request({
      url: GET_TODO_LIST_URL,
      params: {
        lastTime: lastTime
      },
      success: function(res) {
        if (res.data.code == 200) {
          if (callback.success) {
            callback.success(res.data.data)
          }
        } else {
          if (callback.fail) {
            callback.fail(res.data.message)
          }
        }
      },
      fail: function() {
        if (callback.fail) {
          callback.fail("网络请求失败")
        }
      }
  })
}

/**
 * 获取待阅列表
 * @params currentPage 当前页码，从1开始
 * @params WebServiceCallback
 */
function loadToReadList(currentPage, callback) {
  request({
    url: GET_TOREAD_LIST_URL,
    params: {
      currentPage: currentPage
    },
    success: function(res) {
      if (res.data.code == 200) {
        if (callback.success) {
          callback.success(res.data.data)
        }
      } else {
        if (callback.fail) {
          callback.fail(res.data.message)
        }
      }
    },
    fail: function() {
      if (callback.fail) {
        callback.fail("网络请求失败")
      }
    }
  })
}

module.exports = {
  login: login,
  loginWithOpenID: loginWithOpenID,
  loadToDoList: loadToDoList,
  loadToReadList: loadToReadList
}