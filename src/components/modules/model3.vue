<template>
  <div class="container" id="model3">
    <!-- <p @click="getTotal">1</p>    -->
    <empty :toempty="emptyPage" :class="{show:emptyPage.isShow}"></empty>
    <!-- <Loading :show=loadingShow></Loading> -->

    <div class="itemList">
      <div class="item" v-for="item in list" :class="{vague: vagueModel}">
        <div class="content">
          <div>
            <img :src="get_image(item.personId)" :style="{background:imgBack}" alt="" @click="viewUserInfos(item)">
          </div>
          <div>
            <div class="name">
              <p v-text="item.userName"></p>
            </div>
            <div class="name">
              <p>最后到访时间：</p>
            </div>
            <div class="time">
              <p v-text="item.recordUpdatedTime">
                <!-- <span v-text="item.latestMatchTime"></span> -->
              </p>
            </div>
            <!-- <div>
              <button class="btn" @click="setMessage(item)">设置留言</button>
            </div> -->
          </div>
        </div>
      </div>
      <userInfos :viewWhich="viewWhich" :toUserInfos="personData" @popState="changeState"></userInfos>
      <history :viewWhich="viewWhich" :toHistory="personData" @popState="changeState"></history>
      <leaveMessage :viewWhich="viewWhich" @popState="changeState" :toMessage="personData"></leaveMessage>
      <!-- <registerUser></registerUser> -->
      <div class="pageBox">
        <Page :total="pageInfo.totalNum" :current="pageInfo.pageNo" :page-size="pageInfo.pageSize" @on-change="changePage" show-total show-elevator></Page>  
      </div>
    </div>
  </div>
</template>

<script>
// import Store from '../store.js'
import userInfos from '@/components/popups/userInfos'
import history from '@/components/popups/history'
import leaveMessage from '@/components/popups/leaveMessage'
import empty from '@/components/popups/empty'
import config from '@/config'
import Loading from '@/components/modules/Loading'

import imgBack from '@/assets/userHeader.png'

// import registerUser from '@/components/popups/registerUser'
export default {
  name: 'model3',
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
      personData: {
        image: null,
        name: null,
        personId: null,
        latestMatchTime: null,
        sourceDes: null
      },
      emptyPage: {
        size: 'large',
        isShow: true
      }
    }
  },
  props: ['toThird', 'pageThree'],
  components: {userInfos, history, leaveMessage, empty, Loading},
  computed: {
    loadingShow :function(){
      return this.list === null ? 'block' : 'none'
    }
  },
  methods: {
    get_image: function (personId){
      return config.get_image(personId)
    },
    setMessage: function (data) {
      this.viewWhich = 'leaveMessage'
      this.personData = data
    },
    searchHistory: function (val, old) {
      // this.viewWhich = 'history'
    },
    viewUserInfos: function (data) {
      this.personData = data
      this.viewWhich = 'userInfos'
      console.log(this.personData)
    },
    changeState: function (msg) {
      this.viewWhich = msg
    },
    changePage: function (msg) {
      this.$emit('pageThree', msg, 3)
    }
  },
  watch: {
    toThird: function (val, old) {
      if (typeof val === 'undefined') {
        return
      }
      this.list = val
      console.log(this.list)
    },
    pageThree: function (val, old) {
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
<style>
  @import '../../assets/style.css'
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    box-sizing: border-box;
    /*border: 1px solid red;*/
    min-height: 500px;
    background-color: white;
    width: 100%;
    padding-top: 10px
  }
  .show{
    display: block
  }
  .itemList{
    text-align: left;
    /*display: flex;*/
  }
  .item{
    border: 1px solid lightgrey;
    border-radius: 10px;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    width: 31%;
    height: 180px;
    display: inline-block;
    margin:5px 1% 5px 1%;
    position: relative;
    background-color: white
  }
  /*.item>div{
    text-align: center;
  }*/
  .item>.content{
    display: flex;
    height: 100%
    /*height: 200px*/
  }
  p{
    /*color: red;*/
    margin-bottom:10px;
  }
  .item>.content img{
    /*margin-top: 20px;*/
    /*margin-bottom: 10px;*/
    width:100%;
    /*height: 100%;*/
    /*margin: 5%;*/
    background-color: blue
  }
  .item>.content>div{
    /*display: inline-block;*/
    padding: 4%;
    width: 49%;
    clear: both;
    position: relative;
    height: 80%;
    /*overflow:hidden;*/
    /*text-align: left;*/
  }
  .item>.content>div>.name,.item>.content>div>.time{
    width: 100%;
    /*color: red;*/
  }
  .item>.content div p{
    width: 100%;
    /*text-align: left;*/
  }
  .item .content button{
    background-color: #005BAB;
    color: white
  }

  @media only screen and (max-width: 1200px) {
    .item{
      width: 30%;
    }
  }
  @media only screen and (max-width: 768px){
    *{
      font-size: 12px
    }
    .item{
      width: 48%;
    }
  }
</style>
