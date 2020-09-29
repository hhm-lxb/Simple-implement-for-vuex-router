import Vue from 'vue'
import VueRouter from './router'
import Home from '@/components/home'
import Sub from '@/components/sub'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Home
  },
  {
    path: '/sub',
    component: Sub
  }
]
export default new VueRouter({
  routes
})
