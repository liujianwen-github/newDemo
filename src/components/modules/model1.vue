<template>
  <div class="container" id="model1">
    <empty :toempty="emptyPage" :class="{show:emptyPage.isShow}"></empty>
    <!-- <Loading :show=loadingShow></Loading> -->
    <div class="itemList">
      <div class="item" v-for="item in list"  @click="viewItem(item)" :class="{vague: vagueModel}" >
        <img v-show="item.matchStatus==0" src="../../assets/stranger.png"  alt="stranger">
        <img v-show="item.matchStatus==1" src="../../assets/user.png"  alt="user">
        <div class="content">
          <img :src="get_facetrackimage(item.facetrackId)" :style="{background:imgBack}" alt="">
          <div class="name">&nbsp;{{item.userName}}</div>
          <div class="time">到访时间{{item.facetrackCreateTime.split(' ')[1]}}</div>
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
      <!-- <div v-for="(key,index) in list">
        <p>{{key}}</p>
        <p>{{index}}</p>
      </div> -->
      <div class="pageBox">
        <Page :total="pageInfo.totalNum" :current="pageInfo.pageNo" :page-size="pageInfo.pageSize" @on-change="changePage" show-total show-elevator></Page>
      </div>
      <!-- <page :total="pageInfo.totalRecord" :current="1" @on-change="changePage"></page> -->
      <!-- stranger -->
      <Intell :toIntell="intellValue" :viewWhich="viewWhich" @popState="changeState"></Intell>
      <createUser :viewWhich="viewWhich" @update="update" @modalMessage="modalMessage" @popState="changeState" :toCreateUser="createUserData"></createUser>
      <intellAnalyse :viewWhich="viewWhich" @update="update" @popState="changeState" :toIntellAnalyse="intellValue"></intellAnalyse>
      <!-- user -->
      <userInfos :viewWhich="viewWhich" :toUserInfos="personData" @popState="changeState"></userInfos>
      <history :viewWhich="viewWhich" :toHistory="personData" @popState="changeState"></history>
      <leaveMessage :viewWhich="viewWhich" @popState="changeState" :toMessage="personData"></leaveMessage>
    </div> 
  </div>
</template>

<script>
// import config from '@/config'
// import Fill from '@/fill'
// import pagenation from '@/components/modules/pagenation'
import INTERFACE from '@/interface'
import config from '@/config'
import Intell from '@/components/popups/intell'
import createUser from '@/components/popups/createUser'
import intellAnalyse from '@/components/popups/intellAnalyse'
import userInfos from '@/components/popups/userInfos'
import history from '@/components/popups/history'
import leaveMessage from '@/components/popups/leaveMessage'
import empty from '@/components/popups/empty'
import Loading from '@/components/modules/Loading'
import imgBack from '@/assets/userHeader.png'
// import store from '@/store/store'
export default {
  name: 'model1',
  data () {
    return {
      list: null,
      // loadingShow: 'block',
      total: 100,
      imgBack: 'url('+imgBack+')',
      vagueModel: false,
      pageSize: 5,
      emptyPage: {
        size: 'large',
        isShow: true
      },
      viewWhich: '0',
      // 先给pageInfo里的内容赋值，防止空值报错
      pageInfo: {
        totalNum: 0,
        pageNo: 1,
        limit: 20
      },
      // stranger相关所需要的数据
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
      // user相关所需要的数据
      personData: {
        image: null,
        name: null,
        personId: null,
        latestMatchTime: null,
        sourceDes: null,
        headimage: null
      }
    }
  },
  props: ['toFirst', 'pageOne'],
  components: {
    Intell, createUser, intellAnalyse, userInfos, history, leaveMessage, empty, Loading
  },
  computed: {
    loadingShow :function(){
      return this.list === null ? 'block' : 'none'
    }
  },
  methods: {
    dontMove:function(e){
        e.preventDefault()
    },
    get_image: function (personId){
      return config.get_image(personId)
    },
    get_facetrackimage: function(facetrackId){
      return config.get_facetrackimage(facetrackId)
    },
    viewItem: function (data) {
      console.log(data)
      switch (data.matchStatus) {
        case 0:
          // console.log(store)
          console.log('stranger')
          this.viewWhich = 'intell'
          this.intellValue = data
          this.createUserData = {
            facetrackImage: data.facetrackImage,
            facetrackId: data.facetrackId
          }
          break
        case 1:
          console.log('user')
          this.viewWhich = 'userInfos'
          this.personData = data
          this.personData.headimage = data.personImage
          this.personData.name = data.personName
          console.log(this.personData)
          break
      }
      console.log(this.viewWhich)
    },
    changePage: function (pageNo) {
      this.$emit('pageOne', pageNo, 1)
    },
    changeState: function (msg) {
      this.viewWhich = msg
    },
    update: function () {
      this.$emit('update', 1)
    },
    // 警告、错误提示信息
    modalMessage: function (type, content) {
      const title = type
      switch (type) {
          case 'info':
              this.$Modal.info({
                  title: title,
                  content: content
              });
              break;
          case 'success':
              this.$Modal.success({
                  title: title,
                  content: content
              });
              break;
          case 'warning':
              this.$Modal.warning({
                  title: title,
                  content: content
              });
              break;
          case 'error':
              this.$Modal.error({
                  title: title,
                  content: content
              });
              break;
      }
    },
  },
  watch: {
    toFirst: function (val, old) {
      if (typeof val === 'undefined') {
        return
      }
      this.list = val
      // for (let item in this.list){
      //   console.log(this.list[item].matchStatus)
      // }
      // console.log(this.list[i].matchStatus)
    },
    pageOne: function (val, old) {
      console.log(val)
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import '../../assets/style.css'
</style>
<style scoped>
  .container{
/*  	box-sizing: border-box;*/
  	/*border: 1px solid red;*/
    background-color: white;
    min-height: 500px;
    width: 100%;
    padding-top: 10px
  }
  .itemList{
    text-align: left;
  }
  .show{
    display: block
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
  .item>div>img{
    margin-top: 20px;
    margin-bottom: 10px;
    width:120px;
    min-height: 120px;
    height: 120px;
  }
  .item .name{
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
