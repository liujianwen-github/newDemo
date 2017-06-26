<template>
  <div class="container">
    <div class="leftHead" @click="reloadPage">
      <img src="../../assets/logo.png">
      <span>未来门禁演示系统 1.0</span>
    </div>
<!--     <div class="userMessage">
      <img src="../../assets/Admin_48px_582776_easyicon.net.png" height="48" width="48" alt="">
    </div> -->
    <div class="contentBtnList">
      <span class="glyphicon glyphicon-user"></span>
      <input type="text" value="" v-model="searchText">
      <button @click="search">search</button>
    </div>
    <div class="contentBtnList">
      <button class="btn" @click="addNewUser">新建用户</button>
    </div>
    <div class="toUser">
      <router-link to="/">
        <div>
          <!-- <img src="../../assets/Admin_48px_582776_easyicon.net.png" height="30" width="30" alt=""> -->
          <span class="glyphicon glyphicon-user"></span>
        </div>
        <p>返回主页</p>
      </router-link>     
    </div>
  </div>
</template>

<script>
// import Store from '@/Store.js'
// import $ from 'jquery'
// import Axios from 'axios'
// import config from '@/config'
export default {
  name: 'userHead',
  data () {
    return {
      searchText: null
    }
  },
  methods: {
    addNewUser: function (argument) {
      this.$emit('popState', 'addNewUser')
    },
    search: function () {
      // alert(this.searchText)
      this.$emit('searchPerson', this.searchText)
      // Axios({
      //   methods: 'GET',
      //   url: config.HOST + '/apiServer/personManage/searchPerson',
      //   params: {
      //     userkey: config.userkey,
      //     deviceId: config.deviceId,
      //     name: this.searchText
      //   }
      // }).then((res) => {
      //   console.log(res)
      //   // alert('返回结果，请输入要查询信息，接口文档没有规定输入文本关键字')
      // }, (err) => {
      //   console.log(err)
      // })
    },
    reloadPage: function () {
      window.location.reload()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    width: 100%;
    height: 35px
  }
  .container .leftHead{
    display: inline-block;
    width: 400px;
    height: 35px;
    color: #005BAB;
    position: absolute;
    left: 0
  }
  .container .leftHead img{
    height: 100%;
    position: absolute;
    left: 0
  }
  .container .leftHead span{
    position: absolute;
    top: 0;
    /*left: 0;*/
    line-height: 35px
  }
  .container .contentBtnList{
    display: inline-block;
  }
  .container .contentBtnList button{
    width: 100px;
    height: 35px;
    border-radius: 2.5em;
    background-color: #005BAB;
    /*background-color: #005BAB;*/
    /*color: white;*/
    color:white;
    font-size: 14px;
    border: 0
  }
  .container .toUser{
    position: absolute;
    right: 0;
    height: 30px;
    top:0;
    /*background-color: lightblue*/
  }





  .isActive{
    color: white!important;
    background-color: #005BAB!important
  }
</style>
