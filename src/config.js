import axios from 'axios'
import INTERFACE from './interface'

const pro = {
  HOST:'',
  projectName: '../deeppassterminate',
  projectpath:window.location.origin + window.location.pathname,
}
const dev = {
  HOST: 'http://172.16.1.115:8080/',
  projectName: '../deeppassterminate',
  projectpath:'http://172.16.1.115:8080/'
}
const base = dev
export default{
  // HOST: 'http://192.168.1.239:8080/',
  // HOST: 'http://demo.deepdot.cn/',
  // * {TODO}
  // HOST: 'http://172.16.1.98:8080/',
  HOST:base.HOST,
  /**
   * [对应的java项目名称,用于ajax请求前缀]
   * @type {String}
   * * {TODO}
   */
  projectName: base.projectName,
  // projectName: '',
  /**
   * [获取项目域名以及文件路径，用于获取图片服务器的路径]
   * @type {[String]}
   * {TODO}
   */
  projectpath:base.projectpath,
  // 
  userkey: '391cb26c_45f3_4817_86f8_644e293cce60',
  deviceId: 'aaa-a01-001',
  /**
   * [图片新建用户要求图片序列的数量]
   * @type {Number}
   */
  minImageCount: 1,
  maxImageCount: 1,
  pageShow: 5,
  /**
   * [veevalidate插件筛选条件参数]
   * @type {Object}
   */
  dayBefore: {
    // 筛选规则，不能选择今天之后的时间
    disabledDate(date) {
          return date > Date.now()
        }
  },
  /**
   * [cropimg插件参数]
   * @type {Object}
   */
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
  /**
   * @Author    liujianwen
   * @DateTime  2017-09-05
   * @copyright [弹窗时取消默认滚动事件]
   */
  bodyEvent: function(e){
    e.preventDefault()
  },
  /**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [规范日期格式，不足两位补0]
   * @param     {[string]}      date [日期值参数]
   */
  addDate: function (date) {
    if (Number(date) <= 10) {
      return '0' + date
    } else {
      return date
    }
  },
  /**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [yyyy-mm-dd格式转换为毫秒]
   * @param     {[String]}      msg [日期]
   * @return    {[Number]}      date    [毫秒]
   */
  changeDateType: function (msg) {
    let date = new Date(msg).getTime()
    return date
  },
  /**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [axios配置]
   * @return    {[void]}
   * * {TODO}
   */
  axiosCon: function () {
    axios.defaults.baseURL = this.HOST
    axios.defaults.timeout = 5000
    axios.defaults.responseType = 'json'
    axios.defaults.xsrfCookieName = '111'
    axios.defaults.xsrfHeaderName = 'demo'
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  },
  /**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [深拷贝]
   * @param     {[object]}      source [description]
   * @return    {[object]}             [description]
   */
  deepCopy: function (source) {
    let result = {}
    for (var key in source) {
      result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key]
    }
    return result
  },
  /**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [获取服务器person图片资源]
   * @param     {[type]}      personId [description]
   * @return    {[type]}               [description]
   */
  get_image: function (personId){
    return this.projectpath + INTERFACE.GET_PERSONHEADIMAGE+'?personId='+ personId
  },
  /**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [获取服务器facetrack图片资源]
   * @param     {[type]}      personId [description]
   * @return    {[type]}               [description]
   */
  get_facetrackimage :function(facetrackId){
    return this.projectpath + INTERFACE.GET_FACETRACKIMAGE + '?facetrackId=' + facetrackId
  },
  /**
   * @Author    liujianwen
   * @DateTime  2017-09-01
   * @copyright [获取服务器场景图片资源]
   * @param     {[type]}      personId [description]
   * @return    {[type]}               [description]
   */
  get_sceneimg: function(facetrackId){
     return this.projectpath + INTERFACE.GET_SCENEIMG + '?facetrackId=' + facetrackId
  },
  /**
    * @Author    liujianwen
    * @DateTime  2017-08-10
    * @copyright [读取文件，返回base64编码]
    * @param     {[object]}      source   [文件资源]
    * @param     {Function}    callback [获取编码后的回调函数]
    * @return    {[void]}               
    */
   readFile: function (source,callback){
     const _this = this
     const reader = new FileReader()
     console.log(source)
     reader.readAsDataURL(source)
     reader.onload = function (e){
       console.log(this)
       console.log(e)
       _this.video2img(e.target.result,callback)
     }
   },
   /**
    * @Author    liujianwen
    * @DateTime  2017-08-10
    * @copyright [视频截取图片]
    * @param     {[String]}      source [视频base64编码]
    * @return    {[Array]}             [图片数组]
    */
   video2img: function (file,callback){
     // console.log(file)
     //创建视频元素
     // var video = document.createElement('video') 
     var video = document.getElementById('video1') 
     video.setAttribute('id', 'video1');
     video.style.maxWidth ='120px'
     video.style.maxHeight ='120px'
     video.src = file;

     video.autoplay = true

     // 创建canvas元素
     video.onloadedmetadata = function (){
      // 4倍速播放视频
      video.playbackRate = 4
      console.log(video.style)
      console.log(video)
      //视频时长
      var videoTime = video.duration === 0&&typeof(video.duration ==='undefined') ? 4 : video.duration
      alert(Math.round(videoTime))

      // 待返回的图片数组
      var imgs = []
      var cvs = document.createElement("canvas");
      cvs.width = 120
      cvs.height= 120
      var interval =setInterval(function(){
       // 新建canvas开始截图，1000毫秒一次
        cvs.getContext("2d").clearRect(0,0,video.clientWidth, video.clientHeight)
        cvs.getContext("2d").drawImage(video,0,0, video.clientWidth, video.clientHeight)

        imgs.push(cvs.toDataURL('image/png', 0.5).split(',')[1])
        if(imgs.length===Math.round(videoTime)){
          // setTimeout(function(){
          clearInterval(interval)
          alert(imgs[0])
         // 截图结束，回调
          callback(imgs)
       // },Math.round(videoTime)*1000)
         }
       },1000/4)
       // interval()
       
     }
   }
}
