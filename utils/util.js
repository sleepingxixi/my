const util = {
  //格式化时间
  formatTime: function(date){
    let nowDate = this.formatDate(date);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return nowDate + ' ' + [hour, minute, second].map((n)=>this.formatNumber(n)).join(':');
  },

  //格式化日期
  formatDate:function(date){
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].map((n)=>this.formatNumber(n)).join('/');
  },

  //格式化数字
  formatNumber:function(n){
    let n1 = n.toString();
    return n1[1] ? n1 : '0' + n1;
  }
}


export default util;
