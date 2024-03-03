// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    recode=""
    await cloud.database().collection('admins').get()
    .then(res=>{
        if(event.mima==res.data[0].password){
            recode = '1'
        }else{
            recode = '0'
        }
    })

    return recode
}