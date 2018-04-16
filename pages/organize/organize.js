// pages/organize/organize.js
import { loadDept } from '../../services/newWebservice';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noData: false,
    depts: [],
    defaultHead: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      defaultHead: '/images/organize/icon_emp1.png'
    });
    loadDept().then(res => {
      console.log(res)
      if (res.code == 500) {
        wx.redirectTo({
          url: '/pages/noAccess/noAccess',
        })
      } else {
        if (res.data <= 0) {
          that.setData({
            noData: true
          })
        } else {
          that.setData({
            depts: res.data
          });
        }
      }
    }).catch(e => console.log(e));
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
  slideChildOrg: function (e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/organize/childOrg/childOrg?key=' + id,
    })
  },
  // 展示详情
  slideDetail: function (e) {
    var id = e.currentTarget.id
    var list = this.data.depts;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      depts: list
    });
  },
  //打电话
  makePhone: function (e) {
    var phone = e.target.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  //新建回话
  call: function (e) {
    var name = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/message/newMessage/newMessage?name=' + name,
    })
  }
})