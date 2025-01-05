// pages/home/home.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:app.globalData.userInfo.name,
    avatarUrl:app.globalData.userInfo.avatarurl,
    grade: app.globalData.userInfo.grade,
    major: app.globalData.userInfo.major,
    subscribe:'',
    fans:[],
    number_fans:0,
    number_idols:0
  },
  async onLoad() {
    this.setData({log:app.globalData.logg});
        const res =await app.call({
          path: '/posts/',
    
          
        })
        this.setData({content:res.data.results[2].content});
        console.log(res.data)
      },
  async onLoad() {
        const res =await app.call({
          path: `/${this.data.name}/fans/`,
        })
        const b = await app.call({
            path:`/${this.data.name}/idols/`
        })
        let fans=[];
        for(let i=0;i<=res.data.length-1;i++){
            fans[i]=res.data
        //avatarurl
        //name
        }
        let idols=[];
        for(let i=0;i<=b.data.length-1;i++){
            idols[i]=b.data
        //avatarurl
        //name
        }
        this.setData({
            fans:fans,
            number_fans:res.data.length,
            idols:idols,
            number_idols:b.data.length

        });
        
        console.log(res.data)
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