// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    "list": [
    {
      "pagePath": "pages/today_goal/index",
      "text": "首页",
      "type":"text",
      "selected":false,
    }, 
      {
        "pagePath": "pages/today_goal/index",
        "text": "今日",
        "type": "text",
        "selected": false,
      }, 
    {
      "pagePath": "pages/edit_goal/index",
      "text": "添加",
      "type": "icon",
      "iconUrl":"/style/images/add.jpg",
      "selected": false,
      },
    {
      "pagePath": "pages/history_goal/index",
      "text": "历史",
      "type": "text",
      "selected": false,
    },
      {
        "pagePath": "pages/history_goal/index",
        "text": "我",
        "type": "text",
        "selected": false,
      }
    ]
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { 
      // this.currentTab();
    },
  },
  attached: function () { 
    // this.currentTab();
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.currentTab();
     },
  },
  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 确认当前页面路径与tab页面
     */
    currentTab:function(){
      let _this = this;
      let pageList = getCurrentPages();
      console.log("pageList=", pageList);
      let currentPath = pageList[pageList.length-1].route;
      let list = this.data.list;
      
      list.forEach(item=>{
        if (currentPath.indexOf(item.pagePath)!== -1){
          item.selected = true;
          return;
        }
      })
      console.log("list=", list);
      this.setData({
        list
      })
    },
    /**
     * 切换tab栏
     */
      switchTab:function(e){
        console.log(e);
        let url = e.currentTarget.dataset.url;
        console.log(url);
        wx.switchTab({
          url: `/${url}`,
          success:function(){
            console.log("ok");
          },
          fail:function(e){
            console.log(e)
          }
        })
      }
    }
})
