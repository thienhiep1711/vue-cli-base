<template>
  <div class="main">
    <div class="container">
      <div class="account">
        <div class="account__title">
          Register
        </div>
        <div class="account__form">
          <form
            action="#"
            @submit.prevent="handleRegister"
          >
            <input
              id="username"
              v-model="name"
              class="input"
              placeholder="Username"
              name="username"
              type="text"
              required
            >
            <input
              id="email"
              v-model="email"
              type="text"
              class="input"
              placeholder="Email"
              name="email"
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
              :is-value="errorMessage"
              type="error"
            >
              {{ errorMessage }}
            </notice>
            <button
              type="submit"
              class="button"
            >
              Submit
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
      name: '',
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    handleRegister () {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password
      }).then(response => {
        this.$router.push({ name: 'login' })
      }).catch(error => {
        const res = error.response
        if (res.status === 400) {
          this.errorMessage = 'Something went wrong, a field not vaild'
        }
      })
    }
  }
}
</script>
