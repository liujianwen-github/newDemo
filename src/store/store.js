import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: '',
    counter: 0,
    prompt: '错误提示'
  },
  // 展示内容, 无法改变状态
  getters: {
    tripleCounter: state => {
      return state.username
    },
    getPrompt: state => {
      return state.prompt
    }
  },
  // 改变状态
  // mutations 永远是同步的
  mutations: {
    // 显示传递的载荷 payload, 用 num 表示
    increment: (state, num) => {
      state.counter += num
    },
    setPrompt: (state, message) => {
      state.prompy = message
    }
  },
  // 提交 mutation, 这是异步的
  actions: {
    // 显示传递的载荷 payload, 用 asynchNum ( 一个对象 )表示
    asyncDecrement: ({ commit }, asyncNum) => {
      setTimeout(() => {
        // asyncNum 对象可以是静态值
        commit('decrement', asyncNum.by)
      }, asyncNum.duration)
    }
  }
})
export default store
