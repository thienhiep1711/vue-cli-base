<template>
  <div class="todo">
    <input type="text"
      class="todo__input"
      placeholder="What needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    >
    <div class="todo__list">
      <div
        class="todo__item"
        v-for="(todo, index) in todos"
        :key="index"
      >
        <div :class="['todo__item-main', { 'todo__item--completed' : todo.completed}]">
          <div class="todo__item-checkbox">
            <input
              type="checkbox"
              :name="todo.id"
              :id="todo.id"
              v-model="todo.completed"
            >
          </div>
          <div class="todo__item-content">
            <div
              v-if="!todo.editing"
              class="todo__item-text"
              @dblclick="editTodo(todo)"
            >
              {{ todo.title }}
            </div>
            <input
              v-if="todo.editing"
              type="text"
              class="todo__item-input"
              v-model="todo.title"
              @blur="updateTodo(todo)"
              @keyup.enter="updateTodo(todo)"
              @keyup.esc="cancelEditTodo(todo)"
              v-focus
            >
          </div>
        </div>
        <div
          class="todo__item-close"
          @click="removeTodo(todo.id)"
        >
          x
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-list',
  props: {
    msg: String
  },
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: '',
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
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim() === '') {
        return
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      })

      this.newTodo = ''
      this.idForTodo++
      console.log('add todo')
    },
    editTodo (todo) {
      this.beforeEditCache = todo.title
      todo.editing = true
    },
    updateTodo (todo) {
      if (todo.title.trim() === '') {
        todo.title = this.beforeEditCache
      }
      todo.editing = false
    },
    cancelEditTodo (todo) {
      todo.title = this.beforeEditCache
      todo.editing = false
    },
    removeTodo (id) {
      this.todos.splice(id, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todo__list {
  display: flex;
  flex-direction: column;
}

.todo__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.todo__item-main {
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-start;
}

.todo__item-checkbox {
  margin-right: 10px;
}

.todo__item--completed {
  .todo__item-text {
    text-decoration: line-through;
  }
}

</style>
