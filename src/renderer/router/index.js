import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'page',
      component: require('@/components/page').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
