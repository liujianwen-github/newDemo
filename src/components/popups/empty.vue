<template>
  <div class="emptyBox">
    <p @click="bibi">查询数据为空!!!</p>
  </div>
</template>
<!-- 陌生人操作组件 -->
<script>
// import $ from 'jquery'
export default {
  name: 'empty',
  props: ['toempty'],
  methods: {
    bibi: function () {
      console.log(this.isShow)
    }
  },
  watch: {
    toempty: function (val, old) {
      this.size = val.size
      this.isShow = val.show
    }
  },
  created () {
    console.log(this)
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
  height: 450px;
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
