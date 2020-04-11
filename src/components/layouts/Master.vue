<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li><router-link :to="{ name: 'home' }">Home</router-link></li>
        <li><router-link :to="{ name: 'about' }">About</router-link></li>
        <li><router-link :to="{ name: 'todos' }">Todos</router-link></li>
        <li v-if="!loggedIn"><router-link :to="{ name: 'login' }">Login</router-link></li>
        <li v-if="!loggedIn"><router-link :to="{ name: 'register' }">Register</router-link></li>
        <li v-if="loggedIn"><router-link :to="{ name: 'register' }">Logout</router-link></li>
      </ul>
    </div>
    <div class="main">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Master',
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
}

.logo {
  max-width: 100px;
  margin-bottom: 30px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background-color: white;
  margin: 50px auto;
  border-radius: 8px;
  box-shadow: 0 0 40px #e6e6e6;
}

.nav {
  display: flex;
  justify-content: center;
  background-color: white;
  border-bottom: 1px solid #e5e5e5;

  ul {
    list-style-type: none;
    display: flex;
    align-content: center;
    align-items: center;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;

      a {
        display: inline-block;
        text-decoration: none;
        color: #2c3e50;
        padding: 15px 20px;
        font-weight: 500;
        text-transform: uppercase;
        transition: 0.3s ease-in-out;

        &:hover,
        &.router-link-exact-active {
          color: white;
          background-color: #2c3e50;
        }
      }
    }
  }
}

.main {
  padding: 30px 0;
}

.account__title {
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 30px;
}

.input {
  height: 38px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 20px;
  background-color: #e7e7e7;
  text-indent: 10px;
  border: 2px solid transparent;
  transition: 0.2s ease-in-out;
  font-size: 15px;

  &:focus {
    outline: none;
    border: 2px solid #2c3e50;
    background-color: #f1f1f1;
  }
}

.button {
  height: 38px;
  background-color: #2c3e50;
  color: white;
  font-weight: 500;
  font-size: 16px;
  padding: 0 14px;
  border-radius: 4px;
  border: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

</style>
