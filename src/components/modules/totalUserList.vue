<template>
  <div class="container">
    <!-- <p @click="getTotal">1</p>    -->
    <div class="itemList">
      <div class="item" v-for="(item,index) in list" @click="addadd">
        <!-- <img v-show="item.matchStatus==0" src="../../assets/stranger.png"  alt="stranger">
        <img v-show="item.matchStatus==1" src="../../assets/user.png"  alt="user"> -->
        <div class="content">
          <img :src="item.headimage" alt="">
          <div class="name" v-html="item.name"></div>
          <div>
            <button class="btn" @click="goEdit(item,index)">编辑</button>
          </div>
        </div>
      </div>
      <registerUser :viewWhich="viewWhich" :toRegisterUser="personData" @popState="changeState" @deleteItem="deleteItem"></registerUser>
    </div>
  </div>
</template>

<script>
import registerUser from '@/components/popups/registerUser'
import config from '@/config'
import Axios from 'axios'
export default {
  name: 'totalUserList',
  data () {
    return {
      list: null,
      viewWhich: '0',
      personData: null,
      getParams: {
        userkey: config.userkey,
        deviceId: 'aaa-a01-001',
        beginTime: 0,
        endTime: new Date().getTime(),
        pageNo: 1
      }
    }
  },
  props: ['toUserList', 'fromFa', 'searchPerson'],
  methods: {
    getAllUser: function () {
      Axios.get(config.HOST + 'apiServer/personManage/getPersonList', {params: this.getParams}).then(
        (res) => {
          console.log(res)
          this.list = res.data.results.list
          console.log(this.list)
        }, (err) => {
        console.log(err)
      })
    },
    addadd: function (argument) {
      console.log('flip next')
      this.getParams.pageNo++
      this.getAllUser()
    },
    goEdit: function (data, index) {
      this.viewWhich = 'editUser'
      this.personData = data
      this.personData.index = index
    },
    changeState: function (msg) {
      // console.log(msg)
      this.viewWhich = msg
      this.$emit('popState', '0')
    },
    deleteItem: function (msg) {
      alert('delete NO' + msg)
      this.list.splice(msg, 1)
    }
  },
  components: {registerUser},
  watch: {
    fromFa: function (val) {
      this.viewWhich = val
      console.log(this.viewWhich)
    },
    searchPerson: function (val, old) {
      console.log(val)
      if (val === '') return
      Axios({
        method: 'get',
        url: config.HOST + '/apiServer/personManage/searchPerson',
        params: {
          userkey: config.userkey,
          deviceId: config.deviceId,
          name: val
        }
      }).then((res) => {
        console.log(res)
        this.list = res.data.results.list
      }, (err) => {
        console.log(err)
      })
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
    border: 1px solid red;
    min-height: 500px;
    background-color: white
  }
  .itemList{
    text-align: left
  }
  .item{
    border: 1px solid blue;
    border-radius: 5%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    width: 180px;
    height: 200px;
    display: inline-block;
    margin:0 20px 5px 20px
  }
  .item>div{
    text-align: center;
  }
  .item>div>img{
    margin-top: 20px;
    margin-bottom: 10px;
    width:120px;
    height: 120px;
    background-color: blue
  }
  .item .name{
    /*position: absolute;
    bottom: 10px;*/
    width: 100%;
    text-align: center;
  }
</style>
