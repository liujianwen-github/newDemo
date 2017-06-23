<template>
  <div class="popup" id="registerUser" :class="{show:isShow}">
   <div>
    <header>
      <h3><span v-text="title"></span>用户</h3>
      <div class="closeWindow" @click="close">&times;</div>
      <!-- 上传头像 -->
      <div class="setHead">      
        <div class="changePic">
          <img v-if="title=='新建'" src="../../assets/userHeader.png" alt="">
          <img v-if="title=='编辑'" :src="personData.headimage" alt="">
        </div>
        <div class="changePic">
        <img src="../../assets/inputImg.png" alt="">
        </div>
        <div class="changePic">
          <img src="../../assets/andMore.png" alt="">
        </div>
        <p>上传用户头像</p>
      </div>
      <!-- 编辑信息 -->
      <div class="addUser">
        <div class="addMessage long">
          <label>姓名</label>
          <input type="text" name="">
        </div>
        <div class="addMessage short">
          <label>性别</label>
          <input type="radio" name="sex" value="man" checked="checked">男
          <input type="radio" name="sex" value="woman">女
        </div>
        <div class="addMessage long">
          <label>卡号</label>
          <input type="text" name="">
        </div>
        <div class="addMessage long">
          <label>生日</label>
          <input type="date" name="">
        </div>
      </div>
    </header>
    <article>
      <div class="content">
        <button class="footBtn btn" @click="close">取消</button>
        <button class="footBtn btn" @click="pushFormat">确定</button>
      </div>
    </article>
    <div class="goDelete">
      <span class="btn" @click="godelete">删除用户</span>
    </div>
    <!-- 删除用户弹窗 -->
    <div class="deleteUser">
      <div>
      <div>
        <p>是否删除用户?</p>
        <button class="btn" @click="dontDelete">取消</button>
        <button class="btn" @click="mksureDelete">确认</button>
      </div>   
      </div>
    </div>
   </div>
  </div>
</template>
<!-- 新建用户组件 -->
<!-- TODO图片下添加input file -->
<script>
import $ from 'jquery'
export default {
  name: 'registerUser',
  data () {
    return {
      isShow: false,
      title: null,
      personData: {
        headimage: null
      }
    }
  },
  props: ['viewWhich', 'toRegisterUser'],
  methods: {
    close: function () {
      this.$emit('popState', '0')
      this.isShow = false
    },
    returnHistory: function () {
      alert('return')
    },
    godelete: function () {
      $('.deleteUser').css('display', 'block')
      $('#registerUser>div>header').addClass('vague')
      $('#registerUser>div>article').addClass('vague')
    },
    pushFormat: function () {
      alert('push')
    },
    dontDelete: function () {
      $('.deleteUser').css('display', 'none')
      $('#registerUser>div>header').removeClass('vague')
      $('#registerUser>div>article').removeClass('vague')
    },
    mksureDelete: function () {
      alert('push delete,return userManage')
      $('.deleteUser').css('display', 'none')
      $('#registerUser>div>header').removeClass('vague')
      $('#registerUser>div>article').removeClass('vague')
    }
  },
  watch: {
    viewWhich: function (val, old) {
      if (val === 'editUser') {
        this.isShow = true
        this.title = '编辑'
      } else if (val === 'addNewUser') {
        this.isShow = true
        this.title = '新建'
      }
    },
    toRegisterUser: {
      handler (val, old) {
        this.personData = val
      },
      deep: true
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
.popup{
  display: none
}
.popup>div{
  border:1px solid red;
}
header>div{
  margin-top: 10px
}
h3{
  margin:0;
}
header .addUser{
  padding-left: 10px;
  margin-top:30px
}
header .addUser .addMessage{
  margin:0 0 10px 0;
  width: 50%;
 /* display: flex;
  justify-content: left;*/
}

.addMessage.long>input{
  width: 160px;
  height: 30px;
  margin-left: 20%
}
.addMessage.short>input{
  margin-left:20%
}

header .setHead{
  position: relative;
  height: 144px;
  width: 100%;
  /*background-color: white*/
}
header .setHead img{
  width: 100%;
}
header .setHead>.changePic{
  width: 144px;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid grey;
  background-color: rgba(255,255,255,0.5);
  text-align: center;
  color: white;
  /*float:left;*/
  display: inline-block;
  margin-right: 20px
}
article{
  clear: both;
  text-align: center;
  letter-spacing: 60px;
  width: 100%;
  position: absolute;
  bottom:40px
}
article>div>button{
  background-color: #2B77D5;
  width: 100px;
  color: white
}
.goDelete{
position: absolute;
right: 0;
bottom: 0
}

/*确认删除弹窗*/
.deleteUser{
  width: 100%;
  height: 100%;
  /*background-color: red;*/
  position: absolute;
  left: 0;
  top: 0;
  display: none
}
.deleteUser>div{
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%
}
.deleteUser>div>div{
  /*width: 100%;
  height: 100%;*/
  position: relative;
  left: -50%;
  top: -40%;
  background-color: white;
  /*box-sizing: content-box;*/
  /*background-color: red;*/
  border:1px solid red;
  letter-spacing: 50px;
  /*display: table-cell;*/
  text-align: center;
  padding:60px 60px;
}
.deleteUser>div>div p{
  letter-spacing: 1px
}
</style>
