import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

export default () => {
  Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: require('@/assets/img/loading.svg'),
    attempt: 1
    
  })
}
