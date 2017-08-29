export default{
  // **********  get  *********//
  // *                         //
  // *                         //
  // **********  ***  *********//
  // TOTAL
  TODAY_TOTALPERSON: 'apiServer/facetrackManage/getFacetrackList',
  TODAY_STRANGER: 'apiServer/facetrackManage/getUnMatchedList',
  TODAY_USER: 'apiServer/personManage/getMatchedPersonList',
  // USER
  USER_GETINFOS: 'apiServer/personManage/getPersonMatchedList',
  USER_UNMATCHEDHISTORY: '/apiServer/personManage/getPersonUnMatchedList',
  USER_LEAVEMESSAGE: 'apiServer/personManage/uploadPersonInfo', // (POST) 跟userinfo是一个
  USER_CONFIRM: '/apiServer/personManage/confirmFacetrackByPerson', // (POST) 先getfacetrackinfo，然后合并到person
  USER_FACETRACK_GIF: 'apiServer/facetrackManage/getFacetrackImgs',
  // STRANGER
  STRANGER_CREATEUSER: 'wxServer2/admin/createPersonByFacetrack', // POST createbyfacetrack
  STRANGER_ANALYSE: 'apiServer/facetrackManage/getFacetrackInfo',//往上倒三条
  // 智能分析选中添加
  STRANGER_ANALYSE_UPDATE: 'apiServer/facetrackManage/addFacetrackToPerson', // POST 往上倒四条 准备合并的
  // REGISTER USER
  GET_ALL_REGISTERUSER: 'apiServer/personManage/getPersonList',
  // GET_ALL_REGISTERUSER: 'deeppassterminate/user/getUserList',
  USER_ADDNEW: 'wxServer2/admin/createPersonByImgs', // POST
  // USER_ADDNEW: 'deeppassterminate/user/createUserByImage',
  USER_EDIT: 'wxServer2/admin/uploadPersonInfo', // POST
  // USER_EDIT: 'deeppassterminate/user/updateUserInfo', // POST
  USER_SEARCH: '/apiServer/personManage/searchPerson',
  USER_DELETE: 'apiServer/personManage/deletePerson'
}
