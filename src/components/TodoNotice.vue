<template>
  <div class="todo-notice" v-if="isActive">
    All Doneeeeee
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
