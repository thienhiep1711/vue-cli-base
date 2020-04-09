<template>
  <div class="account">
    <div class="account__title">
      Login
    </div>
    <div class="account__form">
      <form action="#" @submit.prevent="handleLogin">
        <input type="text" class="input" placeholder="Username" name="username" id="username" required>
        <input type="password" class="input" placeholder="Password" name="password" id="password" required>
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
      console.log('Submit login')
    }
  }
}
</script>
