<template>
  <div id="modulesBox">
    <model1 v-show="notice==0" :to-first="modelOne" @pageOne="model_Change" :page-one="pageInfo1"></model1>
    <model2 v-show="notice==1" :to-second="modelTwo" @pageTwo="model_Change" :page-two="pageInfo2"></model2>
    <model3 v-show="notice==2" :to-third="modelThree" @pageThree="model_Change" :page-three="pageInfo3"></model3>
  </div>
</template>

<script>
// import Store from '../store.js'
import model1 from '@/components/modules/model1.vue'
import model2 from '@/components/modules/model2.vue'
import model3 from '@/components/modules/model3.vue'
import Axios from 'axios'
import config from '@/config'
// import INTERFACE from '@/interface'
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
      if (this.pageInfo1 !== null) this.getParams.pageNo = this.pageInfo1.pageNo
      Axios.get('apiServer/facetrackManage/getFacetrackList', {params: this.getParams}).then((res) => {
        this.modelOne = res.data.results.list
        // this.modelOne = {
        //   '0': 121,
        //   '1': 2323,
        //   '3': 2323
        // }
        this.pageInfo1 = res.data.results.pageInfo
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    },
    getStranger: function () {
      // 陌生人
      if (this.pageInfo2 !== null) this.getParams.pageNo = this.pageInfo2.pageNo
      Axios.get('apiServer/facetrackManage/getUnMatchedList', {params: this.getParams}).then((res) => {
        this.modelTwo = res.data.results.list
        this.pageInfo2 = res.data.results.pageInfo
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    },
    getUser: function () {
      // 注册用户
      if (this.pageInfo3 !== null) this.getParams.pageNo = this.pageInfo3.pageNo
      Axios.get('apiServer/personManage/getMatchedPersonList', {params: this.getParams}).then((res) => {
        this.modelThree = res.data.results.list
        this.pageInfo3 = res.data.results.pageInfo
        console.log(res)
        // console.log(this.pageInfo3)
      }, (err) => {
        console.log(err)
      })
    },
    model_Change: function (msg, which) {
      console.log(typeof which)
      switch (which) {
        case 1:
          this.pageInfo1.pageNo = msg
          this.getTotal()
          break
        case 2:
          this.pageInfo2.pageNo = msg
          this.getStranger()
          break
        case 3:
          this.pageInfo3.pageNo = msg
          this.getUser()
          break
      }
      // this.$forceUpdate()
      // which 选择调用哪个接口
    }
  },
  watch: {
    notice: function (val, old) {
      console.log(this.notice)
      if (this.notice === '0') {
        this.getTotal()
      } else if (this.notice === '1') {
        this.getStranger()
      } else if (this.notice === '2') {
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
#modulesBox{
  border: 1px solid transparent;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow:hidden;
  width: 100%;
  max-width: 1200px
}

  
</style>
