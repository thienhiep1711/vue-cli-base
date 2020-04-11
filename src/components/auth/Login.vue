<template>
  <div class="account">
    <div class="account__title">
      Login
    </div>
    <div class="account__form">
      <form action="#" @submit.prevent="handleLogin">
        <input type="text" class="input" placeholder="Username" name="username" id="username" required v-model="username">
        <input type="password" class="input" placeholder="Password" name="password" id="password" required v-model="password">
        <button type="submit" class="button">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin () {
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password
      }).then(response => {
        this.$router.push({ name: 'todos' })
      })
    }
  }
}
</script>
