import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 三级联动组件 全局组件
import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'

// 统一接收api文件夹的全部请求函数
import * as API from '@/api';
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 第一个参数:全局组件名  第二个参数:组件   其它页面使用时不用注册直接使用 因为已经全局注册
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import logo from '@/assets/logo.png';
// 注册图片懒加载插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: logo
})

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins, {
  // upper此时是一个自定义组件的名字 别的地方可以通过v-upper调用
  name: 'upper'
})

// 引入表单校验插件
import '@/plugins/validate'

Vue.component()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount('#app')
