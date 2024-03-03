import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
    data: {
        isFocus: true,
        Length: 6,
        entryList: "",
        active: 0,
    },

    inputFocus() {
        this.setData({
            isFocus: true
        })
    },

    inputValue(e) {
        var value = e.detail.value;
        var list= e.detail.value.split('')
        this.setData({
            entryList: value,
            active: list.length
        })
    },

    enter:function(){
        let that = this
        if(that.data.entryList.length<6){
            Notify({ type: 'warning', message: '密码格式有误' });
        }else{
            wx.cloud.callFunction({
                name:'enterAdmin',
                data:{
                    mima:that.data.entryList
                }
            }).then(res=>{
                if(res['result']=="1"){
                    Dialog.confirm({
                        message: '是否缓存密码',
                      })
                        .then(() => {
                            wx.setStorageSync('adminmima',that.data.entryList);
                            wx.redirectTo({
                                url: '/pages/admin/admin'
                              })
                        })
                        .catch(() => {
                            wx.redirectTo({
                                url: '/pages/admin/admin'
                              })
                        });
                }else{
                    Notify({ type: 'warning', message: '密码错误！' });
                }
            })
        }
    }
})
