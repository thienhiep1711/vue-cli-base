<template>
  <div class="main">
    <div class="container">
      <div>
        Logout
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    if (this.$store.getters.getToken) {
      this.$store.dispatch('destroyToken', this.$store.getters.getToken)
        .then(response => {
          this.$router.push({ name: 'home' })
        })
    }
  }
}
</script>
