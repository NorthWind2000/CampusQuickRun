// app.js
App({
    globalData: {
        userInfo:"",
        openid:""
    },
    onLaunch(){
        wx.cloud.init({
            env:'自己新建原开发环境'
        })
        this.globalData.userInfo=wx.getStorageSync('userInfo')
        this.globalData.openid=wx.getStorageSync('userInfo')
        if(this.globalData.userInfo){
            wx.switchTab({
                url: '/pages/index/index'
            })
        }
    },
    login:function(){
		wx.getUserProfile({
		  desc: '用于完成订单功能',
		  success:(res)=>{
            wx.setStorageSync('userInfo',res.userInfo)
            this.globalData.userInfo=res.userInfo
            wx.switchTab({
                url: '/pages/index/index'
            })
		  }
		})
	}
})
