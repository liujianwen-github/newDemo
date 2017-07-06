<template>
  <div class="container">
  <Row>
    <Col :sm="10" :md="10" :lg="10" :xs="16" class="leftHead" @click="reloadPage">
      <img src="../../assets/logo.png">
      <span>未来门禁演示系统 1.0</span>
<<<<<<< HEAD
    </Col>
    <Col class="contentBtnList" span="5">
=======
    </div>
    <div class="contentBtnList">
>>>>>>> 37e86a6c4a59d8dd5b334c20668fac78c28bb8aa
      <div class="inputGroup">
        <span class="glyphicon glyphicon-user"></span>
        <input type="text" value="" v-model="searchText" @keyup="keySearch" autofocus="autofocus">
        <span class="glyphicon glyphicon-remove"  @click="reSearch"></span>
      </div>
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
        title="搜索用户">
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
      window.location.reload()
    },
    reSearch: function () {
      // alert('111')
      if (this.searchText !== '') {
        this.searchText = ''
      } else {
        this.reloadPage()
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
  }
  .container .leftHead{
    display: inline-block;
    height: 40px;
    color: #005BAB;
    text-align: left;
    /*position: absolute;*/
    /*left: 0*/
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
<<<<<<< HEAD
    border:1px solid grey;
    height: 100%;
    position: relative;
=======
    /*border*/
    /*background-color: red;*/
    position: relative;
    border:1px solid grey;
>>>>>>> 2abe1324ee49e8810d81b35ffe18810b775ab13e
    border-radius: 1.5em;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 20px;
    display: inline-block;
  }
  .glyphicon-remove{
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    cursor: pointer;
  }
  .container .inputGroup{
    display: flex;
  }
  .container .inputGroup>span{
    line-height: 35px
  }
  .container .inputGroup>input{
    width: 100%;
    /*max-width: 150px;*/
    height: 38px;
    border: 0;
    box-sizing: border-box;
    /*background-color: red;*/
    display: inline-block;
    outline: none;
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
    position: absolute;
    right: 5px;
    height: 40px;
    line-height: 40px;
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
<<<<<<< HEAD
=======
  .glyphicon-remove{
    position: absolute;
    right: 5px;
    height: 35px;
    line-height: 35px;
    font-size: 20px;
    cursor: pointer;
  }

>>>>>>> 37e86a6c4a59d8dd5b334c20668fac78c28bb8aa



  .isActive{
    color: white!important;
    background-color: #005BAB!important
  }

  @media only screen and (min-width: 768px) and (max-width: 1200px) {
    
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
</style>
