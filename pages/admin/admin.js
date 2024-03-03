// pages/admin/admin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        waitinglist: [],
        tobedelivered: [],
        finishlist: [],
        show: false,
        targetindex: 0,
        actions: [],
        action1: [
            {
                name: '接单',
            },
            {
                name: '删除',
            }
        ],
        action2: [
            {
                name: '完成',
            },
            {
                name: '删除',
            }
        ]
    },
    onChange(event) {
        if (event.detail.index == 0) {
            this.data.active=0
            this.setData({
                actions: this.data.action1
            })
        } else if (event.detail.index == 1) {
            this.data.active=1
            this.setData({
                actions: this.data.action2
            })
        }
    },
    onOpen(event) {
        this.setData({
            targetindex: event.currentTarget.dataset.index
        })
        this.setData({ show: true });
    },
    onClose() {
        this.setData({ show: false });
    },
    update_data(data) {
        var wl = [];
        var tbd = [];
        var fl = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i]['status'] == "待接单") {
                wl.push(data[i])
            } else if (data[i]['status'] == "待送达") {
                tbd.push(data[i])
            } else if (data[i]['status'] == "已完成") {
                fl.push(data[i])
            }
        }
        this.setData({
            waitinglist: wl
        })
        this.setData({
            tobedelivered: tbd
        })
        this.setData({
            finishlist: fl
        })
    },
    onSelect(event) {
        let that = this
        if (event.detail['name'] == "接单") {
            wx.cloud.callFunction({
                name: "updateOrder",
                data: {
                    id: this.data.waitinglist[this.data.targetindex]['_id'],
                    type: "update",
                    status: "待送达"
                }
            })
            this.data.waitinglist[this.data.targetindex]['status'] = "待送达"
            this.data.waitinglist.push(...this.data.tobedelivered)
            this.data.waitinglist.push(...this.data.finishlist)
            this.update_data(this.data.waitinglist)
        } else if (event.detail['name'] == "完成") {
            var d = new Date();
            var m=d.getMonth()+1;
            var time = d.getFullYear()+"-"+m+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes();
            wx.cloud.callFunction({
                name: "updateOrder",
                data: {
                    id: this.data.tobedelivered[this.data.targetindex]['_id'],
                    type: "update",
                    status: "已完成"
                }
            })
            this.data.tobedelivered[this.data.targetindex]['finishtime']=time
            this.data.tobedelivered[this.data.targetindex]['status'] = "已完成"
            this.data.waitinglist.push(...this.data.tobedelivered)
            this.data.waitinglist.push(...this.data.finishlist)
            this.update_data(this.data.waitinglist)
        }
        else if (event.detail['name'] == "删除") {
            if (this.data.active == 0) {
                that.data.waitinglist.splice(that.data.targetindex, 1)
                this.setData({
                    waitinglist: that.data.waitinglist
                })
                wx.cloud.callFunction({
                    name: "updateOrder",
                    data: {
                        id: this.data.waitinglist[this.data.targetindex]['_id'],
                        type: "del"
                    }
                })
            } else {
                that.data.tobedelivered.splice(that.data.targetindex, 1)
                this.setData({
                    tobedelivered: that.data.tobedelivered
                })
                wx.cloud.callFunction({
                    name: "updateOrder",
                    data: {
                        id: this.data.tobedelivered[this.data.targetindex]['_id'],
                        type: "del"
                    }
                })
            }
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            actions: this.data.action1
        })
        wx.cloud.callFunction({
            name: "getOrder"
        })
            .then(res => {
                var wl = [];
                var tbd = [];
                var fl = [];
                for (var i = 0; i < res.result.length; i++) {
                    if (res.result[i]['status'] == "待接单") {
                        wl.push(res.result[i])
                    } else if (res.result[i]['status'] == "待送达") {
                        tbd.push(res.result[i])
                    } else if (res.result[i]['status'] == "已完成") {
                        fl.push(res.result[i])
                    }
                }
                this.setData({
                    waitinglist: wl
                })
                this.setData({
                    tobedelivered: tbd
                })
                this.setData({
                    finishlist: fl
                })
            })
    }
})