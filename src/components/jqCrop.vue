<template>
<div class="cropBox">
  <div @mousedown="mousedown" id='box' @mouseup="mouseup"  :style="{marginLeft:X + 'px',marginTop:Y +'px'}">
    <canvas id="cvs"></canvas>
    <img :src="img" id="image1" @click="stop" alt="">{{bibi}}
  </div>
  
  <button @click="sure">crop</button>
</div>
</template>
<script>
import $ from 'jquery'
// import cropper from '@/lib/cropper.js'
import html2canvas from 'html2canvas'
export default {
  name: 'jqCrop',
  data () {
    return {
      data: null,
      startX:null,
      startY:null,
      X: 0,
      Y: 0,
    }
  },
  props: ['img', 'bibi'],
  methods: {
    sure: function () {
      // console.log(html2canvas)
      // let box = document.getElementById('box')
      // html2canvas(box, {
      //   onrendered: function (canvas) {
      //      var url = canvas.toDataURL();
      //       //以下代码为下载此图片功能
      //       let img = new Image()
      //       img.src = url
      //       document.body.append(img)
      //    }
      // })
    },
    stop: function (event) {
      event.stopPropagation();
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
      // console.log(this.X + ',' + this.Y)
    },
    mouseup:function (e) {
       document.getElementById('box').removeEventListener('mousemove',this.mousemove)
       console.log(this.X)
    }
  },
  created () {
    console.log($)
      // $('#image').cropper({
      //     ready: function (e) {
      //       var $clone = $(this).clone().removeClass('cropper-hidden');

      //       $clone.css({
      //         display: 'block',
      //         width: '100%',
      //         minWidth: 0,
      //         minHeight: 0,
      //         maxWidth: 'none',
      //         maxHeight: 'none'
      //       });

      //       $previews.css({
      //         width: '100%',
      //         overflow: 'hidden'
      //       }).html($clone);
      //     },

      //     crop: function (e) {
      //       var imageData = $(this).cropper('getImageData');
      //       var previewAspectRatio = e.width / e.height;

      //       $previews.each(function () {
      //         var $preview = $(this);
      //         var previewWidth = $preview.width();
      //         var previewHeight = previewWidth / previewAspectRatio;
      //         var imageScaledRatio = e.width / previewWidth;

      //         $preview.height(previewHeight).find('img').css({
      //           width: imageData.naturalWidth / imageScaledRatio,
      //           height: imageData.naturalHeight / imageScaledRatio,
      //           marginLeft: -e.x / imageScaledRatio,
      //           marginTop: -e.y / imageScaledRatio
      //         });
      //       });
      //     }
      //   });
  }
}
</script>
<style scoped>
	.cropBox{
		width: 500px;
		height: 500px;
		background-color: lightblue;
    position: relative;
    z-index: -2
	}
  .cropBox img{
    max-width: 500px;
    max-height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1
  }
  #box{
    width: 300px;
    height: 300px;
    
    position: absolute;
  }
  #cvs{
    width: 300px;
    height: 300px;
    background-color: rgba(0,0,0,0.6);
    z-index: 10
  }
</style>
