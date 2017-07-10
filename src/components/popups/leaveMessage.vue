<template>
  <div class="popup" id="leaveMessage" :class="{show:isShow}">
   <div v-if="viewWhich=='leaveMessage'">
    <header>
      <div class="closeWindow" @click="close">&times;</div>
      <div class="setHead">
        <img :src="personData.headimage" alt="">
      </div>
      <div class="addUser">
        <p class="headInfo">
          <span v-text="personData.name" class="whiteText"></span>
        </p>
        <p class="headInfo whiteText">留言设置</p>
        <div class="headInfo">
          <div>
            <input type="radio" name="timeLine" value="short" v-model="messageForm.timeLine"><span class="whiteText">短期留言</span>
          </div>
          <div>
            <input type="radio" name="timeLine" value="long" v-model="messageForm.timeLine"><span class="whiteText">长期留言</span>
          </div>
        </div>
        <div class="headInfo">
          <span class="whiteText">开始时间：</span><Date-picker class="date" v-model="messageForm.startTime"></Date-picker>
        </div>
        <div class="headInfo">
          <span class="whiteText">结束时间：</span><Date-picker class="date" v-model="messageForm.endTime"></Date-picker>
        </div>
      </div>
    </header>
    <article>
      <p class="message">留言会在设定时间段内识别时出现</p>
      <textarea autofocus placeholder="请输入留言内容" v-model="messageForm.message"></textarea>
      <div class="foot">
        <button class="btn" @click="close">取消</button>
        <button class="btn" @click="setMessage">确定</button>
      </div>
    </article>
   </div>
  </div>
</template>
<!-- 查看用户信息组件 -->
<script>
// import $ from 'jquery'
import config from '@/config'
import Axios from 'axios'
export default {
  name: 'history',
  data () {
    return {
      isShow: false,
      messageForm: {
        timeLine: 'short',
        startTime: new Date().getFullYear() + '-' + config.addDate((Number(new Date().getMonth()) + 1)) + '-' +
                   config.addDate(new Date().getDate()),
        // startTime: null,
        endTime: null,
        message: null
      },
      personData: {
        image: null,
        name: null,
        personId: null
      }
    }
  },
  props: ['viewWhich', 'toMessage'],
  methods: {
    close: function () {
      // $('#leaveMessage').css('display', 'none')
      this.isShow = false
      this.$emit('popState', '0')
    },
    viewGif: function () {
      alert('viewgif')
    },
    viewScene: function () {
      alert('viewScene')
    },
    searchHistory: function () {
      this.$emit('popState', 'history')
    },
    setMessage: function () {
      // alert(typeof new Date().getDate())
      // console.log(this.messageForm.startTime)
      // console.log(config.addDate((Number(new Date().getMonth()) + 1)) + '-')
      // let data = {
      //   userkey: config.userkey,
      //   deviceId: config.deviceId,
      //   msgBeginTime: this.messageForm.msgBeginTime,
      //   msgEndTime: this.messageForm.msgEndTime,
      //   message: this.messageForm.message
      // }
      //
      let messageList = new FormData()
      config.changeDateType(this.messageForm.startTime)
      messageList.append('userkey', config.userkey)
      messageList.append('deviceId', config.deviceId)
      messageList.append('personId', this.personData.personId)
      // alert(this.messageForm.startTime)
      messageList.append('msgBeginTime', config.changeDateType(this.messageForm.startTime))
      messageList.append('msgEndTime', config.changeDateType(this.messageForm.endTime))
      messageList.append('message', this.messageForm.message)
      console.log(messageList)
      Axios({
        url: config.HOST + 'apiServer/personManage/uploadPersonInfo',
        method: 'POST',
        data: messageList,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        // alert(res.data.msg)
        this.$emit('popState', '0')
      }, (err) => {
        console.log(err)
      })
    },
    stringifyDate: function (date) {
      console.log(date)
    }
  },
  watch: {
    viewWhich: function (val, old) {
      if (val === 'leaveMessage') {
        this.isShow = true
      }
    },
    messageForm: {
      handler (val, old) {
        // console.log(val)
      },
      deep: true
    },
    toMessage: {
      handler (val, old) {
        this.personData = val
        console.log(this.personData)
      },
      deep: true
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
.popup header{
  width: 100%;
  height: 200px;
  padding: 20px;
}
.popup>div{
  background-color: #F6F7FB
}
.popup header>div{
  float:left;
  height: 160px;
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
.popup header .addUser .headInfo{
  margin-bottom: 5px
}
.popup header .addUser .headInfo>div{
  display: inline-block;
}
.popup header .addUser .headInfo .date{
  width: 160px;
  height: 30px
}
.message{
  color: rgb(100,100,100)
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
article{
  text-align: center;
}
textarea{
  width: 80%;
  height: 180px;
  resize: none
}
.foot{
  letter-spacing: 20px
}
.foot>button{
  letter-spacing: 0
}



</style>
