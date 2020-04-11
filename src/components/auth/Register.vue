<template>
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
          v-model="username"
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
        <button type="submit" class="button">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    handleRegister () {
      this.$store.dispatch('register', {
        username: this.username,
        email: this.email,
        password: this.password
      }).then(response => {
        this.$router.push({ name: 'todo' })
      })
    }
  }
}
</script>
