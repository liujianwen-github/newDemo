<template>
  <div class="popup" id="createUser" >
   <div v-if="viewWhich=='createUser'">
    <header>
      <h3>新建用户</h3>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img :src="img" alt="">
        <div class="changePic">
          <span>修改头像</span>
          <input type="file" name="" accept="image/png,image/jpg,image/jpeg"  ref="inputer" @change="changePic">
        </div>
      </div>
      <div class="addUser">
        <div class="addMessage long">
          <label>姓名</label>
          <input type="text" name="" v-model="name">
        </div>
        <div class="addMessage">
          <label>性别</label>
          <input type="radio" name="sex" value="1" checked="checked" v-model="sex">男
          <input type="radio" name="sex" value="0" v-model="sex">女
        </div>
        <div class="addMessage long">
          <label>卡号</label>
          <input type="text" name="" v-model="cardId">
        </div>
        <div class="addMessage long">
          <label>生日</label>
          <input type="date" name="" v-model="birthDay">
        </div>
      </div>
    </header>
    <article>
      <div class="content">
        <button class="footBtn btn" @click="returnHistory">取消</button>
        <button class="footBtn btn" @click="createUser">确定</button>
      </div>
    </article>
   </div>
  </div>
</template>
<!-- 新建用户组件 -->
<script>
import $ from 'jquery'
import Axios from 'axios'
import config from '@/config'
export default {
  name: 'createUser',
  data () {
    return {
      img: null,
      name: null,
      sex: '1',
      cardId: null,
      birthDay: null,
      facetrackId: null
    }
  },
  props: ['viewWhich', 'toCreateUser'],
  methods: {
    close: function () {
      $('#createUser').css('display', 'none')
    },
    gogo: function (msg) {
      alert(msg)
    },
    returnHistory: function () {
      this.$emit('popState', 'intell')
    },
    changePic: function (e) {
      console.log(e)
      console.log(this.$refs.inputer.files)
    },
    createUser: function () {
      //
      Axios.post(config.HOST + '/wxServer2/admin/createPersonByFacetrack', {
        userkey: config.userkey,
        deviceId: config.deviceId,
        facetrackId: this.facetrackId,
        sex: this.sex,
        img: this.img,
        name: this.name,
        cardId: this.cardId,
        birthDay: this.birthDay
      }).then((res) => {
        console.log(res)
        this.close()
      }, (err) => {
        console.log(err)
      })
    }
  },
  watch: {
    viewWhich: function (val, old) {
      console.log('createUser->viewwhich:' + val)
      if (val === 'createUser') {
        $('#createUser').css('display', 'block')
      } else {
        $('#createUser').css('display', 'none')
      }
    },
    toCreateUser: function (val, old) {
      this.img = val.facetrackImage
      this.facetrackId = val.facetrackId
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
#createUser{
  display: none
}
.popup>div{
  border:1px solid red;
  background-color: pink
}
header>div{
  display: inline-block;
  float: left;
  margin-top: 20px
}
header .addUser{
  padding-left: 10px
}
header .addUser .addMessage{
  margin-bottom: 10px
}
.addMessage.long>input{
  width: 160px;
  height: 30px
}

header .setHead{
  position: relative;
  height: 144px;
  width: 144px;
  background-color: white
}
header .setHead>img{
  width: 100%
}
header .setHead>div{
  width: 100%;
  background-color: rgba(0,0,0,0.7);
  text-align: center;
  color: white;
  position: absolute;
  bottom:0;
}
article{
  clear: both;
  text-align: center;
  letter-spacing: 60px;
  width: 100%;
  position: absolute;
  bottom:40px
}
article>div>button{
  background-color: #2B77D5;
  width: 100px;
  color: white
}
.changePic{
  height: 30px
}
.changePic>span{
  line-height: 30px
}
input[type="file"]{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
