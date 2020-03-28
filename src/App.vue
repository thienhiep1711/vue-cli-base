<template>
  <div id="app">
    <div class="container">
      <img alt="Vue logo" src="./assets/logo.png" class="logo">
      <todo-list></todo-list>
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
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
  margin-top: 60px;
}
.logo {
  max-width: 100px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
