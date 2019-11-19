//导入
import VueRouter from 'vue-router'

//导入Vue
import Vue from 'vue'



//使用
Vue.use(VueRouter);

//路由规则
const routes = [];

//创建路由实例
const router = new VueRouter({
    routes
});

//暴露出去
export default router;