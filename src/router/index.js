import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import userManage from '@/components/userManage'
import updateConf from '@/components/updateConf'
import test from '@/components/test'
import test01 from '@/components/test01'
import login from '@/components/login'
// import test from '@/components/test'
// import Vuex from 'vuex'
// import models from '@/components/modules'
// import model1 from '@/components/modules/model1'
// import model2 from '@/components/modules/model2'
// import model3 from '@/components/modules/model3'
Vue.use(Router)
// Vue.use(Vuex)
export default new Router({
  routes: [
    {
      path:'/',
      redirect:{path:'/index'}
    },
    {
      path: '/index',
      name: 'index',
      component: Index
      // children: [
      //   {path: '/model1', components: model1},
      //   {path: '/model2', components: model2},
      //   {path: '/model3', components: model3}
      // ]
    }, {
      path: '/userManage',
      name: 'userManage',
      component: userManage
    }, {
      path: '/test',
      name: 'test',
      component: test
    }, {
      path: '/config',
      name: 'config',
      component: updateConf
    },
    {
      path:'/login',
      name:'login',
      component:login
    }
  ],
  computed: {
    ViewComponent () {
      // return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
