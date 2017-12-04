<template>
	<Row class="container" >
    <Col span="24" class="logo">
      <img src="../assets/logo.png" alt="">
    </Col>
    <Col span="24" class="content">
      <div class="loginBox" @keyup="keyboardListener">
        <div class="customName">
          <label for="login_user">用户名</label>
          <input id="login_user" type="text" v-model="userInfo.userName" name="">
        </div>
        <div class="password">
          <label for="login_psd">密码</label>
          <input id="login_psd" type="password" v-model="userInfo.password" name="">
        </div>
        <!-- <div class="server_address">
          <label for="login_server">服务器地址</label>
          <Input id="login_server" autocomplete="on" type="text" v-model="serverAddress"  placeholder="例:192.168.1.1:8080/" name="">
             <span slot="prepend">http://</span>
          </Input>
        </div> -->
        <div class="loginBtn">
          <Button type="success" style="width:100%" @click="login">登陆</Button>
        </div>
        <!-- <div class="comment">
          <sub style="color:grey">请确保设备与服务器处于同一网络环境下</sub>
        </div> -->
      </div>
    </Col>
  </Row>
</template>

<script>
import config from '../config.js'
import Axios from 'axios'
	export default{
		data(){
      return{
        // serverAddress:"192.168.1.1:8080"
        userInfo:{
          userName:'',
          password:''
        }
      }
		},
		methods:{
			login(){
        console.log(config);
        console.log(this.$cookie)
        //存cookie,预备下次登录使用
        this.$cookie.set("userInfo",JSON.stringify(this.userInfo))
        this.checkUser((res)=>{
          this.$router.push('index')
        })
        // Axios.defaults.baseURL = `//${this.serverAddress}`
        // config.projectpath = this.serverAddress
			},
      checkUser(callback){
        if(this.userInfo.userName==='test'){
          if(this.userInfo.password==='123'){
            callback()
          }else{
            this.$Message.error('密码错误')
          }
        }else{
          this.$Message.error('账号不存在')
        }
      },
      keyboardListener(e){
        if(e.keyCode===13){
          this.checkUser((res)=>{
            this.$router.push('index')
          })
        }
      }
		},
    created(){
      // let info = this.$cookie.get('userInfo')
      // cookie为空，给定一个默认值
      // this.userInfo = info ===null?"192.168.1.1:8080":info
    }
	}
</script>

<style scoped>
	.container{
  margin-top:100px;
  width: 100%;
  text-align: center;
  font-size: 14px
}
.logo{
  /* background-color: blue; */
  height: 100px
}
.content{
  text-align: center;
}
/*中心输入框内容*/
.loginBox{
  display: inline-block;
}
.loginBox>div{
  margin-top: 10px;
  height: 35px;
}
.loginBox label{
  /*display: inline;*/
  /*line-height: 100%;*/
  text-align: left;
  font-size: 16px;
  /*background-color: lightblue;*/
  width: 50px;
  /*height: 40px;*/
  vertical-align: bottom;
}
.loginBox input{
  width: 200px;
  height: 100%;
  outline: none;
  border: none;
  border-bottom: 2px solid grey
}
.loginBox #login_server{
  width: 200px;
  outline: none;
  border: none;
  /*display: inline-block;*/
  float: right;
}
.loginBox .server_address label{
  line-height: 35px;
  display: inline;
}
</style>