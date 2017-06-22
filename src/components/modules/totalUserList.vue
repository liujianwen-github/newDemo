<template>
  <div class="container">
    <!-- <p @click="getTotal">1</p>    -->
    <div class="itemList">
      <div class="item" v-for="item in list" @click="addadd">
        <!-- <img v-show="item.matchStatus==0" src="../../assets/stranger.png"  alt="stranger">
        <img v-show="item.matchStatus==1" src="../../assets/user.png"  alt="user"> -->
        <div class="content">
          <img :src="item.facetrackImage" alt="">
          <div class="time">{{item.createTime}}</div>
          <div class="name" v-html="item.personName">&nbsp;</div>
        </div>
      </div>
      <registerUser></registerUser>
    </div>
  </div>
</template>

<script>
import registerUser from '@/components/popups/registerUser'
import config from '@/config'
import Axios from 'axios'
export default {
  name: 'totalUserList',
  data () {
    return {
      list: null,
      getParams: {
        userkey: config.userkey,
        deviceId: 'aaa-a01-001',
        beginTime: 0,
        endTime: new Date().getTime(),
        pageNo: 1
      }
    }
  },
  props: ['toUserList'],
  methods: {
    getAllUser: function () {
      Axios.get(config.HOST + 'apiServer/facetrackManage/getMatchedList', {params: this.getParams}).then(
        (res) => {
          console.log(res)
          this.list = res.data.results.list
        }, (err) => {
        console.log(err)
      })
    },
    addadd: function (argument) {
      console.log('flip next')
      this.getParams.pageNo++
      this.getAllUser()
    }
  },
  components: {registerUser},
  watch: {
    //
  },
  created () {
    this.getAllUser()
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
