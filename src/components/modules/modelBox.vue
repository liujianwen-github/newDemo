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
      //三个分类数据的取消请求方法
      //this.cancel1.cancel(msg)
      cancel1:Axios.CancelToken.source(),
      cancel2:Axios.CancelToken.source(),
      cancel3:Axios.CancelToken.source(),
      pushStatus:null,
      getParams: {
        matchStatus:null,'beginTime': new Date().setHours(0,0,0,0), 'endTime': new Date().getTime(), 'pageNo': 1
      },
      errorNo:0
    }
  },
  props: ['notice', 'toModels'],
  components: {
    model1, model2, model3
  },
  methods: {
    getTotal: function () {
      this.$Loading.start()
      // 今日到访
      this.getParams.matchStatus = null

      // console.log(this)
      // return
      this.getParams.pageNo = this.pageInfo1 != null? this.pageInfo1.pageNo:'1'
      // let cancelToken = Axios.CancelToken
      Axios.get(INTERFACE.GET_FACRTRACKLIST, {params: this.getParams,cancelToken: this.cancel1.token})
      .then((res) => {
        console.log(res)
        this.$Loading.finish()

        // if (res.data.status != res.data.succ_code) return
        if(res.data.status!=200){
          this.$Message.error(res.data.reference)
          this.errorNo+=1
          return
        }
        this.modelOne = res.data.results.batchVo.list
        this.pageInfo1 = {
          pageNo:res.data.results.batchVo.pageNo,
          pageSize:20,
          totalNum:res.data.results.batchVo.totalNum,
        }
      })
      .catch((err) => {
        this.errorNo+=1
        // this.$Message.error('请求超时')
        // 匹配到error字段说明发生错误，未匹配有可能是中断了请求
        if(err.toString().split(' ')[0].match(/error/g)){
          this.$Message.error(err.toString().split(' ')[1] + ' Error')
          this.$Loading.error()
        }else{
          this.$Message.error(err.message)
          this.$Loading.error()
        }
        // console.log(err.join(''))
        // document.write(err)
      })
      .catch(function(thrown){
        if(Axios.isCancel(thrown)){
          console.log('Request canceled',thrown.message);
        }else {
          //handle error
        }
      })
    },
    getStranger: function () {
      // 陌生人
      this.$Loading.start()
      this.getParams.matchStatus = 0
      this.getParams.pageNo = this.pageInfo2 != null? this.pageInfo2.pageNo: '1'
      Axios.get(INTERFACE.GET_FACRTRACKLIST, {params: this.getParams,cancelToken: this.cancel2.token}).then((res) => {
        console.log(res)
        this.$Loading.finish()

        if(res.data.status!=200){
          this.$Message.error(res.data.message)
          return
        }
        this.modelTwo = res.data.results.batchVo.list
        this.pageInfo2 = {
          pageNo:res.data.results.batchVo.pageNo,
          pageSize:20,
          totalNum:res.data.results.batchVo.totalNum,
        }
        console.log(this.pageInfo2)
        
      })
      .catch((err) => {
        // 匹配到error字段说明发生错误，未匹配有可能是中断了请求
        if(err.toString().split(' ')[0].match(/error/g)){
          this.$Message.error(err.toString().split(' ')[1] + ' Error')
          this.$Loading.error()
        }else{
          this.$Message.error(err.message)
          this.$Loading.error()
        }
      })
    },
    getUser: function () {
      // 注册用户
      this.$Loading.start()
      this.getParams.matchStatus = 1
      this.getParams.pageNo = this.pageInfo3 != null? this.pageInfo3.pageNo:'1'
      Axios.get(INTERFACE.GET_USER_LASTVISIT, {params: this.getParams,cancelToken: this.cancel3.token}).then((res) => {
        this.$Loading.finish()

        if(res.data.status!=200){
          this.$Message.error(res.data.message)
          return
        }
        
        this.modelThree = res.data.results.batchVo.list
        this.pageInfo3 = {
          pageNo:res.data.results.batchVo.pageNo,
          pageSize:20,
          totalNum:res.data.results.batchVo.totalNum,
        }
        console.log(this.pageInfo3)
      })
      .catch((err) => {
        // this.$Message.error('请求超时')
        // 匹配到error字段说明发生错误，未匹配有可能是中断了请求
        if(err.toString().split(' ')[0].match(/error/g)){
          this.$Message.error(err.toString().split(' ')[1] + ' Error')
          this.$Loading.error()
        }else{
          this.$Message.error(err.message)
          this.$Loading.error()
        }
      })
    },
    model_Change: function (pageNo, which) {
      // console.log(which)
      //     console.log(this.pageInfo1.pageNo)
      //     console.log(this.pageInfo2.pageNo)
      //     console.log(this.pageInfo3.pageNo)
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
    },
    //一秒查询一次
    pushlet(timeout){
      console.log('开始');
      this.getParams.endTime = new Date().getTime()
      this.update(Number(this.notice)+1)
      console.log('请求一次');
      // 
      console.log(this.$store.getters.getRefreshStatus);
      if(this.$store.getters.getRefreshStatus){
          this.pushStatus=setTimeout(()=>{
          console.log('timeout再一次')
          if(this.errorNo<10){
            this.pushlet(timeout)
          }else{
            clearTimeout(this.pushStatus)
            this.$Message.info({
              content:"请联系管理员修正错误，然后重启",
              duration:10,
              closable: true
            })
          }
        },timeout)
      }
      
    }
  },
  computed:{
    refreshStatus(){
      return this.$store.state.refreshStatus
    }
  },
  watch: {
    notice: function (val, old) {
      this.$Loading.finish()
      // 判断刷新状态，如果不是自动刷新，请求一次
      if(!this.$store.state.refreshStatus){
        switch(Number(this.notice)) {
          case 0:
            this.getTotal()
            break;
          case 1:
            this.getStranger()
            break;
          case 2:
            this.getUser()
            break;
        }
      }
    },
    refreshStatus(val,old){
      if(val){
        this.pushlet(config.refreshTime)
      }else{
        clearTimeout(this.pushlet)
      }
    }
  },
  created () {
    // console.log(this.notice)
    console.log('created mmodelbox')
    console.log(window.location.host)
    console.log(window.location)
    console.log(Object.prototype.toString.call(this.notice))
    console.log(this.$store)
    if(this.$store.getters.getRefreshStatus){
      this.pushlet(config.refreshTime)
      // alert(this.$store.state.refreshStatus)
    }
    // this.getTotal()
    // setInterval(()=>{
    //   console.log(this.notice)
      
    // // },1000)
    // 开始轮询数据查询
    
    // 路由监听，index以外的route关闭轮询
    // GLOBALBUS.$on('routeStatus',(val,old)=>{
    //   console.log(`module响应,来自${old.name},目标${val.name}`)
    //   if(val.name==="index"){
    //     this.pushlet(1000)
    //   }else{
    //     clearTimeout(this.pushStatus)
    //   }
    // })
    //手动刷新，刷新单项数据列表
    GLOBALBUS.$on('reload',(target)=>{
      //更新当前时间
      this.getParams.endTime = new Date().getTime()
      const type = Number(target)
      switch(type) {
        case 0:
          this.getTotal()
          break;
        case 1:
          this.getStranger()
          break;
        case 2:
          this.getUser()
          break;
      }
    })
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
