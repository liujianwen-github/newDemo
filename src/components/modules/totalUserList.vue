<template>
  <div class="container" id="userManage">
    <!-- <p @click="getTotal">1</p>    -->
    <empty :toempty="emptyPage" :class="{show:emptyPage.isShow}"></empty>
    <div class="itemList">
      <div class="item" :class="{vague:itemVague}" v-for="(item,index) in list">
        <!-- <img v-show="item.matchStatus==0" src="../../assets/stranger.png"  alt="stranger">
        <img v-show="item.matchStatus==1" src="../../assets/user.png"  alt="user"> -->
        <div class="content">
          <div class="imgbox">
            <img :src="'data:image/png;base64,' +item.headImage" alt="">
          </div>
          <div class="name" v-html="item.userName"></div>
          <div class="foot">
            <button class="btn" @click="goEdit(item,index)">编辑</button>
          </div>
        </div>
      </div>
      <registerUser :viewWhich="viewWhich" :toRegisterUser="personData" @popState="changeState" @modalMessage="modalMessage" @deleteItem="deleteItem"></registerUser>
    </div>
    <Page :total="pageInfo.totalRecord" :current="pageInfo.pageNo" :page-size="pageInfo.limit" @on-change="changePage" show-total></Page>
  </div>
</template>

<script>
import registerUser from '@/components/popups/registerUser'
import config from '@/config'
import Axios from 'axios'
import INTERFACE from '@/interface'
import empty from '@/components/popups/empty'
export default {
  // 注册用户总列表
  name: 'totalUserList',
  data () {
    return {
      list: null,
      viewWhich: '0',
      personData: {
        headImage: '',
        imgs: [],
        userName: null,
        sex: 1,
        time: null,
        cardId: '',
        birthDay: null,
        userkey: config.userkey,
        deviceId: config.deviceId,
        personId: '',
        images:[]
      },
      pageInfo: {
        totalRecord: 0,
        pageNo: 1,
        limit: 20,
      },
      emptyPage: {
        size: 'large',
        isShow: true
      },
      getParams: {
        userkey: config.userkey,
        deviceId: config.deviceId,
        beginTime: 0,
        endTime: new Date().getTime(),
        pageNo: 1
      }
    }
  },
  props: ['toUserList', 'fromFa', 'searchPerson'],
  computed: {
    itemVague: function(){
      console.log(this.viewWhich ==='0')
      return this.viewWhich === '0'?false : true
    }
  },
  methods: {
    /**
     * @Author    liujianwen
     * @DateTime  2017-07-24
     * @copyright [提示信息的弹窗]
     * @param     {[String]}      type    [提示信息类型]
     * @param     {[String]}      content [提示信息内容]
     * @return    void
     */
    modalMessage: function (type, content) {
      const title = type
      switch (type) {
          case 'info':
              this.$Modal.info({
                  title: title,
                  content: content
              });
              break;
          case 'success':
              this.$Modal.success({
                  title: title,
                  content: content
              });
              break;
          case 'warning':
              this.$Modal.warning({
                  title: title,
                  content: content
              });
              break;
          case 'error':
              this.$Modal.error({
                  title: title,
                  content: content
              });
              break;
      }
    },
    /**
     * @Author    liujianwen
     * @DateTime  2017-07-24
     * @copyright [get all register user]
     * @return    void
     */
    getAllUser: function () {
      Axios.get(INTERFACE.GET_ALL_REGISTERUSER, {params: this.getParams}).then(
        (res) => {
          console.log(res)
          if (res.data.message != '成功！') return
          this.list = res.data.results.batchVo.list
          this.pageInfo.pageNo = res.data.results.pageNo
          this.pageInfo.totalRecord = res.data.results.totalNum
          console.log(this.list)
        }, (err) => {
        console.log(err)
      })
    },
    /**
     * @Author    liujianwen
     * @DateTime  2017-07-24
     * @copyright [跳转到编辑弹窗]
     * @param     {[object]}      data  [需要编辑的信息]
     * @param     {[Number]}      index [item在list中的排序号]
     * @return    void
     */
    goEdit: function (data, index) {
      this.viewWhich = 'editUser'
      this.personData = config.deepCopy(data)
      this.personData.index = index
      this.personData.time = new Date().getTime()
      console.log(this.personData)
    },
    // 修改状态
    changeState: function (msg) {
      // console.log(msg)   
      if (msg === 'update') {
        // 更新数据
        this.getAllUser()
      }else {
        this.viewWhich = msg
        console.log(msg)
      }
      this.$emit('popState', '0')
    },
    deleteItem: function (msg) {
      // alert('delete NO' + msg)
      this.list.splice(msg, 1)
    },
    changePage: function (msg) {
      this.getParams.pageNo = msg
      this.getAllUser()
    }
  },
  components: {registerUser, empty},
  watch: {
    fromFa: function (val) {
      this.viewWhich = val
    },
    searchPerson: function (val, old) {
      console.log(val)
      if (val === '') {
        this.getAllUser()
        return
      }
      Axios({
        method: 'get',
        url: INTERFACE.USER_SEARCH,
        params: {
          userkey: config.userkey,
          deviceId: config.deviceId,
          name: val
        }
      }).then((res) => {
        console.log(res)
        if (res.data.results.list.length < 1) {
          alert('查询结果为空')
          this.emptyPage.isShow = true
          // return
        }
        this.emptyPage.isShow = false
        this.list = res.data.results.list
        this.pageInfo = res.data.results.pageInfo
      }, (err) => {
        console.log(err)
      })
    },
    viewWhich: function (val, old) {
      if (val === 'addNewUser') {
        this.personData.headImage = ''
        this.personData.userName = ''
        this.personData.cardId = ''
        this.personData.birthDay = null
        this.personData.time = new Date().getTime()
        this.personData.imgs = []
        this.personData.images = []
        this.title = '新建'
      } else if (val === 'editUser') {
        console.log(this.personData)
      }
    },
    list: function (val, old) {
      if (val != null) {
        this.emptyPage.isShow = false
      }
    }
  },
  created () {
    this.getAllUser()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    box-sizing: border-box;
    /*border: 1px solid #005BAB;*/
    border-radius: 5px;
    padding: 10px 15px;
    min-height: 500px;
    background-color: white;
    margin-top: 2px;
    position: relative;
  }
  .show{
    display: block
  }
  .itemList{
    text-align: left
  }
  .item{
    border: 1px solid lightgrey;
    background-color: #f1f1f1;
    border-radius: 5%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    width: 23%;
    margin: 5px 1%;
    /*height: 200px;*/
    display: inline-block;
    /*margin:0 20px 5px 20px*/
  }
  .item>div{
    text-align: center;
    padding:1em;
  }
  .item>div>div:first-child{
    /*background-color: red*/
    height: 140px;
    overflow: hidden;
  }
  .item .imgbox{
    /*margin-top: 20px;*/
    display: inline-block;
    text-align: center;
    margin-bottom: 10px;
    width: 140px;
    height:140px;
    background-color: blue
  }
  .item .imgbox img{
    width: 100%;
    height:100%;
  }
  .item .name{
    /*position: absolute;
    bottom: 10px;*/
    width: 100%;
    text-align: center;
  }
  .item .btn{
    background-color: #005BAB;
    color: white;
    margin-bottom: 5px
    /*border: 1px solid #005BAB;*/
  }
  .item .content>div{
    min-height: 21px
  }
  .content .foot{
    width: 100%;
    position: relative;
    height: 30px;
  }
  .content .foot button{
    width: 50%;
    /*max-width: 100px;*/
    /*width: 100px;*/
    height: 30px;
    letter-spacing: 5px;
    text-align: center;
  }
  @media only screen and (min-width: 768px) and (max-width: 1200px) {
    .item{
      width: 31%;
    }
  }
  @media only screen and (max-width: 768px){
    .item{
      width: 31%;
    }
    .item>div>div:first-child{
      /*background-color: red*/
      /*height: 14vw;*/
    }
  }

</style>
