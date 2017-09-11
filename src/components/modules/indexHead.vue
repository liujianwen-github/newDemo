<template>
  <!-- <div class="container"> -->
  <Row class="container" type="flex" justify="center" align="middle">
    <Col :sm="10" :md="10" :lg="10" :xs="16" class="leftHead" onclick="window.location.reload()">
      <!-- <div > -->
        <img src="../../assets/logo.png">
        <span>未来门禁演示系统 1.0</span>
      <!-- </div> -->
    </Col>
    <!-- <div class="userMessage">
    </div> -->
    <Col span="8" class="contentBtnList">
      <!-- <div > -->
        <button class="contentBtn isActive" @click="viewContent('0')">今日到访</button>
        <button class="contentBtn" @click="viewContent('1')">陌生人</button>
        <button class="contentBtn" @click="viewContent('2')">到访用户</button>
        <!-- <router-link to="//model1" exact>1</router-link> -->
      <!-- </div> -->
    </Col>
    <Col  class="smallDevice" :sm="12" :md="12" :lg="12" :xs="8">
      <Dropdown trigger="click"  @on-click="dowhat">
        <a href="javascript:void(0)">
            <Icon type="drag" size="30"></Icon>
        </a>
        <Dropdown-menu slot="list">
            <Dropdown-item class="listItem" name="0" >今日到访</Dropdown-item>
            <Dropdown-item class="listItem" name="1" >陌生人</Dropdown-item>
            <Dropdown-item class="listItem" name="2" >到访用户</Dropdown-item>
            <Dropdown-item class="listItem" name="toUser" >用户管理</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
      <a @click="shutDown">
        <img src="../../assets/shutdown.png" alt="">
      </a>    
    </Col>
    <Col span="6" class="toUser">
      <!-- <div > -->
        <div style="float:right">
          <a @click="shutDown">
            <img src="../../assets/shutdown.png" height="48" width="48" alt="">
          </a>
          <!-- <a href=""></a> -->
        </div>    
        <router-link to="/userManage" exact>
          <div>
            <span class="glyphicon glyphicon-user"></span>
            <p>用户管理</p>
          </div>    
        </router-link>   

      <!-- </div> -->
    </Col>   
  </Row>
  <!-- </div> -->
</template>

<script>
// import Store from '@/Store.js'
import INTERFACE from '@/interface'
import $ from 'jquery'
export default {
  name: 'indexHead',
  // TODO获取用户名
  props: {},
  data () {
    return {
      msg: 'indexHead',
      currentTab: 0
    }
  },
  methods: {
    viewContent: function (arg) {
      // $('.contentBtnList>button').eq(arg)
      this.currentTab = arg
      $('.contentBtnList>button').eq(arg).addClass('isActive')
      $('.contentBtnList>button').eq(arg).siblings().removeClass('isActive')
      // 向index中传递当前选择的类别
      this.$emit('currentContent', arg)
    },
    dowhat: function (msg) {
      if (msg === 'toUser') {
        this.$router.push('/usermanage')
      } else {
        this.viewContent(msg)
      }
    },
    shutDown(){
      console.log(this.$http)
      const _this = this
      if(confirm("确定关机？")){
        this.$http({
          method: 'GET',
          url: INTERFACE.SHUTDOWN
        })
        .then((res)=>{
          if(res.data.status ===200){
            _this.$Message.info({
              content:'操作成功',
              duration: 3
            })
          }else{
            _this.$Message.error({
              content:res.data.reference,
              duration: 0,
              closable: true
            })
          }
        })
        .catch((err)=>{
          _this.$Message.error({
            content:'发生错误，联系管理员！',
            duration: 0,
            closable: true
          })
        })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    /*width: 100%;*/
    height: 40px;
    position: relative;
    padding: 0 15px;
    border:1px solid transparent;
    /*margin: 0 auto*/
    /*text-align: left;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
  }
  .container .leftHead{
    display: inline-block;
    text-align: left;
    /*width: 400px;*/
    height: 35px;
    color: #005BAB;
  }
  .container .leftHead img{
    /*height: 100%;*/
    max-width: 50%;
    /*position: absolute;*/
    /*left: 15px*/
  }
  .container .leftHead span{
    line-height: 35px;
    /*display: inline-block;*/
    /*white-space:nowrap; */
  }
  .container .contentBtnList{
    display: inline-block;
    text-align: left
  }
  .container .contentBtnList button{
    max-width: 100px;
    width: 30%;
    height: 35px;
    border-radius: 2.5em;
    background-color: transparent;
    /*background-color: #005BAB;*/
    /*color: white;*/
    border:1px solid #005BAB;
    color:#005BAB;
    font-size: 14px;
    /*border: 0*/
  }
  .container .toUser div{
    height: 40px;
    float: right;
    display: inline-block;
    text-align: center
  }
  .smallDevice{
    display: none;
    text-align: right
  }
  @media only screen and (max-width: 768px){
    *{
      font-size: 12px
    }
    .smallDevice{
      display: block
    }
    .contentBtnList,.toUser{
      display: none!important
    }
  }
  .userinfo{
    height: 40px;
    width: 100%;
    padding: 0 20px;
    background-color: #ABB6C6;
    color: rgba(255,255,255,0.9)
  }
  .userinfo span{
    line-height: 40px
  }
  .smallDevice a,.toUser>div a{
    display: inline-block;
    width: 35px;
    height: 35px;
    vertical-align: top;
    margin-left: 1em
  }
  .smallDevice a img,.toUser a img{
    width:100%;
    height: 100%
  }



  .isActive{
    color: white!important;
    background-color: #005BAB!important
  }
</style>
