const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({
    data: {
        open_id:'',
        post:[],
        log: 1
    },
    async onShow() {
        this.setData({
            log: app.globalData.logg
        });
        const res = await app.call({
            path: '/posts/',
        })
        let post=[];
        let obj={
            content:'',
            name:'',
            likes_count:0,
            create_time:'',
            comments_count:0,
            post_id:0,
            title:'',
            avatarurl:''

        }

        for(let i=0;i<=res.data.results.length-1;i++){
            const a = await app.call({
                path: '/users/',
                method: 'GET',
                data: {
                    openid:res.data.results[i].poster

                }
            })
            obj=res.data.results[i]
            obj.name=a.data.name
            obj.avatarurl=a.data.avatarurl
            post[i]=obj

        }
        this.setData({
            post:post
        });
console.log(this.data.post)
    },
    async subscribe(e) {
        const post_index=e.currentTarget.dataset.post_index


        const a = await app.call({
            path: `/api/fans/follow/${this.data.post[post_index].poster}/`,
            method: 'POST'
        })
        console.log(111111111)
        console.log(a)
        console.log(111111111)
        if (a.statusCode ==400) {
            await app.call({
                path: `/api/fans/unfollow/${this.data.post[post_index].poster}/`,
                method: 'POST'
            })
            console.log(22222222)
            console.log(a.data)
            console.log(22222222)

        }
        this.onShow()

    },
    cmentsec(e){
        const post_index = e.currentTarget.dataset.post_index
        wx.navigateTo({
            url: `/pages/cmentsec/cmentsec?post_id=${this.data.post[post_index].post_id}`,
        })
    },


    like(e) {
        const post_index = e.currentTarget.dataset.post_index
        console.log(this.data.post[post_index].post_id)
        app.call({
            path: `/posts/${this.data.post[post_index].post_id}/like/`,
            method: 'POST'
        })
        this.onShow()
        
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