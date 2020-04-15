/*
 localStorage
 * 
 * */
export function _setLS(key, value) { //设置localStorage
  let Info = JSON.stringify(value)
  localStorage.setItem(key, Info)
}
export function _getLS(item) { // 获取localStorage
  return JSON.parse(localStorage.getItem(item));
}

export function _clearLS() { // 清除localStorage
  localStorage.clear()
}

export function _getToken() { //获取token
  return _getLS('user').token;
}
/*一些正则*/
const RegExp = {
  chinese: /^[\u4e00-\u9fa5]+([\u4e00-\u9fa5]|·)*[\u4e00-\u9fa5]+$/,
  DBCS: /[^x00-xff]/, //双字节
  trimLine: /ns*r/, //空白行
  trimHE: /^s*|s*$/, //首位空白
  email: /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/,
  Url: /[a-zA-z]+:\/\/[^s]*/,
  passWord: /^.{6,20}$/,
  Tel: /d{3}-d{8}|d{4}-d{7}/, //匹配形式如 0511-4405222 或 021-87888822
  QQ: /[1-9][0-9]{4,}/,
  POSTCODE: /[1-9]d{5}(?!d)/, //中国邮政
  IDcard: /d{15}|d{18}/,
  Ip: /d+.d+.d+.d+/,
  en: /^[A-Za-z]+$/,
  enPower: /^[A-Z]+$/,
  enLower: /^[a-z]+$/,
  phone: /^1[3|4|5|6|7|8|9]\d{9}$/,
  HKphone: /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
  TWphone: /^(\+?886\-?|0)?9\d{8}$/,
  AUphone: /^(\+?61|0)4\d{8}$/,
  isNumber: /^[0-9]+.?[0-9]*$/,
  IDcard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/, //身份证
  Web: /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(.)+$/,
  ChineseName: /^[\u4e00-\u9fa5]+([\u4e00-\u9fa5]|·)*[\u4e00-\u9fa5]+$/,
  regEn: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/,
  regCn: /[！#￥（——）：；“”‘、，|《。》？、【】[\]]/
}
//根据编码获取名称
const AREA = {
  getprovince(code, areaDatas) {
    let r = {};
    for (let x in areaDatas) {
      if (areaDatas[x].Code == code) {
        r = areaDatas[x];
      }
    }
    return r;
  },
  getcity(pcode, code, areaDatas) {
    let r = {};
    let pnode = AREA.getprovince(pcode, areaDatas);
    for (let x in pnode.Children) {
      if (pnode.Children[x].Code == code) {
        r = pnode.Children[x];
      }
    }
    return r;
  },
  getdistrict(ppcode, pcode, code, areaDatas) {
    let r = {};
    let pnode = AREA.getcity(ppcode, pcode, areaDatas);
    for (let x in pnode.Children) {
      if (pnode.Children[x].Code == code) {
        r = pnode.Children[x];
      }
    }
    return r;
  },
}
export {
  RegExp,
  AREA
}