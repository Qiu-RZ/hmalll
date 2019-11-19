import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入router
import router from './router/router.js'

//导包 element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//用包
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
