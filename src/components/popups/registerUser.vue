<template>
  <div class="popup" id="registerUser" :class="{show:isShow}">
   <div>
    <header>
      <h3><span v-text="title"></span>用户</h3>
      <p v-if="title=='新建'">新建用户上传的头像，第一张将作为头像，上传图片不得少于4张</p>
      <div class="closeWindow" @click="close">&times;</div>
      <!-- 上传头像 -->
      <div class="setHead" >      
        <div>
          <div class="changePic"  v-if="title=='编辑'">
            <!-- <img :src="personData.imgUrl" alt="1"> -->
            <img :src="personData.imgUrl" alt="1">
          </div>
          <div class="changePic"  v-for="(item,index) in personData.imgs" track-by="index">
            <!-- <img v-if="title=='新建'" src="../../assets/userHeader.png" alt=""> -->
            <img :src="'data:image/png;base64,'+item" alt="">
          </div>
          <div class="changePic">
            <input type="file" name="" ref="fileInputOne" @change="chooseImg" multiple="multiple" accept="image/png,image/jpg,image/jpeg">
            <img src="../../assets/inputImg.png" alt="">
            <!-- todo 创建一个存储图片数组，数组为零时显示头像图片 -->
          </div>
        </div>    
      </div>
      <p>上传用户头像</p>
      <!-- 编辑信息 -->
      <div class="addUser">
        <div class="addMessage long">
          <label>姓名</label>
          <input type="text" name="" v-model="personData.name">
        </div>
        <div class="addMessage short">
          <label>性别</label>
          <input type="radio" name="sex" value="1"  v-model="personData.sex">男
          <input type="radio" name="sex" value="0" v-model="personData.sex">女
        </div>
        <div class="addMessage long">
          <label>卡号</label>
          <input type="text" name="" v-model="personData.cardId">
        </div>
        <div class="addMessage long">
          <label>生日</label>
          <input type="date" name="" v-model="personData.birthDay">
        </div>
      </div>
    </header>
    <Progress :percent="percent"></Progress>
    <article>
      <div class="content">
        <button class="footBtn btn" @click="close">取消</button>
        <button class="footBtn btn" @click="pushFormat">确定</button>
      </div>
    </article>
    <div class="goDelete">
      <span class="btn" @click="godelete">删除用户</span>
    </div>
    <!-- 删除用户弹窗 -->
    <div class="deleteUser">
      <div>
      <div>
        <p>是否删除用户?</p>
        <button class="btn" @click="dontDelete">取消</button>
        <button class="btn" @click="mksureDelete">确认</button>
        <button class="btn" @click="test">test</button>
      </div>   
      </div>
    </div>
   </div>
  </div>
