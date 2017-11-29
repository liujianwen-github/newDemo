<template>
	<Row class="container">
    <Col span="24" class="logo">
      <img src="../assets/logo.png" alt="">
    </Col>
    <Col span="24" class="content">
      <div class="loginBox">
        <!-- <div class="customName">
          <label for="login_user">用户名</label>
          <input id="login_user" type="text" v-model="userinfo.customName" name="">
        </div>
        <div class="password">
          <label for="login_psd">密码</label>
          <input id="login_psd" type="password" v-model="userinfo.password" name="">
        </div> -->
        <div class="server_address">
          <label for="login_server">服务器地址</label>
          <Input id="login_server" autocomplete="on" type="text" v-model="serverAddress"  placeholder="例:192.168.1.1:8080/" name="">
             <span slot="prepend">http://</span>
          </Input>
        </div>
        <div class="loginBtn">
          <Button type="success" @click="login">登陆</Button>
        </div>
        <div class="comment">
          <sub style="color:grey">请确保设备与服务器处于同一网络环境下</sub>
        </div>
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
      }
		},
		methods:{
			login(){
        console.log(config);
        console.log(this.$cookie)
        //存cookie,预备下次登录使用
        this.$cookie.set("server_address",this.serverAddress)
        Axios.defaults.baseURL = `//${this.serverAddress}`
        config.projectpath = this.serverAddress
        this.$router.push('/index')

			}
		},
    created(){
      let info = this.$cookie.get('server_address')
      // cookie为空，给定一个默认值
      this.serverAddress = info ===null?"192.168.1.1:8080":info
    }
	}
</script>

<style scoped>
	.container{
  margin-top:100px;
  width: 100%;
  text-align: center;
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
  display: inline-block;
  width: 100px;
  /*height: 40px;*/
  vertical-align: bottom;
}
.loginBox input{
  width: 200px;
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