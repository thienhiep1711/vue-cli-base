<template>
  <div>
    Logout
  </div>
</template>

<script>
export default {
  name: 'logout',
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
