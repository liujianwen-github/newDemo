<template>
  <div class="popup" id="intellAnalyse">
   <div>
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img src="../../assets/logo.png" alt="">
      </div>
      <div class="addUser">
        <p class="headInfo">来访时间:</p>
        <p class="headInfo">采集地点:</p>
        <p>以下是智能分析找到最接近的三名注册用户</p>
      </div>
    </header>
    <article>
      <div class="content">
        <div class="item">
          <img src="../../assets/Admin_48px_582776_easyicon.net.png" alt="">
          <p>name</p>
        </div>
        <div class="item">
          <img src="../../assets/Admin_48px_582776_easyicon.net.png" alt="">
          <p>name</p>
        </div>
        <div class="item">
          <img src="../../assets/Admin_48px_582776_easyicon.net.png" alt="">
          <p>name</p>
        </div>
      </div>
      <div class="foot">
        <div>
          <button class="btn footBtn">返回</button>
          <button class="btn footBtn">完成</button>
        </div>
      </div>
    </article>
   </div>
  </div>
</template>
<!-- 智能分析组件 -->
<script>
import $ from 'jquery'
export default {
  name: 'intellAnalyse',
  methods: {
    close: function () {
      $('#intellAnalyse').css('display', 'none')
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
.popup header{
  width: 100%;
  height: 200px;
  /*background-color: #2B77D5;*/
  padding: 20px;
  border-bottom: 1px solid black;
  box-sizing: border-box;
}
.popup header>div{
  /*display: inline-block;*/
  float:left;
  height: 160px;
  /*background-color: green*/
}
.popup header .setHead{
  width: 160px;
  height: 160px;
  background-color: white
}
.popup header .setHead img{
  width: 100%;  
}
.popup header .addUser{
  padding-left:10px
}
.popup header .btn{
  border:1px solid white;
  color: white;
  font-weight: 800;
  margin-top: 20px
}
.popup article{
  clear: both;
  width: 100%;
  height: 280px;
  position: relative;
  /*background-color: lightblue*/
}
.popup article .content{
  display: flex;
  justify-content: center;
  padding-top: 20px
}
.popup article .content>.item{
  border: 1px dashed red;
  width: 140px;
  height: 160px;
  text-align: center;
}
.popup article .content>.item>img{
  width: 120px;
  height: 120px
}

.popup article .foot{
  text-align: center;
  width: 100%;
  position: absolute;
  bottom:30px
}
.popup article .foot>div{
  width: 200px;
  display: flex;
  justify-content: space-between;
}
.popup article .foot>div button{
  background-color: #2B77D5;
  color: white
}
</style>
