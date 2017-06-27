<template>
  <div class="container">
    <model1 v-show="notice==0" :to-first="modelOne" @pageOne="model_Change" :page-one="pageInfo1"></model1>
    <model2 v-show="notice==1" :to-second="modelTwo" :page-info="pageInfo2"></model2>
    <model3 v-show="notice==2" :to-third="modelThree" :page-info="pageInfo3"></model3>
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
      pageInfo1: null,
      pageInfo2: null,
      pageInfo3: null,
      getParams: {
        'userkey': config.userkey, 'deviceId': config.deviceId, 'beginTime': 0, 'endTime': new Date().getTime(), 'pageNo': 1
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
      // this.getParams.pageNo = this.pagination1
      Axios.get(config.HOST + 'apiServer/facetrackManage/getFacetrackList', {params: this.getParams}).then((res) => {
        this.modelOne = res.data.results.list
        // const pageInfo = res.data.results.pageInfo
        this.pageInfo1 = res.data.results.pageInfo
        console.log(res)
        // console.log(this.pageInfo1)
      }, (err) => {
        console.log(err)
      })
    },
    getStranger: function () {
      // 陌生人
      // this.getParams.pageNo = this.pagination2
      Axios.get(config.HOST + 'apiServer/facetrackManage/getUnMatchedList', {params: this.getParams}).then((res) => {
        this.modelTwo = res.data.results.list
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    },
    getUser: function () {
      // 注册用户
      // this.getParams.pageNo = this.pagination3
      Axios.get(config.HOST + 'apiServer/personManage/getMatchedPersonList', {params: this.getParams}).then((res) => {
        this.modelThree = res.data.results.list
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    },
    model_Change: function (msg, which) {
      console.log(which)
      // which 选择调用哪个接口
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
