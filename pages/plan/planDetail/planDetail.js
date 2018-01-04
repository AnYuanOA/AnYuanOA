// pages/plan/planDetail/planDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jhData: [{
      year: 2018,
      jhType: '合同',
      title: '合同年度计划汇总测试',
      open: false
    }, {
      year: 2017,
      jhType: '产值',
      title: '产值年度计划汇总',
      open: false
    },
    {
      year: 2016,
      jhType: '收费',
      title: '收费2017年计划',
      open: false
    }, {
      year: 2015,
      jhType: '资质',
      title: '资质测试',
      open: false
    }, {
      year: 2014,
      jhType: '科研',
      title: '科研项目汇总',
      open: false
    }, {
      year: 2013,
      jhType: '科研',
      title: '科研项目汇总',
      open: false
    }]
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
      list = this.data.jhData;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].year == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      jhData: list
    });
  }
})