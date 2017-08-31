<template>
  <div class="popup" id="registerUser" :class="{show:isShow}">
   <div>
   <!-- <video src="" id="video1" style="position: absolute;background-color:blue;"></video> -->
   <!-- <img id='nini'  alt=""> -->
    <header>
      <h3><span v-text="title"></span>用户</h3>
      <p v-if="title=='新建'" style="font-size: 12px">新建用户上传的图片，第一张将作为头像，上传图片不得少于4张</p>
      <div class="closeWindow" @click="close">&times;</div>
      <!-- 上传头像 -->
      <div class="setHead" >      
        <div>
          <!-- 显示用户头像，新建用户时显示默认头像 -->
          <div class="changePic">
            <!-- <img :src="personData.headImage" alt="1"> -->
            <div v-if="title==='新建'">
              <img src="../../assets/userHeader.png" alt="" v-if="personData.headImage===''">
              <img :src="'data:image/png;base64,'+personData.headImage" v-else>
            </div>
            <input type="file"  name="" ref="fileUpdateHead" @change="updateHead"  accept="image/png,image/jpg,image/jpeg">
            <img :src="'data:image/png;base64,'+personData.headImage" v-if="title==='编辑'">
          </div>
          <!-- 已选中待上传的图片序列 -->
          <div class="changePic"  v-for="(item,index) in personData.imgs" track-by="index" v-if="title==='新建'">
            <img :src="'data:image/png;base64,' + item" alt=""><!-- {{item}} -->
          </div>
          <!-- 添加图片序列的按钮 -->
          <div class="changePic" v-if="title==='新建'">
            <input type="file" name="" ref="fileInputOne" @change="chooseImg" multiple="multiple" accept="image/png,image/jpg,image/jpeg">
            <!-- <input type="file" name="" ref="fileInputOne" @change="chooseImg" multiple="multiple" :accept="accepyType"> -->
            <img src="../../assets/inputImg.png" alt="">
          </div>
        </div>    
      </div>
      <p style="display:inline-block;width:144px;text-align:center"><span>上传用户头像</span></p><p style="display:inline-block;width:25%;text-align:center"><span v-if="title==='新建'">上传用户照片</span></p>
      
    </header>
    <article>
      <div class="content">
      <!-- 编辑信息 -->
      <div class="addUser">
        <br>
        <Row>
          <Col span="12" class="addMessage long">
              <label>姓名</label>
              <input type="text" name="name" v-model="personData.userName" v-validate="'required|name'">
              <p v-show="errors.has('name')">&nbsp;{{ errors.first('name') }}</p>
          </Col>
          <Col span="12" class="addMessage short">
            <label>性别</label>
            <input type="radio" name="sex" value="0"  v-model="personData.sex" v-validate="'required'">男
            <input type="radio" name="sex" value="1" v-model="personData.sex" v-validate="'required'">女
            <p v-show="errors.has('sex')">&nbsp;{{ errors.first('sex') }}</p>
          </Col>
        </Row> 
        <!-- <br> -->
        <Row>
          <Col span="12" class="addMessage short">
            <label>VIP</label>
            <input type="radio" name="isVip" v-validate="'required'" value="0" v-model="vip" >&nbsp;是
            <input type="radio" name="isVip" v-validate="'required'" value="1" v-model="vip">&nbsp;否
            <p v-show="errors.has('isVip')">&nbsp;{{ errors.first('isVip') }}</p>
          </Col>
          
          <Col span="12" class="addMessage long">
            <label>生日</label>
            <!-- <input type="date" name="" v-model="personData.birthDay"> -->
            <Date-picker name="birthday" v-model="personData.birthDay" class="input" :options="birthdayOPT"></Date-picker>
            <p v-show="errors.has('birthday')">&nbsp;{{ errors.first('birthday') }}</p>
          </Col>
        </Row> 
        <Row> 
          <Col span="12" class="addMessage long" id="cardBox" :class="{processHide: cardHide}">
            <label>卡号</label>
            <input type="text" name="cardId"  v-model="personData.cardId">
            <!-- <p v-show="errors.has('cardId')">&nbsp;{{ errors.first('cardId') }}</p> -->
          </Col>
        </Row> 
        </div>
        <Progress :percent="percent" :class="{processHide: processHide}"></Progress>
        <div class="foot">
          <button class="btn" @click="close">取消</button>
          <button class="btn" @click="checkForm">确定</button>
        </div>
      </div>
    </article>
    <div class="goDelete" v-if="title=='编辑'">
      <span class="btn" @click="godelete">删除用户</span>
    </div>
    <!-- 删除用户弹窗 -->
    <div class="deleteUser">
      <div>
      <div>
        <p>是否删除用户?</p>
        <button class="btn" @click="dontDelete">取消</button>
        <button class="btn" @click="mksureDelete">确认</button>
      </div>   
      </div>
    </div>
    <VueCropper
      :class="{cropShow:cropShow}"
      class="cropBox"
      ref="cropper"
      :img="cropImg.img"
      :info="cropImg.info"
      :canScale="cropImg.canScale"
      :autoCrop="cropImg.autoCrop"
      :autoCropWidth="cropImg.autoCropWidth"
      :autoCropHeight="cropImg.autoCropHeight"
      :fixed="cropImg.fixed"
      :fixedNumber="cropImg.fixedNumber"
    ></VueCropper>
   <!--  <VueCropper
      :class="{cropShow:cropShow}"
      class="cropBox"
      ref="cropper"
      :img="cropImg.img"
      :info="cropImg.info"
      :canScale="cropImg.canScale"
      :autoCrop="cropImg.autoCrop"
      :autoCropWidth="cropImg.autoCropWidth"
      :autoCropHeight="cropImg.autoCropHeight"
      :fixed="cropImg.fixed"
      :fixedNumber="cropImg.fixedNumber"
    ></VueCropper> -->
   </div>
  </div>
