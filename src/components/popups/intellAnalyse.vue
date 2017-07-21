<template>
  <div class="popup" id="intellAnalyse" :class="{notshow:intellNotShow}">
   <div v-if="viewWhich=='intellAnalyse'">
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img :src="personData.facetrackImage" alt="">
      </div>
      <div class="addUser whiteText">
        <p class="headInfo">来访时间:<span v-text="personData.createTime"></span></p>
        <p class="headInfo">采集地点:<span v-text="personData.sourceDes"></span></p>
        <p>以下是智能分析找到最接近的三名注册用户</p>
      </div>
    </header>
    <article>
      <div class="content">
        <div class="item" v-for="(item,index) in dataList" @click="chooseMe(index,item.persontag)">
          <input type="checkbox" name="chooseItem" :value="item.persontag" v-model="chooseItem">
          <div class="bgc" :class="{showme:index==whichBgc}" style="color:white">
            <img src="../../assets/checked.png" height="25" width="25">
          </div>
          <img :src="item.headImage" alt="">
          <p v-text="item.name">name</p>
        </div>
        <!-- <div class=""></div> -->
      </div>
      <div class="foot">
        <div>
          <button class="btn footBtn" @click="returnHistory">返回</button>
          <button class="btn footBtn" @click="addFacetrackToPerson">完成</button>
        </div>
      </div>
    </article>
   </div>
  </div>
</template>
<!-- 智能分析组件 -->
<script>
// import $ from 'jquery'
import Axios from 'axios'
import config from '@/config.js'
import INTERFACE from '@/interface'
export default {
  name: 'intellAnalyse',
  data () {
    return {
      intellNotShow: true,
      dataList: [],
      personData: null,
      whichBgc: null,
      chooseItem: null,
      intellParams: {
        userkey: '391cb26c_45f3_4817_86f8_644e293cce60',
        facetrackId: null,
        deviceId: config.deviceId
      }
    }
  },
  props: ['viewWhich', 'toIntellAnalyse'],
  methods: {
    close: function () {
      // $('#intellAnalyse').css('display', 'none')
      this.intellNotShow = true
      this.whichBgc = null
      this.dataList = null
      this.whichBgc = null
      // console.log(this.dataList)
      this.$emit('popState', '0')
    },
    findItem: function (findme) {
      if (this.chooseItem.length <= 0) return
      for (let i = 0; i < this.chooseItem.length; i++) {
        if (findme === this.chooseItem(i)) {
          return true
        }
      }
      return false
    },
    chooseMe: function (msg, item) {
      this.whichBgc = msg
      this.chooseItem = item
    },
    getDataList: function () {
      Axios.get(INTERFACE.STRANGER_ANALYSE, {params: this.intellParams}).then(
        (res) => {
          this.dataList = res.data.results.matchs || []
          console.log(this.dataList)
        }, (err) => {
        console.log(err)
      })
    },
    returnHistory: function () {
      this.dataList = null
      this.$emit('popState', 'intell')
    },
    addFacetrackToPerson: function () {
      console.log(this.chooseItem)
      console.log(this.intellParams.facetrackId)
      if (this.chooseItem === null) {
        console.warn('选择图片为空值，返回上一界面')
        this.$emit('popState', 'intell')
        return
      }
      let dataForm = new FormData()
      dataForm.append('userkey', config.userkey)
      dataForm.append('deviceId', config.deviceId)
      dataForm.append('persontag', this.chooseItem)
      dataForm.append('facetrackId', this.intellParams.facetrackId)
      Axios({
        method: 'POST',
        url: INTERFACE. STRANGER_ANALYSE_UPDATE,
        data: dataForm
      }).then((res) => {
        console.log(res)
        if (res.data.msg === 'SUCC') alert('添加成功')
        this.close()
      }, (err) => {
        // alert(err)
        console.log(err)
      })
    }
  },
  watch: {
    viewWhich: function (val, old) {
      // alert(val)
      if (val === 'intellAnalyse') {
        // $('#intellAnalyse').css('display', 'block')
        this.intellNotShow = false
        this.getDataList()
      } else {
        // $('#intellAnalyse').css('display', 'none')
        this.intellNotShow = true
      }
    },
    toIntellAnalyse: function (val, old) {
      this.personData = val
      this.intellParams.facetrackId = val.facetrackId
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
.notshow{
  display: none;
}
.popup header{
  width: 100%;
  height: 200px;
  /*background-color: #2B77D5;*/
  padding: 20px;
  box-sizing: border-box;
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
  border:1px solid white;
  color: white;
  font-weight: 800;
  margin-top: 20px
}
.popup article{
  clear: both;
  width: 100%;
  height: 280px;
  position: relative;
  /*background-color: lightblue*/
}
.popup article .content{
  display: flex;
  /*justify-content: center;*/
  justify-content: space-around;
  padding-top: 20px
}
.popup article .content>.item{
  color: rgb(70,60,70);
  /*border:3px solid rgba(0,0,0,0.5);*/
  background-color: white;
  border-radius: 5px; 
  width: 140px;
  height: 160px;
  text-align: center;
  position: relative;
}
.popup article .content>.item .bgc{
  background-color: rgba(0,0,0,0.7);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: none
}
.popup article .content>.item .bgc>img{
  position: absolute;
  right: 0;
  bottom: 0
}
.popup article .content>.item .bgc.showme{
  display: block;
  border:3px solid #2C78D6;
}
.popup article .content>.item>img{
  width: 120px;
  height: 120px
}

.popup article .foot{
  text-align: center;
  width: 100%;
  position: absolute;
  bottom:30px
}
.popup article .foot>div{
  width: 200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.popup article .foot>div button{
  background-color: #2B77D5;
  color: white
}
input[type="checkbox"]{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0
}
</style>
