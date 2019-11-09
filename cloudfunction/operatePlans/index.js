// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { method } = event;
  //新增数据
  if (method == 'POST'){
    return addPlan(event);
  } 
  //更新数据
  if (method == 'PUT'){

    return;
  }
  if (method == 'GET') {
    return getPlans(event);
  }
  if (method == 'DELETE') {

    return;
  }
}

/**
 * 添加数据
 */
const addPlan = async (event)=> {
  //创建时间
  let createTime = await cloud.callFunction({
    name: 'util',
    data: {
      functionName: 'formatTime',
    }
  }).then((res) => { return res.result });
  
  //添加入数据库
  try {
    return await db.collection('plans_table').add({
      data: {
        opentId: event.OPENID,
        title: event.title,
        content: event.content,
        status: event.status,
        create_time: createTime,
        update_time:'',
        satisfaction:'',
      }
    })
  } catch (err){
    return err;
  }
}

/**
 * 获取数据
 */
const getPlans = async (event)=>{
  let { limitDate } = event;
  if (limitDate){
  //使用正则表达式进行模糊匹配,获取指定日期的数据
  return await db.collection('plans_table').where({
      create_time: db.RegExp({
        regexp:`^${limitDate}`,
        options: 'i',
      })
    }).get()
  } else {

  }
}

