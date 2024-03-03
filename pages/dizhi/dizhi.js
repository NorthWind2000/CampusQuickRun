import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:"",
        tel:"",
        building:""
    },
    saveinfo:function(){
        var data=this.data
        if(data.name=="" || data.tel=="" || data.building==""){
            Notify({ type: 'warning', message: '信息未完善' });
        }else{
            wx.setStorageSync('dizhi', {
                name:data.name,
                tel:data.tel,
                building:data.building
            });
            Notify({ type: 'success', message: '保存成功' });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        try {
            var dizhi = wx.getStorageSync('dizhi')
            if(dizhi){
                this.setData({
                    name:dizhi.name,
                    tel:dizhi.tel,
                    building:dizhi.building
                })
            }
          } catch (e) {
            console.log(e)
          }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})