Component({
    data: {
    active: 0,
    list: [
      {
        "url": "/pages/index/index",
        "icon": "wap-home-o",
        "text": "首页"
      },
      {
        "url": "/pages/order/order",
        "icon": "orders-o",
        "text": "奖品"
      },
      {
        "url": "/pages/index/exchange",
        "icon": "points",
        "text": "兑换"
      },
      {
        "url": "/pages/index/my",
        "icon": "user-circle-o",
        "text": "我的"
      }
    ]
    },
    methods: {
     onChange(e) {
        console.log(e,'e')
        this.setData({ active: e.detail });
     },
     init() {
         const page = getCurrentPages().pop();
         this.setData({
        　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)
         });
        }
     }
});