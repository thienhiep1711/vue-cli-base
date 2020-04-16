<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li>
          <router-link :to="{ name: 'home' }">
            Home
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'about' }">
            About
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'todos' }">
            Todos
          </router-link>
        </li>
        <li v-if="!loggedIn">
          <router-link :to="{ name: 'login' }">
            Login
          </router-link>
        </li>
        <li v-if="!loggedIn">
          <router-link :to="{ name: 'register' }">
            Register
          </router-link>
        </li>
        <li v-if="loggedIn">
          <router-link :to="{ name: 'logout' }">
            Logout
          </router-link>
        </li>
      </ul>
    </div>
    <transition
      name="slide-fade"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  }
}
</script>
