<template>
  <div class="container">
    <div class="leftHead">
      <img src="../../assets/logo.png">
      <span>未来门禁演示系统 1.0</span>
    </div>
    <div class="userMessage">
      <!-- <img src="../../assets/Admin_48px_582776_easyicon.net.png" height="48" width="48" alt=""> -->
    </div>
    <div class="contentBtnList">
      <button class="contentBtn isActive" @click="viewContent(0)">今日到访</button>
      <button class="contentBtn" @click="viewContent(1)">陌生人</button>
      <button class="contentBtn" @click="viewContent(2)">注册用户</button>
      <!-- <router-link to="//model1" exact>1</router-link> -->
    </div>
    <div class="toUser">
      <router-link to="/userManage" exact>
        <div>
          <!-- <img src="../../assets/Admin_48px_582776_easyicon.net.png" height="30" width="30" alt=""> -->
          <span class="glyphicon glyphicon-user"></span>
        </div>
        <p>用户管理</p>
      </router-link>     
    </div>
  </div>
</template>

<script>
// import Store from '@/Store.js'
import $ from 'jquery'
export default {
  name: 'indexHead',
  // TODO获取用户名
  props: {},
  data () {
    return {
      msg: 'indexHead',
      currentContent: 0
    }
  },
  methods: {
    viewContent: function (arg) {
      // $('.contentBtnList>button').eq(arg)
      this.currentContent = arg
      $('.contentBtnList>button').eq(arg).addClass('isActive')
      $('.contentBtnList>button').eq(arg).siblings().removeClass('isActive')
      // 向index中传递当前选择的类别
      this.$emit('currentContent', arg)
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
  .container .contentBtnList button{
    width: 100px;
    height: 35px;
    border-radius: 2.5em;
    background-color: transparent;
    /*background-color: #005BAB;*/
    /*color: white;*/
    color:#005BAB;
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
