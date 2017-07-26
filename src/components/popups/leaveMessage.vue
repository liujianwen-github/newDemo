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
        <div class="headInfo" :class="{notShow:messageForm.timeLine === 'long'}">
        <!-- 开始时间结束时间限制条件一样 -->
          <span class="whiteText">开始时间：</span><Date-picker type="datetime" class="date" :clearable="false" :options="endTimeOPT" v-model="messageForm.startTime" format="yyyy-MM-dd HH:mm"></Date-picker>
        </div>
        <div class="headInfo" :class="{notShow:messageForm.timeLine === 'long'}">
          <span class="whiteText">结束时间：</span><Date-picker type="datetime" class="date" :clearable="false" :options="endTimeOPT" v-model="messageForm.endTime" format="yyyy-MM-dd HH:mm"></Date-picker>
        </div>
      </div>
    </header>
    <article>
      <div class="msgBox">
        <p class="message">留言会在设定时间段内识别时出现</p>
        <textarea autofocus placeholder="请输入留言内容" name="leaveMessage"  v-model="messageForm.message" v-validate="'required|leaveMessage'"></textarea>
        <p v-show="errors.has('leaveMessage')" style="margin:0">&nbsp;{{ errors.first('leaveMessage') }}</p>
      </div>
      <div class="foot">
        <button class="btn" @click="returnUserInfo">取消</button>
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
import INTERFACE from '@/interface'
export default {
  name: 'history',
  data () {
    return {
      msg:null,
      isShow: false,
      update: true,
      endTimeOPT: {
        disabledDate(date) {
          return date <  Date.now()
        }
      },
      beginTimeOPT: {
        disabledDate(date) {
          return date < Date.now()
        }
      },
      messageForm: {
        timeLine: 'short',
        startTime: new Date().Format('yyyy-MM-dd hh:mm'),
        endTime: new Date().Format('yyyy-MM-dd hh:mm').addDay(2),
        message: ' '
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
      this.messageForm = {
        timeLine: 'short',
        startTime: new Date().Format('yyyy-MM-dd hh:mm'),
        endTime: new Date().Format('yyyy-MM-dd hh:mm').addDay(2),
        message: ' '
      }
      this.$emit('popState', '0')
    },
    returnUserInfo: function () {
      this.close()
      this.$emit('popState', 'userInfos')
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
      this.$validator.validateAll().then(result => {
        console.log(result)
        if (!result) {
          this.$Message.error('请按照提示完整填写')
          console.log(this)
          this.update = false
        } else {
          this.update = true
        }
      }).then((data)=>{
        console.log(typeof this.messageForm.startTime)
        if(this.messageForm.timeLine ==='short') {
          if (this.messageForm.startTime === "" ||this.messageForm.endTime === "" ) {
            this.msg = this.$Message.error({content: '短期留言时间区间不能为空',duration: 5})
            this.update = false
          } else {
            this.update = true
          }
        }
        if (this.update === false) return false
        let messageList = new FormData()
        config.changeDateType(this.messageForm.startTime)
        messageList.append('userkey', config.userkey)
        messageList.append('deviceId', config.deviceId)
        messageList.append('personId', this.personData.personId)
        // TODO 长期留言时间
        if(this.messageForm.timeLine ==='short') {
          messageList.append('msgBeginTime', config.changeDateType(this.messageForm.startTime))
          messageList.append('msgEndTime', config.changeDateType(this.messageForm.endTime))
        } 
        messageList.append('message', this.messageForm.message)
        console.log(messageList)
        Axios({
          url: INTERFACE.USER_EDIT,
          method: 'POST',
          data: messageList,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.code === res.data.succ_code) {
            // msg内容消失
            // this.msg()
            console.log(this.msg)
            if (this.msg === null) alert('empty')
            this.$Message.info({content:'留言成功'})
            this.close()
            return
          }
           this.$Message.error({content:'预料之外的错误！！'})
           this.close()
        }, (err) => {
          console.log(err)
        })
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
      } else {
        this.isShow = false
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
        this
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
.notShow{
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
article .msgBox{
  min-height: 240px
}
.foot{
  letter-spacing: 20px
}
.foot>button{
  letter-spacing: 0
}
</style>
