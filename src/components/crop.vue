<template>
<div>
	<div class="cropBox" @mousedown="mousedown" id='box'  @mouseup.prevent="mouseup"></div>
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
      Y: 0,
    }
  },
  props: ['cropType', 'cropSize', 'cropImg'],
  directives: {
  	drag: function () {
  	  console.log(this)
  	}
  },
  methods: {
  	set: (el, bind) => {
  		
  	},
    mousedown: (event) => {
      console.log(this.X)
      console.log('down')
      console.log(event.clientX)
      // let data = this.default.data()
      console.log(this.default.data)
      this.default.data = () => {
      	return {
      	  data: null,
          X: event.clientX,
          Y: event.clientX,
      	}
      }
      // console.log(data)
      // this.default.data.set('X',event.clientX)
      document.getElementById('box').addEventListener('mousemove', this.default.methods.mousemove(event), false)  
    },
    mousemove: (event) => {
      console.log(event.srcElement)
      const el = event.srcElement
      el.style.marginLeft = event.clientX
      el.style.marginTop = event.clientY
      console.log(event.clientX)
      // this.X = event.clientX
      // this.Y = event.clientY
    },
    mouseup: (event) => {
      console.log('leave')
      console.log(this.default.data())
      console.log(event.clientX)
    }
  },
  watch: {
    cropImg: function (val, old) {
    	console.log(this)
      this.data = val
    },
    X: function (val, old) {
    	alert(val)
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
