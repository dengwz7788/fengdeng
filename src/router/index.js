import Vue from 'vue'
import Router from 'vue-router'
import tableEdite from '@/page/tableEdite'
import pageShow from '@/page/pageShow'
import layout from '@/page/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tableEdite',
      component: tableEdite
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout
    },
    {
      path: '/page',
      name: 'page',
      component: pageShow
    }
  ]
})
