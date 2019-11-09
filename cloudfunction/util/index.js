// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { functionName } = event;
  console.log("functionName=", functionName);
  let date = new Date();
  if (functionName == 'formateDate'){
    return formatDate(date);
  }

  if (functionName == 'formatTime') {
    return formatTime(date);
  }
}

//格式化时间
const formatTime = (date)=> {
  let nowDate = formatDate(date);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return nowDate + ' ' + [hour, minute, second].map((n) => formatNumber(n)).join(':');
};

//格式化日期
const formatDate = (date)=>{
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map((n) => formatNumber(n)).join('/');
};

//格式化数字
const formatNumber = (n)=> {
  let n1 = n.toString();
  return n1[1] ? n1 : '0' + n1;
};