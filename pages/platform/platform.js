// pages/platform/platform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: [{
      title: '新闻中心',
      content: '科研院所和高校是基础研究的主力',
      detail: '国家自然科学、技术发明一等奖多次空缺，表明我国基础研究曾不同程度地存在着科技投入不足、实验设备落后、优秀人才流失、学术环境恶化等问题。围绕走中国特色的自主创新，努力建设创新型国家这一主题，我国科技创新能力不断提高，科技发展已进入重要跃升期。'
    }, {
      title: '业务中心',
      content: '鼓励员工自主创新',
      detail: '创新就是点点滴滴的从很多细微之处去改进，绝大多数的员工都不会刻意的去想如何创新，但会尽力的将自己的工作做的有新意，因为他们都希望得到上级的肯定。所以可以从这个角度来思考，想一些办法。另外创新之所以不常发生，一方面是因为人的惰性，另一方面也是因为天赋不足，所以激励创新这事儿没有必要铺开了做，而是要先抓住那些积极并且有天赋的员工，在逐步带动其他的人。'
    }, {
      title: '技术实力',
      content: '生技部已通过国家检测',
      detail: '①社会化阶段。通过观察、感悟、对话、模仿和不断实践等,使得难以表达的技能、经验和诀窍、心智模式和组织的默契等隐性技术知识在企业不同层次的主体内部及其之间实现交流与共享,实现在企业技术能力演化过程中的由隐性技术知识到隐性技术知识的转化。②外部化阶段。通过隐喻、类比、图表、概念和模型等, 将企业不同层次的主体所拥有的、可以显性化的隐性技术知识用概念、语言和文字等表达出来, 实现在企业技术能力演化过程中的由隐性技术知识到显性技术知识的转化。③综合化阶段。通过整理、分类、整序、整合和一致性检验等, 把外部化阶段得到的分散的、不系统的显性技术知识和企业原有的各种显性技术知识有机整合化、格式化和规范化, 实现在企业技术能力演化过程中的由显性技术知识到显性技术知识的转化。'
    }, {
      title: '人力资源',
      content: '恭喜三名工程师入职',
      detail: '您受雇后须严格遵守公司的信息保密要求，在任何时候任何场合不得向第三方泄露公司的客户资料、公司各项经营数据和财务信息。同时，在离开公司一年内不允许到本地同品牌的其他公司任职。另外，员工的薪酬属于公司信息，员工不能向其它员工透露自己的薪酬，也不能相互讨论；公司各项经营数据和财务信息，未经上级部门同意，员工不能越级探知。'
    }, {
      title: '行业动态',
      content: '环保税构建两大机制',
      detail: '环保税对企业的影响究竟有多大？据记者了解，目前除西藏自治区外，各省（区、市）均已出台了本地区应税大气污染物和水污染物的具体适用税额。其中，黑龙江、福建、新疆等12个省份按低限确定税额，其大气、水污染物税额分别为每污染当量1.2元和1.4元。内蒙古、海南、云南等12个省份税额处于中间水平，其大气污染物税额在每污染当量1.8元至3.9元之间，水污染物税额在每污染当量2.1元至3.5元之间。北京、天津、河北等6个省（市）税额处于较高水平，其大气污染物税额在每污染当量4.8元至12元之间，水污染物税额在每污染当量4.8元至14元之间。'
    }],
    bgItems: [
      {
        title: '看板',
        navigator: '/pages/board/board',
        icon: '/images/platform/icon_kanban.png',
        bgcolor: '#00cc00'
      },
      {
        title: '计划',
        navigator: '/pages/plan/plan',
        icon: '/images/platform/icon_jihua.png',
        bgcolor: '#fe4466'
      },
      // {
      //   title: '任务',
      //   navigator: '../apply/dayApply/dayApply',
      //   icon: '/images/platform/icon_renwu.png',
      //   bgcolor: '#00cc00'
      // },
      {
        title: '事项',
        navigator: '/pages/apply/apply',
        icon: '/images/platform/icon_shixiang.png',
        bgcolor: '#ec89ec'
      }
    ],
    lcItems: [{
      title: '申请',
      navigator: '/pages/apply/newApply/newApply',
      icon: '/images/platform/icon_shenqing.png',
      bgcolor: '#f1c232'
    },
    {
      title: '审批',
      navigator: '/pages/todo/todo',
      icon: '/images/platform/icon_shenpi.png',
      bgcolor: '#6d9eeb'
    }
    // ,
    // {
    //   title: '报销',
    //   navigator: '/pages/feeApp/feeApp',
    //   icon: '/images/platform/icon_baoxiao.png',
    //   bgcolor: '#4bbdfa'
    // }
    ],
    gjItems: [{
      title: '点子墙',
      navigator: '../todo/todo',
      icon: '/images/platform/icon_dianzi.png',
      bgcolor: '#54adf4'
    },
    {
      title: '日历',
      navigator: '../plan/plan',
      icon: '/images/platform/icon_rili.png',
      bgcolor: '#ffa3a3'
    }, {
      title: '计时器',
      navigator: '../todo/todo',
      icon: '/images/platform/icon_jishiqi.png',
      bgcolor: '#f1c232'
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

  }
})