<template>
  <div
    v-if="isActive"
    class="todo-notice"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>
