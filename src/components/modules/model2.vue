<template>
  <div class="container" id="model2">
    <!-- <p @click="getTotal">1</p>    -->
    <empty :toempty="emptyPage" :class="{show:emptyPage.isShow}"></empty>
    <!-- <Loading :show=loadingShow></Loading> -->

    <div class="itemList">
      <div class="item" v-for="item in list" @click="getIntell(item)" :class="{vague: vagueModel}">
        <!-- <img v-show="item.matchStatus==0" src="../../assets/stranger.png"  alt="stranger">
        <img v-show="item.matchStatus==1" src="../../assets/user.png"  alt="user"> -->
        <div class="content">
          <div class="imgbox">
            <img :src="get_facetrackimage(item.facetrackId)" :style="{background:imgBack}" alt="">
          </div>
          <div class="time">{{item.facetrackCreateTime.split(' ')[1]}}</div>
          <div class="name" v-html="item.personName">&nbsp;</div>
          <div class="detail">
            <span v-text="item.age"></span>岁
            <span v-if="item.sex===0">男</span>
            <span v-if="item.sex===1">女</span>
            <!-- <span v-if="item.glasses===2">没有</span> -->
            <span v-if="item.glasses===1">
              <img src="../../assets/glass.png" height="12" alt="">
            </span>
            
          </div>
        </div>
      </div>
      <div class="pageBox">
        <Page :total="pageInfo.totalNum" :current="pageInfo.pageNo" :page-size="pageInfo.pageSize" @on-change="changePage" show-total show-elevator></Page>
      </div>
      <Intell :toIntell="intellValue" :viewWhich="viewWhich" @popState="changeState"></Intell>
      <createUser :viewWhich="viewWhich" @popState="changeState" :toCreateUser="createUserData"></createUser>
      <intellAnalyse :viewWhich="viewWhich" @popState="changeState" @update="update" :toIntellAnalyse="intellValue"></intellAnalyse>
    </div>
  </div>
</template>

<script>
// import Store from '../store.js'
import Intell from '@/components/popups/intell'
import createUser from '@/components/popups/createUser'
import intellAnalyse from '@/components/popups/intellAnalyse'
import empty from '@/components/popups/empty'
import config from '@/config'
import Loading from '@/components/modules/Loading'

import imgBack from '@/assets/userHeader.png'

// import Axios from 'axios'
export default {
  name: 'model2',
  data () {
    return {
      vagueModel: false,
      imgBack: 'url('+imgBack+')',
      list: null,
      viewWhich: '0',
      pageInfo: {
        totalRecord: 0,
        pageNo: 1,
        limit: 20
      },
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
      },
      emptyPage: {
        size: 'large',
        isShow: true
      }
    }
  },
  props: ['toSecond', 'pageTwo'],
  components: {Intell, createUser, intellAnalyse, empty, Loading},
  computed: {
    loadingShow :function(){
      return this.list === null ? 'block' : 'none'
    }
  },
  methods: {
    get_facetrackimage: function(facetrackId){
      return config.get_facetrackimage(facetrackId)
    },
    setIntell: function (msg) {
      console.log(msg)
      // TODO item点击触发事件，修改data中的参数，传值到intell组件中
    },
    // 去往intell窗口
    getIntell: function (data) {
      this.viewWhich = 'intell'
      this.intellValue = data
      console.log(this.intellValue)
      this.createUserData = {
        facetrackImage: data.facetrackImage,
        facetrackId: data.facetrackId
      }
      console.log(this.viewWhich)
    },
    // 切换状态
    changeState: function (msg) {
      // console.log(msg)
      this.viewWhich = msg
      console.log(this.viewWhich)
    },
    // 翻页
    changePage: function (msg) {
      this.$emit('pageTwo', msg, 2)
    },
    update: function (msg) {
      this.$emit('update',2)
    }
  },
  watch: {
    // 从modulebox接收到的数据、分页信息
    toSecond: function (val, old) {
      console.log(val)
      if (typeof val === 'undefined') {
        return
      }
      this.list = val
    },
    pageTwo: function (val, old) {
      // console.log(val)
      if (typeof val === 'undefined') {
        return
      }
      this.pageInfo = val
    },
    viewWhich: function (val, old) {
      if (val !== '0') {
        this.vagueModel = true
        // this.$el.addEventListener('touchmove',config.bodyEvent,false)
      } else {
        this.vagueModel = false
        // this.$el.removeEventListener('touchmove',config.bodyEvent,false)
      }
    },
    list: function (val, old) {
      if (val.length != 0) {
        this.emptyPage.isShow = false
      }
    }
  }
}
</script>
<!-- 
  *书写格式要求：①变量声明冒号后边必须有一个空格
   *           ②字符串单引号
   *           
   *             -->
<style>
  @import '../../assets/style.css'
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    box-sizing: border-box;
    min-height: 500px;
    width: 100%;
    background-color: white;
    position: relative;
    padding-top: 10px
  }
  .show{
    display: block
  }
  .itemList{
    text-align: left
  }
  .item{
    /*border: 1px solid lightgrey;*/
    background-color: white;
    border-radius: 5%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    width: 18%;
    height: 220px;
    display: inline-block;
    margin:0 1% 5px 1%
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
  .item>div>.imgbox{
    margin-top: 20px;
    margin-bottom: 10px;
    display: inline-block;
    text-align: center;
    width:120px;
    height: 120px;
    background-color: blue
  }
  .item>div>.imgbox>img{
    width: 100%;
    height: 100%
  }
  .item .name{
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }

  @media only screen and (min-width: 768px) and (max-width: 1200px) {
    .item{
      width: 23%;
    }
  }
  @media only screen and (max-width: 768px){
    .item{
      width: 31%;
    }
  }
</style>
