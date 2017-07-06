<template>
  <div class="container">
    <empty :toempty="emptyPage" :class="{show:emptyPage.isShow}"></empty>
    <div class="itemList">
      <div class="item" v-for="item in list"  @click="viewItem(item)">
        <img v-show="item.matchStatus==0" src="../../assets/stranger.png"  alt="stranger">
        <img v-show="item.matchStatus==1" src="../../assets/user.png"  alt="user">
        <div class="content">
          <img :src="item.facetrackImage" alt="">
          <div class="time">{{item.createTime.split(' ')[1]}}</div>
          <div class="name" v-html="item.personName">&nbsp;</div>
        </div>
      </div>
      <div class="pageBox">
      <Page :total="pageInfo.totalRecord" :current="pageInfo.pageNo" :page-size="pageInfo.limit" @on-change="changePage" show-total></Page>
      </div>
      <!-- <page :total="pageInfo.totalRecord" :current="1" @on-change="changePage"></page> -->
      <!-- stranger -->
      <Intell :toIntell="intellValue" :viewWhich="viewWhich" @popState="changeState"></Intell>
      <createUser :viewWhich="viewWhich" @popState="changeState" :toCreateUser="createUserData"></createUser>
      <intellAnalyse :viewWhich="viewWhich" @popState="changeState" :toIntellAnalyse="intellValue"></intellAnalyse>
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
import Intell from '@/components/popups/intell'
import createUser from '@/components/popups/createUser'
import intellAnalyse from '@/components/popups/intellAnalyse'
import userInfos from '@/components/popups/userInfos'
import history from '@/components/popups/history'
import leaveMessage from '@/components/popups/leaveMessage'
import empty from '@/components/popups/empty'
export default {
  name: 'model1',
  data () {
    return {
      list: null,
      total: 100,
      pageSize: 5,
      emptyPage: {
        size: 'large',
        isShow: false
      },
      viewWhich: '0',
      // 先给pageInfo里的内容赋值，防止空值报错
      pageInfo: {
        totalRecord: 0,
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
    Intell, createUser, intellAnalyse, userInfos, history, leaveMessage, empty
  },
  methods: {
    viewItem: function (data) {
      console.log(data)
      switch (data.matchStatus) {
        case 0:
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
          console.log(this.personData)
          break
      }
      console.log(this.viewWhich)
    },
    changePage: function (msg) {
      this.$emit('pageOne', msg, 1)
    },
    changeState: function (msg) {
      this.viewWhich = msg
      console.log(msg)
    }
  },
  watch: {
    toFirst: function (val, old) {
      if (typeof val === 'undefined') {
<<<<<<< HEAD
        this.emptyPage.isShow = true
=======
>>>>>>> 37e86a6c4a59d8dd5b334c20668fac78c28bb8aa
        return
      }
      this.emptyPage.isShow = false
      this.list = val
    },
    pageOne: function (val, old) {
      console.log(val)
      if (typeof val === 'undefined') {
        return
      }
      this.pageInfo = val
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
/*  	box-sizing: border-box;*/
  	/*border: 1px solid red;*/
    background-color: white;
    min-height: 500px;
    width: 100%
  }
  .itemList{
    text-align: left
  }
  .show{
    display: block
  }
  .item{
    border: 1px solid lightgrey;
    border-radius: 5%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    width: 18%;
    height: 200px;
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
    height: 120px;
    background-color: blue
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
