const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({
    data: {
        name: app.globalData.userInfo.name,//修改为该帖子的作者的名字
        avatarUrl: app.globalData.userInfo.avatarUrl,//修改为该帖子作者的头像
        content: '',//修改为该贴子的内容
        create_time: '',//修改为该帖子的发布时间
        likes_count: '',//修改为该帖子的点赞数
        commentcontent: '',//评论的内容用这个接收
        comments: [],
        i:1,
    },
    like() {
        console.log("你点击了点赞按钮")
        app.call({
            path: '/posts/1/like/', // 后端接口地址
            method: 'POST',
        })
    },//点击点赞按钮，实现点赞数加一
    async onLoad() {
        const res = await app.call({
            path: '/posts/',
        })
        let comments=[];
        //for (let i=0;i<=)
        this.setData({
            create_time: res.data.results[0].create_time,
            content: res.data.results[0].content,
            likes_count: res.data.results[0].likes_count
        });
        console.log(res.data)
    },
    handlecommentinput(e) {
        this.setData({
            commentcontent: e.detail.value
        });
    }, //将输入框内的内容传递给commentcontent变量
    submitcomment() {
        const {
            commentcontent
        } = this.data;
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
                post_id: app.globalData.userInfo.name, //待更改
                content: commentcontent,
                openid: app.globalData.userInfo.openid
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
                            post_id: app.globalData.userInfo.name, //待更改
                            content: commentcontent,
                            openid: app.globalData.userInfo.openid
                        }
                    })
                    this.fetchComments();
                    // 清空输入框
                    this.setData({
                        commentcontent: ''
                    });
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
    },
    


})