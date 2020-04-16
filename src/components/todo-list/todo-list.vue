<template>
<div class="main">
  <div class="container">
    <div class="todo">
      <transition name="fade">
        <div
        class="todo__header"
        v-show="users.email"
        >
          Welcome: <span>{{ users.email }}</span>
        </div>
      </transition>
      <input
        type="text"
        class="todo__input"
        placeholder="What needs to be done"
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
      <div class="todo__list" v-if="todosFiltered.length > 0">
        <transition-group name="list-item">
          <todo-item
            class="todo__item"
            v-for="(todo) in todosFiltered"
            :key="todo._id"
            :todo="todo"
            :index="todo._id"
            :checkAll="!anyRemaining"
            @finishedUpdateTodo="finishedUpdate"
          ></todo-item>
        </transition-group>
      </div>
      <todo-notice :isActive="true" v-else>
        <div class="todo-notice__text" v-if="currentFilter === 'active'">All Done!</div>
        <div class="todo-notice__text" v-if="currentFilter === 'completed'">Give up!</div>
        <div class="todo-notice__text" v-if="currentFilter === 'all'">Nothing todo...</div>
      </todo-notice>
      <todo-check-all v-if="allTodo > 0"></todo-check-all>
      <div class="todo__extra" v-if="allTodo > 0">
        <todo-filter></todo-filter>
        <todo-clear-filter></todo-clear-filter>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'todo-list',
  props: {
    msg: String
  },
  data () {
    return {
      newTodo: '',
      beforeEditCache: ''
    }
  },
  created () {
    this.$store.dispatch('getTodos')
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
