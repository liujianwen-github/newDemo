<template>
  <div>
  	<div>father</div>
  	<son @fromson="bibi"></son>
  </div>
</template>
<script>
import son from '@/components/test01'
export default {
  name: 'test',
  components: {son},
  // props: ['fromson'],
  methods: {
    bibi: function (msg) {
      alert(msg)
      var bibi = new Date() + 5
      console.log(bibi)
    },
    stringifyDate: function (date) {
      console.log(date)
    }
  }
}
</script>
