Page({
  data:{
    imagesList:[]
  },
  onLoad:function(){
    wx.showLoading({
      title: '努力加载中...',
    })
    //获取首页图片
    this.getIndexSwiperImages();
  },

  /**
   * 获取首页图片
   */
  getIndexSwiperImages:function(){
    let _this = this;
    const db = wx.cloud.database();
    db.collection('project_images').get({
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        let imagesLen = res.data.length;
        _this.setData({
          imagesList:res.data,
          imagesLen,
        })
      }
    })
  },
  //进入主页的函数
  enterMainPage:function(){
    console.log("点击进入小程序");
    let isNewUser = false;
    wx.switchTab({
        url: `/pages/today_goal/index?isNewUser=${isNewUser}`,
      })
    //确认用户是否是新用户
    // let isNewUser = false;
    // wx.cloud.callFunction({
    //   name: 'isNewUser'
    // }).then(res=>{
    //   isNewUser = res.result.isNewUser;
    //   console.log("isNewUser=", isNewUser);
    //   //如果是新用户，需要用户
    //   wx.navigateTo({
    //     url: `/pages/today_goal/index?isNewUser=${isNewUser}`,
    //   })
    // })
  }
})