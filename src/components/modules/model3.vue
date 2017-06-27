<template>
  <div class="container">
    <!-- <p @click="getTotal">1</p>    -->
    <div class="itemList">
      <div class="item" v-for="item in list">
        <div class="content">
          <div>
            <img :src="item.headimage" alt="" @click="viewUserInfos(item.personId,item.headimage,item.name,item.latestMatchTime,item.sourceDes)">
          </div>
          <div>
            <div class="name">
              <p style="color:red" v-text="item.name"></p>
            </div>
            <div class="name">
              <p>最后到访时间：<span v-text="item.latestMatchTime"></span></p>
            </div>
            <div class="time">
              <p v-text="item.createTime"></p>
            </div>
            <div>
              <button class="btn" @click="setMessage(item.headimage, item.name, item.personId)">设置留言</button>
            </div>
          </div>
        </div>
      </div>
      <userInfos :viewWhich="viewWhich" :toUserInfos="personData" @popState="changeState"></userInfos>
      <history :viewWhich="viewWhich" :toHistory="personData" @popState="changeState"></history>
      <leaveMessage :viewWhich="viewWhich" @popState="changeState" :toMessage="personData"></leaveMessage>
      <!-- <registerUser></registerUser> -->
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
      personData: {
        image: null,
        name: null,
        personId: null,
        latestMatchTime: null,
        sourceDes: null
      }
    }
  },
  props: ['toThird', 'pageInfo'],
  methods: {
    setMessage: function (image, name, personId) {
      this.viewWhich = 'leaveMessage'
      this.personData = {
        image: image,
        name: name,
        personId: personId
      }
    },
    searchHistory: function (val, old) {
      // this.viewWhich = 'history'
    },
    viewUserInfos: function (id, image, name, latestMatchTime, sourceDes) {
      this.personData = {
        personId: id,
        image: image,
        name: name,
        latestMatchTime: latestMatchTime,
        sourceDes: sourceDes
      }
      this.viewWhich = 'userInfos'
      console.log(this.personData)
    },
    changeState: function (msg) {
      this.viewWhich = msg
    }
  },
  components: {userInfos, history, leaveMessage},
  watch: {
    toThird: function (val, old) {
      if (this.list === val) {
        return
      }
      console.log(val)
      this.list = val
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    box-sizing: border-box;
    border: 1px solid red;
    min-height: 500px;
    background-color: white
  }
  .itemList{
    text-align: left;
    /*display: flex;*/
  }
  .item{
    border: 1px solid blue;
    border-radius: 5%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    width: 30%;
    height: 200px;
    display: inline-block;
    margin:5px 1.5% 5px 1.5%;
    position: relative;
  }
  /*.item>div{
    text-align: center;
  }*/
  .item>.content{
    display: flex;
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
    padding: 5%;
    width: 49%;
    clear: both;
    position: relative;
    height: 80%;
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
