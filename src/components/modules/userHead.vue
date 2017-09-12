<template>
  <div class="container">
  <Row>
    <Col :sm="10" :md="10" :lg="10" :xs="16" class="leftHead" onclick="window.location.reload()onratechange(model3.vue)">
      <img src="../../assets/logo.png" >
      <span>未来门禁演示系统 1.0</span>
    </Col>
    <Col class="contentBtnList" span="5">
      <!-- <div > -->
      <Row class="inputGroup">
        <Col span="3" style="text-align: right">
          <span class="user glyphicon glyphicon-user"></span>
        </Col>
        <Col span="18">
           <input type="text" value="" v-model="searchText" @keyup="keySearch" autofocus="autofocus">
        </Col>
        <Col span="3">
           <span class="remove glyphicon glyphicon-remove"  @click="reSearch"></span>
        </Col>
      </Row>

      <!-- </div> -->
    </Col>
    <Col class="contentBtnList" span="7">
      <Row type="flex" justify="space-between" class="code-row-bg btnList" align="middle">
        <Col span="12">
          <button class="btn" @click="search">search</button>
        </Col>
        <Col span="12">
          <button class="btn" @click="addNewUser">新建用户</button>
        </Col>
      </Row>
    </Col>
    <Col class="smallDevice" :sm="13" :md="13" :lg="13" :xs="8">
      <Dropdown trigger="click"  @on-click="dowhat">
        <a href="javascript:void(0)">
            <Icon type="drag" size="30"></Icon>
        </a>
        <Dropdown-menu slot="list">
            <Dropdown-item class="listItem" name="search" >搜索</Dropdown-item>
            <Dropdown-item class="listItem" name="addnew" >新建用户</Dropdown-item>
            <Dropdown-item class="listItem" name="returnIndex" >返回主页</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
    </Col>
    <Col class="toUser" span="2">
      <router-link to="/">
        <div>
          <!-- <img src="../../assets/Admin_48px_582776_easyicon.net.png" height="30" width="30" alt=""> -->
          <span class="glyphicon glyphicon-user"></span>
          <p>返回主页</p>
        </div> 
      </router-link>
    </Col>
  </Row>
  <Modal
        v-model="modal1"
        title="搜索用户"
        @on-ok="search"
        >
        <div class="inputGroup">
          <span class="glyphicon glyphicon-user"></span>
          <input type="text" value="" v-model="searchText" @keyup="keySearch" autofocus="autofocus">
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'userHead',
  data () {
    return {
      sm_operate: null,
      modal1: false,
      searchText: null
    }
  },
  methods: {
    addNewUser: function (argument) {
      this.$emit('popState', 'addNewUser')
    },
    keySearch: function (e) {
      if (e.keyCode === 13) {
        this.search()
      }
    },
    search: function () {
      this.$emit('searchPerson', this.searchText)
    },
    reloadPage: function () {
      // alert('1')
      window.location.href = window.location.href
    },
    reSearch: function () {
      if (this.searchText !== '') {
        this.searchText = ''
      } else {
        window.location.reload()
      }
    },
    startSearch: function () {
      // this.modal1 = true
    },
    dowhat: function (msg) {
      if (msg === 'search') {
        this.modal1 = true
      }
      if (msg === 'addnew') {
        this.addNewUser()
      }
      if (msg === 'returnIndex') {
        this.$router.push('/')
      }
    }
  },
  watch: {
    sm_operate: function (val, old) {
      alert(val)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import  '../../assets/style.css'
</style>
<style scoped>
  .container{
    width: 100%;
    height: 40px;
    border:1px solid transparent;
  }
  .container .leftHead{
    display: inline-block;
    height: 40px;
    color: #005BAB;
    text-align: left;
  }
  .container .leftHead img{
    /*height: 100%;*/
    max-width: 50%;
    /*width: 50%;*/
  }
  .container .leftHead span{
    line-height: 40px;
    /*white-space:nowrap; */
  }
  .container .contentBtnList{
    display: inline-block;
    height: 40px
  }
  .container .contentBtnList>.btnList{
    height: 100%
  }
  .container .inputGroup{
    border:1px solid grey;
    width: 100%;
    height: 35px;
    position: absolute;
    left: 0;
    bottom: 2px;
    overflow: hidden;
    border-radius: 1.5em;
    box-sizing: border-box;
    display: inline-block;
  }
  .glyphicon-remove{
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    cursor: pointer;
  }
  .container .inputGroup>span{
    line-height: 35px
  }
  .container .inputGroup .user{
    line-height: 35px
  }
  .container .inputGroup input{
    width: 100%;
    /*max-width: 150px;*/
    height: 35px;
    border: 0;
    box-sizing: border-box;
    /*background-color: red;*/
    display: inline-block;
    outline: none;
    /*缩进*/
    text-indent: 0.5em
  }
  .container .contentBtnList button{
    width: 90%;
    max-width: 100px;
    height: 34px;
    border-radius: 5%;
    box-sizing: border-box;
    background-color: #005BAB;
    color: white;
  }
  .container .toUser{
    height: 40px;
    text-align: right
  }
  .container .toUser div{
    position: absolute;
    top:0;
    right: 0;
    text-align: center;
  }
  .glyphicon-remove{
    line-height: 35px;
    font-size: 20px;
    cursor: pointer;
  }
  .smallDevice{
    display: none;
    height: 40px;
    text-align: right
  }
  .listItem{
    text-align: center;
  }



  .isActive{
    color: white!important;
    background-color: #005BAB!important
  }

 /* @media only screen and (min-width: 768px) and (max-width: 1200px) {
    
  }*/
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
</style>
