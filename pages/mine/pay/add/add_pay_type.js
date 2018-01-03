// pages/mine/pay/add/add_pay_type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountTypeList: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '对公账户'
      },
      {
        id: 2,
        name: '个人账户'
      }
    ],
    accountTypeIndex: 0,
    bankList: [
      {id: 0, name: '请选择'},
      {id: 1, name:'中国银行'},
      {id: 2, name: '中国农业银行' },
      {id: 3, name: '招商银行' },
      {id: 4, name: '广发银行' }
    ],
    bankIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  onAccountTypePickerChanged: function(e) {
    this.setData({
      accountTypeIndex: e.detail.value
    })
  },

  onBankPickerChanged: function (e) {
    this.setData({
      bankIndex: e.detail.value
    })
  }
})