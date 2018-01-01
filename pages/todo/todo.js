// pages/todo/todo.js
if (typeof TodoType == "undefined") {
  var TodoType = {}
  TodoType.Todo = 1//待办
  TodoType.ToRead = 2//待阅
}

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showType: TodoType.Todo,
    userInfo: null,
    todoList: [
      {
        typeTitle:'行政用章申请',
        title:'总书记一直牵挂着贫困群众，对贫困地区交通设施建设更是牵肠挂肚。近日，总书记对“四好农村路”建设作出重要指示。',
        publish_name:'测试1',
        publish_time:'2017-11-29 15:53:24',
        level:'紧急',
        applyType:'1',
        icoUrl: '/resources/images/apply/icon_car_sp.png'
      },
      {
        typeTitle: '项目开工通知单',
        title: '习近平总书记多次强调，没有农村的小康也就没有全面小康。为了广大农民的小康梦早日实现，新形势下，要进一步深化和加强农村公路发展。',
        publish_name: 'jinher',
        publish_time: '2017-11-29 15:53:24',
        level: '一般',
        applyType: '2',
        icoUrl: '/resources/images/apply/icon_day_sp.png'
      },
      {
        typeTitle: '合同会签申请',
        title: '进一步深化对建设农村公路重要意义的认识，聚焦突出问题，完善政策机制，既要把农村公路建好，更要管好、护好、运营好，为广大农民致富奔小康、为加快推进农业农村现代化提供更好保障。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '紧急',
        applyType: '2',
        icoUrl: '/resources/images/apply/icon_car_sp.png'
      },
      {
        typeTitle: '项目风险分析(产品要求评审)记录专用单',
        title: '党的十八大以来，习近平总书记多次就农村公路发展作出重要指示、批示，对农村公路助推广大农民脱贫致富奔小康寄予了殷切期望。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '一般',
        applyType: '1',
        icoUrl: '/resources/images/apply/icon_day_sp.png'
      },
      {
        typeTitle: '行政用章申请',
        title: '党的十八大以来，习近平总书记多次就农村公路发展作出重要指示、批示，对农村公路助推广大农民脱贫致富奔小康寄予了殷切期望。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '紧急',
        applyType: '1',
        icoUrl: '/resources/images/apply/icon_day_sp.png'
      },
      {
        typeTitle: '项目开工通知单',
        title: '党的十八大以来，习近平总书记多次就农村公路发展作出重要指示、批示，对农村公路助推广大农民脱贫致富奔小康寄予了殷切期望。',
        publish_name: 'jinher',
        publish_time: '2017-11-29 15:53:24',
        level: '一般',
        applyType: '2',
        icoUrl: '/resources/images/apply/icon_day_sp.png'
      },
      {
        typeTitle: '合同会签申请',
        title: '党的十八大以来，习近平总书记多次就农村公路发展作出重要指示、批示，对农村公路助推广大农民脱贫致富奔小康寄予了殷切期望。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '紧急',
        applyType: '2',
        icoUrl: '/resources/images/apply/icon_car_sp.png'
      },
      {
        typeTitle: '项目风险分析(产品要求评审)记录单',
        title: '党的十八大以来，习近平总书记多次就农村公路发展作出重要指示、批示，对农村公路助推广大农民脱贫致富奔小康寄予了殷切期望。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '一般',
        applyType: '2',
        icoUrl: '/resources/images/apply/icon_day_sp.png'
      },
      {
        typeTitle: '行政用章申请',
        title: '党的十八大以来，习近平总书记多次就农村公路发展作出重要指示、批示，对农村公路助推广大农民脱贫致富奔小康寄予了殷切期望。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '紧急',
        applyType: '2',
        icoUrl: '/resources/images/apply/icon_day_sp.png'
      },
      {
        typeTitle: '项目开工通知单',
        title: '党的十八大以来，习近平总书记多次就农村公路发展作出重要指示、批示，对农村公路助推广大农民脱贫致富奔小康寄予了殷切期望。',
        publish_name: 'jinher',
        publish_time: '2017-11-29 15:53:24',
        level: '一般',
        applyType: '2',
        icoUrl: '/resources/images/apply/icon_day_sp.png'
      },
      {
        typeTitle: '合同会签申请',
        title: '党的十八大以来，习近平总书记多次就农村公路发展作出重要指示、批示，对农村公路助推广大农民脱贫致富奔小康寄予了殷切期望。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '紧急',
        applyType: '2',
        icoUrl:'/resources/images/apply/icon_car_sp.png'
      },
      {
        typeTitle: '项目风险分析(产品要求评审)记录单',
        title: '党的十八大以来，习近平总书记多次就农村公路发展作出重要指示、批示，对农村公路助推广大农民脱贫致富奔小康寄予了殷切期望。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '一般',
        applyType: '2',
        icoUrl: '/resources/images/apply/icon_day_sp.png'
      }
    ],
    toReadList: [
      {
        typeTitle: '发文办理流程',
        title: '关于开展员工职级调整工作的通知',
        publish_time: '2017-11-29 15:53:24',
        publish_name: '曾闪'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于发布《2017年管理评审报告》的通知',
        publish_time: '2017-11-29 15:53:24',
        publish_name: 'jinher'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于发布2017年11月质量月报的通知',
        publish_time: '2017-11-29 15:53:24',
        publish_name: '测试1'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于公布2017年度“优秀咨询成果奖”评选结果的通知',
        publish_time: '2017-11-29 15:53:24',
        publish_name: '测试1'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于开展员工职级调整工作的通知',
        publish_time: '2017-11-29 15:53:24',
        publish_name: '曾闪'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于发布《2017年管理评审报告》的通知',
        publish_time: '2017-11-29 15:53:24',
        publish_name: 'jinher'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于发布2017年11月质量月报的通知',
        publish_time: '2017-11-29 15:53:24',
        publish_name: '测试1'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于公布2017年度“优秀咨询成果奖”评选结果的通知',
        publish_time: '2017-11-29 15:53:24',
        publish_name: '测试1'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于开展员工职级调整工作的通知',
        publish_time: '2017-11-29 15:53:24',
        publish_name: '曾闪'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于发布《2017年管理评审报告》的通知',
        publish_time: '2017-11-29 15:53:24',
        publish_name: 'jinher'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于发布2017年11月质量月报的通知',
        publish_time: '2017-11-29 15:53:24',
        publish_name: '测试1'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于公布2017年度“优秀咨询成果奖”评选结果的通知',
        publish_time: '2017-11-29 15:53:24',
        publish_name: '测试1'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      var that = this;
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          that.setData({
            userInfo: userInfo
          })
          app.globalData.userInfo = userInfo;
        }
      })
    }
  },

  /*
   * 点击待办
   */
  tapTodo: function(e) {
    if (this.data.showType != TodoType.Todo){
      this.setData({
        showType: TodoType.Todo
      });
    }
  },

  tapToRead: function(e) {
    if (this.data.showType != TodoType.ToRead) {
      this.setData({
        showType: TodoType.ToRead
      });
    }
  }
})