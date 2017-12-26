// pages/todo/todo.js
if (typeof TodoType == "undefined") {
  var TodoType = {}
  TodoType.Todo = 1//待办
  TodoType.ToRead = 2//待阅
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showType: TodoType.Todo,
    todoList: [
      {
        typeTitle:'行政用章申请',
        title:'测试。',
        publish_name:'测试1',
        publish_time:'2017-11-29 15:53:24',
        level:'紧急'
      },
      {
        typeTitle: '项目开工通知单',
        title: '测试开工。',
        publish_name: 'jinher',
        publish_time: '2017-11-29 15:53:24',
        level: '一般'
      },
      {
        typeTitle: '合同会签申请',
        title: '测试。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '紧急'
      },
      {
        typeTitle: '项目风险分析(产品要求评审)记录单',
        title: '测试流程。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '一般'
      },
      {
        typeTitle: '行政用章申请',
        title: '测试。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '紧急'
      },
      {
        typeTitle: '项目开工通知单',
        title: '测试开工。',
        publish_name: 'jinher',
        publish_time: '2017-11-29 15:53:24',
        level: '一般'
      },
      {
        typeTitle: '合同会签申请',
        title: '测试。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '紧急'
      },
      {
        typeTitle: '项目风险分析(产品要求评审)记录单',
        title: '测试流程。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '一般'
      },
      {
        typeTitle: '行政用章申请',
        title: '测试。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '紧急'
      },
      {
        typeTitle: '项目开工通知单',
        title: '测试开工。',
        publish_name: 'jinher',
        publish_time: '2017-11-29 15:53:24',
        level: '一般'
      },
      {
        typeTitle: '合同会签申请',
        title: '测试。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '紧急'
      },
      {
        typeTitle: '项目风险分析(产品要求评审)记录单',
        title: '测试流程。',
        publish_name: '测试1',
        publish_time: '2017-11-29 15:53:24',
        level: '一般'
      }
    ],
    toReadList: [
      {
        typeTitle: '发文办理流程',
        title: '关于开展员工职级调整工作的通知',
        publish_name: '曾闪'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于发布《2017年管理评审报告》的通知',
        publish_name: 'jinher'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于发布2017年11月质量月报的通知',
        publish_name: '测试1'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于公布2017年度“优秀咨询成果奖”评选结果的通知',
        publish_name: '测试1'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于开展员工职级调整工作的通知',
        publish_name: '曾闪'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于发布《2017年管理评审报告》的通知',
        publish_name: 'jinher'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于发布2017年11月质量月报的通知',
        publish_name: '测试1'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于公布2017年度“优秀咨询成果奖”评选结果的通知',
        publish_name: '测试1'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于开展员工职级调整工作的通知',
        publish_name: '曾闪'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于发布《2017年管理评审报告》的通知',
        publish_name: 'jinher'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于发布2017年11月质量月报的通知',
        publish_name: '测试1'
      },
      {
        typeTitle: '发文办理流程',
        title: '关于公布2017年度“优秀咨询成果奖”评选结果的通知',
        publish_name: '测试1'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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