const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({
    data: {
        post:[],
        log: 1
    },
    async onLoad() {
        this.setData({
            log: app.globalData.logg
        });
        const res = await app.call({
            path: '/posts/',
        })
        let post=[];
        for(let i=0;i<=res.data.results.length-1;i++){
            const a = await app.call({
                path: '/users/',
                method: 'GET',
                data: {
                    openid:res.data.results[i].poster
                }
            })
            post[i].content=res.data.results[i].content,
            post[i].name=a.data.name,
            post[i].like=res.data.results[i].like,
            post[i].time=res.data.results[i].time,
            post[i].open_id=res.data.results[i].open_id
        }
        this.setData({
            post:post
        });

    },
    subscribe() {
        const a = app.call({
            path: '/api/fans/follow/' + open_id + '/',
            method: 'POST'
        })
        if (a.statusCode != 401) {
            app.call({
                path: '/api/fans/unfollow/' + open_id + '/',
                method: 'POST'
            })
        }
        console.log("关注操作")

    },



    like() {

        app.call({
            path: '/posts/2/like/',
            method: 'POST'
        })
        console.log("123")
    },
    click() {
        wx.navigateTo({
            url: '/pages/submit/submit',
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