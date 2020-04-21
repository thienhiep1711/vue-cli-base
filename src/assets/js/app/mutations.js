export default {
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
}
