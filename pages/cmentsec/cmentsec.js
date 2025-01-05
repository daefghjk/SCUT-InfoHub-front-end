const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({
    data: {
        commentcontent:'',
        obj: {
            content: '',
            name: '',
            likes_count: 0,
            create_time: '',
            comments_count: 0,
            post_id: 0,

            title: '',
            avatarurl: ''
        },
        comments:[],
        post_id: 0,
        name: '', //修改为该帖子的作者的名字
        avatarUrl: '', //修改为该帖子作者的头像
        content: '', //修改为该贴子的内容
        create_time: '', //修改为该帖子的发布时间
        likes_count: '', //修改为该帖子的点赞数
        commentcontent: '', //评论的内容用这个接收
        comments: [],
        i: 1,
    },
    onLoad(options) {
       this.setData({post_id:options.post_id})
       
    },
    async onShow(){
        let i=this.data.post_id
        const res = await app.call({
            path: '/posts/',
        })
        let post = [];
        let obj = {
            content: '',
            name: '',
            likes_count: 0,
            create_time: '',
            comments_count: 0,
            post_id: 0,
            title: '',
            avatarurl: ''
        }
        for (let j = 0; j <= res.data.results.length-1; j++) {
           
            if (res.data.results[j].post_id == i) {
              
                    const a = await app.call({
                        path: '/users/',
                        method: 'GET',
                        data: {
                            openid: res.data.results[j].poster
                        }
                    })
                    obj = res.data.results[j]
                    obj.name = a.data.name
                    obj.avatarurl = a.data.avatarurl
                   
                this.setData({
                    obj: obj
                });
               
            }
        }


        const a = await app.call({
            path: '/comments/',
            data:{
                post_id:this.data.obj.post_id
            }
        })
       
        let comments=[];
        let obj1={
            content:'',
            comment_id:0,
            name:'',
            create_time:'',
            post_id:0,
            author_id:'',
            avatarurl:''

        }
        for(let i=0;i<=a.data.results.length-1;i++){
            
            const b = await app.call({
                path: '/users/',
                method: 'GET',
                data: {
                    openid:a.data.results[i].author

                }
            })
            obj1=a.data.results[i]
            obj1.name=b.data.name
            obj1.avatarurl=b.data.avatarurl
            comments[i]=obj1

        }
        this.setData({
            comments:comments
        });
     

        




    },
    like(e) {
        const post_index = e.currentTarget.dataset.post_index
        
        app.call({
            path: `/posts/${this.data.obj.post_id}/like/`,
            method: 'POST'
        })
        this.onShow()
        
        
        
    },
    comments_like(e){
            const post_index = e.currentTarget.dataset.post_index
            
            app.call({
                path: `/comments/${this.data.comments[post_index].comment_id}/like/`,
                method: 'POST'
            })
            this.onShow()

    },
    
    handlecommentinput(e) {
        this.setData({
            commentcontent: e.detail.value
        });
    }, //将输入框内的内容传递给commentcontent变量
    submitcomment() {
        
       
        if (!this.data.commentcontent) {
            wx.showToast({
                title: '评论内容不能为空',
                icon: 'none'
            });
            return;
        }
        // 发送评论到后端
        const a=app.call({
            path: '/comments/', // 后端接口地址
            method: 'POST',
            data: {
                post: this.data.post_id, //待更改
                content: this.data.commentcontent,
                author: app.globalData.userInfo.openid
            },
            success: (res) => {
                if (res.data.success) {
                    wx.showToast({
                        title: '评论成功',
                        icon: 'success'
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
        this.onShow()
        console.log(a)
    },



})