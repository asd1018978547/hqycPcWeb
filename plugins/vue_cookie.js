import Vue from 'vue'
import {
  getCookie,
  setCookie
} from '../_config/cookie'

// 设置cookie
const vCookie = {
  install(Vue) {
    Vue.prototype.setCookie = setCookie
    Vue.prototype.getCookie = getCookie
  }
}

Vue.use(vCookie)
