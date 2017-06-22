<template>
  <div class="popup" id="leaveMessage" :class="{show:isShow}">
   <div v-if="viewWhich=='leaveMessage'">
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img src="../../assets/logo.png" alt="">
      </div>
      <div class="addUser">
        <p class="headInfo">
          <span>name</span>
        </p>
        <p class="headInfo">留言设置</p>
        <div class="headInfo">
          <div>
            <input type="radio" name="timeLine" value="short">短期留言
          </div>
          <div>
            <input type="radio" name="timeLine" value="long">长期留言
          </div>
        </div>
        <div class="headInfo">
          开始时间：<input type="date">
        </div>
        <div class="headInfo">
          结束时间：<input type="date">
        </div>
      </div>
    </header>
    <article>
      <p>留言会在设定时间段内识别时出现</p>
      <textarea autofocus placeholder="请输入留言内容"></textarea>
      <div class="foot">
        <button class="btn">取消</button>
        <button class="btn">确定</button>
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
  data () {
    return {
      isShow: false
    }
  },
  props: ['viewWhich'],
  methods: {
    close: function () {
      $('#leaveMessage').css('display', 'none')
      this.$emit('popState', '0')
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
  },
  watch: {
    viewWhich: function (val, old) {
      if (val === 'leaveMessage') {
        this.isShow = true
      }
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
.popup header .addUser .headInfo>div{
  display: inline-block;
}
.popup header .addUser .headInfo input[type="date"]{
  width: 160px;
  height: 30px
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
textarea{
  width: 100%;
  height: 180px;
  resize: none
}
.foot{
  /*text-align: center;*/
  display: flex;
  justify-content: space-around;
}



</style>
