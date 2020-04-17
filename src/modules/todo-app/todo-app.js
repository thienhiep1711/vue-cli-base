import Vue from 'vue'
import store from 'app/store'
import router from 'app/router'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'todos'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
