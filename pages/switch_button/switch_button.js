Page({
  data: {
    isClose: true,
    moveLeft: 0
  },

  onLoad: function () {

  },

  testTap: function () {
    this.setData({
      isClose: !this.data.isClose
    })
  }

})
