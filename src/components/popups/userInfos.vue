<template>
  <div class="popup" id="userInfos" :class="{show:isShow}">
   <div v-if="viewWhich=='userInfos'">
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img :src="personData.headimage" alt="">
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
              <li v-for="item in list" :style="liBgc">
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
        <div class="gifBox" :class="{show:gif.isShow}">
          <img :src="gif.imgHead + gif.imgURL" :class="{show:gif.isShow}"  alt="" >
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
import listSide from '@/assets/listSide.png'
import INTERFACE from '@/interface'

export default {
  name: 'userInfos',
  props: ['toUserInfos', 'viewWhich'],
  data () {
    return {
      liBgc: 'background: url(' + listSide + ') no-repeat',
      isShow: false,
      personData: null,
      scene: {
        isShow: false,
        img: ''
      },
      gifChange: null,
      gif: {
        imgHead: null,
        imgURL: null,
        gifList: [],
        isShow: true,
        curr: 0
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
      this.stopGif()
      this.closeScene()
    },
    viewGif: function (msg) {
      // alert(msg)
      Axios({
        method: 'get',
        url: INTERFACE.USER_FACETRACK_GIF,
        params: {
          userkey: config.userkey,
          facetrackId: msg,
          count: 0
        }
      }).then((res) => {
        console.log(res.data.results)
        this.gif = {
          imgHead: res.data.results.imgHead,
          imgURL: res.data.results.imgs[0],
          gifList: res.data.results.imgs,
          isShow: true,
          curr: 0
        }
        this.gifAnimation()
      }, (err) => {
        console.log(err)
      })
      // TODO 动图 场景图
      console.log(this.personData.personId)
    },
    gifAnimation: function () {
      // var i = 0
      const _this = this
      if (_this.gif.gifList.legnt <= 1) {
        return
      }
      _this.gifChange = setInterval(function () {
        // console.log(_this)
        let i = _this.gif.curr
        _this.gif.imgURL = _this.gif.gifList[i]
        console.log(_this.gif.imgURL)
        // 播放到最后一张时下标退回到0
        _this.gif.curr = _this.gif.curr === _this.gif.gifList.length - 1 ? 0 : _this.gif.curr + 1
      }, 500)
    },
    stopGif: function () {
      // 清除动图
      clearInterval(this.gifChange)
      this.gif = {
        imgHead: null,
        imgURL: null,
        gifList: [],
        isShow: false,
        curr: 0
      }
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
      console.log(val)
      this.personData = val
      console.log(this.personData)
      this.getParams.personId = this.personData.personId
      // alert(this.getParams.personId)
      Axios.get(INTERFACE.USER_GETINFOS, {params: this.getParams}).then(
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
      // alert(val)
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
