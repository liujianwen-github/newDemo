// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import config from '@/config'
import store from './store/store'
import VeeValidate from 'vee-validate'
import '@/validate'
import date from '@/date'
import Axios from 'axios'
import promise from 'es6-promise';
promise.polyfill();
// import VueResource from 'vue-resource'
// Vue.use(Axios)
// Vue.use(VueResource)
import Vuex from 'vuex'
import globalBus from './global.js'
Vue.use(router)
Vue.use(iView)
Vue.use(VeeValidate)
// Vue.use(date)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$http = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created: function (argument) {
    config.axiosCon()
    window.GLOBALBUS = globalBus
  }
})
