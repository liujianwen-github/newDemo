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
          <span v-text="personData.name"></span>
          <span>智能分析查找</span>
        </p>
        <p class="headInfo">
            <input type="radio" name="chooseTime" value="0.5" v-model="chooseTime" @click="resetPersonSetTime">半小时
            <input type="radio" name="chooseTime" value="4" v-model="chooseTime" @click="resetPersonSetTime">4小时
            <input type="radio" name="chooseTime" value="12" v-model="chooseTime" @click="resetPersonSetTime">12小时
            <input type="radio" name="chooseTime" value="24" v-model="chooseTime" @click="resetPersonSetTime">24小时
            <input type="radio" name="chooseTime" value="personSet" v-model="personSetTime" @click="toZero">自定义
            <input type="text" name="" value="" v-model="chooseTime" autofocus :class="{isShow:personSetTime=='personSet'}">
        </p>
        <div>
          <button class="btn" @click="searchNoMatchedList">查找</button>
          <button class="btn" @click="returnUserInfos">返回</button>
        </div>
      </div>
    </header>
    <article>
     <div class="content">
       <div class="item" v-for="(item,index) in historyList">
         <img :src="item.facetrackImage"  alt="">
         <p><span v-text="item.createTime.split(' ')[0]"></span> <span v-text="item.createTime.split(' ')[1]"></span></p>
         <p>{{index}}</p>
         <p>
           <button class="btn" @click="confirmFacetrack(item.facetrackId)">确定</button>
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
    searchHistory: function () {
      alert('search history')
    },
    setMessage: function () {
      alert('set message')
    },
    toZero: function () {
      this.chooseTime = ''
    },
    confirmFacetrack: function (facetrackId, index) {
      // alert('push img')
      // console.log(this.personData)
      let dataList = new FormData()
      dataList.append('facetrackId', facetrackId)
      dataList.append('personId', this.personData.personId)
      dataList.append('userkey', config.userkey)
      console.log(dataList)
      Axios({
        method: 'post',
        url: config.HOST + '/apiServer/personManage/confirmFacetrackByPerson',
        data: dataList,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log(res)
        if (res.data.msg === 'SUCC') {
          alert('succ')
          // console.log(typeof this.historyList)
        }
      }, (err) => {
        console.log(err)
      })
    },
    resetPersonSetTime: function () {
      this.personSetTime = ' '
    },
    searchNoMatchedList: function () {
      alert('查找未成功识别记录数据,post请求')
      alert(this.chooseTime)
      console.log(this.personData)
      Axios({
        methods: 'GET',
        url: config.HOST + '/apiServer/personManage/getPersonUnMatchedList',
        params: {
          beginTime: new Date().getTime() - this.chooseTime * 3600000,
          endTime: new Date().getTime(),
          userkey: config.userkey,
          deviceId: config.deviceId,
          personId: this.personData.personId
        }
      }).then((res) => {
        this.historyList = res.data.results.list
        console.log(this.historyList)
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
  overflow-x: auto
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
