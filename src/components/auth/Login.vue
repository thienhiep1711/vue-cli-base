<template>
  <div class="account">
    <div class="account__title">Login</div>
    <div class="account__form">
      <form action="#" @submit.prevent="handleLogin">
        <input
          type="text"
          class="input"
          placeholder="Username"
          name="username"
          id="username"
          required
          v-model="username"
        />
        <input
          type="password"
          class="input"
          placeholder="Password"
          name="password"
          id="password"
          required
          v-model="password"
        />
        <notice
          :isValue="errorMessage"
          type="error"
        >
          {{errorMessage}}
        </notice>
        <button type="submit" class="button">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import Notice from '../Notice'

export default {
  name: 'login',
  components: {
    Notice
  },
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
