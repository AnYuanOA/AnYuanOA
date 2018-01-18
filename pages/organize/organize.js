// pages/organize/organize.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orgData: [
      {
        code:'001',
        open: false,
        name: '领导层',
        empData: [
          {
            name: '张三',
            phone:'19012733888',
            position: '总经理'
          }, {
            name: '李四',
            phone: '19012733888',
            position: '副总'
          }, {
            name: '王五',
            phone: '19012733888',
            position: '副总'
          }
        ]
      }, {
        code: '002',
        open: false,
        name: '安全事业部',
        empData: [
          {
            name: '骞天',
            phone: '19012733888',
            position: '主任'
          }, {
            name: '烁骞',
            phone: '19012733888',
            position: '部长'
          }, {
            name: '博俊',
            phone: '19012733888',
            position: '专员'
          }, {
            name: '芃震',
            phone: '19012733888',
            position: '专员'
          }, {
            name: '博星',
            phone: '19012733888',
            position: '专员'
          }
        ]
      }, {
        code: '003',
        open: false,
        name: '环境事业部',
        empData: [
          {
            name: '腾辰',
            phone: '19012733888',
            position: '科长'
          }, {
            name: '升驰',
            phone: '19012733888',
            position: '专员'
          }, {
            name: '梓濡',
            phone: '19012733888',
            position: '专员'
          }
        ]
      }, {
        code: '004',
        open: false,
        name: '综合管理部',
        empData: [
          {
            name: '蔚丽',
            phone: '19012733888',
            position: '人事经理'
          }, {
            name: '薇薇',
            phone: '19012733888',
            position: '人事专员'
          }, {
            name: '妍鑫',
            phone: '19012733888',
            position: 'HRBP'
          }
        ]
      }, {
        code: '005',
        open: false,
        name: '市场部',
        empData: [
          {
            name: '美惠',
            phone: '19012733888',
            position: '经理'
          }, {
            name: '茜克',
            phone: '19012733888',
            position: '部长'
          }, {
            name: '柔雪',
            phone: '19012733888',
            position: '主任'
          }, {
            name: '璐彩',
            phone: '19012733888',
            position: '副主任'
          }, {
            name: '珊梦',
            phone: '19012733888',
            position: '副主任'
          }, {
            name: '珠涵',
            phone: '19012733888',
            position: '专员'
          }, {
            name: '格馨',
            phone: '19012733888',
            position: '专员'
          }, {
            name: '曦慧',
            phone: '19012733888',
            position: '专员'
          }, {
            name: '婧初',
            phone: '19012733888',
            position: '专员'
          }, {
            name: '婧馨',
            phone: '19012733888',
            position: '专员'
          }
        ]
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

  },
  // 展示详情
  slideDetail: function (e) {
    var id = e.currentTarget.id,
      list = this.data.orgData;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].code == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      orgData: list
    });
  }
})