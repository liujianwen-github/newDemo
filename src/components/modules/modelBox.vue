<template>
  <div class="container">
    <model1 v-show="notice==0" :to-first="modelOne"></model1>
    <model2 v-show="notice==1" :to-second="modelTwo"></model2>
    <model3 v-show="notice==2" :to-third="modelThree"></model3>
  </div>
</template>

<script>
// import Store from '../store.js'
import model1 from '@/components/modules/model1.vue'
import model2 from '@/components/modules/model2.vue'
import model3 from '@/components/modules/model3.vue'
import Axios from 'axios'
import config from '@/config'
export default {
  name: 'modelBox',
  data () {
    return {
      togg: 0,
      modelOne: null,
      modelTwo: null,
      modelThree: null,
      pagination1: 0,
      pagination2: 0,
      pagination3: 0,
      getParams: {
        'userkey': config.userkey, 'deviceId': config.deviceId, 'beginTime': 0, 'endTime': new Date().getTime(), 'pageNum': 0
      }
    }
  },
  props: ['notice', 'toModels'],
  components: {
    model1, model2, model3
  },
  methods: {
    getTotal: function () {
      // 今日到访
      Axios.get(config.HOST + 'apiServer/facetrackManage/getFacetrackList', {params: this.getParams}).then((res) => {
        this.modelOne = res.data.results.list
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    },
    getStranger: function () {
      // 陌生人
      Axios.get(config.HOST + 'apiServer/facetrackManage/getUnMatchedList', {params: this.getParams}).then((res) => {
        this.modelTwo = res.data.results.list
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    },
    getUser: function () {
      // 注册用户
      Axios.get(config.HOST + 'apiServer/facetrackManage/getMatchedList', {params: this.getParams}).then((res) => {
        this.modelThree = res.data.results.list
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    }
  },
  watch: {
    notice: function (val, old) {
      console.log(this.notice)
      if (this.notice === 0) {
        this.getTotal()
      } else if (this.notice === 1) {
        this.getStranger()
      } else if (this.notice === 2) {
        this.getUser()
      } else {
        'moduleBox wcnm'
      }
    }
  },
  created () {
    // console.log(this.notice)
    console.log('created mmodelbox')
    this.getTotal()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0 auto
}
.container{
  margin-top: 10px;
  width: 100%;
}
  
</style>
