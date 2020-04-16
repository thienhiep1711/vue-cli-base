<template>
  <div>
    <div :class="['todo__item-main', { 'todo__item--completed' : completed}]">
      <div class="todo__item-checkbox">
        <input type="checkbox" :name="id" :id="id" v-model="completed" @change="doneEdit" />
        <label :for="id"></label>
      </div>
      <div class="todo__item-content">
        <div v-if="!editing" class="todo__item-text" @dblclick="editTodo">{{ title }}</div>
        <input
          v-if="editing"
          type="text"
          class="todo__item-input"
          v-model="title"
          @blur="doneEdit"
          @keyup.enter="doneEdit"
          @keyup.esc="cancelEditTodo"
          v-focus
        />
      </div>
    </div>
    <div class="todo__item-close" @click="removeTodo(id)">
      <span class="todo__item-close-bar"></span>
      <span class="todo__item-close-bar"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: String,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      id: this.todo._id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: false,
      beforeEditCache: ''
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  watch: {
    checkAll () {
      this.completed = this.checkAll ? true : this.todo.completed
    }
  },
  methods: {
    removeTodo (id) {
      this.$store.dispatch('deleteTodo', id)
    },
    editTodo () {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit () {
      if (this.title.trim() === '') {
        this.title = this.beforeEditCache
      } else if (this.title !== this.beforeEditCache) {
        this.editing = false
        this.$store.dispatch('updateTodo', {
          id: this.id,
          title: this.title,
          completed: this.completed
        })
      } else {
        this.editing = false
      }
    },
    cancelEditTodo () {
      this.title = this.beforeEditCache
      this.editing = false
    }
  }
}
</script>
