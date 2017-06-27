<template>
	<div>
		<button @click="talkfa">{{bibi}}</button>
	</div>
</template>
<script>
export default {
  name: 'test01',
  data () {
    return {
      bibi: null
    }
  },
  props: ['page'],
  methods: {
    talkfa: function () {
      this.$emit('fromson', 'im son')
    }
  },
  watch: {
    page: function (val, old) {
      this.bibi = val
    }
  },
  mounted () {
    alert('moun')
  }
}
</script>
