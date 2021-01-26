import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import Team from '@/page/Team'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Team',
      name: 'Team',
      component: Team
    }
  ]
})
