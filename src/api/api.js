//导入axios
import axios from 'axios';

// 导入 token获取方法
import { getToken, removeToken } from '../utils/token.js';
// 导入 element-ui的弹框
import { Message } from 'element-ui';


//在main里面已经写了,所以就不用写了
//导入Vue
// import Vue from 'vue';
// Vue.use(Message);
//导入路由
import router from '../router/router.js';

//统一基地址
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
// 统一设置 跨域携带cookie
axios.defaults.withCredentials = true;

//统一设置axios拦截器
//请求拦截器
//请求发送 之前 
//config 是当前这次请求的  各种设置
//可以统一设置header
axios.interceptors.request.use(
  function (config) {
    // 为config 统一设置token
    config.headers.token = getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//响应拦截器
//axios  直接使用的 .then之前
//response  服务器响应的内容
axios.interceptors.response.use(
  function (response) {
    // 判断token
    if (response.data.code === 0) {
      // 提示
      Message.error(response.data.message);
      // 删除token
      removeToken();
      // 去登录页
      router.push("/login");
      return;
    }
    //统一设置弹框   如果状态码显示为200  说明成功
    if (response.data.code === 200) {
      Message.success(response.data.message)
    }
    return response;

  },
  function (error) {
    return Promise.reject(error);
  }
);




// 暴露出去 有名字的暴露 名字一般和接口地址一样
export function login(data) {
  return axios({
    url: "/login",
    method: "post",
    data
  })
}

// 暴露出去的 注册方法
export function register(data) {
  return axios({
    url: "/register",
    method: "post",
    data
  })
}

// 暴露出去的 获取短信验证码的方法
export function sendsms(data) {
  return axios({
    url: "/sendsms",
    method: "post",
    data
  })
}

// 暴露出去的 用户信息
export function userInfo(data) {
  return axios({
    url: "/user/info",
    method: "get",
    //通过拦截器设置了
    // headers:{
    //     token: getToken
    // }
    data
  })
}

// 作用域 抽取学科接口
// subject.add //subject.remove  通过对象点出来
export const subject = {
  // 新增
  add(data) {
    return axios({
      url: "/subject/add",
      method: "post",
      data
    })
  },
  // 列表
  // get请求的参数用params来传递
  list(params) {
    return axios({
      url: "/subject/list",
      method: "get",
      params
    })
  },
  // 状态
  status(data) {
    return axios({
      url: "/subject/status",
      method: "post",
      data
    })
  },
  // 编辑
  edit(data) {
    return axios({
      url: "/subject/edit",
      method: "post",
      data
    })
  },
  // 删除
  remove(data) {
    return axios({
      url: "/subject/remove",
      method: "post",
      data
    })
  },
};

//企业接口
export const enterprise = {
  // 新增
  add(data) {
    return axios({
      url: "/enterprise/add",
      method: "post",
      data
    })
  },
  // 列表
  // get请求的参数用params来传递
  list(params) {
    return axios({
      url: "/enterprise/list",
      method: "get",
      params
    })
  },
  // 状态
  status(data) {
    return axios({
      url: "/enterprise/status",
      method: "post",
      data
    })
  },
  // 编辑
  edit(data) {
    return axios({
      url: "/enterprise/edit",
      method: "post",
      data
    })
  },
  // 删除
  remove(data) {
    return axios({
      url: "/enterprise/remove",
      method: "post",
      data
    })
  },
};
//用户接口
export const user = {
  // 新增
  add(data) {
    return axios({
      url: "/user/add",
      method: "post",
      data
    })
  },
  // 列表
  // get请求的参数用params来传递
  list(params) {
    return axios({
      url: "/user/list",
      method: "get",
      params
    })
  },
  // 状态
  status(data) {
    return axios({
      url: "/user/status",
      method: "post",
      data
    })
  },
  // 编辑
  edit(data) {
    return axios({
      url: "/user/edit",
      method: "post",
      data
    })
  },
  // 删除
  remove(data) {
    return axios({
      url: "/user/remove",
      method: "post",
      data
    })
  },
};




