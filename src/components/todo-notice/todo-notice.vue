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
