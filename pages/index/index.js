// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      {
        title: "广告图1",
        url: "/resources/images/home_banner1.jpg"
      },
      {
        title: "广告图2",
        url: "/resources/images/home_banner2.jpg"
      },
      {
        title: "广告图2",
        url: "/resources/images/home_banner3.jpg"
      }
    ],
    wrapItems: [
      {
        title: '申请',
        navigator: '../apply/apply',
        icon: '/resources/images/index/icon_sq.png'
      },
      {
        title: '用车',
        navigator: '../apply/carApply/carApply',
        icon: '/resources/images/index/icon_car.png'
      },
      {
        title: '休假',
        navigator: '../apply/dayApply/dayApply',
        icon: '/resources/images/index/icon_xj.png'
      },
      {
        title: '待办',
        navigator: '../todo/todo',
        icon: '/resources/images/index/icon_db.png'
      },
      {
        title: '计划',
        navigator: '../apply/apply',
        icon: '/resources/images/index/icon_jh.png'
      }
    ],
    companyNews: [
      {
        name: '新闻中心',
        image: '/resources/images/test.jpg',
        content: '小程序数据分析，是面向小程序开发者、运营者的数据分析工具，提供关键指标统计、实时访问监控、自定义分析等，帮助小程序产品迭代优化和运营。主要功能包括每日例行统计的标准分析，以及满足用户个性化需求的自定义分析。'
      },
      {
        name: '业务中心',
        image: '/resources/images/test.jpg',
        content: '未经腾讯同意或授权的情况下，微信小程序的页面内容中，不得存在诱导类行为，包括但不限于诱导分享、诱导关注、诱导下载、诱导抽奖等。如不得要求用户分享、关注或下载后才可操作；不得要求用户分享或关注后才能获得抽奖机会或增加抽奖机会；不得含有明示或暗示用户分享的文案、图片、按钮等；不得通过利益诱惑诱导用户分享、传播；不得用夸张言语来胁迫、引诱用户分享。'
      },
      {
        name: '技术实力',
        image: '/resources/images/test.jpg',
        content: '完全或主要以提供包括但不限于红包功能等资金代收代付、结算清分等功能或服务的微信小程序，不论自行或协助他人实施，都将会被拒绝，但已经取得相关的法定许可或资质的除外。并且，若被腾讯认为存在或可能存在资金款项的风险，可能造成微信用户的损失的，将有权要求该微信小程序补充提供相关资质证照、暂停或永久停止其运营或服务，并有权采取合法手段确保他人的合法权益不受侵犯和威胁。'
      },
      {
        name: '人力资源',
        image: '/resources/images/test.jpg',
        content: '腾讯将在合法权限和能力范围内对开发者发布的小程序进行发布审核，开发者应当真实、准确、及时地选择提交与实际服务相符的类目。开发者不得通过包括但不限于选择与实际服务不相符合的类目、修改或隐藏小程序的内容等方式避开、妨碍腾讯的发布审核。否则，一经发现开发者在审核上线后的小程序所实际提供服务的类目、服务内容与发布审核时提交的内容存在新增、差异的，腾讯有权视情况对相关小程序采取更为严厉的处罚措施，包括但不限于限制功能、对小程序进行封禁处理，并有权拒绝再向该主体提供服务。'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})