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

<style lang="scss">
  .notice {
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 15px;
    margin-bottom: 20px;
    font-weight: 500;
  }

  .notice--error {
    background-color: lighten(red, 40%);
    border: 1px solid lighten(red, 30%);
  }

  .notice--success {
    background-color: lighten(green, 40%);
    border: 1px solid lighten(green, 30%);
  }
</style>
