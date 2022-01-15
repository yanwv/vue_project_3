// 对 axios 二次封装

import axios from "axios";
// 引入进度条
import nprogress from 'nprogress'
// start进度条开始 done进度条结束
import 'nprogress/nprogress.css'  // 引入进度条样式

// 利用axios对象方法create创建axios实例
const requests = axios.create({
  //基础路径
  baseURL: "/mock",
  //请求不能超过5S
  timeout: 5000,
});
// 请求拦截器  发送请求前检测到
requests.interceptors.request.use((config) => {
  nprogress.start();
  // 配置对象config 有header请求头
  return config;
})
// 响应拦截器  发送请求后检测到
requests.interceptors.response.use((res) => {
  nprogress.done();
  // 成功回调
  return res.data;
}, (error) => {
  // 失败回调
  return Promise.reject(new Error('faile'));
})

export default requests;