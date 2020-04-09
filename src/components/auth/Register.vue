<template>
  <div class="account">
    <div class="account__title">
      Register
    </div>
    <div class="account__form">
      <form action="#" @submit.prevent="handleRegister">
        <input type="text" class="input" placeholder="Username" name="username" id="username" required>
        <input type="text" class="input" placeholder="Email" name="email" id="email" required>
        <input type="password" class="input" placeholder="Password" name="password" id="password" required>
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
      console.log('Submit Register')
    }
  }
}
</script>
