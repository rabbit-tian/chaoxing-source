const util = {
  time: { // 时间函数
    // 年月日，时分秒
    timestampToTime(date) {
      date = new Date(date);
      let Y = date.getFullYear() + '/';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
      let D = date.getDate() < 10 ? '0' + (date.getDate()) + ' ' : date.getDate() + ' ';
      let h = date.getHours() < 10 ? '0' + (date.getHours()) + ':' : date.getHours() + ':';
      let m = date.getMinutes() < 10 ? '0' + (date.getMinutes()) + ':' : date.getMinutes() + ':';
      let s = date.getSeconds < 10 ? '0' + (date.getSeconds()) : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // 时分秒
    dutationToTime(date) {
      date = date / 1000;
      if (isNaN(date) || date == 0) return "00:00:00";
      let hour = Math.floor(date / 3600);
      let min = Math.floor(date % 3600 / 60);
      let sec = (date % 60).toFixed(0);
      if (hour < 10) hour = "0" + hour;
      if (min < 10) min = "0" + min;
      if (sec < 10) sec = "0" + sec;
      return hour + ":" + min + ":" + sec;
    }
  }
};