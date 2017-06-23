<template>
  <div class="container">
    <!-- <p @click="getTotal">1</p> 	 -->
    <div class="itemList">
      <div class="item" v-for="item in list" @click="flipNext">
        <img v-show="item.matchStatus==0" src="../../assets/stranger.png"  alt="stranger">
        <img v-show="item.matchStatus==1" src="../../assets/user.png"  alt="user">
        <div class="content">
          <img :src="item.facetrackImage" alt="">
          <div class="time">{{item.createTime}}</div>
          <div class="name" v-html="item.personName">&nbsp;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import config from '@/config'
// import Fill from '@/fill'
export default {
  name: 'model1',
  data () {
    return {
      list: null
    }
  },
  props: ['toFirst'],
  methods: {
    flipNext: function () {
      // alert('1')
      this.$emit('fromfa', 1)
    }
  },
  watch: {
    toFirst: function (val, old) {
      if (this.list === val) {
        return
      }
      this.list = val
      // Fill.pushItem(val)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
  	box-sizing: border-box;
  	border: 1px solid red;
    background-color: white;
    min-height: 500px
  }
  .itemList{
    text-align: left
  }
  .item{
    border: 1px solid blue;
    border-radius: 5%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    width: 180px;
    height: 200px;
    display: inline-block;
    margin:0 20px 5px 20px
  }
  /*显示person标志的图片*/
  .item>img{
    position: absolute;
    left: 0;
    top: 0;
    width: 80px
  }
  .item>div{
    text-align: center;
  }
  .item>div>img{
    margin-top: 20px;
    margin-bottom: 10px;
    width:120px;
    height: 120px;
    background-color: blue
  }
  .item .name{
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }
</style>
