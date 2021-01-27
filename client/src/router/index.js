import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import Team from '@/page/Team'
import Login from '@/page/Login'

Vue.use(Router)

const router = new Router({
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
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = true
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
