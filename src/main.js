import Vue from 'vue'
import App from './App.vue'



//导入router
import router from './router/router.js'

//导包 element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//导入自己的全局样式
import './style/base.css'
//用包
Vue.use(ElementUI);

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
