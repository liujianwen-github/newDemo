<template>
  <div class="popup" id="intell" >
   <div v-if="viewWhich=='intell'">
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img v-bind:src="toIntell.facetrackImage" alt="">
      </div>
      <div class="addUser">
        <p class="headInfo">来访时间: <span v-text="toIntell.createTime"></span></p>
        <p class="headInfo">采集地点: <span v-text="toIntell.sourceDes"></span></p>
        <div class="btn" @click="createUser">新建用户</div>
        <div class="btn" @click="intellAnalyse">智能分析</div>
      </div>
    </header>
    <article>
      <div class="content">
        <img v-bind:src="toIntell.sourceImg" alt="">
      </div>
    </article>
   </div>
  </div>
</template>
<!-- 陌生人操作组件 -->
<script>
import $ from 'jquery'
export default {
  name: 'intell',
  props: ['toIntell', 'viewWhich'],
  methods: {
    close: function () {
      $('#intell').css('display', 'none')
      this.$emit('popState', '0')
      console.log(this.toIntell)
    },
    createUser: function () {
      console.log('intell->create')
      this.$emit('popState', 'createUser')
    },
    intellAnalyse: function () {
      this.$emit('popState', 'intellAnalyse')
    }
  },
  watch: {
    viewWhich: function (val, old) {
      console.log('intel->viewwhich:' + val)
      if (val === 'intell') {
        $('#intell').css('display', 'block')
      } else {
        $('#intell').css('display', 'none')
      }
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
#intell{
  display: none;
}
.popup header{
  width: 100%;
  height: 200px;
  /*background-color: #2B77D5;*/
  padding: 20px;
  border-bottom:1px solid black;
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
  border:1px solid black;
  /*color: white;*/
  font-weight: 800;
  margin-top: 20px
}
.popup article{
  clear: both;
  width: 100%;
  height: 300px;
  /*background-color: lightblue*/
}
.popup article .content{
  text-align: center;
  padding-top: 10px
}
</style>
