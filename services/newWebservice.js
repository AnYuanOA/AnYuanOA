import { BASE_URL } from '../utils/const';
//URL信息
const LOGIN_URL = "/login/loginAnyuanUser"; //使用用户名密码登录并绑定openID
const LOGIN_OPENID_URL = "/login/loginWithOpenID";//使用openID登录
const LOGOUT_URL = "/login/logout";//退出登录，解除绑定

const GET_TODO_LIST_URL = "/workflow/getToDoList";//获取待办列表
const GET_TOREAD_LIST_URL = "/workflow/getToReadList";//获取待阅列表
const GET_TODO_DETAIL_URL = "/workflow/getToDoDetail";//获取待办详情
const GET_RESTTYPELIST_URL = "/workflow/getRestTypeList";//获取请假类型列表
const GET_USINGTYPELIST_URL = "/workflow/getUsingTypeList";//获取用车类型列表
const SUBMIT_LEAVE_URL = "/workflow/submitLeave";//提交请假申请
const SUBMIT_USCAR_URL = "/workflow/submitUsingCar";//提交用车申请
const PROCESS_WORKFLOW_URL = "/workflow/processWorkflow";//办理流程

const LOAD_DEPT_DEPT = '/dept/showAllDept';//载入部门列表
const GET_SELF_USERINFO_URL = '/user/getSelfUser';//获取当前用户信息
const FILE_UPLOAD_URL = '/file/upload';//向服务器上传文件
const FILE_FETCH_URL = '/file';//向服务器读取文件
//
const SESSIONID_KEY = "JSESSIONID";//本地存储sessionID key
const NO_PERMISSION_CODE = '10001';//无权限访问code
const USER_NOT_BIND_CODE = '10002'; //用户未绑定code
const REQUEST_OK_CODE = '200';//接口请求成功code
const ERROR_CODE = '500';


/**
 * 
 * 后台统一数据格式 {code:'',message:''} || {code:'',data:''}
 * 
 */

/**
 * 基础网络请求 Promise
 */
function WxRequest(url, data, method, header) {

  if (!method) {
    method = 'POST';
  }

  if (!header) {
    let sessionId = wx.getStorageSync(SESSIONID_KEY);
    header = {
      'content-type': 'application/x-www-form-urlencoded',
      'JSESSIONID': sessionId
    }
  }

  let promise = new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      data: data,
      method: method,
      header: header,
      success: function (res) {
        if (res.data.code == USER_NOT_BIND_CODE) {
          wx.redirectTo({
            url: '/pages/login/login'
          });
          let obj = { message: '用户没有绑定', url: url };
          console.log(obj);
          reject({ message: '用户没有绑定' });
        } else if (res.data.code == NO_PERMISSION_CODE) {
          let obj = { message: '无权限访问', url: url };
          console.log(obj);
          reject({ message: '无权限访问' });
        }
        else if (res.data.code == ERROR_CODE) {
          reject(res.data);
        }
        else if (res.data.code == REQUEST_OK_CODE) {
          resolve(res.data);
        }
      },
      fail: function (e) {
        let obj = { message: '网络故障', url: url };
        console.log(obj);
        reject(obj);
      }
    });
  });
  return promise;
}

/**
 * 发送 JScode 到后台换取 openId, sessionKey, unionId
 */
export function sendJsCode(jsCode) {
  let url = '/login/getUserOpenId';
  let data = { jsCode: jsCode };
  let header = {
    'content-type': 'application/json'
  };
  return WxRequest(url, data, 'GET', header);
}

/**
 * 使用openID登录
 * @params openID 微信openID
 */
export function loginWithOpenID(openID) {
  let data = {
    openId: openID
  };
  return WxRequest(LOGIN_OPENID_URL, data);
}

//获取安源用户信息
export function loadUserInfo(openId) {
  let data = { openId: openId };

  return WxRequest(GET_SELF_USERINFO_URL, data).then(res => {
    let userInfo = {};
    const user = res.data;
    if (user) {
      userInfo.user = user;
      userInfo.userName = user.userName;
      userInfo.account = user.userName;
      userInfo.openId = openId;
      userInfo.password = user.wPassword;
      userInfo.chatNick = user.chatNick;
      userInfo.avatarUrl = user.avatarUrl;
      wx.setStorageSync("USER_INFO", userInfo);
      return Promise.resolve(userInfo);
    } else {
      let obj = { message: '无法获取安源用户信息', url: GET_SELF_USERINFO_URL }
      console.log(obj);
      return Promise.reject(obj);
    }
  }
  ).catch(e => {
    return Promise.reject(e);
  });
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
export function ayLogin(params) {
  return WxRequest(LOGIN_URL, params).then(res => {
    wx.setStorageSync(SESSIONID_KEY, res.data);
    return Promise.resolve(res);
  }).catch(error => {
    console.log(error)
    return Promise.reject(error);
  });
}

/**
 * 载入部门列表
 */
export function loadDept() {
  return WxRequest(LOAD_DEPT_DEPT, {}, 'GET');;
}

//上传文件至服务器
export function uploadFile(tempFilePath) {
  let promise = new Promise((resolve, reject) => {
    wx.uploadFile({
      url: BASE_URL + FILE_UPLOAD_URL,
      filePath: tempFilePath,
      name: 'file',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'JSESSIONID': wx.getStorageSync('JSESSIONID')
      },
      success: function (e) {
        resolve(e);
      },
      fail: function (e) {
        reject(e);
      }
    });
  });
  return promise;
}












// //下载文件
// export function downloadFile(fileName) {
//   let promise = new Promise((resolve, reject) => {
//     wx.downloadFile({
//       url: BASE_URL + FILE_FETCH_URL,
//       header: {
//         'content-type': 'application/x-www-form-urlencoded',
//         'JSESSIONID': wx.getStorageSync('JSESSIONID')
//       },
//       success: function (res) {
//         if (res.statusCode === 200) {
//           resolve(res);
//         } else {
//           reject(res);
//         }
//       },
//       fail: function (e) {
//         reject(e);
//       }
//     });
//   });
//   return promise;
// }

