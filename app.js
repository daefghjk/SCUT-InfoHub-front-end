// app.js
App({
  onLaunch() {
    wx.cloud.init()
  },
  async call(obj, number = 0) {
    const that = this
    if (that.cloud == null) {
      that.cloud = new wx.cloud.Cloud({
        resourceAppid: 'wx63e3c1951a272c10', // 微信云托管环境所属账号，服务商appid、公众号或小程序appid
        resourceEnv: 'django-2gexqesn60f421f5', // 微信云托管的环境ID
      })
      await that.cloud.init() // init过程是异步的，需要等待init完成才可以发起调用
    }
    try {
      const result = await that.cloud.callContainer({
        path: obj.path, // 填入业务自定义路径和参数，根目录，就是 / 
        method: obj.method || 'GET', // 按照自己的业务开发，选择对应的方法
        // dataType:'text', // 如果返回的不是json格式，需要添加此项
        header: obj.header || {
          'X-WX-SERVICE': 'scut-infohub', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
          // 其他header参数
        },
        data: obj.data,
        // 其余参数同 wx.request
      })
      return result
    } catch (e) {
      const error = e.toString()
      // 如果错误信息为未初始化，则等待300ms再次尝试，因为init过程是异步的
      if (error.indexOf("Cloud API isn't enabled") != -1 && number < 3) {
        return new Promise((resolve) => {
          setTimeout(function () {
            resolve(that.call(obj, number + 1))
          }, 300)
        })
      } else {
        throw new Error(`微信云托管调用失败${error}`)
      }
    }
  },

  /**
   * 上传文件到微信云托管对象存储
   * @param {*} file 微信本地文件，通过选择图片，聊天文件等接口获取
   * @param {*} path 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
   * @param {*} onCall 上传回调，文件上传过程监听，返回false时会中断上传
   */
  uploadFile(file, path, onCall = () => {}) {
    return new Promise((resolve, reject) => {
      const task = wx.cloud.uploadFile({
        cloudPath: path,
        filePath: file,
        config: {
          env: 'django-2gexqesn60f421f5' // 需要替换成自己的微信云托管环境ID
        },
        success: res => resolve(res.fileID),
        fail: e => {
          const info = e.toString()
          if (info.indexOf('abort') != -1) {
            reject(new Error('【文件上传失败】中断上传'))
          } else {
            reject(new Error('【文件上传失败】网络或其他错误'))
          }
        }
      })
      task.onProgressUpdate((res) => {
        if (onCall(res) == false) {
          task.abort()
        }
      })
    })
  },

  globalData: {
    logg: 0,
    userInfo: {
      post_text: '',
      openid: '',
      session_key: '',
      name: '',
      grade: '',
      major: '',
      avatarurl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
    }
  },
})