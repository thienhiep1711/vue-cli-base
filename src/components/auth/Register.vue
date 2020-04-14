<template>
  <div class="main">
    <div class="container">
      <div class="account">
        <div class="account__title">Register</div>
        <div class="account__form">
          <form action="#" @submit.prevent="handleRegister">
            <input
              type="text"
              class="input"
              placeholder="Username"
              name="username"
              id="username"
              required
              v-model="name"
            />
            <input
              type="text"
              class="input"
              placeholder="Email"
              name="email"
              id="email"
              required
              v-model="email"
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
            <button type="submit" class="button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notice from '../Notice'
export default {
  name: 'register',
  components: {
    Notice
  },
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
