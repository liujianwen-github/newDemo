<template>
  <div class="container">
    <!-- <p @click="getTotal">1</p>    -->
    <div class="itemList">
      <div class="item" v-for="item in list">
        <div class="content">
          <div>
            <img :src="item.headimage" alt="" @click="viewUserInfos(item)">
          </div>
          <div>
            <div class="name">
              <p v-text="item.name"></p>
            </div>
            <div class="name">
              <p>最后到访时间：</p>
            </div>
            <div class="time">
              <p v-text="item.latestMatchTime">
                <!-- <span v-text="item.latestMatchTime"></span> -->
              </p>
            </div>
            <div>
              <button class="btn" @click="setMessage(item)">设置留言</button>
            </div>
          </div>
        </div>
      </div>
      <userInfos :viewWhich="viewWhich" :toUserInfos="personData" @popState="changeState"></userInfos>
      <history :viewWhich="viewWhich" :toHistory="personData" @popState="changeState"></history>
      <leaveMessage :viewWhich="viewWhich" @popState="changeState" :toMessage="personData"></leaveMessage>
      <!-- <registerUser></registerUser> -->
      <div class="pageBox">
        <Page :total="pageInfo.totalRecord" :current="pageInfo.pageNo" :page-size="pageInfo.limit" @on-change="changePage" show-total></Page>   
      </div>
    </div>
  </div>
</template>

<script>
// import Store from '../store.js'
import userInfos from '@/components/popups/userInfos'
import history from '@/components/popups/history'
import leaveMessage from '@/components/popups/leaveMessage'
// import registerUser from '@/components/popups/registerUser'
export default {
  name: 'model3',
  data () {
    return {
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
      }
    }
  },
  props: ['toThird', 'pageThree'],
  methods: {
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
  components: {userInfos, history, leaveMessage},
  watch: {
    toThird: function (val, old) {
      if (typeof val === 'undefined') {
        return
      }
      console.log(val)
      this.list = val
    },
    pageThree: function (val, old) {
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
    box-sizing: border-box;
    /*border: 1px solid red;*/
    min-height: 500px;
    background-color: white
  }
  .itemList{
    text-align: left;
    /*display: flex;*/
  }
  .item{
    border: 1px solid lightgrey;
    border-radius: 5%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    width: 30%;
    height: 180px;
    display: inline-block;
    margin:5px 1.5% 5px 1.5%;
    position: relative;
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
    /*height: 80%;*/
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
</style>
