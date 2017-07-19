<template>
<div>
  <img src="../assets/logo.png" height="240" width="240" alt="" style="position:absolute">
	<div class="cropBox" @mousedown="mousedown" id='box' @mouseup="mouseup"  :style="{marginLeft:X + 'px',marginTop:Y +'px'}"></div>
	<p style="position:fixed"><input type="text" v-model="X" name=""><input type="text" v-model="Y" name=""></p>
</div>
</template>
<script>
export default {
  name: 'crop-plugin',
  data () {
    return {
      data: null,
      startX:null,
      startY:null,
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
    mousedown: function (e){
      console.log(this.X)
      this.startX=e.pageX
      this.startY=e.pageY
      console.log('起始坐标x=' + this.startX)
      console.log('起始坐标y=' + this.startY)
      document.getElementById('box').addEventListener('mousemove',this.mousemove,false)
    },
    mousemove: function (e) {
      this.X = e.pageX - 150
      this.Y = e.pageY - 150
      console.log(this.X + ',' + this.Y)
    },
    mouseup:function (e) {
       document.getElementById('box').removeEventListener('mousemove',this.mousemove)
       console.log(this.X)
    }
  },
  watch: {
    cropImg: function (val, old) {
    	console.log(this)
      this.data = val
    }
  }
}
</script>
<style scoped>
	.cropBox{
		width: 300px;
		height: 300px;
		background-color: lightblue;
    position: absolute;
	}
</style>
