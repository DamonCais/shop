import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: () =>
            import('@/views/login/index'),
  hidden: true
},
  // {
  //   path: '/shoppingmallList',
  //   component: () =>
  //             import('@/views/shoppingmall/index'),
  //   hidden: true
  // },
{
  path: '/preview/:id',
  name: 'Preview',
  component: () =>
            import('@/views/preview/index'),
  hidden: true
},

{
  path: '/404',
  component: () =>
            import('@/views/404'),
  hidden: true
},

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: 'Dashboard',
  //   hidden: true,
  //   children: [{
  //     path: 'dashboard',
  //     component: () =>
  //                 import('@/views/dashboard/index')
  //   }]
  // },
{
  path: '/',
  redirect: '/pages',
  name: 'Dashboard',
  hidden: true
},
{
  path: '/pages',
  component: Layout,
  children: [{
    path: '',
    name: 'pages',
    component: () =>
                import('@/views/page/index'),
    meta: { title: 'PAGE', icon: 'form' },
    hidden: true
  }]
},
{
  path: '/pages',
  component: Layout,
  children: [{
    path: ':id',
    name: 'pages',
    component: () =>
                import('@/views/page/page'),
    meta: { title: 'PAGE', icon: 'form', backIcon: true, bread: true }
  }],
  hidden: true
},
{
  path: '/products',
  component: Layout,
  children: [{
    path: '',
    name: 'product',
    component: () =>
                import('@/views/product/index'),
    meta: { title: 'product', icon: 'form' },
    hidden: true
  }]
},
{
  path: '/products',
  component: Layout,
  children: [{
    path: ':id',
    name: 'product',
    component: () =>
                import('@/views/product/product'),
    meta: { title: 'product', icon: 'form', backIcon: true, bread: true }
  }],
  hidden: true
},
  // {
  //   path: '/categories',
  //   component: Layout,
  //   children: [{
  //     path: '',
  //     name: 'categories',
  //     component: () =>
  //                 import('@/views/category/index'),
  //     meta: { title: 'CATEGORY', icon: 'form' },
  //     hidden: true
  //   }]
  // },
  // {
  //   path: '/categories',
  //   component: Layout,
  //   children: [{
  //     path: ':id',
  //     name: 'categories',
  //     component: () =>
  //                 import('@/views/category/category'),
  //     meta: { title: 'CATEGORY', icon: 'form', backIcon: true, bread: true }
  //   }],
  //   hidden: true
  // },
  // {
  //   path: '/orders',
  //   component: Layout,
  //   // redirect: '/orders',

  //   children: [{
  //     path: '',
  //     name: 'orders',
  //     component: () =>
  //                 import('@/views/orders/index'),
  //     meta: { title: 'ORDERS', icon: 'form' }
  //   }]
  // },
  // {
  //   path: '/orders',
  //   component: Layout,
  //   children: [{
  //     path: ':id',
  //     name: 'orders',
  //     component: () =>
  //                 import('@/views/orders/order'),
  //     meta: { title: 'Orders', icon: 'form', backIcon: true, bread: true }
  //   }],
  //   hidden: true
  // },
  // {
  //   path: '/shoppingmall',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     name: 'Shoppingmall',
  //     component: () =>
  //                 import('@/views/shoppingmall/index'),
  //     meta: { title: 'SHOPPINGMALL', icon: 'form' }
  //   }]
  // },
{
  path: '/test',
  component: Layout,
  children: [{
    path: '',
    name: 'Test',
    component: () =>
                import('@/views/test/index'),
    meta: { title: 'Test', icon: 'form' }
  }]
},
{ path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
