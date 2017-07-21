import axios from 'axios'
export default{
  // HOST: 'http://192.168.1.239:8080/',
  HOST: 'http://demo.deepdot.cn/',
  // HOST: 'localshot:8080/',
  // userkey: '5f84bb25_4ea8_42c2_a6bf_744b0bb574a9',
  userkey: '391cb26c_45f3_4817_86f8_644e293cce60',
  deviceId: 'aaa-a01-001',
  minImageCount: 3,
  maxImageCount: 5,
  pageShow: 5,
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
  },
  addDate: function (date) {
    if (Number(date) <= 10) {
      return '0' + date
    } else {
      return date
    }
  },
  dayBefor: function (date) {
    let daybefore = new Date(date)
    return daybefore
  },
  // yyyy-mm-dd格式转换为毫秒
  changeDateType: function (msg) {
    let date = new Date(msg).getTime()
    return date
  },
  axiosCon: function () {
    axios.defaults.baseURL = this.HOST
    axios.defaults.timeout = 5000
    axios.defaults.responseType = 'json'
    axios.defaults.xsrfCookieName = '111'
    axios.defaults.xsrfHeaderName = 'demo'
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  },
  deepCopy: function (source) {
    let result = {}
    for (var key in source) {
      result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key]
    }
    return result
  }
}
