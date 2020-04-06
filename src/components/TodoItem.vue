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
        <label :for="id"></label>
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

.todo__item-close {
  position: relative;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
}

.todo__item-input {
  padding: 3px 8px;
  font-size: 16px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;

  &:focus {
    outline: none;
    border: 2px solid skyblue;
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
    border: 2px solid #666;

    &::before,
    &::after {
      content: "";
      position: absolute;
      height: 3px;
      width: 12px;
      background-color: #666;
      bottom: 12px;
      left: 6px;
      transition: background-color 0.3s;
    }

    &::before {
      transform: rotate(45deg);
      left: 3px;
      bottom: 8px;
      width: 10px;
    }

    &::after {
      transform: rotate(125deg);
      width: 20px;
      transition-delay: 0.2s;
    }
  }

  input[type=checkbox]{
    display: none;

    &:checked + label {
      border-color: skyblue;
      background-color: skyblue;

      &::before,
      &::after {
        background-color: white;
      }
    }
  }
}

</style>
