<template>
  <div>
  	<div>father</div>
  	<son @fromson="bibi"></son>
    <div @click="mimi">111</div>
    <!-- {"registTime":"2017-04-27 18:26:57",
    "headimage":"http://101.201.106.53/personImage/default_user_image.jpg",
    "latestMatchTime":"2017-06-15 18:49:07",
    "cardId":"aweawe",
    "sex":"1","name":"翟林生",
    "noFrom":"FACETRACK",
    "msgendtime":"20170628",
    "personId":"fca6cecb-4bca-4314-8d50-daa84279f532",
    "job":null,
    "message":"waeawe",
    "msgbegintime":"20170626",
    "imgs":["http://101.201.106.53/personImage/default_user_image.jpg"],
    "imgUrl":"http://101.201.106.53/personImage/default_user_image.jpg","birthday":"2017-06-14"}:
Name -->
  </div>
</template>
<script>
import son from '@/components/test01'
export default {
  name: 'test',
  dara () {
    return {
      bibi: [1, 2, 3, 4, 4, 5, 6, 7]
    }
  },
  components: {son},
  // props: ['fromson'],
  methods: {
    bibi: function (msg) {
      // var ne = this.bibi
      // ne.shift()
      // console.log(this.bibi)
      alert(msg)
      var bibi = new Date() + 5
      console.log(bibi)
    },
    mimi: function () {
      console.log(this.bibi)
    },
    stringifyDate: function (date) {
      console.log(date)
    }
  }
}
</script>
