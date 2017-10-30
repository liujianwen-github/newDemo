<template>
  <div>
    <video></video>
    <button @click="requestFullScreen()">full</button>
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
      
    }
  },
  methods: {
    requestFullScreen(element) {
    var de = document.querySelector(element) || document.documentElement;
    if (de.requestFullscreen) {
        de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
    }
}
  },
  created() {
    navigator.getUserMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia;



    if (navigator.mediaDevices.getUserMedia) {
       navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 640, height: 360,facingMode: "user" } }).then(function(stream) {
             var video = document.querySelector('video');
             video.srcObject = stream;
             video.onloadedmetadata = function(e) {
               video.play();
             };
          })
        .catch(function(err) {
            console.log(err)
             alert("The following error occurred: " + err.name);
          })
    } else {
       alert("getUserMedia not supported");
    }
  }
}
</script>
<style scoped>
  .crop{
    width: 600px;
    height: 600px
  }
</style>
