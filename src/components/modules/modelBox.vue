<template>
  <div id="modulesBox">
    <model1 v-show="notice==0" :to-first="modelOne" @pageOne="model_Change" @update="update" :page-one="pageInfo1"></model1>
    <model2 v-show="notice==1" :to-second="modelTwo" @pageTwo="model_Change" @update="update" :page-two="pageInfo2"></model2>
    <model3 v-show="notice==2" :to-third="modelThree" @pageThree="model_Change" @update="update" :page-three="pageInfo3"></model3>
  </div>
</template>

<script>
// import Store from '../store.js'
import model1 from '@/components/modules/model1.vue'
import model2 from '@/components/modules/model2.vue'
import model3 from '@/components/modules/model3.vue'
import Axios from 'axios'
import config from '@/config'
import INTERFACE from '@/interface'
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
        matchStatus:null,'beginTime': new Date().setHours(0,0,0,0), 'endTime': new Date().getTime(), 'pageNo': 1
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
      this.getParams.matchStatus = null
      if (this.pageInfo1 !== null) this.getParams.pageNo = this.pageInfo1.pageNo
      Axios.get(INTERFACE.GET_FACRTRACKLIST, {params: this.getParams}).then((res) => {
        console.log(res)
        // if (res.data.status != res.data.succ_code) return
        this.modelOne = res.data.results.batchVo.list
        this.pageInfo1 = {
          pageNo:res.data.results.batchVo.pageNo,
          pageSize:20,
          totalNum:res.data.results.batchVo.totalNum,
        }
      }, (err) => {
        this.$Message.error('请求超时')
        console.log(err)
        // console.log(err.join(''))
        // document.write(err)
      })
    },
    getStranger: function () {
      // 陌生人
      this.getParams.matchStatus = 0
      if (this.pageInfo2 !== null) this.getParams.pageNo = this.pageInfo2.pageNo
      Axios.get(INTERFACE.GET_FACRTRACKLIST, {params: this.getParams}).then((res) => {
        console.log(res)
        // if (res.data.code != res.data.succ_code) return
        this.modelTwo = res.data.results.batchVo.list
        this.pageInfo2 = {
          pageNo:res.data.results.batchVo.pageNo,
          pageSize:20,
          totalNum:res.data.results.batchVo.totalNum,
        }
        // this.pageInfo2 = res.data.results.pageInfo
        // console.log(res)
      }, (err) => {
        this.$Message.error('请求超时')
      })
    },
    getUser: function () {
      // 注册用户
      this.getParams.matchStatus = 1
      if (this.pageInfo3 !== null) this.getParams.pageNo = this.pageInfo3.pageNo
      Axios.get(INTERFACE.GET_USER_LASTVISIT, {params: this.getParams}).then((res) => {
        // if (res.data.code != res.data.succ_code) return
        this.modelThree = res.data.results.batchVo.list
        this.pageInfo3 = {
          pageNo:res.data.results.batchVo.pageNo,
          pageSize:20,
          totalNum:res.data.results.batchVo.totalNum,
        }
        // console.log(res)
      }, (err) => {
        this.$Message.error('请求超时')
      })
    },
    model_Change: function (pageNo, which) {
      console.log(which)
      switch (which) {
        case 1:
          this.pageInfo1.pageNo = pageNo
          this.getTotal()
          break
        case 2:
          this.pageInfo2.pageNo = pageNo
          this.getStranger()
          break
        case 3:
          this.pageInfo3.pageNo = pageNo
          this.getUser()
          break
      }
      // this.$forceUpdate()
      // which 选择调用哪个接口
    },
    update: function (type) {
      switch (type) {
        case 1:
          this.getTotal()
          break
        case 2:
          this.getStranger()
          break
        case 3:
          this.getUser()
          break
      }
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
        this.$Message.error('意料之外的错误')
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
