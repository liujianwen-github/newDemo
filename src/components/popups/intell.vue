<template>
  <div class="popup">
   <div>
    <header>
      <div class="serHead">
        <img src="" alt="">
      </div>
      <div class="addUser">
        <p class="headInfo">智能分析</p>
        <p class="headInfo">TA可能是以下某一位</p>
        <div class="btn btn-info">无匹配用户</div>
      </div>
    </header>
    <article>
      2
    </article>
   </div>
  </div>
</template>

<script>
// import config from '@/config'
// import Fill from '@/fill'
export default {
  name: 'intell'
}
</script>

<style>
.popup{
  width: 680px;
  height: 500px;
  position: absolute;
  top:50%;
  left: 50%;
}
.popup>div{
  width: 100%;
  height: 100%;
  /*background-color: red;*/
  position: relative;
  /*top:-50%;*/
  left: -50%;
  border-radius: 1%;
  overflow: hidden;
  border: 1px solid red;
  box-sizing: border-box;
}
</style>

<style scoped>
.popup header{
  width: 100%;
  height: 200px;
  background-color: #2B77D5;
  padding: 20px
}
.popup article{
  width: 100%;
  height: 300px;
  background-color: lightblue
}
</style>
