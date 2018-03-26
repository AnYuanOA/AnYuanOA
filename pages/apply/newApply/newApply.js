// pages/apply/carApply/carApply.js
var app = getApp();
var date = new Date();
//年  
var Y = date.getFullYear();
//月  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//日  
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
var now = Y + '-' + M + '-' + D;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selfUser: null,
    appType: null,
    showType: 1,
    attltArray: [],
    attltIndex: 0,
    restStartDate: now,
    startTypeSel: ['上午', '下午'],
    startIndex: 0,
    restEndDate: now,
    endTypeSel: ['上午', '下午'],
    endIndex: 0,

    /**休假申请字段 */
    applyUserChnName: null,
    attLT_ID: null,
    attLT_Name: null,
    workflowTitle: null,
    rest_start_date: now,
    startType: '上午',
    rest_end_date: now,
    endType: '上午',
    attL_Reason: null,
    rest_day_num: null,
    appFieldNameXJ: null,


    carType: null,
    carTypeArray: [],
    carIndex: 0,
    isOverTime: ['否', '是'],
    isOverTimeIdx: 0,
    items: [
      { name: '市内', checked: true },
      { name: '市外', checked: false }
    ],

    /**用车申请字段 */
    applyUserDeptName: null,
    applyUserCellphone: null,
    applyUsingType: null,
    applyUsingTypeID: null,
    driverIsOverWork: false,
    overwork: '否',
    inCarNums: null,
    carUsingHours: null,
    usingCarTime: now,
    usingCarRange: '市内',
    dest: null,
    startPoint: null,
    usingReason: null,
    appFieldNameYC: null,

    /**审批人 */
    empsXJs:null,
    empsYCs: null,
    selectEmpxj:[],
    idxEmpxj:0,
    selectEmpyc: [],
    idxEmpyc: 0,
  },

  /**
   * 监听休假类型picker选择器
   */
  listenerPickerSelectedAttlt: function (e) {
    var that = this
    that.setData({
      attltIndex: e.detail.value
    });
    var apList = that.data.attltArray
    for (var i = 0, len = that.data.appType.length; i < len; ++i) {
      if (apList[e.detail.value] == that.data.appType[i].typeName) {
        console.log(that.data.appType[i].typeID)
        that.setData({
          attLT_ID: that.data.appType[i].typeID,
          attLT_Name: that.data.appType[i].typeName
        })
      }
    }
  },

  /**
   * 监听开始日期picker选择器
   */
  listenerDatePickerSelectedStartDate: function (e) {
    var that = this
    that.setData({
      restStartDate: e.detail.value,
      rest_start_date: e.detail.value
    })
  },

  listenerPickerSelectedStartType: function (e) {
    var that = this
    that.setData({
      startIndex: e.detail.value,
      startType: that.data.startTypeSel[e.detail.value]
    });
  },


  /**
   * 监听结束日期picker选择器
   */
  listenerDatePickerSelectedEndDate: function (e) {
    var that = this
    that.setData({
      restEndDate: e.detail.value,
      rest_end_date: e.detail.value
    })
  },

  listenerDatePickerSelectedEndType: function (e) {
    var that = this
    that.setData({
      endIndex: e.detail.value,
      endType: that.data.endTypeSel[e.detail.value]
    });
  },

  /**
   * 司机是否加班
   */
  listenerPickerSelectedIsOverTime: function (e) {
    var that = this
    that.setData({
      isOverTimeIdx: e.detail.value,
      overwork: that.data.isOverTime[e.detail.value]
    })

  },

  /**用车时间日期选择 */
  listenerDatePickerSelectedCarUsingDate: function (e) {
    var that = this
    that.setData({
      usingCarTime: e.detail.value
    })
  },

  /**
   * 监听休假审批人picker选择器
   */
  listenerPickerSelectedEmpXJ: function (e) {
    var that = this
    that.setData({
      idxEmpxj: e.detail.value
    });
    var apList = that.data.selectEmpxj
    for (var i = 0, len = that.data.empsXJs.length; i < len; ++i) {
      if (apList[e.detail.value] == that.data.empsXJs[i].appFieldValue) {
        that.setData({
          appFieldNameXJ: that.data.empsXJs[i].appFieldName
        })
      }
    }
  },

  /**
     * 监听用车审批人picker选择器
     */
  listenerPickerSelectedEmpYC: function (e) {
    var that = this
    that.setData({
      idxEmpyc: e.detail.value
    });
    var apList = that.data.selectEmpyc
    for (var i = 0, len = that.data.empsYCs.length; i < len; ++i) {
      if (apList[e.detail.value] == that.data.empsYCs[i].appFieldValue) {
        that.setData({
          appFieldNameYC: that.data.empsYCs[i].appFieldName
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.hostUrl + '/user/getSelfUser',
      data: {
        openId: app.globalData.openId
      },
      header: app.globalData.header,
      success: function (res) {
        if (res.data.data) {
          that.setData({
            selfUser: res.data.data,
            applyUserChnName: res.data.data.cName,
            applyUserDeptName: res.data.data.deptName,
            applyUserCellphone: res.data.data.mobile
          })
        }
      }
    })
    wx.request({
      url: app.globalData.hostUrl + '/workflow/getRestTypeList',
      header: app.globalData.header,
      success: function (res) {
        if (res.data.data) {
          that.setData({
            appType: res.data.data
          })
          var newArrayList = that.data.attltArray
          for (var i = 0, len = res.data.data.length; i < len; ++i) {
            newArrayList[i] = res.data.data[i].typeName
          }
          that.setData({
            attltArray: newArrayList,
            attLT_ID: that.data.appType[0].typeID,
            attLT_Name: that.data.appType[0].typeName
          })
        }
      }
    })
    wx.request({
      url: app.globalData.hostUrl + '/workflow/getUsingTypeList',
      header: app.globalData.header,
      success: function (res) {
        if (res.data.data) {
          that.setData({
            carType: res.data.data
          })
          var newArrayList = that.data.carTypeArray
          for (var i = 0, len = res.data.data.length; i < len; ++i) {
            newArrayList[i] = res.data.data[i].usingTypeName
          }
          that.setData({
            carTypeArray: newArrayList,
            applyUsingTypeID: that.data.carType[0].usingTypeID,
            applyUsingType: that.data.carType[0].usingTypeName
          })
        }
      }
    })
    wx.request({
      url: app.globalData.hostUrl + '/workflow/getAcceptUserList',
      header: app.globalData.header,
      data: {
        buttonId: '6',
        workflowName: 'IHRM_AttendanceLeave',
        currentStepId: null,
        flowVersion: '1.0'
      },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          empsXJs: res.data.data.acceptUserInfo
        })
        var newArrayList = that.data.selectEmpxj
        for (var i = 0, len = res.data.data.acceptUserInfo.length; i < len; ++i) {
          newArrayList[i] = res.data.data.acceptUserInfo[i].appFieldValue
        }
        that.setData({
          selectEmpxj: newArrayList,
          appFieldNameXJ: that.data.empsXJs[0].appFieldName
        })
      }
    })
    wx.request({
      url: app.globalData.hostUrl + '/workflow/getAcceptUserList',
      header: app.globalData.header,
      data: {
        buttonId: '6',
        workflowName: 'IOA_Vehicle',
        currentStepId: null,
        flowVersion: '1.0'
      },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          empsYCs: res.data.data.acceptUserInfo
        })
        var newArrayList = that.data.selectEmpyc
        for (var i = 0, len = res.data.data.acceptUserInfo.length; i < len; ++i) {
          newArrayList[i] = res.data.data.acceptUserInfo[i].appFieldValue
        }
        that.setData({
          selectEmpyc: newArrayList,
          appFieldNameYC: that.data.empsYCs[0].appFieldName
        })
      }
    })
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

  /**
   * tab页签切换
   */
  tabSwitchDay: function (e) {
    if (this.data.showType != 1) {
      this.setData({
        showType: 1
      });
    }
  },
  tabSwitchCar: function (e) {
    if (this.data.showType != 2) {
      this.setData({
        showType: 2
      });
    }
  },
  attLeaveNumInput: function (e) {
    this.setData({
      rest_day_num: e.detail.value
    });
  },
  attLeaveReasonInput: function (e) {
    this.setData({
      attL_Reason: e.detail.value
    });
  },
  inCarNumInput: function (e) {
    this.setData({
      inCarNums: e.detail.value
    });
  },
  carUsingHoursInput: function (e) {
    this.setData({
      carUsingHours: e.detail.value
    });
  },
  radioChange: function (e) {
    this.setData({
      usingCarRange: e.detail.value
    });
  },
  destInput: function (e) {
    this.setData({
      dest: e.detail.value
    });
  },
  startPointInput: function (e) {
    this.setData({
      startPoint: e.detail.value
    });
  },
  usingReasonInput: function (e) {
    this.setData({
      usingReason: e.detail.value
    });
  },
  /**
   * 提交休假申请
   */
  handAttendanceLeave: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定发起休假申请吗？',
      success: function (res) {
        if (res.confirm) {
          app.showLoadToast('提交中...');
          wx.request({
            url: app.globalData.hostUrl + '/workflow/submitLeave',
            method: 'POST',
            data: {
              applyUserChnName: that.data.applyUserChnName,
              attLT_ID: that.data.attLT_ID,
              attLT_Name: that.data.attLT_Name,
              workflowTitle: that.data.applyUserChnName + '休假申请 (' + that.data.rest_start_date + ')',
              rest_start_date: that.data.rest_start_date,
              startType: that.data.startType,
              rest_end_date: that.data.rest_end_date,
              endType: that.data.endType,
              attL_Reason: that.data.attL_Reason,
              rest_day_num: that.data.rest_day_num * 1,
              in_sp_id: 0,
              isNew: true,
              appFieldName: that.data.appFieldNameXJ
            },
            header: app.globalData.header,
            success: function (res) {
              wx.hideToast();
              if (res.data.code == 200) {
                wx.navigateBack({
                  delta: 1
                })
                wx.showToast({
                  title: '提交成功'
                })
              } else {
                app.showErrorModal('提示', res.data.message)
              }
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  /**
   * 提交用车申请
   */
  handCarApply: function (e) {
    var that = this
    if (that.data.overwork == '否') {
      that.setData({
        driverIsOverWork: false
      });
    } else {
      that.setData({
        driverIsOverWork: true
      });
    }
    wx.showModal({
      title: '提示',
      content: '确定发起用车申请吗？',
      success: function (res) {
        if (res.confirm) {
          app.showLoadToast('提交中...');
          wx.request({
            url: app.globalData.hostUrl + '/workflow/submitUsingCar',
            method: 'POST',
            data: {
              applyUserChnName: that.data.applyUserChnName,
              applyUserDeptName: that.data.applyUserDeptName,
              applyUserCellphone: that.data.applyUserCellphone,
              workflowTitle: that.data.applyUserChnName + '用车申请 (' + that.data.rest_start_date + ')',
              applyUsingType: that.data.applyUsingType,
              applyUsingTypeID: that.data.applyUsingTypeID,
              overwork: that.data.overwork,
              driverIsOverWork: that.data.driverIsOverWork,
              inCarNums: that.data.inCarNums * 1,
              carUsingHours: that.data.carUsingHours * 1,
              usingCarTime: that.data.usingCarTime,
              usingCarRange: that.data.usingCarRange,
              dest: that.data.dest,
              startPoint: that.data.startPoint,
              usingReason: that.data.usingReason,
              in_sp_id: 0,
              isNew: true,
              appFieldName: that.data.appFieldNameYC
            },
            header: app.globalData.header,
            success: function (res) {
              wx.hideToast();
              if (res.data.code == 200) {
                wx.navigateBack({
                  delta: 1
                })
                wx.showToast({
                  title: '提交成功'
                })
              } else {
                app.showErrorModal('提示', res.data.message)
              }
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  }
})