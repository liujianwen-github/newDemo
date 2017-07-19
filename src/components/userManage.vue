  <template>
  <div class="container">
  <!-- index -->
    <userHead @popState="changeState" @searchPerson="searchPerson"></userHead>
    <totalUserList :fromFa="viewWhich" :searchPerson="searchText" @popState="changeState"></totalUserList>
  </div>
    
</template>

<script>
// import config from '@/config'
// import Axios from 'axios'
import userHead from '@/components/modules/userHead'
import totalUserList from '@/components/modules/totalUserList'

export default {
  name: 'userManage',
  components: {userHead, totalUserList},
  data () {
    return {
      viewWhich: '0',
      searchText: null
    }
  },
  methods: {
    searchPerson: function (msg) {
      this.searchText = msg
    },
    changeState: function (msg) {
      this.viewWhich = msg
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.container {
  max-width: 1200px;
  width: 100%;
  position: relative;
}
</style>
