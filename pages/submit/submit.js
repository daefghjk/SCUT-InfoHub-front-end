const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: 'aaaaaaa',
        text0: 'abc'

    },
    message(e) {
        this.setData({
            text: e.detail.value
        });

    },
    send() {
        this.setData({
            text0: this.data.text
        });
        app.call({
            path: '/posts/',
            method: 'POST',
            data: {
                title: '12',
                content: this.data.text0
            }
        })
        
        wx.switchTab({
            url:'/pages/post/post',
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        const res = await app.call({
            path: '/posts/',
        })

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