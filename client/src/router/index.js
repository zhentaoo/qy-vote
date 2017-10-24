import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Create from '@/components/create'
import Detail from '@/components/detail'

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
    }
  ]
})
