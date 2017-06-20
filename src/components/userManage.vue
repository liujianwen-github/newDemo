<template>
  <div class="hello">
    <h1>{{ currentRoute }}</h1>
    <router-link to="/" exact>index</router-link>
    <!-- <router-link to="userManage">user</router-link> -->
  </div>
</template>

<script>
export default {
  name: 'userManage',
  data () {
    return {
      msg1: 'Welcome to Your user1',
      currentRoute: window.location.pathname
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
