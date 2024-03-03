// pages/order/order.js
const app = getApp()
Component({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        orderlist:[],
        waitinglist:[],
        tobedelivered:[],
        finishlist:[]
    },

    lifetimes:{            
        created:function(){
            wx.cloud.database().collection('ExpressInfo').get()
            .then(res=>{
                var wl=[];
                var tbd=[];
                var fl=[];
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i]['status']=="待接单"){
                        wl.push(res.data[i])
                    }else if(res.data[i]['status']=="待送达"){
                        tbd.push(res.data[i])
                    }else if(res.data[i]['status']=="已完成"){
                        fl.push(res.data[i])
                    }
                }
                this.setData({
                    orderlist:res.data
                })
                this.setData({
                    waitinglist:wl
                })
                this.setData({
                    tobedelivered:tbd
                })
                this.setData({
                    finishlist:fl
                })
            })
        },        
        attached:function(){}, 
        ready:function(){},
        moved:function(){},           
        detached:function(){}  
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