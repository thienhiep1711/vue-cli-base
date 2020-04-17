<template>
  <div
    v-if="isDisplay"
    :class="['notice', `notice--${type}`, className]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    isValue: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    isDisplay () {
      return this.isValue.length > 0
    }
  }
}
</script>
