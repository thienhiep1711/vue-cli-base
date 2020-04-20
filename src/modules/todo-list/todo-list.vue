<template>
  <div class="main">
    <div class="container">
      <div class="todo">
        <transition name="fade">
          <div
            v-show="users.email"
            class="todo__header"
          >
            Welcome: <span>{{ users.email }}</span>
          </div>
        </transition>
        <input
          v-model="newTodo"
          type="text"
          class="todo__input"
          placeholder="What needs to be done"
          @keyup.enter="addTodo"
        >
        <div
          v-if="todosFiltered.length > 0"
          class="todo__list"
        >
          <transition-group name="list-item">
            <todo-item
              v-for="(todo) in todosFiltered"
              :key="todo._id"
              class="todo__item"
              :todo="todo"
              :index="todo._id"
              :check-all="!anyRemaining"
              @finishedUpdateTodo="finishedUpdate"
            />
          </transition-group>
        </div>
        <todo-notice
          v-else
          :is-active="true"
        >
          <div
            v-if="currentFilter === 'active'"
            class="todo-notice__text"
          >
            All Done!
          </div>
          <div
            v-if="currentFilter === 'completed'"
            class="todo-notice__text"
          >
            Give up!
          </div>
          <div
            v-if="currentFilter === 'all'"
            class="todo-notice__text"
          >
            Nothing todo...
          </div>
        </todo-notice>
        <todo-check-all v-if="allTodo > 0" />
        <div
          v-if="allTodo > 0"
          class="todo__extra"
        >
          <todo-filter />
          <todo-clear-filter />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
      newTodo: '',
      beforeEditCache: ''
    }
  },
  computed: {
    ...mapState(['users']),
    remaining () {
      return this.$store.getters.remaining
    },
    anyRemaining () {
      return this.$store.getters.remaining !== 0
    },
    todosFiltered () {
      return this.$store.getters.todosFiltered.slice().reverse()
    },
    showClearCompletedButton () {
      return this.$store.getters.showClearCompletedButton
    },
    allTodo () {
      return this.$store.getters.allTodo
    },
    currentFilter () {
      return this.$store.getters.filter
    }
  },
  created () {
    this.$store.dispatch('getTodos')
  },
  mounted () {
    this.$store.dispatch('getUser')
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim() === '') {
        return
      }
      this.$store.dispatch('addTodo', {
        title: this.newTodo,
        note: 'Thienhiep'
      })
      this.newTodo = ''
    },
    finishedUpdate (data) {
      this.$store.state.todos.splice(data.index, 1, data.todo)
    }
  }
}
</script>
