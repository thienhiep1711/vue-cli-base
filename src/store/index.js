import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const apiURL = 'https://hiepnt-node-todo-api.herokuapp.com/'

Vue.use(Vuex)

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    filter: 'all',
    todos: [
      {
        id: 1,
        title: 'Finish Vue Screencast',
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: 'Take over world',
        completed: false,
        editing: false
      },
      {
        id: 3,
        title: 'Style vue todo app',
        completed: true,
        editing: false
      }
    ]
  },
  getters: {
    remaining (state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining (state, getters) {
      return getters.remaining !== 0
    },
    todosFiltered (state) {
      if (state.filter === 'all') {
        return state.todos
      } else if (state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter === 'completed') {
        console.log(state.todos.filter(todo => todo.completed))
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton (state) {
      return state.todos.filter(todo => todo.completed).length > 0
    },
    allTodo (state) {
      return state.todos.length
    },
    filter (state) {
      return state.filter
    },
    loggedIn (state) {
      return state.token || null
    }
  },
  mutations: {
    addTodo (state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      })
    },
    updateTodo (state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id)
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      })
    },
    deleteTodo (state, id) {
      const index = state.todos.findIndex(item => item.id === id)
      state.todos.splice(index, 1)
    },
    clearCompleted (state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    updateFilter (state, filter) {
      state.filter = filter
    },
    checkAll (state, checked) {
      state.todos.forEach(todo => (todo.completed = checked))
    },
    retrieveToken (state, token) {
      state.token = token
    }
  },
  actions: {
    addTodo (context, todo) {
      context.commit('addTodo', todo)
    },
    updateTodo (context, todo) {
      context.commit('updateTodo', todo)
    },
    deleteTodo (context, id) {
      context.commit('deleteTodo', id)
    },
    clearCompleted (context) {
      context.commit('clearCompleted')
    },
    updateFilter (context, filter) {
      context.commit('updateFilter', filter)
    },
    checkAll (context, checked) {
      context.commit('checkAll', checked)
    },
    retrieveToken (context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post(`${apiURL}users/login`, {
          config,
          email: credentials.username,
          password: credentials.password
        }).then(response => {
          const token = response.data.auth
          localStorage.setItem('access_token', token)
          context.commit('retrieveToken', token)
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
