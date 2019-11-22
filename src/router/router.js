//导入
import VueRouter from 'vue-router'

//导入Vue
import Vue from 'vue'
//使用
Vue.use(VueRouter);

//导入登录页面组件
import login from '../views/login/login.vue'
//导入首页页面的组件
import index from '../views/index/index.vue'

//路由规则
const routes = [
    {
        path:'/login',
        component:login
    },
    {
        path:'/index',
        component:index
    },
    
];

//创建路由实例
const router = new VueRouter({
    routes
});

//暴露出去
export default router;