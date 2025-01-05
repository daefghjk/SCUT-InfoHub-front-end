// pages/subscribe/subscribe.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:app.globalData.userInfo.name,
      fans:[],
      subscribe:[],
      is1:true,
      is2:true,
      is3:true
  },
  sub11(){this.setData({is1:!this.data.is1 });},
  sub22(){this.setData({is2:!this.data.is2 });},
  sub33(){this.setData({is3:!this.data.is3 });},
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const res =await app.call({
      path: `/${this.data.name}/fans/`,
    })
    const b = await app.call({
        path:`/${this.data.name}/idols/`
    })
    
    console.log(b.data)
    
    let fans=[];
    let subscribe=[];
    let obj_fans={
        avatarurl:'',
        name:'',
    }
    let obj_subscribe={
        avatarurl:'',
        name:'',
    }
    for(let i=0;i<=res.data.length-1;i++){
        obj_fans=res.data[i].follower
        fans[i]=obj_fans
    //avatarurl
    //name
    }
    for(let i=0;i<=b.data.length-1;i++){     
        obj_subscribe=b.data[i].user
        subscribe[i]=obj_subscribe
    //avatarurl
    //name
    }
    this.setData({
        fans:fans,
        subscribe:subscribe
    });
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

  }
})