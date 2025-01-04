const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()

Page({
  data: {
    userInfo:{
      name:'',
      grade:'',
      major:'',
      avatarurl:defaultAvatarUrl
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  async onLoad(){
    const res = await app.call({
      path: '/users/check/',
    })
    if (res.statusCode != 400)
      app.globalData.userInfo.openid = res.data.openid
    else
      throw new Error(`登录状态验证失败`)
    if (res.statusCode == 200)
      app.globalData.userInfo = res.data
    if (app.globalData.userInfo.name != '' && app.globalData.userInfo.grade != '' && app.globalData.userInfo.major != '' && app.globalData.userInfo.avatarurl != defaultAvatarUrl){
      this.setData({
        hasUserInfo:true,
      }),
      wx.switchTab({
        url:'/pages/post/post',
      }) 
    }
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { name, grade, major } = this.data.userInfo
    this.setData({
      "userInfo.avatarurl": avatarUrl,
      hasUserInfo: name!='' && grade!='' && major!='' && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputNameChange(e) {
    const name = e.detail.value
    const { avatarurl, grade, major } = this.data.userInfo
    this.setData({
      "userInfo.name": name,
      hasUserInfo: name!='' && grade!='' && major!='' && avatarurl && avatarurl !== defaultAvatarUrl,
    })
  },
  onInputGradeChange(e) {
    const grade = e.detail.value
    const { avatarurl, name, major } = this.data.userInfo
    this.setData({
      "userInfo.grade": grade,
      hasUserInfo: name!='' && grade!='' && major!='' && avatarurl && avatarurl !== defaultAvatarUrl,
    })
  },
  onInputMajorChange(e) {
    const major = e.detail.value
    const { avatarurl, name, grade } = this.data.userInfo
    this.setData({
      "userInfo.major": major,
      hasUserInfo: name!='' && grade!='' && major!='' && avatarurl && avatarurl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  async login(){
    const path = `avatar/${app.globalData.userInfo.openid}.jpeg`
    const fileID = await app.uploadFile(this.data.userInfo.avatarurl, path)
    this.setData({
      "userInfo.avatarurl":fileID
    })
    console.log(this.data.userInfo.avatarurl)
    app.globalData.userInfo = this.data.userInfo
    await app.call({
      path: 'users/',
      method: 'POST',
      data: this.data.userInfo,
    })
    wx.switchTab({
      url:'/pages/post/post',
    })
  },
})
