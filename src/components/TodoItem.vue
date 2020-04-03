<template>
  <div>
    <div :class="['todo__item-main', { 'todo__item--completed' : completed}]">
      <div class="todo__item-checkbox">
        <input
          type="checkbox"
          :name="id"
          :id="id"
          v-model="completed"
          @change="doneEdit"
        >
      </div>
      <div class="todo__item-content">
        <div
          v-if="!editing"
          class="todo__item-text"
          @dblclick="editTodo"
        >
          {{ title }}
        </div>
        <input
          v-if="editing"
          type="text"
          class="todo__item-input"
          v-model="title"
          @blur="doneEdit"
          @keyup.enter="doneEdit"
          @keyup.esc="cancelEditTodo"
          v-focus
        >
      </div>
    </div>
    <div
      class="todo__item-close"
      @click="removeTodo(id)"
    >
      x
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
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
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
      console.log(1)
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit () {
      if (this.title.trim() === '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      this.$store.dispatch('updateTodo', {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      })
    },
    cancelEditTodo () {
      this.title = this.beforeEditCache
      this.editing = false
    }
  }
}
</script>

<style lang="scss">
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
