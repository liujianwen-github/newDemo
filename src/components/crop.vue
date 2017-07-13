<template>
<div>
	<div class="cropBox" @mousedown="mousedown" id='box'  @mouseup="mouseup"></div>
	<p><input type="text" v-model="X" name=""><input type="text" v-model="Y" name=""></p>
</div>
</template>
<script>
export default {
  name: 'crop-plugin',
  data () {
    return {
      data: null,
      X: 0,
      Y: 0
    }
  },
  props: ['cropType', 'cropSize', 'cropImg'],
  methods: {
    mousedown: (event) => {
      console.log('down')
      console.log(event.clientX)
      this.default.data = function () {
        return {
          X: event.clientX,
          Y: event.clientY
        }
      }
      document.getElementById('box').addEventListener('mousemove', this.default.methods.mousemove(event), false)
      console.log(this)
    },
    mousemove: (event) => {
      console.log('move')
      console.log(event.clientX)
      // this.X = event.clientX
      // this.Y = event.clientY
    },
    mouseup: (event) => {
      console.log('leave')
      console.log(event.clientX)
    }
  },
  watch: {
    cropImg: function (val, old) {
      this.data = val
    }
  }
}
</script>
<style scoped>
	.cropBox{
		width: 300px;
		height: 300px;
		background-color: lightblue
	}
</style>
