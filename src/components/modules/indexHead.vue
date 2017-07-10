<template>
  <div class="container">
  <Row class="container" type="flex" justify="center" align="middle">
    <Col :sm="10" :md="10" :lg="10" :xs="18" class="leftHead">
      <!-- <div > -->
        <img src="../../assets/logo.png">
        <span>未来门禁演示系统 1.0</span>
      <!-- </div> -->
    </Col>
    <!-- <div class="userMessage">
    </div> -->
    <Col span="8" class="contentBtnList">
      <!-- <div > -->
        <button class="contentBtn isActive" @click="viewContent('0')">今日到访</button>
        <button class="contentBtn" @click="viewContent('1')">陌生人</button>
        <button class="contentBtn" @click="viewContent('2')">到访用户</button>
        <!-- <router-link to="//model1" exact>1</router-link> -->
      <!-- </div> -->
    </Col>
    <Col  class="smallDevice" :sm="12" :md="12" :lg="12" :xs="4">
      <Dropdown trigger="click"  @on-click="dowhat">
        <a href="javascript:void(0)">
            <Icon type="drag" size="30"></Icon>
        </a>
        <Dropdown-menu slot="list">
            <Dropdown-item class="listItem" name="0" >今日到访</Dropdown-item>
            <Dropdown-item class="listItem" name="1" >陌生人</Dropdown-item>
            <Dropdown-item class="listItem" name="2" >到访用户</Dropdown-item>
            <Dropdown-item class="listItem" name="toUser" >用户管理</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
      
    </Col>
    <Col span="6" class="toUser">
      <!-- <div > -->
        <router-link to="/userManage" exact>
          <div>
            <span class="glyphicon glyphicon-user"></span>
            <p>用户管理</p>
          </div>    
        </router-link>     
      <!-- </div> -->
    </Col>   
  </Row>
  <!-- <br> -->
  <!-- <Row>
    <Col>1</Col>
    <Col>2</Col>
    <Col>3</Col>
  </Row> -->
  <!-- <Row class="userinfo">
    <Col class="user" span="8" align="left">
      <span>userinfo</span>
    </Col>
    <Col class="personData" span="8">
      <span>personData</span>
    </Col>
    <Col class="logout" span="8" align="right">
      <span>退出</span>
    </Col>
  </Row> -->
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
      currentTab: 0
    }
  },
  methods: {
    viewContent: function (arg) {
      // $('.contentBtnList>button').eq(arg)
      this.currentTab = arg
      $('.contentBtnList>button').eq(arg).addClass('isActive')
      $('.contentBtnList>button').eq(arg).siblings().removeClass('isActive')
      // 向index中传递当前选择的类别
      this.$emit('currentContent', arg)
    },
    dowhat: function (msg) {
      if (msg === 'toUser') {
        this.$router.push('/usermanage')
      } else {
        this.viewContent(msg)
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    /*width: 100%;*/
    /*height: 40px;*/
    position: relative;
    padding: 0;
    border:1px solid transparent;
    /*margin: 0 auto*/
    /*text-align: left;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
  }
  .container .leftHead{
    display: inline-block;
    text-align: left;
    /*width: 400px;*/
    height: 35px;
    color: #005BAB;
  }
  .container .leftHead img{
    /*height: 100%;*/
    max-width: 50%;
    /*position: absolute;*/
    /*left: 15px*/
  }
  .container .leftHead span{
    line-height: 35px;
    /*display: inline-block;*/
    /*white-space:nowrap; */
  }
  .container .contentBtnList{
    display: inline-block;
    text-align: left
  }
  .container .contentBtnList button{
    max-width: 100px;
    width: 30%;
    height: 35px;
    border-radius: 2.5em;
    background-color: transparent;
    /*background-color: #005BAB;*/
    /*color: white;*/
    border:1px solid #005BAB;
    color:#005BAB;
    font-size: 14px;
    /*border: 0*/
  }
  .container .toUser div{
    height: 40px;
    float: right;
    display: inline-block;
    text-align: center
  }
  .smallDevice{
    display: none;
    text-align: right
  }
  @media only screen and (max-width: 768px){
    *{
      font-size: 12px
    }
    .smallDevice{
      display: block
    }
    .contentBtnList,.toUser{
      display: none!important
    }
  }
  .userinfo{
    height: 40px;
    width: 100%;
    padding: 0 20px;
    background-color: #ABB6C6;
    color: rgba(255,255,255,0.9)
  }
  .userinfo span{
    line-height: 40px
  }



  .isActive{
    color: white!important;
    background-color: #005BAB!important
  }
</style>
