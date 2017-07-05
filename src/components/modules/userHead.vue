<template>
  <div class="container">
    <div class="leftHead" @click="reloadPage">
      <img src="../../assets/logo.png">
      <span>未来门禁演示系统 1.0</span>
    </div>
    <div class="contentBtnList">
      <div class="inputGroup">
        <span class="glyphicon glyphicon-user"></span>
        <input type="text" value="" v-model="searchText" @keyup="keySearch" autofocus="autofocus">
        <span class="glyphicon glyphicon-remove"  @click="reSearch"></span>
      </div>
      <button class="btn" @click="search">search</button>
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
    height: 35px
  }
  .container .inputGroup{
<<<<<<< HEAD
    border:1px solid grey;
    position: relative;
=======
    /*border*/
    /*background-color: red;*/
    position: relative;
    border:1px solid grey;
>>>>>>> 2abe1324ee49e8810d81b35ffe18810b775ab13e
    border-radius: 1.5em;
    padding-left: 10px;
    padding-right: 20px;
    display: inline-block;
  }
  .glyphicon-remove{
    position: absolute;
    right: 5px;
    height: 35px;
    line-height: 35px;
    font-size: 20px;
    cursor: pointer;
  }
  .container .inputGroup>input{
    width: 150px;
    height: 35px;
    border: 0;
    box-sizing: border-box;
    /*background-color: red;*/
    display: inline-block;
    outline: none;
    text-indent: 0.5em
  }
  .container .contentBtnList button{
    width: 100px;
    height: 34px;
    border-radius: 5%;
    box-sizing: border-box;
    background-color: #005BAB;
    color: white;
  }
  .container .toUser{
    position: absolute;
    right: 0;
    height: 30px;
    top:0;
    /*background-color: lightblue*/
  }
  .glyphicon-remove{
    position: absolute;
    right: 5px;
    height: 35px;
    line-height: 35px;
    font-size: 20px;
    cursor: pointer;
  }




  .isActive{
    color: white!important;
    background-color: #005BAB!important
  }
</style>
