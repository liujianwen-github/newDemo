<template>
  <div class="popup" id="history" :class="{show:isShow}">
   <div v-if="viewWhich=='history'">
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img :src="personData.image" alt="">
      </div>
      <div class="addUser">
        <p class="headInfo">
          <span>name</span>
          <span>智能分析查找</span>
        </p>
        <p class="headInfo">
            <input type="radio" name="chooseTime" value="0.5" v-model="chooseTime" @click="resetPersonSetTime">半小时
            <input type="radio" name="chooseTime" value="4" v-model="chooseTime" @click="resetPersonSetTime">4小时
            <input type="radio" name="chooseTime" value="12" v-model="chooseTime" @click="resetPersonSetTime">12小时
            <input type="radio" name="chooseTime" value="24" v-model="chooseTime" @click="resetPersonSetTime">24小时
            <input type="radio" name="chooseTime" value="personSet" v-model="personSetTime">自定义
            <input type="text" name="" value="" v-model="chooseTime" :class="{isShow:personSetTime=='personSet'}">
        </p>
        <div>
          <button class="btn" @click="searchNoMatchedList">查找</button>
          <button class="btn" @click="returnUserInfos">返回</button>
        </div>
      </div>
    </header>
    <article>
     <div class="content">
       <div class="item" v-for="item in historyList">
         <img src="../../assets/search.png"  alt="">
         <p>date time</p>
         <p>
           <button class="btn" @click="pushImg">确定</button>
         </p>
       </div>
     </div>
    </article>
   </div>
  </div>
</template>
<!-- 查看用户信息组件 -->
<script>
// import $ from 'jquery'
import Axios from 'axios'
import config from '@/config'
export default {
  name: 'history',
  data () {
    return {
      isShow: false,
      personSetTime: '',
      chooseTime: '0.5',
      personData: null,
      searchImgList: null, // 查找未成功识别记录数据
      historyList: null
    }
  },
  props: ['viewWhich', 'toHistory'],
  methods: {
    close: function () {
      this.$emit('popState', '0')
      this.isShow = false
      // this.
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
    },
    pushImg: function (val, old) {
      alert('push img')
    },
    resetPersonSetTime: function () {
      this.personSetTime = ''
    },
    searchNoMatchedList: function () {
      alert('查找未成功识别记录数据,post请求')
      alert(this.chooseTime)
      console.log(this.personData)
      Axios({
        methods: 'GET',
        url: config.HOST + '/apiServer/personManage/getPersonUnMatchedList',
        params: {
          beginTime: new Date().getTime(),
          endTime: new Date().getTime() + this.chooseTime * 3600000,
          userkey: config.userkey,
          deviceId: config.deviceId,
          personId: this.personData.personId
        }
      }).then((res) => {
        this.historyList = res.data.results.list
        // TODO 加几条记录，添加合并效果查询
        // URL:/apiServer/personManage/confirmFacetrackByPerson
        // Params:facetrackId,personId,userkey
      }, (err) => {
        console.log(err)
      })
    },
    returnUserInfos: function () {
      this.$emit('popState', 'userInfos')
      this.isShow = false
    }
  },
  watch: {
    viewWhich: function (val, old) {
      if (val === 'history') {
        this.isShow = true
      }
    },
    toHistory: function (val, old) {
      this.personData = val
      console.log(this.personData)
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
.isShow{
  display: inline-block!important
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
input[type="text"]{
  width: 50px;
  display: none
}

</style>
