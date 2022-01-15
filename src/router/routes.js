// 路由配置信息

// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default
  [
    {
      path: '/', // 路由重定向
      redirect: '/home'
    },
    {
      path: '/home',
      // 路由懒加载  路由被访问时才加载对应组件
      // 没有直接引入 当点击home页面时再执行路由跳转
      component: () => import("@/pages/Home"),
      // 路由元信息
      meta: { show: true }
    },
    {
      path: '/register',
      component: Register,
      meta: { show: false }
    },
    {
      path: '/search/:keyword?',
      component: () => import("@/pages/Search"),
      name: 'search'
    },
    {
      path: '/login',
      component: Login,
      meta: { show: false }
    },
    {
      path: '/detail/:skuid',
      component: Detail,
      meta: { show: false }
    },
    {
      path: '/addcartsuccess',
      component: AddCartSuccess,
      name: 'addcartsuccess',
      meta: { show: false }
    },
    {
      path: '/shopcart',
      component: ShopCart,
      meta: { show: false }
    },
    {
      path: '/trade',
      component: Trade,
      meta: { show: false },
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        // 只有从购物车来才能进去
        if (from.path === '/shopcart') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/pay',
      component: Pay,
      meta: { show: false },
      beforeEnter: (to, from, next) => {
        if (from.path === '/trade') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/paysuccess',
      component: PaySuccess,
      meta: { show: false },
    },
    {
      path: '/center',
      component: Center,
      meta: { show: false },
      children: [
        {
          path: 'groupOrder',
          component: GroupOrder
        },
        {
          path: 'myOrder',
          component: MyOrder
        },
        {
          path: '/center',
          redirect: '/center/myorder'
        },
      ]
    },
  ]