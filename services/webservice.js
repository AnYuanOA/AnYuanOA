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
/**
 * 无权限访问code
 */
const NO_PERMISSION_CODE = 10001
/**
 * 用户未绑定code
 */
const USER_NOT_BIND_CODE = 10002
/**
 * 接口请求成功code
 */
const REQUEST_OK_CODE = 200


const BASE_URL = "https://weixin.anyuanhb.com/web-service"
//const BASE_URL = "http://192.168.0.107:8080/web-service"
/**
 * 使用用户名密码登录并绑定openID
 */
const LOGIN_URL = "/login/loginAnyuanUser"
/**
 * 使用openID登录
 */
const LOGIN_OPENID_URL = "/login/loginWithOpenID"
/**
 * 退出登录，解除绑定
 */
const LOGOUT_URL = "/login/logout"
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
 * 获取当前用户信息
 */
const GET_SELF_USERINFO_URL = "/user/getSelfUser"
/**
 * 向服务器上传文件
 */
const FILE_UPLOAD_URL = '/file/upload';
/**
 * 向服务器读取文件
 */
const FILE_FETCH_URL = '/file';

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
      if (res.data.code == USER_NOT_BIND_CODE) {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      } else {
        if (params.success) {
          params.success(res)
        }
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
    success: function (res) {
      if (res.data.code == REQUEST_OK_CODE) {
        wx.setStorageSync(SESSIONID_KEY, res.data.data)
        loadUserInfo(params.openId, function () {
          if (callback && callback.success) {
            callback.success(res.data.data)
          }
        })
      } else {
        if (callback && callback.fail) {
          callback.fail(res.data.message)
        }
      }
    },
    fail: function () {
      if (callback && callback.fail) {
        callback.fail("网络请求失败")
      }
    }
  })
}

/**
 * 加载用户信息
 */
function loadUserInfo(openId, callback) {
  request({
    url: GET_SELF_USERINFO_URL,
    params: {
      openId: openId
    },
    success: function (res) {
      if (res.data.code == REQUEST_OK_CODE) {
        var user = res.data.data
        if (user) {
          var userInfo = {}
          userInfo.user = user
          userInfo.userName = user.userName
          userInfo.account = user.userName
          userInfo.openId = openId
          userInfo.password = user.wPassword
          userInfo.chatNick = user.chatNick
          userInfo.avatarUrl = user.avatarUrl
          wx.setStorageSync("USER_INFO", userInfo)
        }
      }
      if (callback) {
        callback()
      }
    },
    fail: function () { }
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
    success: function (res) {
      if (res.data.code == REQUEST_OK_CODE) {
        wx.setStorageSync(SESSIONID_KEY, res.data.data)
        if (callback && callback.success) {
          callback.success(res.data.data)
        }
      } else {
        if (callback && callback.fail) {
          callback.fail(res.data.message)
        }
      }
    },
    fail: function () {
      if (callback && callback.fail) {
        callback.fail("网络请求失败")
      }
    }
  })
}

/**
 * 退出登录解除绑定
 * @param openID
 */
function logoutWithOpenId(openID, callback) {
  request({
    url: LOGOUT_URL,
    params: {
      openId: openID
    },
    success: function (res) {
      if (res.data.code == REQUEST_OK_CODE) {
        if (callback && callback.success) {
          callback.success(res.data.data)
        }
      } else {
        if (callback && callback.fail) {
          callback.fail(res.data.message)
        }
      }
    },
    fail: function () {
      if (callback && callback.fail) {
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
    success: function (res) {
      if (res.data.code == REQUEST_OK_CODE) {
        if (callback && callback.success) {
          callback.success(res.data.data)
        }
      } else {
        if (callback && callback.fail) {
          callback.fail(res.data.message)
        }
      }
    },
    fail: function () {
      if (callback && callback.fail) {
        callback.fail("网络请求失败")
      }
    }
  })
}

/**
 * 获取待阅列表
 * @params currentPage 当前页码，从1开始
 * @params callback WebServiceCallback
 */
function loadToReadList(currentPage, callback) {
  request({
    url: GET_TOREAD_LIST_URL,
    params: {
      currentPage: currentPage
    },
    success: function (res) {
      if (res.data.code == REQUEST_OK_CODE) {
        if (callback && callback.success) {
          callback.success(res.data.data)
        }
      } else {
        if (callback && callback.fail) {
          callback.fail(res.data.message)
        }
      }
    },
    fail: function () {
      if (callback && callback.fail) {
        callback.fail("网络请求失败")
      }
    }
  })
}

/**
 * 加载请假类型列表
 * @params callback WebServiceCallback
 */
function loadRestTypeList(callback) {
  request({
    url: GET_RESTTYPELIST_URL,
    success: function (res) {
      if (res.data.code == REQUEST_OK_CODE) {
        if (callback && callback.success) {
          callback.success(res.data.data)
        }
      } else {
        if (callback && callback.fail) {
          callback.fail(res.data.message)
        }
      }
    },
    fail: function () {
      if (callback && callback.fail) {
        callback.fail("网络请求失败")
      }
    }
  })
}

/**
 * 提交请假申请
 * @params params 请假申请字段json字符串，详见测试用例
 * @params callback WebServiceCallback
 */
function levealApply(params, callback) {
  request({
    url: SUBMIT_LEAVE_URL,
    params: {
      param: params
    },
    success: function (res) {
      if (res.data.code == REQUEST_OK_CODE) {
        if (callback && callback.success) {
          callback.success(res.data.data)
        }
      } else {
        if (callback && callback.fail) {
          callback.fail(res.data.message)
        }
      }
    },
    fail: function () {
      if (callback && callback.fail) {
        callback.fail("网络请求失败")
      }
    }
  })
}

/**
 * 加载用车类型列表
 * @params callback WebServiceCallback
 */
function loadUsCarTypeList(callback) {
  request({
    url: GET_USINGTYPELIST_URL,
    success: function (res) {
      if (res.data.code == REQUEST_OK_CODE) {
        if (callback && callback.success) {
          callback.success(res.data.data)
        }
      } else {
        if (callback && callback.fail) {
          callback.fail(res.data.message)
        }
      }
    },
    fail: function () {
      if (callback && callback.fail) {
        callback.fail("网络请求失败")
      }
    }
  })
}

/**
 * 用车申请
 * @params params 用车申请字段json字符串，详见测试用例
 * @params callback WebServiceCallback
 */
function usCarApply(params, callback) {
  request({
    url: SUBMIT_USCAR_URL,
    params: {
      param: params
    },
    success: function (res) {
      if (res.data.code == REQUEST_OK_CODE) {
        if (callback && callback.success) {
          callback.success(res.data.data)
        }
      } else {
        if (callback && callback.fail) {
          callback.fail(res.data.message)
        }
      }
    },
    fail: function () {
      if (callback && callback.fail) {
        callback.fail("网络请求失败")
      }
    }
  })
}

module.exports = {
  login: login,
  loginWithOpenID: loginWithOpenID,
  logoutWithOpenId: logoutWithOpenId,
  loadToDoList: loadToDoList,
  loadToReadList: loadToReadList,
  loadRestTypeList: loadRestTypeList,
  levealApply: levealApply,
  loadUsCarTypeList: loadUsCarTypeList,
  usCarApply: usCarApply,
  loadUserInfo: loadUserInfo
}