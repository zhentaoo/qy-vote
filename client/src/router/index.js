import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Create from '@/page/create'
import Detail from '@/page/detail'
import Statistics from '@/page/statistics'
// import StatCanvas from '@/component/statCanvas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics
    }
    // {
    //   path: '/statCanvas',
    //   name: 'statCanvas',
    //   component: StatCanvas
    // }
  ]
})
