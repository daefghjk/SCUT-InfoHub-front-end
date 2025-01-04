// pages/post/post.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text1:'',
    name:'',
    content:'',
    log:1,
    name:app.globalData.userInfo.name,
    open_id:'',
    content:'',
    time:'',
    like:0,
    log:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  

  async onLoad() {
this.setData({log:app.globalData.logg});
    const res =await app.call({
      path: '/posts/',
    })
    this.setData({content:res.data.results[0].content});
    this.setData({like:res.data.results[0].likes_count});
    this.setData({time:res.data.results[0].create_time});
    this.setData({open_id:res.data.results[0].open_id});
    this.data.text1=app.globalData.userInfo.post_text
    console.log(res.data)
    console.log("123")
    console.log(app.globalData.userInfo.post_text)

  },
  card(){
    wx.navigateTo({
        url:'/pages/cmentsec/cmentsec',
    })

  },
  subscribe(){
    app.call({
        path: '/api/fans/follow/open_id/',
        method:'POST'})
        console.log("关注操作")
    },
  like(){
    app.call({
    path: '/posts/2/like/',
    method:'POST'})
    console.log("123")
},
  click(){
    wx.navigateTo({
      url:'/pages/submit/submit',
  })

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