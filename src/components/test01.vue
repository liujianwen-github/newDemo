<template>
	<div>
		<button @click="talkfa">son</button>
	</div>
</template>
<script>
export default {
  name: 'test01',
  methods: {
    talkfa: function () {
      this.$emit('fromson', 'im son')
    }
  }
}
</script>
