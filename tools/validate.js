/* 银行卡卡号验证 */
export function isValidateBankNumber(str) {
  const reg = /([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/
  return reg.test(str)
}
/* 0-100两位小数*/
export function isZero2OneHundred(str) {
  // const reg = /^(\d|[1-9]\d|100)(\.\d{1,2})?$/
  const reg = /(?!^0\.0?0$)^[0-9][0-9]?(\.[0-9]{1,2})?$|^100$/
  return reg.test(str)
}
/* 手机号验证 */
export function isValidatePhone(str) {
  const reg = /^1([3578][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
  return reg.test(str)
}
//数字验证
export function isNumber(str) {
  const reg = /^[0-9]+$/
  return reg.test(str)
}
//数字+两位小数验证
export function isNumberPoint(str) {
  const reg = /^\d+(\.\d{0,2})?$/
  return reg.test(str)
}
//数字+英文
export function isNumberAndLetter(str) {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(str)
}
//不包含中文
export function notCN(str) {
  const reg = /^[^\u4e00-\u9fa5]+$/
  return reg.test(str)
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
//身份证格式验证
export function validateidNumber(idCard) {
  //15位和18位身份证号码的正则表达式
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

  //如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length == 18) {
      var idCardWi = new Array(
        7,
        9,
        10,
        5,
        8,
        4,
        2,
        1,
        6,
        3,
        7,
        9,
        10,
        5,
        8,
        4,
        2
      ) //将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2) //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0 //用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
      }
      var idCardMod = idCardWiSum % 11 //计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17) //得到最后一位身份证号码
      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == 'X' || idCardLast == 'x') {
          return true
        } else {
          return false
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          return true
        } else {
          return false
        }
      }
    }
  } else {
    return false
  }
}
