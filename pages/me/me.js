const app = getApp()
Component({
	/**
	 * 页面的初始数据
	 */
	data: {
		openid: "",
		userInfo: app.globalData.userInfo,
		avatarUrl: "",
		count: 0,
		score: 0,
		weight: 0,
		address: {},
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	attached: function () {
		this.setData({
			userInfo: app.globalData.userInfo
		})
		this.setData({
			avatarUrl: this.data.userInfo.avatarUrl
		})
	},
	methods: {
		dizhi: function () {
			wx.navigateTo({
				url: '/pages/dizhi/dizhi'
			})
		},
		showcode: function () {
			wx.navigateTo({
				url: '/pages/pay/pay'
			})
		},
		delivery: function () {
			wx.navigateTo({
				url: '/pages/delivery/delivery'
			})
		},
		admin: function () {
			wx.cloud.callFunction({
				name: 'enterAdmin',
				data: {
					mima: wx.getStorageSync('adminmima')
				}
			}).then(res => {
				if (res['result'] == "1") {
					wx.navigateTo({
						url: '/pages/admin/admin'
					})
				}else{
					wx.navigateTo({
						url: '/pages/mima/mima'
					})
				}
			})
		}
	}
})
