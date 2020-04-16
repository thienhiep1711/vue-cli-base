<template>
  <div class="main">
    <div class="container">
      <div class="account">
        <div class="account__title">
          Login
        </div>
        <div class="account__form">
          <form
            action="#"
            @submit.prevent="handleLogin"
          >
            <input
              id="username"
              v-model="username"
              type="text"
              class="input"
              placeholder="Username"
              name="username"
              required
            >
            <input
              id="password"
              v-model="password"
              type="password"
              class="input"
              placeholder="Password"
              name="password"
              required
            >
            <notice
              type="error"
              :is-value="errorMessage"
            >
              {{ errorMessage }}
            </notice>
            <button
              type="submit"
              class="button"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    handleLogin () {
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password
      }).then(response => {
        this.$router.push({ name: 'todos' })
      }).catch(error => {
        const res = error.response
        if (res.status === 400) {
          this.errorMessage = 'Username or Password are incorrect. Please try again'
        }
      })
    }
  }
}
</script>
