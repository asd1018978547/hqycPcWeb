import Vue from 'vue'
import Element from 'element-ui/lib/element-ui.common'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'

export default () => {
  Vue.use(Element, { locale })
}
