<template>
  <div class="container">
    <!-- <p @click="getTotal">1</p>    -->
    <div class="itemList">
      <div class="item" v-for="item in list" @click="getIntell(item.facetrackId,item.facetrackImage,item.createTime,item.sourceDes,item.sourceImg)">
        <!-- <img v-show="item.matchStatus==0" src="../../assets/stranger.png"  alt="stranger">
        <img v-show="item.matchStatus==1" src="../../assets/user.png"  alt="user"> -->
        <div class="content">
          <img :src="item.facetrackImage" alt="">
          <div class="time">{{item.createTime}}</div>
          <div class="name" v-html="item.personName">&nbsp;</div>
        </div>
      </div>
      <Intell :toIntell="intellValue" :viewWhich="viewWhich" @popState="changeState"></Intell>
      <createUser :viewWhich="viewWhich" @popState="changeState" :toCreateUser="createUserData"></createUser>
      <intellAnalyse :viewWhich="viewWhich" @popState="changeState" :toIntellAnalyse="intellValue"></intellAnalyse>
    </div>
  </div>
</template>

<script>
// import Store from '../store.js'
import Intell from '@/components/popups/intell'
import createUser from '@/components/popups/createUser'
import intellAnalyse from '@/components/popups/intellAnalyse'
// import config from '@/config'
// import Axios from 'axios'
export default {
  name: 'model2',
  data () {
    return {
      list: null,
      viewWhich: '0',
      intellValue: {
        facetrackId: null,
        facetrackImage: null,
        createTime: null,
        sourceDes: null,
        sourceImg: null
      },
      createUserData: {
        facetrackImage: null,
        facetrackId: null
      }
    }
  },
  props: ['toSecond', 'pageInfo'],
  methods: {
    setIntell: function (msg) {
      console.log(msg)
      // TODO item点击触发事件，修改data中的参数，传值到intell组件中
    },
    getIntell: function (facetrackId, facetrackImage, createTime, sourceDes, sourceImg) {
      console.log(facetrackId, facetrackImage, createTime, sourceDes, sourceImg)
      this.viewWhich = 'intell'
      this.intellValue = {
        facetrackId: facetrackId,
        facetrackImage: facetrackImage,
        createTime: createTime,
        sourceDes: sourceDes,
        sourceImg: sourceImg
      }
      this.createUserData = {
        facetrackImage: facetrackImage,
        facetrackId: facetrackId
      }
      console.log(this.viewWhich)
    },
    changeState: function (msg) {
      // console.log(msg)
      this.viewWhich = msg
      console.log(this.viewWhich)
    }
  },
  components: {Intell, createUser, intellAnalyse},
  watch: {
    toSecond: function (val, old) {
      console.log(val)
      if (this.list === val) {
        return
      }
      this.list = val
    }
  }
}
</script>
<!-- 
  *书写格式要求：①变量声明冒号后边必须有一个空格
   *           ②字符串单引号
   *           
   *             -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    box-sizing: border-box;
    border: 1px solid red;
    min-height: 500px;
    background-color: white;
    position: relative;
  }
  .itemList{
    text-align: left
  }
  .item{
    border: 1px solid blue;
    border-radius: 5%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    width: 180px;
    height: 200px;
    display: inline-block;
    margin:0 20px 5px 20px
  }
  /*显示person标志的图片*/
  .item>img{
    position: absolute;
    left: 0;
    top: 0;
    width: 80px
  }
  .item>div{
    text-align: center;
  }
  .item>div>img{
    margin-top: 20px;
    margin-bottom: 10px;
    width:120px;
    height: 120px;
    background-color: blue
  }
  .item .name{
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }
</style>
