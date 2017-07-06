<template>
  <div class="popup" id="createUser" :class="{notshow:intellNotShow}">
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
// import $ from 'jquery'
import Axios from 'axios'
import config from '@/config'
import INTERFACE from '@/interface'
// import QsConfig from '@/axiosCon'
export default {
  name: 'createUser',
  data () {
    return {
      intellNotShow: true,
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
      // $('#createUser').css('display', 'none')
      this.intellNotShow = true
      this.$emit('popState', '0')
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
      const file = this.$refs.inputer.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        // console.log(e.target.result)
        this.img = e.target.result
      }
    },
    createUser: function () {
      //
      // let data = {
      //   userkey: config.userkey,
      //   deviceId: config.deviceId,
      //   facetrackId: this.facetrackId,
      //   sex: this.sex,
      //   imgUrl: this.img,
      //   name: this.name,
      //   cardId: this.cardId,
      //   birthDay: this.birthDay
      // }
      if (this.img.match(/base64/g)) this.img = this.img.split(',')[1]
      let dataList = new FormData()
      dataList.append('userkey', config.userkey)
      dataList.append('deviceId', config.deviceId)
      dataList.append('facetrackId', this.facetrackId)
      dataList.append('sex', this.sex)
      dataList.append('imgUrl', this.img)
      dataList.append('name', this.name)
      dataList.append('cardId', this.cardId)
      dataList.append('birthDay', this.birthDay)
      // console.log(data)
      Axios({
        method: 'POST',
        url: INTERFACE.STRANGER_CREATEUSER,
        data: dataList,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          // 'Content-Type': 'text/plain'
        }
      }).then((res) => {
        console.log()
        if (res.data.msg === 'SUCC') {
          this.$Message.success('创建成功')
          this.close()
          return
        }
        this.$Message.error(res.data.msg)
      }, (err) => {
        console.log(err)
      })
    }
  },
  watch: {
    viewWhich: function (val, old) {
      console.log('createUser->viewWhich:' + val)
      if (val === 'createUser') {
        this.intellNotShow = false
      } else {
        this.intellNotShow = true
      }
    },
    toCreateUser: function (val, old) {
      this.img = val.facetrackImage
      this.facetrackId = val.facetrackId
      // this.facetrackId = val.facetrackId
      this.intellNotShow = false
    }
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
#createUser{
  /*display: none*/
}
.notshow{
  display: none;
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
