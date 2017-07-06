import axios from 'axios'
export default{
  // HOST: 'http://192.168.1.15:8080/',
  HOST: 'http://demo.deepdot.cn/',
  // userkey: '5f84bb25_4ea8_42c2_a6bf_744b0bb574a9',
  userkey: '391cb26c_45f3_4817_86f8_644e293cce60',
  deviceId: 'aaa-a01-001',
  minImageCount: 3,
  maxImageCount: 5,
  pageShow: 5,
  addDate: function (date) {
    if (Number(date) <= 10) {
      return '0' + date
    } else {
      return date
    }
  },
  // yyyy-mm-dd格式转换为毫秒
  changeDateType: function (msg) {
    let date = new Date(msg).getTime()
    return date
  },
  axiosCon: function () {
    axios.defaults.baseURL = this.HOST
    axios.defaults.timeout = 10000
    axios.defaults.responseType = 'json'
    axios.defaults.xsrfCookieName = '111'
    axios.defaults.xsrfHeaderName = 'demo'
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    // axios.defaults.auth = {
    //   username: 'liujianwen',
    //   password: 's00pers3cret'
    // }
    // axios.defaults.
  }
}