</template>
<!-- 新建用户组件 -->
<!-- TODO图片下添加input file -->
<script>
import $ from 'jquery'
import Axios from 'axios'
import config from '../../../static/js/config'
import INTERFACE from '@/interface'
import userHead from '../../assets/userHeader.png'
import VueCropper from 'vue-cropper'
export default {
  name: 'registerUser',
  data () {
    return {
      msg: null,
      percent: 0,
      userHead: userHead,
      itemInfo:null,
      update: true,
      isShow: false,
      cropShow: false,
      accepyType:"video/mp4",
      // cardHide: true,
      processHide: true,
      cropImg: config.cropImg,
      // accepyType:"image/png,image/jpg,image/jpeg",
      accepyType:"video/mp4",
      vip: '0',
      birthdayOPT: config.dayBefore,
      // personData中的数据以及vip等，都是从totalUserList中带过来的
      title: null,
      personData: {
        headImage: '',
        imgs: [],
        userName: null,
        sex: null,
        time: null,
        cardId: '',
        birthDay: null,
        userkey: config.userkey,
        deviceId: config.deviceId,
        personId: '',
        images:[]
      }
    }
  },
  props: ['viewWhich', 'toRegisterUser'],
  components: {VueCropper},
  computed: {
    // 根据person是否具有vip属性，来判断cardId输入框是否显示
    cardHide: function () {
      if(this.vip === '0') {
        return true
      }else if(this.vip ==='1'){
        return false
      }
    }
  },
  methods: {
    close: function () {
      this.$emit('popState', '0')
      this.isShow = false
      this.processHide = true
      this.cardHide = true,
      this.$forceUpdate()
      console.log('register组件显示状态：'+(this.isShow).toString())
    },
    // 更新头像
    updateHead: function () {
      const file = this.$refs.fileUpdateHead.files[0]
       this.msg = this.$Message.info({
          content:'调整好图片后，回车键确认',
          duration: 0,
          closable: true
        })
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.cropShow = true
        this.cropImg.img = e.target.result
        // 禁用上传文件按钮，避免回车继续打开传文件
        $("input[type='file']").attr('disabled',true)
      }
    },
    // 图片序列添加
    chooseImg: function (e) {
      const _this = this
      const files = this.$refs.fileInputOne.files

      // config.readFile(files[0],function(e){
      //   console.log(_this)
      //   _this.personData.imgs = e
      // })
      // return
      this.personData.imgs = this.personData.imgs || []
      // console.log(this.$refs.fileInputOne.files)
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        let isTrue = file.type ==='image/png' || file.type==='image/jpeg' || file.type==='image/jpeg'
        console.log(isTrue)
        if(!isTrue){
            this.msg = this.$Message.error({
            content:'请选择图片上传',
            duration: 5
          })
            return
        }
        this.personData.images.push(file) //上传的图片文件
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          this.personData.imgs.push(e.target.result.split(',')[1])
          this.$forceUpdate()
          console.log(this.personData.imgs)
          console.log(this.personData.images)
        }
      }
    },
    // 去往删除界面
    godelete: function () {
      $('.deleteUser').css('display', 'block')
      $('#registerUser>div>header').addClass('vague')
      $('#registerUser>div>article').addClass('vague')
    },
    // 检查表单
    checkForm: function () {
      // 调用validator验证全部条件
      this.$validator.validateAll().then(result => {
        const isVip = this.vip === '0' 
        console.log(this.personData.cardId === '')
        if (!result) {
          // this.$Message.error('请按照提示完整填写')
          this.$emit('modalMessage','warning','请按照提示完整填写')
          console.log(this.$store)
          this.$emit('popState','registerUser')
        } else if(!isVip &&this.personData.cardId === ''){
          this.$Message.error({content:'非vip卡号不能为空',duration:5})
        } else {
          this.pushFormat()
        }
      })
    },
    pushFormat: function () {
        $("button").attr('disabled',true)
        // 新建用户验证图片数量
        if (this.title === '新建' && this.personData.imgs.length >= 0) {
          if (this.personData.imgs.length < config.minImageCount) {
           // this.$Message.error('照片太少，不能上传')
           this.$emit('modalMessage','warning','图片数量不足4张，请添加后再进行操作')
           console.log(this.$Store)
           this.personData.headImage = ''
           this.personData.imgs = []
           this.update = false
          } else {
            this.update = true
          }
        }
        if (typeof this.personData.imgs === 'undefined') {
          this.personData.imgs = []
        }
        if (this.update === false) return false
        this.processHide = false
        let personData = new FormData()
        // 修改日期格式
        this.personData.birthDay = typeof this.personData.birthDay === 'undefined' ? '' : new Date(this.personData.birthDay).Format('yyyy-MM-dd')
        console.log(this.personData)
        personData.append('personId', this.personData.personId)
        personData.append('headImage', this.personData.headImage)
        personData.append('userName', this.personData.userName)
        personData.append('sex', Number(this.personData.sex))
        personData.append('birthDay', this.personData.birthDay)
        for(let i = 0;i< this.personData.images.length;i++){
          personData.append('images', this.personData.images[i])
        }
        // personData.append('userkey', config.userkey)
        // personData.append('deviceId', config.deviceId)
        personData.append('vip', this.vip)
        if (this.vip === '1') {
          personData.append('cardId', this.personData.cardId)
        }
        console.log(personData.get('images'))
        let _this = this
        if (this.title === '新建') {
          Axios({
            method: 'POST',
            url: INTERFACE.POST_USER_IMAGE,
            data: personData,
            onUploadProgress: function (e) {
              // 这里的this指向xhr对象
              _this.percent = Math.round((e.loaded * 100) / e.total)
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res) =>{
            console.log(res)
            this.processHide = true
            this.percent = 0
            if (res.data.status ===200) {
              this.$Message.success({content:'创建成功',duration: 5})
              this.$emit('popState','update')
              this.close()
              $("button").attr('disabled',false)
              return
            }else{
              // alert(res.data.msg)
              this.$Message.error(res.data.message)
              $("button").attr('disabled',false)
            } 
          }, (err) => {
            console.log(err)
            $("button").attr('disabled',false)
          })
        } else if (this.title === '编辑') {
          Axios({
            method: 'POST',
            url: INTERFACE.PUT_USER,
            data: personData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            onUploadProgress: function (e) {
              // 这里的this指向xhr对象
              _this.percent = Math.round((e.loaded * 100) / e.total)
            }
          }).then((res) => {
            console.log(res)
            this.processHide = true
            this.percent = 0
            if (res.data.status === 200) {
              // this.$emit('popState', '0')
              this.$Message.success(res.data.reference)
              this.$emit('popState','update')
              this.close()
              $("button").attr('disabled',false)
              return
            }
            this.$emit('modalMessage','error',res.data.message)
          }, (err) => {
            console.log(err)
            $("button").attr('disabled',false)
          })
        }
        
      
    },
    // 取消删除操作
    dontDelete: function () {
      $('.deleteUser').css('display', 'none')
      $('#registerUser>div>header').removeClass('vague')
      $('#registerUser>div>article').removeClass('vague')
    },
    // 确认删除
    mksureDelete: function () {
      // alert('push delete,return userManage')
      let dataForm = new FormData()
      dataForm.append('personId', this.personData.personId)
      Axios({
        method: 'POST',
        url: INTERFACE.DELETE_USER,
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
         this.$Message.error(err.data.msg)
      })
    },
    // 确认裁剪图片
    cropTheImg: function(e){
      // 回车确认裁剪图片
      if (e.keyCode === 13 || typeof e.keyCode ==='undefined'){
        this.$refs.cropper.startCrop() 
        this.$refs.cropper.stopCrop()
        this.$refs.cropper.getCropData((data) => {
          // 确定裁剪的图片，输出
          this.personData.headImage = data.split(',')[1]
          //裁剪窗口消失
          this.cropShow = false
          // 提示消息消失
          this.msg()
          $("input[type='file']").attr('disabled',false)
        })
      }
      //
    }
  },
  watch: {
    viewWhich: function (val, old) {
      // console.log(Axios())
      // 新建or编辑
      if (val === 'editUser') {
        this.isShow = true
        this.title = '编辑'
        // console.log(this.toRegisterUser)
      } else if (val === 'addNewUser') {
        this.isShow = true
        this.title = '新建'
      }
    },
    toRegisterUser: {
      handler (val, old) {
        console.log('元数据改变')
        console.log(val)
        // 获取元数据一份,edit的信息深拷贝一份，防止编辑用户信息的时候影响到item的显示
        this.itemInfo = val 
        this.personData = config.deepCopy(this.itemInfo)
        if (this.title === '新建') {
          // 初始化修改用户信息窗口的数据
          this.isShow = true
          this.personData.imgs = []
          this.personData.images = []
          this.vip = '0'
          this.cardHide = true
          console.log('register状态为新建，初始数据如下:')
          console.log(this.personData)
          return
        }
        // 默认不显示进度条
        this.personData.headImage = val.headImage
        this.vip = String(this.personData.vip)
        // console.log(this.personData)
      },
      deep: true
    },
    vip: function (val, old) {
      switch(val) {
        case '1':
          this.cardHide = false

          break;
        case '0':
          this.cardHide = true
          break;
      }
    },
    cropShow: function(val, old) {
      const _this = this
      if(val === true) {
        document.body.addEventListener('keyup',_this.cropTheImg,false)
      }else if (val === false) {
        document.body.removeEventListener('keyup',_this.cropTheImg,false)
      }
    }
  },
  created(){
    var arr1 = {
      user:'1',
      psd: '2'
    }
    var arr2 = config.deepCopy(arr1)
    arr2.psd = 'bibi'
    console.log(arr1)
    console.log(arr2)
  }
}
</script>

