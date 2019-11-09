// pages/today_goal/index.js
import util from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textData:'',
    showEditView:false,
  },
  isNewUser:false,
  //请求数据的条件
  optionsObj:{
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("到达此页面")
    this.isNewUser = options.isNewUser;
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
    
    wx.showLoading({
      title: '加载中...',
    })
    this.guidanceForNewUser();
    this.showData();
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
   * 新用户需要指导步骤
   */
  guidanceForNewUser:function(){
    let textData = '';
    console.log("this.isNewUser=", this.isNewUser);
    if (this.isNewUser === 'true') {
      textData = '你是一位新用户';
      this.setData({
        textData
      })
    } else {
      textData = '你是一位老用户';
      this.setData({
        textData
      })
    }
  },
  /**
   * 根据条件从数据库获取数据
   */
  showData:function(){
    let _this = this;
    let method = 'GET';
    //获取今天的时间
    let nowDate = util.formatDate(new Date());
    console.log("nowDate=", nowDate);

    wx.cloud.callFunction({
      name: 'operatePlans',
      data:{
        method,
        limitDate: nowDate
      }
    }).then(res => {
      // console.log("res=",res);
      if (res.result.data){
        console.log("有数据", res.result.data);
        _this.setData({
          showData: res.result.data
        })
        wx.hideLoading();
      }else{
        console.log("暂无数据")
      }
    })
  },
  /**
   * 编辑小目标
   */
  showEditView:function(){
    this.setData({
      showEditView:true
    })
  },

  
  
})