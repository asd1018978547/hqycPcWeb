import Vue from 'vue'
export function moment(date) {
  var now = new Date(date);
  now.setMinutes(now.getMinutes() - new Date().getTimezoneOffset())
  var year = now.getFullYear(); //年    

  var month = now.getMonth() + 1; //月    

  var day = now.getDate(); //日            
  var hh = now.getHours(); //时    

  var mm = now.getMinutes(); //分    

  var ss = now.getSeconds(); //秒         
  var clock = year + "-";
  if (month < 10) clock += "0";
  clock += month + "-";
  if (day < 10) clock += "0";
  clock += day + " ";
  if (hh < 10) clock += "0";
  clock += hh + ":";
  if (mm < 10) clock += '0';
  clock += mm + ":";
  if (ss < 10) clock += '0';
  clock += ss;
  return (clock);
}
const filters = {
  moment
}
export default filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})