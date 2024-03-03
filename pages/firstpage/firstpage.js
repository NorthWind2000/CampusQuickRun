// pages/firstpage/firstpage.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const app = getApp()
Component({
  data: {
    active: 0,
    name: "",
    tel: "",
    expresscode: "",
    building: "",
    kuaidi: "",
    time: "",
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    show: false,
    payshow:false,
    timeshow: false,
    currentDate: '12:00',
    actions: [
      {
        name: '校外菜鸟驿站(中通 申通)',
      },
      {
        name: '韵达快递',
      },
      {
        name: '天天快递',
      },
      {
        name: '校外圆通',
      }
    ],
  },
  lifetimes:{
    attached:function(){
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
    }
  },
  methods:{
    ontabChange(event) {
      // event.detail 的值为当前选中项的索引
      this.setData({ active: event.detail });
      wx.switchTab({
        url: "/pages/index/index"
      })
    },
    onOpen() {
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false });
    },
    onSelect(event) {
      this.setData({ kuaidi: event.detail.name });
    },
    bindTimeChange: function(e) {
      this.setData({
        time: e.detail.value
      })
    },
    onPayClose() {
      this.setData({ payshow: false });
      Notify({ type: 'success', message: '提交成功' });
    },
    submit() {
      let data = this.data
      if (data.name == "" || data.tel == "" || data.expresscode == "" || data.building == "" || data.time == "" || data.kuaidi == "") {
        Notify({ type: 'warning', message: '信息未完善' });
      } else {
        wx.cloud.database().collection('ExpressInfo')
          .add({
            data:{
            name: data.name,
            tel: data.tel,
            expresscode: data.expresscode,
            building: data.building,
            time: data.time,
            kuaidi: data.kuaidi,
            status:"待接单"
          }
        }).then(res => {
            this.setData({
              payshow:true
            })
          })
      }
    }
  }
})
