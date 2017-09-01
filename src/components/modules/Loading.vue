<template>
  <div id="loading" :style="{display:show}">
    <div style="position:absolute;top: 50%;width:100%;height:120px" >
      <div style="position:relative;top: -50%">
        <img src="../../assets/Loading-lg.png" style="animation:mymove 3s linear infinite" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'Loading',
  props: ['show']
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loading{
  width: 100%;
  height: 500px;
  position: relative;
  background-color: transparent;
}
@-webkit-keyframes mymove{
  0% {
  transform:rotate(0deg);
  -ms-transform:rotate(0deg);   /* IE 9 */
  -moz-transform:rotate(0deg);  /* Firefox */
  -webkit-transform:rotate(0deg); /* Safari 和 Chrome */
  -o-transform:rotate(0deg);  /* Opera */
  }
  50%{
    transform:rotate(180deg);
  -ms-transform:rotate(180deg);   /* IE 9 */
  -moz-transform:rotate(180deg);  /* Firefox */
  -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
  -o-transform:rotate(180deg);
  }
  100% {
    transform:rotate(360deg);
  -ms-transform:rotate(360deg);   /* IE 9 */
  -moz-transform:rotate(360deg);  /* Firefox */
  -webkit-transform:rotate(360deg); /* Safari 和 Chrome */
  -o-transform:rotate(360deg);  /* Opera */
  }
}
@keyframes mymove{
  0% {
  transform:rotate(0deg);
  -ms-transform:rotate(0deg);   /* IE 9 */
  -moz-transform:rotate(0deg);  /* Firefox */
  -webkit-transform:rotate(0deg); /* Safari 和 Chrome */
  -o-transform:rotate(0deg);  /* Opera */
  }
  50%{
    transform:rotate(180deg);
  -ms-transform:rotate(180deg);   /* IE 9 */
  -moz-transform:rotate(180deg);  /* Firefox */
  -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
  -o-transform:rotate(180deg);
  }
  100% {
    transform:rotate(360deg);
  -ms-transform:rotate(360deg);   /* IE 9 */
  -moz-transform:rotate(360deg);  /* Firefox */
  -webkit-transform:rotate(360deg); /* Safari 和 Chrome */
  -o-transform:rotate(360deg);  /* Opera */
  }
}
</style>
