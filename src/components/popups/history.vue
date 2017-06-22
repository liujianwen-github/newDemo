<template>
  <div class="popup" id="history">
   <div>
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img src="../../assets/logo.png" alt="">
      </div>
      <div class="addUser">
        <p class="headInfo">
          <span>name</span>
          <span>智能分析查找</span>
        </p>
        <p class="headInfo">
            <input type="checkbox" name="chooseTime" value="time1">半小时
            <input type="checkbox" name="chooseTime" value="time2">4小时
            <input type="checkbox" name="chooseTime" value="time3">12小时
            <input type="checkbox" name="chooseTime" value="time4">24小时
            <input type="checkbox" name="chooseTime" value="time5">自定义
        </p>
        <div>
          <button class="btn">查找</button>
          <button class="btn">返回</button>
        </div>
      </div>
    </header>
    <article>
     <div class="content">
       <div class="item">
         <img src="../../assets/search.png"  alt="">
         <p>date time</p>
         <p>
           <button class="btn">确定</button>
         </p>
       </div>
       <div class="item">
         <img src="../../assets/search.png"  alt="">
         <p>date time</p>
         <p>
           <button class="btn">确定</button>
         </p>
       </div>
       <div class="item">
         <img src="../../assets/search.png"  alt="">
         <p>date time</p>
         <p>
           <button class="btn">确定</button>
         </p>
       </div>
     </div>
    </article>
   </div>
  </div>
</template>
<!-- 查看用户信息组件 -->
<script>
import $ from 'jquery'
export default {
  name: 'history',
  methods: {
    close: function () {
      $('#history').css('display', 'none')
    },
    viewGif: function () {
      alert('viewgif')
    },
    viewScene: function () {
      alert('viewScene')
    },
    searchHistory: function () {
      alert('search history')
    },
    setMessage: function () {
      alert('set message')
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
.popup header{
  width: 100%;
  height: 200px;
  padding: 20px;
  border-bottom: 1px solid black
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
.popup .btn{
  /*border:1px solid white;*/
  /*color: white;*/
  background-color: #2B77D5;
  width: 120px;
  height: 30px;
  color: white;
  font-weight: 800;
  margin-top: 20px;
}
article .content{
  display: flex;
}
article .content .item{
  padding: 10px;
  width: 26%
}
article .content .item img{
  width: 100%;
}
article .content .item p{
  text-align: center;
}


</style>
