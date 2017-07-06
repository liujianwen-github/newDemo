<template>
  <div>
  <!-- index -->
    <indexHead @currentContent="go"></indexHead>
    <modelBox :notice="type"></modelBox>
  </div>
    
</template>

<script>
import indexHead from '@/components/modules/indexHead'
import modelBox from '@/components/modules/modelBox'
// import config from '@/config'
// import Axios from 'axios'

export default {
  name: 'Index',
  // ①：indexHead当前选择tab栏
  // props: ['currentContent'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentRoute: window.location.pathname,
      type: 0,
      personList: null,
      page: 0
    }
  },
  components: {indexHead, modelBox},
  methods: {
    go: function (msg) {
      // 子页面跳转
      this.type = msg
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
.container {
  /*background-color: red;*/
  max-width: 1200px;
  width: 100%;
  position: relative;
}
</style>
