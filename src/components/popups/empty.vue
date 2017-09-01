<template>
  <div class="emptyBox">
    <p>查询数据为空!!!</p>
  </div>
</template>
<!-- 陌生人操作组件 -->
<script>
// import $ from 'jquery'
export default {
  name: 'empty',
  props: ['toempty'],
  watch: {
    toempty: function (val, old) {
      this.size = val.size
      this.isShow = val.show
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
.emptyBox{
  /*background-color: red;*/
  display: none;
  height: 600px;
  width: 100%;
  /*position: absolute;*/
  /*background-color: white;*/
  z-index: 100
}
p{
  font-size: 40px;
  line-height: 400px;
  color: grey
}
</style>
