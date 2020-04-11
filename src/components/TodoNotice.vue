<template>
  <div class="todo-notice" v-if="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'todo-notice',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.todo-notice {
  margin: 30px 0;
}

.todo-notice__text {
  font-weight: 500;
  font-size: 20px;
  color: #41b882;
}
</style>
