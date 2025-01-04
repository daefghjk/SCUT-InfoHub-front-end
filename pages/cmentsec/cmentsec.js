// pages/cmentsec/cmentsec.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({
  data: {
    name:app.globalData.userInfo.name,
    avatarUrl:app.globalData.userInfo.avatarUrl,
    commentcontent:'',
    comments:[],
    content:'',
    create_time:'',
    likes_count:'',
  },
  like(){
      console.log("你点击了点赞按钮")
    app.call({
        path: '/posts/1/like/', // 后端接口地址
    method: 'POST',

    })

  },
  async onLoad() {
        const res =await app.call({
          path: '/posts/',
        })        
    this.setData({create_time:res.data.results[0].create_time});
    this.setData({content:res.data.results[0].content});
    this.setData({likes_count:res.data.results[0].likes_count});
        console.log(res.data)
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

  },
  handlecommentinput(e){
        this.setData({
          commentcontent: e.detail.value
        });
  },//将输入框内的内容传递给commentcontent变量
  submitcomment(){
    const { commentcontent } = this.data;
    if (!commentcontent) {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      });
      return;
    }
    // 发送评论到后端
    app.call({
      path: '/comments/', // 后端接口地址
      method: 'POST',
      data: {
        post_id:app.globalData.userInfo.name,//待更改
         content: commentcontent,
          openid:app.globalData.userInfo.openid
      },
      success: (res) => {
        if (res.data.success) {
          wx.showToast({
            title: '评论成功',
            icon: 'success'
          });
          // 重新获取所有评论并刷新页面
          app.call({
            path: '/comments/', // 后端接口地址
            method: 'GET',
            data: {
              post_id:app.globalData.userInfo.name,//待更改
               content: commentcontent,
                openid:app.globalData.userInfo.openid
            }})
          this.fetchComments();
          // 清空输入框
          this.setData({ commentcontent: '' });
        } else {
          wx.showToast({
            title: '评论失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
      }
    });
  }
})