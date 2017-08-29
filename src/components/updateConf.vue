<template>
  <div id="config" class="container">
    <Table stripe  :columns="columns" :data="list"></Table>
    <Modal
        v-model="modal1"
        :title="modelContent.configName"
        @on-ok="ok">
        <p>
          <label for="">id</label>
          <input type="text" name="" value ="" v-model="modelContent.id">
        </p>
        <p>
          <label for="">recordUpdatedTime</label>
          <input type="text" name="" value ="" v-model="modelContent.recordUpdatedTime">
        </p>
        <p>
          <label for="">configName</label>
          <input type="text" name="" value ="" v-model="modelContent.configName">
        </p>
        <p>
          <label for="">configValue</label>
          <input type="text" name="" value ="" v-model="modelContent.configValue">
        </p>
<!--         <p>对话框内容</p>
        <p>对话框内容</p> -->
    </Modal>
  </div>
</template>

<script>
// import Store from '../store.js
import Axios from 'axios'
import INTERFACE from '@/interface'
import config from '@/config'
export default {
  name: 'updateConf',
  data(){
    return {
      name: 'config',
      modal1: false,
      modelContent: {
        id: '',
        recordUpdatedTime:'',
        configName: '',
        configValue: ''
      },
      columns:[{
                  title: '序号',
                  type: 'index'
              },
              {
                  title: 'id',
                  key: 'id',
              },
              {
                  title: '更新时间',
                  key: 'recordUpdatedTime'
              },
              {
                  title: '配置项',
                  key: 'configName'
              },{
                  title: '配置值',
                  key: 'configValue'
              },{
                title:'操作',
                render: (h, params) => {
                  const _this = this
                      return h('div', [
                          h('Button', {
                              props: {
                                  type: 'text',
                                  size: 'small'
                              },
                              on: {
                                click: function(){
                                  // _this.$Modal.info({
                                  //     title: '用户信息',
                                  //     content: `姓名：`
                                  // })
                                  // console.log(_this)
                                  // console.log(params)
                                  _this.modal1 = true
                                  _this.modelContent= {
                                    id: params.row.id,
                                    recordUpdatedTime:params.row.recordUpdatedTime,
                                    configName: params.row.configName,
                                    configValue: params.row.configValue
                                  }
                                  // console.log(_this.model1)
                                }
                              }
                          }, '编辑')
                      ]);
                  }
              }],
      list: []
    }
  },
  methods: {
    ok () {
        this.$http({
          methods: 'POST',
          url: INTERFACE.PUT_CONFIG, 
          data: {

          }
        }).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
    },
  },
  watch: {
    modelContent: function(val, old){
      // alert('1')
      console.log(val)
    }
  },
  created(){
    console.log(this)
    console.log(this.$http ===Axios)
    this.$http({
      method: 'GET',
      url: INTERFACE.GET_CONFIG
    }).then((res)=>{
      console.log(res)
      if(res.data.status ===200){
        this.list = res.data.results.configs
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  
}
</script>
<style>
  @import '../assets/style.css'
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  width: 100%
}
label {
  width: 150px
}
input[type="text"]{
  width:300px
}
</style>
