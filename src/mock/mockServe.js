// 引入mockjs模块
import Mock from 'mockjs'
// 引入JSON数据
// webpack默认对外暴露的有图片和JSON
import banner from './banner.json'
import floor from './floor.json'

// 第一个参数请求地址 第二个参数请求数据
Mock.mock("/mock/banner", { code: 200, data: banner }) // 模拟首页轮播图
Mock.mock("/mock/floor", { code: 200, data: floor })

// 最后在main.js文件中引入