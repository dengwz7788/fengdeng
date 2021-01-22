import Vue from 'vue'
import Router from 'vue-router'
import pageShow from '@/page/pageShow'
import layout from '@/page/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'page',
      component: pageShow
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout
    }
  ]
})
