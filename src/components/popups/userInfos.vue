<template>
  <div class="popup" id="userInfos">
   <div>
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img src="../../assets/logo.png" alt="">
      </div>
      <div class="addUser">
        <p class="headInfo">name</p>
        <p class="headInfo">最后到访时间：time</p>
        <p class="headInfo">采集地点: 采集地点</p>
        <div class="btn" @click="setMessage">设置留言</div>
      </div>
    </header>
    <article>
      <div class="content">
        <div @click="searchHistory">
          <img src="../../assets/search.png"  alt="">
          <p>查找未成功识别记录</p>
        </div>
        <div>
          <p>识别记录</p>
          <div class="itemList">
            <ul>
            <!-- TODO v-for -->
              <li>
                <div>
                  <div class="left">
                    <p>date</p>
                    <p>time</p>
                    <p>address</p>
                    <button class="btn btn-info" @click="viewScene">场景图</button>
                  </div>
                  <div class="right" @click="viewGif">
                    <div>
                      <img src="../../assets/search.png" alt="">
                      <span class="gif">GIF</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div class="left">
                    <p>date</p>
                    <p>time</p>
                    <p>address</p>
                    <button class="btn btn-info" @click="viewScene">场景图</button>
                  </div>
                  <div class="right" @click="viewGif">
                    <div>
                      <img src="../../assets/search.png" alt="">
                      <span class="gif">GIF</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div class="left">
                    <p>date</p>
                    <p>time</p>
                    <p>address</p>
                    <button class="btn btn-info" @click="viewScene">场景图</button>
                  </div>
                  <div class="right" @click="viewGif">
                    <div>
                      <img src="../../assets/search.png" alt="">
                      <span class="gif">GIF</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
   </div>
  </div>
</template>
<!-- 查看用户信息组件 -->
<script>
import $ from 'jquery'
export default {
  name: 'userInfos',
  methods: {
    close: function () {
      $('#userInfos').css('display', 'none')
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
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
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
  background-color: red;
  width: 40%;
  text-align: center;
}
.popup article .content>div:first-child>img{
  margin-top: 40px
}
.popup article .content>div:nth-child(2){
  /*background-color: blue;*/
  width: 60%;
  overflow-y: auto
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

</style>
