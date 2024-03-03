// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    if(event['type']=="update"){
        if(event.status=="已完成"){
            var d = new Date();
            var m=d.getMonth()+1;
            var time = d.getFullYear()+"-"+m+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes();
            cloud.database().collection('ExpressInfo').doc(event.id).update({
                data: {
                  status: event.status,
                  finishtime:time
                }
              })
        }else{
            cloud.database().collection('ExpressInfo').doc(event.id).update({
                data: {
                  status: event.status
                }
              })
        }
    }else if(event['type']=="del"){
        cloud.database().collection('ExpressInfo').doc(event.id).remove()
    }
}