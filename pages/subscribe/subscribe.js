// pages/subscribe/subscribe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      is1:true,is111:true,
      is2:true,is222:true,
      is3:true,is333:true
  },
  sub1(){this.setData({is1:!this.data.is1});}, /*改变状态后向后端发数据*/
  sub2(){this.setData({is2:!this.data.is2 });},
  sub3(){this.setData({is3:!this.data.is3 });},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})