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

//导入嵌套路由
//学科
import subject from '../views/index/subject/subject.vue'
//企业
import enterprise from '../views/index/enterprise/enterprise.vue'
//数据
import datalint from '../views/index/datalint/datalint.vue'
//用户
import userlint from '../views/index/userlint/userlint.vue'
//题库
import question from '../views/index/question/question.vue'

//路由规则
const routes = [
    {
        path: '/login',
        component: login
    },
    {
        path: '/index',
        component: index,
        //嵌套路由
        children:[
            {
              path:"subject", // 匹配的是 /index/subject学科
              component:subject
            },
            {
              path:"enterprise", // 匹配的是 /index/enterprise企业
              component:enterprise
            },
            {
              path:"datalint", // 匹配的是 /index/datalint数据
              component:datalint
            },
            {
              path:"userlint", // 匹配的是 /index/userlint用户
              component:userlint
            },
            {
              path:"question", // 匹配的是 /index/question题库
              component:question
            },
        ]
    },

];

//创建路由实例
const router = new VueRouter({
    routes
});

//暴露出去
export default router;