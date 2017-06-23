<template>
  <div class="container">
  <!-- index -->
    <userHead @popState="changeState"></userHead>
    <totalUserList :fromFa="viewWhich" @popState="changeState"></totalUserList>
  </div>
    
</template>

<script>
// import config from '@/config'
// import Axios from 'axios'
import userHead from '@/components/modules/userHead'
import totalUserList from '@/components/modules/totalUserList'

export default {
  name: 'userManage',
  components: {userHead, totalUserList},
  data () {
    return {
      viewWhich: '0'
    }
  },
  methods: {
    getUser: function () {
      // 注册用户
      // Axios.get(config.HOST + 'apiServer/personManage/getPersonList', {params: this.getParams}).then((res) => {
      //   this.modelThree = res.data.results.list
      //   // TODO获取数据传递给model3，或者干脆重新写一个组件
      //   console.log(res)
      // }, (err) => {
      //   console.log(err)
      // })
    },
    changeState: function (msg) {
      this.viewWhich = msg
      // alert(this.viewWhich)
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
  width: 1200px;
  position: relative;
}
</style>
