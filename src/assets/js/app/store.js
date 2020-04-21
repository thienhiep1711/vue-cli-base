import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store(
  {
    state: {
      filter: 'all',
      todos: [],
      users: {
        id: localStorage.getItem('user_id') || null,
        token: localStorage.getItem('access_token') || null,
        email: null
      }
    },
    getters,
    mutations,
    actions
  }
)

export default store
