import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

const apiURL = 'https://hiepnt-node-todo-api.herokuapp.com/'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

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
        return state.users.token || null
      },
      userId (state) {
        return state.users.id
      },
      getToken (state) {
        return state.users.token
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
        state.users.token = token
      },
      retrieveUserId (state, id) {
        state.users.id = id
      },
      destroyToken (state) {
        state.users.token = null
        state.users.id = null
      },
      getTodos (state, todos) {
        state.todos = todos
      },
      getUser (state, user) {
        state.users.email = user.email
      }
    },
    actions: {
      addTodo (context, todo) {
        axios({
          method: 'post',
          url: `${apiURL}todos`,
          data: {
            title: todo.title,
            note: todo.note
          },
          headers: {
            'Content-Type': 'application/json',
            'x-auth': context.state.users.token
          }
        })
          .then(response => {
            console.log(response)
            this.dispatch('getTodos')
          }).catch(error => {
            console.log(error)
          })
      },
      updateTodo (context, todo) {
        axios({
          method: 'patch',
          url: `${apiURL}todos/${todo.id}`,
          data: {
            title: todo.title,
            note: todo.note,
            completed: todo.completed
          },
          headers: {
            'Content-Type': 'application/json',
            'x-auth': context.state.users.token
          }
        })
          .then(response => {
            console.log(response)
            this.dispatch('getTodos')
          }).catch(error => {
            console.log(error)
          })
      },
      deleteTodo (context, id) {
        context.commit('deleteTodo', id)
        axios.delete(`${apiURL}todos/${id}`, {
          headers: {
            'x-auth': context.state.users.token
          }
        })
          .then(response => {
            console.log(response)
          }).catch(error => {
            console.log(error)
          })
      },
      clearCompleted (context) {
        context.commit('clearCompleted')
      },
      updateFilter (context, filter) {
        context.commit('updateFilter', filter)
      },
      async checkAll (context, checked) {
        context.commit('checkAll', checked)
        const allTodos = context.state.todos
        const checkedTodo = async () => {
          const requests = allTodos.map((todo) => {
            axios({
              method: 'patch',
              url: `${apiURL}todos/${todo._id}`,
              data: {
                completed: checked
              },
              headers: {
                'Content-Type': 'application/json',
                'x-auth': context.state.users.token
              }
            })
              .then(response => {
                console.log(response)
              }).catch(error => {
                console.log(error)
              })
          })
          return Promise.all(requests).catch(error => {
            console.log(error)
          })
        }
        checkedTodo()
      },
      retrieveToken (context, credentials) {
        return new Promise((resolve, reject) => {
          axios.post(`${apiURL}users/login`, {
            config,
            email: credentials.username,
            password: credentials.password
          }).then(response => {
            const token = response.data.auth
            const userId = response.data.user._id
            localStorage.setItem('access_token', token)
            localStorage.setItem('user_id', userId)
            context.commit('retrieveToken', token)
            context.commit('retrieveUserId', userId)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      destroyToken (context, token) {
        if (context.getters.loggedIn) {
          return new Promise((resolve, reject) => {
            axios.delete(`${apiURL}users/me/token`, {
              headers: {
                'x-auth': token
              }
            })
              .then(response => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('user_id')
                context.commit('destroyToken')
                console.log(response)
                resolve(response)
              }).catch(error => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('user_id')
                context.commit('destroyToken')
                console.log(error)
                reject(error)
              })
          })
        }
      },
      register (context, data) {
        return new Promise((resolve, reject) => {
          axios.post(`${apiURL}users`, {
            config,
            name: data.name,
            email: data.email,
            password: data.password
          }).then(response => {
            console.log(response)
            resolve(response)
          }).catch(error => {
            console.log(error)
            reject(error)
          })
        })
      },
      getUser (context) {
        axios.get(`${apiURL}users/me`, {
          config,
          headers: {
            'x-auth': context.state.users.token
          }
        }).then(response => {
          context.commit('getUser', response.data)
        }).catch(error => {
          console.log(error)
        })
      },
      getTodos (context) {
        axios.get(`${apiURL}todos`, {
          config,
          headers: {
            'x-auth': context.state.users.token
          }
        }).then(response => {
          context.commit('getTodos', response.data.todos)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
)

export default store
