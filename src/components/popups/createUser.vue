<template>
  <div class="popup" id="createUser" :class="{notshow:intellNotShow}">
   <div v-if="viewWhich=='createUser'">
    <header>
      <h3 class="whiteText">新建用户</h3>
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
          <label class="whiteText">姓名</label>
          <input class="input" type="text" name="name" v-model="name" v-validate="'required|name'">
          <span v-show="errors.has('name')">&nbsp;{{ errors.first('name') }}</span>
        </div>
        <div class="addMessage short">
          <label class="whiteText">性别</label>
          <input type="radio" name="sex" value="1" checked="checked" v-model="sex" v-validate="'required'">男
          <input type="radio" name="sex" value="0" v-model="sex" v-validate="'required'">女
          <span v-show="errors.has('sex')">&nbsp;{{ errors.first('sex') }}</span>
        </div>
        <div class="addMessage long">
          <label class="whiteText">生日</label>
          <Date-picker v-model="birthDay" class="input"></Date-picker>
          <!-- <input type="date" name="" v-model="birthDay"> -->
        </div>
        <div class="addMessage short">
          <label class="whiteText">VIP</label>
          <!-- <Date-picker v-model="birthDay" class="input"></Date-picker> -->
          <input type="radio" name="isVip" value='0' v-model="vip">是
          <input type="radio" name="isVip" value='1' v-model="vip">否
        </div>
        <div class="addMessage long" :class="{itemHide:cardHide}">
          <label class="whiteText">卡号</label>
          <input class="input" type="text" name="cardId" v-model="cardId" v-validate="'required|cardId'">
          <span v-show="errors.has('cardId')">&nbsp;{{ errors.first('cardId') }}</span>
        </div>
        
      </div>
    </header>
    <article>
      <div class="content">
        <button class="footBtn btn" @click="returnHistory">取消</button>
        <button class="footBtn btn" @click="checkForm">确定</button>
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
      cardHide: true,
      img: null,
      name: null,
      vip: 0,
      sex: 1,
      cardId: null,
      birthDay: null,
      facetrackId: null,
      update: true
    }
  },
  props: ['viewWhich', 'toCreateUser'],
  methods: {
    // 关闭窗口
    close: function () {
      // $('#createUser').css('display', 'none')
      this.intellNotShow = true
      this.$emit('popState', '0')
    },
    // 初始化加载，清空所有数据
    init: function () {
      this.cardHide = true
      this.name = null
      this.vip = 0
      this.sex = 1
      this.cardId = null
      this.birthday = null
    },
    // 返回到历史记录查询
    returnHistory: function () {
      this.$emit('popState', 'intell')
    },
    // 修改头像
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
    // 检查表单
    checkForm: function (argument) {
      this.$validator.validateAll().then(result => {
        console.log(this.errors)
        if (!result) {
          // this.$Message.error('请按照提示完整填写')
          this.$emit('modalMessage','warning',this.errors.errors[0].msg)
          this.$emit('popState','createUser')
          this.update = false
          console.log(this.update)
          return
        } else {
          this.createUser()
        }
      })
    },
    // 创建用户
    createUser: function () {
      if (this.img.match(/base64/g)) this.img = this.img.split(',')[1]
        // 数据格式化
      let dataList = new FormData()
      // 修改日期格式
      this.birthDay = typeof this.birthDay === 'undefined' ? '' : new Date(this.birthDay).Format('yyyy-MM-dd')
      dataList.append('userkey', config.userkey)
      dataList.append('deviceId', config.deviceId)
      dataList.append('facetrackId', this.facetrackId)
      dataList.append('sex', this.sex)
      dataList.append('imgUrl', this.img)
      dataList.append('name', this.name)
      dataList.append('cardId', this.cardId)
      dataList.append('birthDay', this.birthDay)
      // http操作
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
          // 回调操作
          this.$Message.success('创建成功')
          this.$emit('update')
          this.close()
          return
        }
        // 创建失败操作
        // this.$Message.error(res.data.msg)
        this.$Modal.error({
          title:'创建失败',
          content: res.data.msg
        })
      }, (err) => {
        // 运行失败操作
        console.log(err)
      })
    }
  },
  watch: {
    // 当前窗口
    viewWhich: function (val, old) {
      console.log('createUser->viewWhich:' + val)
      if (val === 'createUser') {
        this.intellNotShow = false
        this.init()
      } else {
        this.intellNotShow = true
      }
    },
    // 传递到创建用户组件的数据
    toCreateUser: function (val, old) {
      this.img = val.facetrackImage
      this.facetrackId = val.facetrackId
      // this.facetrackId = val.facetrackId
      this.intellNotShow = false
    },
    // 根据是否为vip判断cardId是否展示
    vip: function (val, old) {
      switch(val) {
        case '1':
          this.cardHide = false

          break;
        case '0':
          this.cardHide = true
          break;
      }
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
header{
  height: 60%
}
header>div:not(.closeWindow){
  display: inline-block;
  /*float: left;*/
  vertical-align: top;
  margin-top: 20px
}
header .addUser{
  padding-left: 10px;
  width: 60%
}
header .addUser .addMessage{
  margin-bottom: 10px;
}
.addMessage.short>input{
  margin-left:20%
}
.itemHide{
  visibility: hidden;
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
  height: 40px;
  position: absolute;
  bottom:20px;
}
article>div>button{
  background-color: #2B77D5;
  letter-spacing: 1px;
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
.input{
  width: 40;
  /*max-width: 160px;*/
  height: 30px;
  margin-left: 10%;
  display: inline-block;
}
</style>
