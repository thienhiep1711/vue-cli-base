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

</style>