</template>
<!-- 新建用户组件 -->
<!-- TODO图片下添加input file -->
<script>
import $ from 'jquery'
import Axios from 'axios'
import config from '@/config'
import INTERFACE from '@/interface'
export default {
  name: 'registerUser',
  data () {
    return {
      percent: 0,
      isShow: false,
      title: null,
      personData: {
        imgUrl: null,
        imgs: [],
        name: null,
        sex: 1,
        cardId: null,
        birthDay: null,
        userkey: config.userkey,
        deviceId: config.deviceId,
        personId: null
      }
    }
  },
  props: ['viewWhich', 'toRegisterUser'],
  methods: {
    close: function () {
      this.$emit('popState', '0')
      this.isShow = false
      this.personData = {
        imgUrl: null,
        imgs: [],
        name: null,
        sex: 1,
        cardId: null,
        birthDay: null,
        userkey: config.userkey,
        deviceId: config.deviceId,
        personId: null
      }
      this.$forceUpdate()
    },
    test: function () {
      Axios.post('11').then((res) => {
        console.log(res)
      })
    },
    chooseImg: function (e) {
      this.personData.imgs = this.personData.imgs || []
      // console.log(this.$refs.fileInputOne.files)
      const files = this.$refs.fileInputOne.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          // console.log(e.target.result.split(';')[1])
          // this.$set(0, e.target.result)
          this.personData.imgs.push(e.target.result.split(',')[1])
          if (i === 0 && this.title === '新建') {
            this.personData.imgUrl = e.target.result.split(',')[1]
            // 新建用户的情况下，imgs序列中选择第一张图片作为头像
          }
          console.log(this.personData.imgs)
          this.$forceUpdate()
        }
      }
      console.log(this.personData)
    },
    godelete: function () {
      $('.deleteUser').css('display', 'block')
      $('#registerUser>div>header').addClass('vague')
      $('#registerUser>div>article').addClass('vague')
    },
    pushFormat: function () {
      console.log(Axios.defaults)
      console.log(this.title)
      console.log(this.personData)
      if (this.title === '新建' && this.personData.imgs.length > 0) {
        if (this.personData.imgs.length < config.minImageCount) {
          alert('照片太少，不能上传')
          return
        }
        this.personData.imgs.shift()
      }
      console.log(this.personData.imgs)
      if (typeof this.personData.imgs === 'undefined') {
        this.personData.imgs = []
      }
      let personData = new FormData()
      personData.append('personId', this.personData.personId)
      personData.append('imgUrl', this.personData.imgUrl)
      personData.append('imgs', this.personData.imgs)
      personData.append('name', this.personData.name)
      personData.append('sex', this.personData.sex)
      personData.append('cardId', this.personData.cardId)
      personData.append('birthDay', this.personData.birthDay)
      personData.append('userkey', config.userkey)
      personData.append('deviceId', config.deviceId)
      let _this = this
      console.log(personData)
      if (this.title === '新建') {
        Axios({
          method: 'POST',
          url: INTERFACE.USER_ADDNEW,
          data: personData,
          onUploadProgress: function (e) {
            // 这里的this指向xhr对象
            _this.percent = Math.round((e.loaded * 100) / e.total)
          }
        }).then((res) => {
          if (res.data.msg === 'SUCC') {
            // 1
            this.$Message.success('创建成功')
            this.close()
          }
          this.$Message.error(res.data.msg)
          this.percent = 0
        }, (err) => {
          this.$Message.error(err.data.msg)
        })
      } else if (this.title === '编辑') {
        Axios({
          method: 'POST',
          url: INTERFACE.USER_EDIT,
          data: personData
        }).then((res) => {
          console.log(res)
          if (res.data.msg === 'SUCC') {
            // this.$emit('popState', '0')
            this.$Message.success('编辑成功')
            this.close()
          }
          this.$Message.error(res.data.msg)
          this.percent = 0
        }, (err) => {
          this.$Message.error(err.data.msg)
        })
      }
    },
    dontDelete: function () {
      $('.deleteUser').css('display', 'none')
      $('#registerUser>div>header').removeClass('vague')
      $('#registerUser>div>article').removeClass('vague')
    },
    mksureDelete: function () {
      // alert('push delete,return userManage')
      let dataForm = new FormData()
      dataForm.append('userkey', config.userkey)
      dataForm.append('deviceId', config.deviceId)
      dataForm.append('personId', this.personData.personId)
      Axios({
        method: 'POST',
        url: INTERFACE.USER_DELETE,
        data: dataForm,
        headers: {
          'Content-Type': ' application/x-www-form-urlencoded'
        }
      }).then((res) => {
        console.log(res)
        $('.deleteUser').css('display', 'none')
        $('#registerUser>div>header').removeClass('vague')
        $('#registerUser>div>article').removeClass('vague')
        this.$emit('deleteItem', this.personData.index)
        this.close()
      }, (err) => {
        alert(err)
      })
    }
  },
  watch: {
    viewWhich: function (val, old) {
      if (val === 'editUser') {
        this.isShow = true
        this.title = '编辑'
      } else if (val === 'addNewUser') {
        this.isShow = true
        this.title = '新建'
      }
    },
    toRegisterUser: {
      handler (val, old) {
        this.personData = val
        console.log(val)
        this.personData.imgUrl = val.headimage
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
.popup>div{
  border:1px solid red;
}
header>div{
  margin-top: 10px
}
h3{
  margin:0;
  font-size: 24px
}
h3>span{
  font-size: 24px
}
header .addUser{
  padding-left: 10px;
  margin-top:10px
}
header .addUser .addMessage{
  margin:0 0 10px 0;
  width: 100%;
  max-width: 300px;
 /* display: flex;
  justify-content: left;*/
}
.addMessage label{
  width:20%;
}
.addMessage.long>input{
  /*background-color: red;*/
  width: 65%;
  max-width: 160px;
  height: 30px;
  margin-left: 10%
}
.addMessage.short>input{
  margin-left:20%
}
header .setHead{
  position: relative;
  height: 150px;
  width: 100%;
}
header .setHead>div{
  /*width: 200%;*/
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space:nowrap;
}
.goLong{
  width: 150%!important
}
/*header .setHead>p{
  position: absolute;
  bottom:-20px;
  left: 0
}*/
header .setHead img{
  /*width: 100%;*/
}
header .setHead .changePic{
  width: 144px;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid grey;
  background-color: rgba(255,255,255,0.5);
  text-align: center;
  color: white;
  /*float:left;*/
  display: inline-block;
  margin-right: 20px;
  position: relative;
  overflow:hidden; 
}
header .setHead .changePic img{
  /*width: 100%;*/
  box-sizing: border-box;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
}
article{
  clear: both;
  text-align: center;
  letter-spacing: 60px;
  width: 100%;
  position: relative;
}
article>div{
  display: flex;
  justify-content: space-around;
}
article>div>button{
  background-color: #2B77D5;
  max-width: 100px;
  margin: 0;
  width: 40%;
  color: white
}
.goDelete{
  /*position: absolute;*/
  /*right: 0;*/
  /*bottom: 0*/
  text-align: right
}

/*确认删除弹窗*/
.deleteUser{
  width: 100%;
  height: 100%;
  /*background-color: red;*/
  position: absolute;
  left: 0;
  top: 0;
  display: none
}
.deleteUser>div{
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%
}
.deleteUser>div>div{
  /*width: 100%;
  height: 100%;*/
  position: relative;
  left: -50%;
  top: -40%;
  background-color: white;
  /*box-sizing: content-box;*/
  /*background-color: red;*/
  /*border:1px solid red;*/
  letter-spacing: 50px;
  /*display: table-cell;*/
  text-align: center;
  padding:60px 60px;
}
.deleteUser>div>div p{
  letter-spacing: 1px
}
input[type="file"]{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /*background-color: red;*/
  opacity: 0
}
</style>
