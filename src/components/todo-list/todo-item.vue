<template>
  <div>
    <div :class="['todo__item-main', { 'todo__item--completed' : completed}]">
      <div class="todo__item-checkbox">
        <input
          :id="id"
          v-model="completed"
          type="checkbox"
          :name="id"
          @change="doneEdit"
        >
        <label :for="id" />
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
          v-model="title"
          v-focus
          type="text"
          class="todo__item-input"
          @blur="doneEdit"
          @keyup.enter="doneEdit"
          @keyup.esc="cancelEditTodo"
        >
      </div>
    </div>
    <div
      class="todo__item-close"
      @click="removeTodo(id)"
    >
      <span class="todo__item-close-bar" />
      <span class="todo__item-close-bar" />
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
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

.todo__item-input {
  width: 100%;
  padding: 3px 8px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;

  &:focus {
    outline: none;
    border: 2px solid #41b882;
  }
}

.todo__item-close {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 6px;

  &:hover {
    cursor: pointer;

    .todo__item-close-bar {
      &::before,
      &::after {
        background-color: #666;
      }
    }
  }
}

.todo__item-close-bar {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #999;
  transform: rotate(45deg);
  border-radius: 2px;

  &:last-child {
    transform: rotate(135deg);
  }
}

.todo__item-text {
  font-weight: 500;
  padding: 3px 10px;

  &:hover {
    cursor: pointer;
  }
}

.todo__item-content {
  display: flex;
  flex: 1 1 0;
  margin-right: 20px;
  align-items: center;
}

.todo__item-checkbox {
  label {
    display: inline-block;
    width: 32px;
    height: 32px;
    position: relative;
    border-radius: 16px;
    border: 2px solid #999;

    &::before,
    &::after {
      content: "";
      position: absolute;
      bottom: 12px;
      left: 6px;
      height: 3px;
      width: 12px;
      background-color: #999;
      transition: background-color 0.2s;
    }

    &::before {
      transform: rotate(45deg);
      left: 3px;
      bottom: 8px;
      width: 10px;
    }

    &::after {
      width: 20px;
      transition-delay: 0.2s;
      transition-duration: 0.2s;
      transform: rotate(125deg);
    }
  }

  input[type="checkbox"] {
    display: none;

    &:checked + label {
      border-color: #41b882;
      background-color: #41b882;

      &::before,
      &::after {
        background-color: white;
      }
    }
  }
}
</style>
