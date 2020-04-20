import Vue from 'vue'
import VueRouter from 'vue-router'
import Todos from '../../../modules/todo-list/todo-list.vue'
import Login from '../../../modules/login/login.vue'
import Register from '../../../modules/register/register.vue'
import Logout from '../../../modules/logout/logout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Todos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/todos',
    name: 'todos',
    component: Todos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
