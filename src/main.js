import Vue from 'vue'
import store from './store'
import Master from './components/layouts/Master.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(Master)
}).$mount('#app')
