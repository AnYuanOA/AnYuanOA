/**使用es6 export方便点 */
/** 基本封装下请求成promise */


export function wxLogin() {
  let promise = new Promise((resolve, reject) => {
    wx.login({
      success: res => resolve(res),
      fail: e => reject(e)
    });
  });
  return promise;
}

//选择图片
export function chooseImg() {
  let promise = new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        resolve(res.tempFilePaths);
      },
      fail: function (e) {
        reject(e);
      }
    })
  });
  return promise;
}

//获取图片信息
export function getIamgeInfo(src) {
  let promise = new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: src,
      success: function (res) {
        resolve(res);
      },
      fail: function (e) {
        reject(e);
      }
    });
  });
  return promise;
}

//获取用户的当前设置
export function getWxSetting() {
  let promise = new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => resolve(res),
      fail: error => reject(error)
    });
  });
  return promise;
}

//获取用应当需要的权限
export function wxAuthorize(scope) {
  let promise = new Promise((resolve, reject) => {
    wx.authorize({
      scope: scope,
      faile: e => reject(e),
      complete: info => { resolve(info) }
    });
  });
  return promise;
}

//获取用户信息
export function wxGetUserInfo() {
  let promise = new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: res => resolve(res),
      faile: e => reject(e)
    });
  });
  return promise;
}

/**
   * 取得图片宽高比
   */
export function getWindowInfo() {
  const res = wx.getSystemInfoSync();
  //获取宽高比
  return { windowWidth: res.windowWidth, windowHeight: res.windowHeight };
}

/**
 * 获取本地用户信息
 */
export function getLocalUserInfo() {
  let info = wx.getStorageSync('USER_INFO');
  return info;
}

/**
 * 计算相应的图片所该有的尺寸 网上抄的
 */
export function imageUtil(imageInfo, wxWindowInfo) {
  let { windowWidth, windowHeight } = wxWindowInfo;//微信可用屏幕尺寸
  let { width, height } = imageInfo;
  let imageSize = {};//返回参数

  // let originalWidth = e.width;//图片原始宽  
  // let originalHeight = e.height;//图片原始高  
  //let originalScale = originalHeight / originalWidth;//图片高宽比  
  let originalScale = height / width;//图片高宽比  
  let windowscale = windowHeight / windowWidth;//屏幕高宽比  

  if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比  
    //图片缩放后的宽为屏幕宽  
    imageSize.imageWidth = windowWidth;
    imageSize.imageHeight = (windowWidth * height) / width;
  } else {//图片高宽比大于屏幕高宽比  
    //图片缩放后的高为屏幕高  
    imageSize.imageHeight = windowHeight;
    imageSize.imageWidth = (windowHeight * width) / height;
  }
  return imageSize;
}