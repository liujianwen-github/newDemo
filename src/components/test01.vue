<template>
	<div>
		<button @click="talkfa">{{bibi}}</button>
    <input type="text" v-model="lili" name="" @change="biubiu">
	</div>
</template>
<script>
import http from 'axios'
import conf from '@/axiosCon'
// http.defaults = conf
export default {
  name: 'test01',
  data () {
    return {
      bibi: 'son',
      lili: ' '
    }
  },
  props: ['page'],
  methods: {
    talkfa: function () {
      console.log(conf)
      console.log(http.defaults)
      // this.$emit('fromson', 'im son')
      http.get('apiServer/personManage/getPersonList?userkey=391cb26c_45f3_4817_86f8_644e293cce60&deviceId=aaa-a01-001&beginTime=0&endTime=1499067147460&pageNo=1').then((res) => {
        console.log(http.defaults)
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    },
    biubiu: function (msg) {
      console.log(msg)
      // console.log(this.bibi)
    }
  },
  watch: {
    page: function (val, old) {
      this.bibi = val
    },
    lili: function (val, old) {
      // console.log(val)
    }
  }
}
</script>
