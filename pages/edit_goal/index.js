// pages/edit_goal/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content:'',
  },

  subData:{
    goal_id:'',
    title: '',
    content: '',
  },
  /**
   * 生命周期函数--监听页面加载
   * 通过传入值来判断这次是修改还是创建
   */
  onLoad: function (options) {
    let _this = this;
    if (options.goal_id){
      _this.subData.goal_id = options.goal_id;
    }
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
   * 输入标题
   */
  inputTitle:function(e){
    // console.log("e1=",e);
    this.subData.title = e.detail.value;
  },
  /**
   * 输入内容
   */
  inputContent:function(e){
    // console.log("e2=",e);
    this.subData.content = e.detail.value;
  },
  /**
   * 提交用户信息
   */
  formSubmit:function(){
    let { goal_id, title,content }= this.subData;
    let method = '';
    if (goal_id) {
      method = 'PUT';
    } else {
      method = 'POST';
    }
      
      let obj = {
        title: title,
        content: content,
        status: 0,// 未完成
        method: method
      }
      wx.cloud.callFunction({
        name: 'operatePlans',
        data: obj,
        success: function (res) {
          console.log('res=', res);
          if (res.result._id) {
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '添加失败',
              showCancel: false
            })
          }
        }
      })
  }
  
})