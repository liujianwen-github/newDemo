import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import userManage from '@/components/userManage'
// import models from '@/components/modules'
// import model1 from '@/components/modules/model1'
// import model2 from '@/components/modules/model2'
// import model3 from '@/components/modules/model3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    }
  ],
  computed: {
    ViewComponent () {
      // return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
