import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../components/pages/LandingPage.vue'
import About from '../components/pages/About.vue'
import Todos from '../components/TodoList.vue'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import Logout from '../components/auth/Logout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/about',
    name: 'about',
    component: About
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
