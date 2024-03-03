// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    resdata=[]
    await cloud.database().collection('ExpressInfo').get()
    .then(res=>{
        resdata=res.data
    })

    return resdata
}