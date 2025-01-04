// pages/home/home.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:app.globalData.userInfo.name,
    avatarUrl:app.globalData.userInfo.avatarUrl,
    subscribe:'',
    fans:''
  },
  async onLoad() {
        const res =await app.call({
          path: '/刘益煌/fans/',
        })

        console.log(res.data)
      },
//点击帖子跳转
dynamic(){
    wx.navigateTo({
      url:'/pages/dynamic/dynamic',
  })

},
subscribe(){
    wx.navigateTo({
        url:'/pages/subscribe/subscribe',
    })
},
fans(){
    wx.navigateTo({
        url:'/pages/fans/fans',
    })
},
  /**
   * 生命周期函数--监听页面加载
   */

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