<template>
  <div class="container">
  <!-- index -->
    <indexHead @currentContent="go"></indexHead>
    <modelBox :notice="type" :to-models="personList"></modelBox>
  </div>
    
</template>

<script>
import indexHead from '@/components/modules/indexHead'
import modelBox from '@/components/modules/modelBox'
import config from '@/config'
import Axios from 'axios'

export default {
  name: 'Index',
  // ①：indexHead当前选择tab栏
  props: ['currentContent'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentRoute: window.location.pathname,
      type: 0,
      personList: null,
      page: 0,
      getParams: {
        'userkey': config.userkey, 'deviceId': config.deviceId, 'beginTime': 0, 'endTime': new Date().getTime(), 'pageCount': 0
      }
    }
  },
  components: {indexHead, modelBox},
  methods: {
    go: function (msg) {
      // 子页面跳转
      this.type = msg
    },
    getTotal: function () {
      // 今日到访
      Axios.get(config.HOST + 'apiServer/facetrackManage/getFacetrackList', {params: this.getParams}).then((res) => {
        this.personList = res.data.results.list
      }, (err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.getTotal()
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
