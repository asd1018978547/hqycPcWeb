
import Vue from 'vue'
import { API } from '../_config/API'

const _API = {
  install(Vue) {
    Vue.prototype.API = API
  }
}

Vue.use(_API)