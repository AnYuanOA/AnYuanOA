const clientID = "imWebBrowser";
const isNeedRF = false;
//系统基础
const tokenUrl = "Token";
const paegSize = 10;
const isDebug = false;
const gridHeight = 400;
//是否允许永久登录
const alwaysLogin = true;
//var baseurl = "http://121.40.79.142/bapi/";
//var baseurlbuzapi = "http://121.40.79.142/aymapi/";
const baseurl = "http://10.165.3.99:99/bapi/";
const baseurlbuzapi = "http://10.165.3.99:99/aymapi/";
const baseoaurl = "http://10.165.3.99:99/oaapi/";
//获得某个用户的待办信息
const getmylist_url = baseurl + "api/WorkFlow/getMyWFList";
//获得附件
const biz_get_attchs_url = baseurl + "api/C6DjAttachs/GetDJAttachsByDJBH";
//下载附件
const biz_get_downattch_url = baseurl + "api/C6DjAttachs/DownloadAtt";
//获得流程步骤
const wf_nextsteps_get_url = baseurl + "api/WorkFlow/GetWorkflowNextSteps";
//获得流程步骤的审批人
const wf_nextsteps_apprvs_get_url = baseurl + "api/WorkFlow/GetWorkflowNextApprovers";
//处理流程
const wf_workdeal_url = baseurl + "api/WorkFlow/WorkFlowDeal";
//获得待审批或待遇项详情
const biz_get_xsht_url = baseurlbuzapi + "api/TestAPI/GetXSHT";
//获取信息发布信息
const biz_get_xxfb_url = baseoaurl + "api/oaPortalMsg/Get";

/** 
 * 登录
 * @params username 用户名
 * @params password 密码
 * @params succeed  成功回调
 * @params failed 失败回调
 */
function Login(params) {
  var fullurl = baseurl + tokenUrl;
  wx.request({
    url: fullurl, 
    method: "POST",
    header: {
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: {
      grant_type: 'password',
      username: params.username,
      password: params.password,
      client_id: clientID
    },
    success: function (res) {
      try {
        wx.setStorageSync('ar', res.data)
        params.succeed()
      } catch (e) {
        wx.showToast({
          title: '登录失败',
        })
        params.failed()
      }
      console.log(res.data)
    },
    fail: function(res) {
      params.failed()
    }
  })
}

function NeedToRefreshToken() {
  try {
    var tk = wx.getStorageSync('ar')
    if (tk != null && tk != undefined) {
      var now = new Date();
      var expdate = new Date(tk[".expires"]);
      //如果过期时间 - 当前时间 在1分钟内，则刷新
      var ts = expdate - now;
      var minutes = Math.floor(ts / (60 * 1000));
      if (minutes <= 1) {
        return true;
      }
    }
    return false
  } catch (e) {
    return false
  }
}

/**
 * 刷新Token
 * @param succeed 成功回调
 * @param failed 失败回调
 */
function RefreshToken(params) {
  if(!params){
    params = {}
  }
  try {
    var tk = wx.getStorageSync('ar')
    if (tk) {
      var fullurl = baseurl + tokenUrl
      wx.request({
        url: fullurl,
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: {
          grant_type: 'refresh_token',
          refresh_token: tk.refresh_token,
          client_id: clientID
        },
        success: function (res) {
          try {
            wx.setStorageSync('ar', res.data)
            if (params.succeed){
              params.succeed()
            }
          } catch (e) {
            wx.showToast({
              title: '登录失效',
            })
            if (params.failed){
              params.failed()
            }
          }
        },
        fail: function (res) {
          if (params.failed) {
            params.failed()
          }
        }
      })
    }else{
      if (params.failed) {
        params.failed()
      }
    }
  } catch (e) {
    if (params.failed) {
      params.failed()
    }
  }
}

/**
 * 尝试发送请求
 * @params url
 * @params data 参数，json格式
 * @params success 成功回调
 * @params fail  失败回调
 */
function tryRequest(params){
  if(!params){
    params = {}
  }
  if(NeedToRefreshToken()){
    RefreshToken({
      succeed: function(){
        request(params)
      },
      failed: function() {
        if(params.fail){
          params.fail()
        }
      }
    })
  }else{
    request(params)
  }
}

/**
 * 发送请求
 * @params url 
 * @params data 参数，json格式
 * @params success 成功回调
 * @params fail  失败回调
 */
function request(params){
  try {
    var tk = wx.getStorageSync('ar')
    wx.request({
      url: params.url,
      method: "POST",
      header: {
        'Authorization': "Bearer" + " " + tk.access_token
      },
      data: params.data,
      success: function (res) {
        if (params.success){
          params.success(res.data)
        }
      },
      fail: params.fail
    })
  } catch (e) {
    if (params.fail) {
      params.fail()
    }
  }
}

/***
 * 获取待办列表
 * @params success 成功回调
 * @params fail  失败回调
 */
function getTodoList(params){
  if(!params){
    params = {}
  }
  var data = {
    count: 10,
    flag: 1,
    key: "",
    lastTime: "",
    setload: 0
  }
  
  tryRequest({
    url: getmylist_url,
    data: data,
    success: function(res){
      if (parseInt(res.success) == 0){//成功
        if (params.success){
          params.success(res.wfList)
        }
      }else{
        if (params.fail) {
          params.fail(res.mes)
        }
      }
    },
    fail: function(res){
      if(params.fail){
        params.fail('请求失败')
      }
    }
  })
}



module.exports = {
  login: Login,
  getTodoList: getTodoList
}
