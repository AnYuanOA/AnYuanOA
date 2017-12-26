// pages/emp/emp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: [
      {
        id: 'form',
        name: '领导层',
        open: false,
        userName: ['张三', '李四', '赵武', '测试', '测试123' ],
        org: ['董事长', '副总', '副总', '副总', '副总']
      }, {
        id: 'feedback',
        name: '安全事业部',
        open: false,
        userName: ['张三', '李四', '赵武', '测试', '测试123' ],
        org: ['主任', '副主任', '员工', '员工' ]
      }, {
        id: 'nav',
        name: '环境事业部',
        open: false,
        userName: ['张三', '李四', '赵武', '测试', '测试123' ],
        org: ['主任', '副主任', '员工', '员工']
      }, {
        id: 'media',
        name: '综合管理部',
        open: false,
        userName: ['张三', '李四', '赵武', '测试', '测试123' ],
        org: ['主任', '副主任', '员工', '员工']
      }, {
        id: 'map',
        name: '市场部',
        userName: ['张三', '李四', '赵武', '测试', '测试123' ],
        org: ['主任', '副主任', '员工', '员工']
      },
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

  widgetsToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  }


  
})