<style>
@import '../../assets/style.css'
</style>

<style scoped>
.popup{
  display: none;
}
.cropShow{
  display: block
}
.processHide{
  visibility: hidden;
}
p{
  margin-bottom: 0; 
}
header>div{
  margin-top: 10px;
}
header{
    color: white
  }
h3{
  margin:0;
  font-size: 24px
}
h3>span{
  font-size: 24px
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

header .setHead .changePic{
  width: 144px;
  height: 100%;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  /*border: 1px solid grey;*/
  /*background-color: white;*/
  text-align: center;
  color: white;
  /*float:left;*/
  display: inline-block;
  margin-right: 20px;
  position: relative;
  overflow:hidden; 
}
header .setHead .changePic>div{
  width: 100%;
  height: 100%
}
header .setHead .changePic img{
  /*width: 100%;*/
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  height: 100%;
  /*width: 100%;*/
  /*min-height: 100%;*/
}
article{
  clear: both;
  text-align: center;
  /*letter-spacing: 60px;*/
  width: 100%;
  position: relative;
}
article .addUser{
  padding-left: 10px;
  margin-top:10px
}
article .addUser .addMessage{
  min-height: 50px
}
article .addMessage label{
  width:20%;
}
article .addMessage.long>input,.addMessage.long>.input{
  width: 65%;
  max-width: 160px;
  height: 30px;
  margin-left: 10%;
  display: inline-block;
}
article .addMessage.short>input{
  margin-left:20%
}
article>div .foot{
  letter-spacing: 20px
}
article>div .foot button{
  background-color: #2B77D5;
  letter-spacing: 0;
  max-width: 100px;
  margin: 0;
  width: 40%;
  height: 30px;
  color: white
}
.goDelete{
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
  letter-spacing: 1em;
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
