<template>
  <div>
  	<div>father</div>
  	<son @fromson="bibi" :page="mimi"></son>
    <div @click="mimi">111</div>
    <!-- <input type="text" v-model="lili" name=""> -->
  </div>
</template>
<script>
import son from '@/components/test01'
export default {
  name: 'test',
  dara () {
    return {
      mimi: 'data',
      bibi: [1, 2, 3, 4, 4, 5, 6, 7],
      lili: null
    }
  },
  components: {son},
  // props: ['fromson'],
  methods: {
    bibi: function (msg) {
      // var ne = this.bibi
      // ne.shift()
      // console.log(this.bibi)
      alert(msg)
      var bibi = new Date() + 5
      console.log(bibi)
    },
    mimi: function () {
      // alert('mimi')
      this.mimi = 'change'
      alert(this.mimi)
    },
    stringifyDate: function (date) {
      console.log(date)
    }
  },
  watch: {
    lili: function (val, old) {
      console.log(val)
    }
  }
}
</script>
