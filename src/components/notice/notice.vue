<template>
  <div
    :class="['notice', `notice--${type}`, className]"
    v-if="isDisplay"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'notice',
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
