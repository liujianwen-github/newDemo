<template>
  <div class="container">
    <!-- <p @click="getTotal">1</p>    -->
    <div class="itemList">
      <div class="item" v-for="item in list">
        <!-- <img v-show="item.matchStatus==0" src="../../assets/stranger.png"  alt="stranger">
        <img v-show="item.matchStatus==1" src="../../assets/user.png"  alt="user"> -->
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
// import Store from '../store.js'

export default {
  name: 'model3',
  data () {
    return {
      list: null
    }
  },
  props: ['toThird'],
  methods: {
    //
  },
  watch: {
    toThird: function (val, old) {
      if (this.list === val) {
        return
      }
      console.log(val)
      this.list = val
    }
  }
}
</script>
<!-- 
  *书写格式要求：①变量声明冒号后边必须有一个空格
   *           ②字符串单引号
   *           
   *             -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    box-sizing: border-box;
    border: 1px solid red;
    height: 500px;
    background-color: white
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
