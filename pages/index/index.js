const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:"",
    active: 0,
    tabbar: [{
      pagePath: "/pages/index/index",
      icon: "home-o",
      text: "首页",
      selected: true
    }, {
      pagePath: "/pages/order/order",
      icon: "records",
      text: "订单",
      selected: false
    }, {
      pagePath: "/pages/me/me",
      icon: "user-circle-o",
      text: "我的",
      selected: false
    }]
  },
  ontabChange(event) {
    if (event.detail == this.data.active) return;
    this.updateSubPageShowHide(event.detail);
    this.setData({
      active: event.detail
    })
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
    this.updateSubPageShowHide(this.data.activeIndex);
  },

  // 更新组件的show hide 生命周期
  updateSubPageShowHide(currentIndex) {
    this.data.tabbar.forEach(function (value, i) {
      if (i == currentIndex) {
        value.selected = true;
      } else {
        value.selected = false;
      }
    })
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
