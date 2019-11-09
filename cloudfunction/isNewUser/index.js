// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  //获取当前用户的openId
  let { OPENID }= wxContext;

  let db = cloud.database().collection('user_table');
  //通过openId在数据库中进行查找，是否有该用户，有则返回false，无则返回true
  let count = await db.where({
    openId: OPENID
  }).count();

  let isNewUser = true;
  if (count.total > 0){
    isNewUser = false;
  } else {
    //新用户需要存储其数据
    //TODO:这里可能需要添加一个错误处理，以防用户没有存储上openId的情况
    await db.add({
      data:{
        openId: OPENID
      }
    })
  }
  return {
    isNewUser
  }
}