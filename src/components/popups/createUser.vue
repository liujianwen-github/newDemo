<template>
  <div class="popup" id="createUser">
   <div>
    <header>
      <h3>新建用户</h3>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img src="../../assets/logo.png" alt="">
        <div class="changePic">修改头像</div>
      </div>
      <div class="addUser">
        <div class="addMessage long">
          <label>姓名</label>
          <input type="text" name="">
        </div>
        <div class="addMessage">
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
        <button class="footBtn btn">取消</button>
        <button class="footBtn btn">确定</button>
      </div>
    </article>
   </div>
  </div>
</template>
<!-- 新建用户组件 -->
<script>
import $ from 'jquery'
export default {
  name: 'createUser',
  methods: {
    close: function () {
      $('#createUser').css('display', 'none')
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
/*.popup{
  width: 400px;
  height: 300px
}*/
.popup>div{
  border:1px solid red;
  background-color: green
}
header>div{
  display: inline-block;
  float: left;
  margin-top: 20px
}
header .addUser{
  padding-left: 10px
}
header .addUser .addMessage{
  margin-bottom: 10px
}
.addMessage.long>input{
  width: 160px;
  height: 30px
}

header .setHead{
  position: relative;
  height: 144px;
  width: 144px;
  background-color: white
}
header .setHead>img{
  width: 100%
}
header .setHead>div{
  width: 100%;
  background-color: rgba(0,0,0,0.7);
  text-align: center;
  color: white;
  position: absolute;
  bottom:0;
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
</style>
