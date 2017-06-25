<template>
  <div class="popup" id="userInfos" :class="{show:isShow}">
   <div v-if="viewWhich=='userInfos'">
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img :src="personData.image" alt="">
        <!-- {{personData}} -->
      </div>
      <div class="addUser">
        <p class="headInfo" v-text="personData.name">name</p>
        <p class="headInfo">最后到访时间：<span v-text="personData.latestMatchTime"></span></p>
        <p class="headInfo">采集地点: <span v-text="personData.sourceDes">sourceId</span></p>
        <div class="btn" @click="setMessage">设置留言</div>
      </div>
    </header>
    <article>
      <div class="content">
        <div @click="searchHistory">
          <img src="../../assets/search.png"  alt="">
          <p>查找未成功识别记录</p>
        </div>
        <div :class="{noScroll:scene.isShow}">
          <p>识别记录</p>
          <div class="itemList">
            <ul>
            <!-- TODO v-for -->
              <li v-for="item in list">
                <div>
                  <div class="left">
                    <p v-text="item.createTime.split(' ')[0]">date</p>
                    <p v-text="item.createTime.split(' ')[1]">time</p>
                    <p v-text="item.sourceDes">address</p>
                    <button class="btn btn-info" @click="viewScene(item.sourceImg)">场景图</button>
                  </div>
                  <div class="right" @click="viewGif(item.facetrackId)">
                    <div>
                      <img :src="item.facetrackImage" alt="">
                      <span class="gif">GIF</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="sceneBox" :class="{show:scene.isShow}" @click="closeScene">
          <img :src="scene.img" alt="">
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
  name: 'userInfos',
  props: ['toUserInfos', 'viewWhich'],
  data () {
    return {
      isShow: false,
      personData: null,
      scene: {
        isShow: false,
        img: ''
      },
      list: null,
      getParams: {
        userkey: config.userkey,
        personId: null,
        deviceId: config.deviceId
      }
    }
  },
  methods: {
    close: function () {
      this.$emit('popState', '0')
      this.isShow = false
    },
    viewGif: function () {
      alert('查看动图')
      // TODO 动图 场景图
      console.log(this.personData.personId)
    },
    viewScene: function (msg) {
      alert('查看场景图')
      this.scene = {
        isShow: true,
        img: msg
      }
    },
    closeScene: function () {
      this.scene = {
        isShow: false,
        img: ' '
      }
    },
    searchHistory: function () {
      this.$emit('popState', 'history')
    },
    setMessage: function () {
      this.$emit('popState', 'leaveMessage')
    }
  },
  watch: {
    toUserInfos: function (val, old) {
      // alert(val)
      this.personData = val
      this.getParams.personId = this.personData.personId
      alert(this.getParams.personId)
      Axios.get(config.HOST + 'apiServer/personManage/getPersonMatchedList', {params: this.getParams}).then(
        (res) => {
          this.list = res.data.results.list
          console.log(this.list)
          // TODO 根据personId获取场景图 动图
        }, (err) => {
        console.log(err)
      })
    },
    viewWhich: function (val, old) {
      if (val === 'userInfos') {
        this.isShow = true
      }
      alert(val)
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
.show{
  display: block
}
.noScroll{
  overflow-y: hidden!important;
}
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
.popup header .btn{
  /*border:1px solid white;*/
  /*color: white;*/
  background-color: #2B77D5;
  color: white;
  font-weight: 800;
  margin-top: 20px
}
.popup article{
  clear: both;
  width: 100%;
  height: 280px;
}
.popup article .content{
  display: flex;
  position: relative;
  height: 260px
}
.popup article .content>div:first-child{
  /*background-color: red;*/
  cursor: pointer;
  width: 40%;
  text-align: center;
}
.popup article .content>div:first-child>img{
  margin-top: 40px
}
.popup article .content>div:nth-child(2){
  /*background-color: blue;*/
  width: 60%;
  overflow-y: auto;
  position: relative;
}
/*识别记录*/
article .content .itemList ul{
  padding: 0;
  /*overflow-y: auto*/
}
article .content .itemList li{
  list-style-type: none;
  background: url('../../assets/listSide.png') no-repeat;
  display: block;
  height: 130px;
}
article .content .itemList li>div{
  display: flex;
}
article .content .itemList li>div>div{
  /*display: inline-block;*/
  padding-left: 30px;
  width: 49%
}
article .content .itemList li>div>.right>div{
  width: 120px;
  height: 120px;
  position: relative;
}
article .content .itemList li>div>.right img{
  width: 100%;
  border: 1px solid red
}
article .content .itemList li>div>.right>div .gif{
  background-color: rgba(0,0,0,0.6);
  color: white;
  padding:0.3em 0.5em;
  position: absolute;
  bottom: 0;
  right: 0
}

.sceneBox{
  width: 60%;
  height: 100%;
  position: absolute!important;
  right: 0;
  top: 0;
  background-color: rgba(0,0,0,0.7);
  z-index: 10;
  display: none;

}
.sceneBox img{
  max-height: 100%;
  max-width: 100%;
}

</style>
