<template>
  <div>
  	<!-- <div>father</div> -->
  	<!-- <son @fromson="bibi" :page="mimi"></son> -->
    <!-- <div @click="mimi">111</div> -->
    <!-- <crop :crop-type="'png'" :crop-size="0.1" crop-img="img"></crop> -->
    <input type="file" accept="image/jpg,image/jpeg,image/png" @change="go"  ref="image" name="">
    <!-- <img src="../assets/listSide.png" ref="img1" alt=""> -->
   <div class="crop">
      <vueCropper
        ref="cropper"
        :img="cropImg.img"
        :outputSize="cropImg.size"
        :outputType="cropImg.outputType"
        :info="cropImg.info"
        :canScale="cropImg.canScale"
        :autoCrop="cropImg.autoCrop"
        :autoCropWidth="cropImg.autoCropWidth"
        :autoCropHeight="cropImg.autoCropHeight"
        :fixed="cropImg.fixed"
        :fixedNumber="cropImg.fixedNumber"
      ></vueCropper>
      <test1></test1>
   </div>
   <button @click="start">start</button>
    <!-- <input type="text" v-model="lili" name=""> -->
  </div>
</template>
<script>
import VueCropper from 'vue-cropper'
import test1 from './test01'
// import 
export default {
  name: 'test',
  components: {VueCropper,test1},
  data: function () {
    return {
      cropImg: {
        img: '',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300,
        autoCropHeight: 300,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1,1]
      }
    }
  },
  methods: {
    go: function () {
      const file = this.$refs.image.files[0]
      console.log(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.cropImg.img = e.target.result
        // this.$refs.cropper.startCrop() 
      }
    },
    start: function () {
      this.$refs.cropper.startCrop() 
      console.log(VueCropper)
      console.log(this)
      console.log(this.$refs.cropper)
      this.$refs.cropper.stopCrop()
      this.$refs.cropper.getCropData((data) => {
        let img = new Image()
        img.src = data
        document.body.append(img)
      })
    }
  },
  created() {
    console.log(this.autoCropWidth)
  }
}
</script>
<style scoped>
  .crop{
    width: 600px;
    height: 600px
  }
</style>
